'use client';

import { allFont, logoFont } from "@/config/fonts";
import { authenticate } from "@/actions";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

export const LoginForm = () => {
    const [state, dispatch] = useFormState(authenticate, undefined);

    useEffect(() => {
        if (state === 'Success') {
            window.location.replace('/');
        }
    }, [state]);

    return (
        <form action={dispatch} className={`${allFont} m-0 p-0 font-fw9 text-fs2 text-colorPrimary w-full h-full grid grid-cols-1 gap-0 justify-center items-center uppercase`}>

            <div className="grid place-items-center">
                <span className={`${logoFont.className} font-fw9 italic text-[5rem] text-colorPrimary whitespace-nowrap leading-none`}>DECA</span>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
                {/* LABEL CORREO */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="pl-3 pt-4 text-fs1">Correo electrónico</label>
                    <input
                        className="p-3 border bg-gray-200 rounded-brAll w-full"
                        type="email"
                        id="email"
                        name="email"
                        autoComplete="email"
                    />
                </div>

                {/* LABEL CONTRASEÑA */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="pl-3 text-fs1">Contraseña</label>
                    <input
                        className="p-3 border bg-gray-200 rounded-brAll w-full"
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                    />
                </div>
            </div>

            {/* Contenedor para el mensaje de error y el botón */}
            <div className="flex flex-col w-full pt-6">
                {state === 'CredentialsSignin' && (
                    <div className="flex items-center space-x-1 pl-3 mb-1">
                        <ExclamationCircleIcon className="h-3 w-3 text-red-500" />
                        <p className="text-fs0 text-red-500 whitespace-nowrap">Credenciales no son correctas.</p>
                    </div>
                )}
                <LoginButton />

                {/* Divisor */}
                <div className="flex items-center m-0 p-2">
                    <div className="flex-1 border-t border-gray-400"></div>
                    <div className="px-2 text-gray-400">○</div>
                    <div className="flex-1 border-t border-gray-400"></div>
                </div>

                <Link href="/auth/new-account" className="btn-secondary text-center">
                    Crear una nueva cuenta
                </Link>
            </div>
        </form> 
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx(
                "btn-primary",
                { "btn-disabled": pending }
            )}
            disabled={pending}
        >
            Ingresar
        </button>
    );
}
