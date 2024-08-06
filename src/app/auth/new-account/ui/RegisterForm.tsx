'use client';

import { allFont, logoFont } from "@/config/fonts";
import { login, registerUser } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';

type FormImput = {
    name: string;
    email: string;
    password: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm<FormImput>();

    const onSubmit: SubmitHandler<FormImput> = async (data) => {
        setErrorMessage('');
        const { name, email, password } = data;

        // server actions
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace('/');
    }

    return (
        <div className="w-full h-full flex justify-center items-center leading-none ">
            <form onSubmit={handleSubmit(onSubmit)} className={`${allFont} m-0 p-0 font-fw9 text-fs2 text-colorPrimary w-full h-full grid grid-cols-1 gap-0 justify-center items-center`}>
                
                <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="name" className="pl-3 text-fs1">Nombre completo</label>
                    <input
                        className={clsx("p-3 border bg-colorGray rounded-brAll w-full", { 'border-red-500': errors.name })}
                        type="text"
                        id="name"
                        autoFocus
                        {...register('name', { required: true })}
                    />

                    <label htmlFor="email" className="pl-3 pt-5 text-fs1">Correo electrónico</label>
                    <input
                        className={clsx("p-3 border bg-colorGray rounded-brAll w-full", { 'border-red-500': errors.email })}
                        type="email"
                        id="email"
                        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    />

                
                    <label htmlFor="password" className="pl-3 pt-5 text-fs1 ">Contraseña</label>
                    <input
                        className={clsx("p-3 border bg-colorGray rounded-brAll w-full ", { 'border-red-500': errors.password })}
                        type="password"
                        id="password"
                        {...register('password', { required: true, minLength: 6 })}
                    />
                </div>

                <div className="flex flex-col w-full pt-6">
                    <span className="text-red-500 pl-3 mb-1 text-fs1">{errorMessage}</span>
                    <button
                        className="btn-primary h-12">
                        Crear cuenta
                    </button>
                

                {/* divisor l ine */}
                <div className="flex items-center m-0 p-2">
                    <div className="flex-1 border-t border-gray-500"></div>
                    <div className="px-2 text-gray-800">○</div>
                    <div className="flex-1 border-t border-gray-500"></div>
                </div>

                <Link
                    href="/auth/login"
                    className="flex btn-secondary  items-center justify-center h-[2.7rem]">
                    Ingresar
                </Link>
</div>
            </form>
        </div>
    )
}
