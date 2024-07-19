'use client';

import { allFont } from "@/config/fonts";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useCallback } from "react";
import { useVisibility } from '@/components/ui/barmoving/VisibilityContext';

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages }: Props) => {
    const { setBarMovingVisible } = useVisibility();

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? '1';
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    }

    const updateVisibility = useCallback(() => {
        if (currentPage === 1) {
            setBarMovingVisible(true);
        } else {
            setBarMovingVisible(false);
        }
    }, [currentPage, setBarMovingVisible]);

    useEffect(() => {
        updateVisibility();
    }, [currentPage, updateVisibility]);

    const allPages = generatePaginationNumbers(totalPages, currentPage);

    const createPageUrl = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`;
        }

        if (+pageNumber <= 0) {
            return `${pathName}`;
        }

        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`;
        }

        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    };

    return (
        <div className={`${allFont.className} flex justify-center my-10 px-1 12Pro:px-1 XR:px-1 14Pro:px-2`}>
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none items-center XR:gap-1 12Pro:gap-0 14Pro:gap-1">
                    <li className="page-item">
                        <Link
                            className="page-link relative block text-colorPrimary font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>Anterior
                        </Link>
                    </li>

                    {allPages.map((page, index) => (
                        <li key={page + '-' + index} className="page-item mx-1 bg-colorSecondary text-colorPrimary rounded-brAll">
                            <Link
                                className={clsx(
                                    "page-link relative block py-1 px-3 font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none rounded-brAll shadow-customBS border-customBC border-customBW",
                                    {
                                        'bg-colorPrimary text-colorSecondary shadow-sm hover:text-colorHover': page === currentPage,
                                    }
                                )}
                                href={createPageUrl(page)}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}

                    <li className="page-item">
                        <Link
                            className="page-link relative block text-colorPrimary font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>Siguiente
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
