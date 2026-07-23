'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

/**
 * Autentica con email/contraseña desde un <form action={...}> usando
 * useActionState en el cliente (ver LoginForm).
 *
 * IMPORTANTE: `redirect: false`
 * -----------------------------
 * Si NO se pasa `redirect: false`, next-auth redirige desde el propio
 * servidor apenas el login es exitoso (lanza un redirect() interno).
 * Eso significa que el `return "Success"` de acá abajo NUNCA se
 * ejecuta, y el cliente jamás se entera de que el login funcionó a
 * tiempo: el usuario ve la URL cambiar, pero el `useSession()` del
 * cliente (usado por CartSync, el header, etc.) queda desactualizado
 * hasta que algo fuerza un refetch — de ahí la necesidad de recargar
 * la página a mano.
 *
 * Con `redirect: false`, next-auth solo crea la sesión y setea la
 * cookie, sin navegar. El control de "qué hacer después" queda 100%
 * en el cliente (LoginForm), que puede refrescar el `useSession()` y
 * navegar en el orden correcto.
 */
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    return 'Success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

/**
 * Variante para invocar el login fuera de un <form> (ej. desde código
 * imperativo). Se mantiene igual, ya usaba `redirect: false`.
 */
export const login = async (email: string, password_hash: string) => {
  try {
    await signIn('credentials', {
      email,
      password: password_hash,
      redirect: false,
    })

    return { ok: true }
  } catch (error) {
    console.error('[login]', error)
    return { ok: false, message: 'Error al autenticarse' }
  }
}