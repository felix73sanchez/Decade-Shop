'use client';


import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

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
        <div className="flex text-center justify-center mt-10 mb-32">

            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">

                    <li className="page-item">
                        <Link
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={30} />
                        </Link></li>

                    {
                        allPages.map((page, index) => (

                            <li key={page + '-' + index} className="page-item">
                                <Link
                                    className={
                                        clsx(
                                            "page-link relative block py-1.5 px-3  border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                                            {
                                                'bg-blue-600 text-white shadow-sm hover:text-white hover:bg-blue-700': page === currentPage,
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
                            className="page-link relative block py-1.5 px-3  border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />
                        </Link></li>
                </ul>
            </nav>
        </div>
    )
}

