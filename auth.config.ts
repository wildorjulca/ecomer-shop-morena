import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google'
import { string, z } from 'zod';
import { prisma } from './libs';
import bcrypt from 'bcrypt';

export const authConfig = {
    pages: {
        signIn: 'auth/login',
        newUser: "auth/login/new-account"
        // signOut: 'auth/new-account'
    },
    callbacks: {
        async signIn({ account, profile, user }) {
            console.log({ account, profile, user })
            console.log("*******************************")

            if (account?.provider === "google") {
                try {
                    // Verificar si el usuario ya existe cuando se autentique potr google para que no se guarde duplicado a la base de datos
                    const existengUser = await prisma.usuario.findUnique({
                        where: { email: user.email! }
                    })

                    if (!existengUser) {

                        const usuario = await prisma.usuario.create({
                            data: {
                                email: user.email!,
                                nombre: user.name!,
                            }
                        })

                        console.log("Usuario que se creo y retorno: ", usuario)
                    }
                    return true
                } catch (error) {
                    console.log("Error en el SignIn Callback con Google:", error)
                    return false
                }

            }
            return true
        },
        async jwt({ token, user, account }) {
            // console.log("jwt: ", { token, user, account })

            // 🔥 primer login
            if (user) {
                token.id = user.id
            }

            // 🔥 fallback SI user ya no existe
            if (!token.id && token.sub) {
                token.id = token.sub
            }

            return token

            // if (user) {
            //     const dbUser = await prisma.usuario.findFirst({ where: { email: user.email } })

            //     if (dbUser) {
            //         token.id = String(dbUser.id)
            //         token.name = dbUser.nombre
            //         token.email = dbUser.email
            //     }
            // }


        },
        session({ session, user, token }) {
            // console.log("session", session, user, token)
            // session.user = token.data as typeof session.user
            // return session
            if (session?.user) {
                session.user.id = token.id as string
                session.user.name = token.name as string
                session.user.email = token.email as string
            }

            return session
        }
    },
    providers: [
        Credentials({
            async authorize(credentials) {

                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);


                if (!parsedCredentials.success) {
                    console.log({ parsedCredentials })
                    console.log("Invalid credentials format")
                    return null
                }

                const { email, password } = parsedCredentials.data

                const user = await prisma.usuario.findUnique({
                    where: { email }
                })

                if (!user) {
                    console.log("User not found")
                    return null
                }

                const passwordsMatch = bcrypt.compareSync(password, user.password_hash ?? "")

                if (!passwordsMatch) {
                    console.log("Invalid password")
                    return null
                }
                console.log(user)

                return {
                    id: String(user.id),
                    email: email,
                    name: user.nombre,
                }

            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })

    ]
} satisfies NextAuthConfig;