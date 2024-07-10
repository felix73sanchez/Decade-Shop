'use client';

import { useEffect } from 'react';
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname(); // Obtiene la ruta actual
    const searchParams = useSearchParams(); // Obtiene los parametros de busqueda de la URL

    const pageString = searchParams.get('page') ?? 1; // Si no hay parametro de pagina, se muestra la primera pagina
    const currentPage = isNaN(+pageString) ? 1 : +pageString; // Si el parametro de pagina no es un numero, se muestra la primera pagina

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    }


    const allPages = generatePaginationNumbers(totalPages, currentPage); // Genera los numeros de paginacion a mostrar en la paginacion de la tabla


    const createPageUrl = (pageNUmber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNUmber === '...') {
            return `${pathName}?${params.toString()}` // Si el numero de pagina es puntos suspensivos
        }

        if (+pageNUmber <= 0) {
            return `${pathName}`; // Si la pagina es menor o igual a 0
        }

        if (+pageNUmber > totalPages) { // Si la pagina es mayor al total de paginas
            return `${pathName}?${params.toString()}`;
        }

        params.set('page', pageNUmber.toString()); // Establece el numero de pagina en los parametros de busqueda

        return `${pathName}?${params.toString()}`; // Devuelve la URL con el numero de pagina establecido

    }

    return (
        <div className="flex text-center justify-center p-0 my-10">

            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none items-center">

                    <li className="page-item p-0 m-0 pr-3">
                        <Link
                            className="page-link relative block text-colorPrimary font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>Anterior
                        </Link></li>

                    {
                        allPages.map((page, index) => (

                            <li key={page + '-' + index} className="page-item mx-m8 bg-colorSecondary text-colorPrimary rounded-brAll">
                                <Link
                                    className={
                                        clsx(
                                            "page-link relative block py-1 px-3   font-fw4 outline-none transition-all duration-300  hover:text-colorHover hover:bg- focus:shadow-none rounded-brAll shadow-customBS border-customBC border-customBW ",
                                            {
                                                'bg-colorPrimary text-colorSecondary shadow-sm hover:text-colorHover': page === currentPage,
                                            }
                                        )
                                    }
                                    href={createPageUrl(page)}
                                >
                                    {page}
                                </Link>

                            </li>
                        ))
                    }


                    <li className="page-item">
                        <Link
                            className="page-link relative block pl-3 text-colorPrimary font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>Siguiente
                        </Link></li>
                </ul>
            </nav>
        </div>
    )
}
