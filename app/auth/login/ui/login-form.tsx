'use client';

import { ArrowRightIcon, KeyIcon, CircleAlert, AtSign } from 'lucide-react'
import { useActionState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { authenticate } from '@/actions/shop/auth/login';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import clsx from 'clsx';
import { useCartStore } from '@/src/store/cart/cart-store';
import Link from 'next/link';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter()
  const redirectTo = searchParams.get('redirectTo') || '/';

  const { cart, } = useCartStore()
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  // `update` refresca el contexto cliente de next-auth (useSession).
  // Es la pieza que faltaba: sin esto, aunque el login sea exitoso en
  // el servidor, componentes cliente como CartSync o el header del
  // sitio siguen viendo "unauthenticated" hasta un refresh manual.
  const { update } = useSession()



  useEffect(() => {
    if (errorMessage !== "Success") return

    const finalizarLogin = async () => {
      // 1) Refresca la sesión en el cliente: a partir de acá,
      //    useSession() en TODA la app (incluido CartSync) ya ve
      //    status === "authenticated" sin necesidad de recargar.
      await update()

      // 2) Refresca los Server Components (por si alguno depende de
      //    la sesión) y navega a destino.
      // router.refresh()
      // router.push(redirectTo)
      window.location.replace(redirectTo)
    }

    finalizarLogin()
  }, [errorMessage])

  const handleGoogleLogin = async () => {
    try {
      // Google usa un flujo OAuth con redirect de página completa,
      // así que al volver la página se recarga entera y useSession
      // arranca ya autenticado. Eso está cubierto por la bandera
      // `pendingGuestMerge` en CartSync, no requiere cambios acá.
      await signIn("google")
    } catch (error) {
      console.error("[LoginForm] Google login:", error)
    }
  }

  return (
    <div className='space-y-3 flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
      <form action={formAction} className="">
        <div className="">
          <h1 className={` mb-3 text-3xl font-medium`}>
            Ingresar
          </h1>
          <div className="w-full">
            <div>
              <label
                className="mb-1 font-semibold text-[14px] mt-5 block  text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md bg-slate-200  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                  id="email"
                  type="email"
                  name="email"
                />
                <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-1 mt-5 block font-semibold text-[14px] text-gray-900"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md bg-slate-200  py-[12px] pl-10 text-sm focus:outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          </div>
          <button
            className={clsx(
              "mt-4 px-2.5 h-[44px] rounded-md text-white flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600",
              {
                "opacity-70 cursor-not-allowed": isPending
              }
            )}
            aria-disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
              </span>
            ) : (
              <span className="flex items-center w-full">
                Iniciar sesión
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </span>
            )}
          </button>
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && errorMessage !== "Success" && (
              <>
                <CircleAlert className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            )}
          </div>
        </div>
      </form>

      <span className="relative z-10 block font-medium text-center mt-4.5">
        <span className="block absolute -z-10 left-0 top-1/2 h-px w-full bg-gray-200"></span>
        <span className="inline-block px-3 bg-white">Or</span>
      </span>

      <p className="text-center text-sm mt-6 text-gray-600">
        ¿No tienes una cuenta?
        <Link
          href="/auth/new-account"
          className="text-gray-900 transition duration-200 hover:text-blue-600 pl-2"
        >
          ¡Regístrate ahora!
        </Link>
      </p>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="
    w-full flex items-center justify-center gap-3
    border border-gray-300
    bg-white
    py-2.5 px-4
    rounded-md
    text-sm font-medium text-gray-700
    shadow-sm
    hover:bg-gray-50
    active:bg-gray-100
    transition
    cursor-pointer
  "
      >
        <GoogleIcon className="h-5 w-5" />
        Iniciar sesión con Google
      </button>

    </div>
  );
}