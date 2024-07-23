'use client';

import { allFont, logoFont } from "@/config/fonts"
import { authenticate } from "@/actions";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Link from "next/link";
//import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";


export const LoginForm = () => {

    // const router = useRouter();
    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            //router.replace('/');
            window.location.replace('/');
        }

    }, [state]);


    return (
        <form action={dispatch} className={`p-p8 pc:p-20 ${allFont} font-fw9 text-fs2 text-colorPrimary w-full grid grid-cols-1 gap-0`}>
            
            <div className="flex flex-col justify-center items-center mb-16 pc:mb-10 w-full  ">
              <h1 className={`${logoFont.className} font-fw9 italic SE:text-[2.5rem] text-[3rem] pc:text-[3.2rem] text-colorPrimary`}>DECAVENTURE</h1>
            </div>
            
            <label htmlFor="email" className="pb-1 pl-2">Correo electrónico</label>
            <input
                className="px-28 py-3 border bg-gray-200 rounded-brAll mb-5"
                type="email"
                name="email"
                autoComplete="email"
            />


            <label htmlFor="email" className="pb-1 pl-2">Contraseña</label>
            <input
                className="px-28 py-3 border bg-gray-200 rounded-brAll mb-5"
                type="password"
                name="password"
                autoComplete="current-password"

            />


            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === 'CredentialsSignin' && (
                    <div className=" mb-2 flex flex-row ">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">  Credenciales no son correctas. </p>
                    </div>
                )}
            </div>

            {/* <button
                type="submit"
                className="btn-primary">
                Ingresar
            </button> 
            */}
            <LoginButton />


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-colorPrimary"></div>
                <div className="px-2 ">O</div>
                <div className="flex-1 border-t border-colorPrimary"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={
                clsx({
                    "btn-primary": !pending,
                    "btn-disabled": pending,
                })}
            disabled={pending}
        >
            Ingresar
        </button>
    );
}