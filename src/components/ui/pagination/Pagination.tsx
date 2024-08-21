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
        <div className={`${allFont.className} flex  justify-center mb-16 mt-10 px-1 mysm:text-fs1 movileS:text-xs movileM:text-base`}>
            <nav aria-label="Page navigation example movileS:flex-col">
                <ul className="flex items-center XR:gap-1 12Pro:gap-0 14Pro:gap-1">
                    <li className="page-item pr-5 movileS:pr-1 ">
                        <Link
                            className="page-link relative block text-colorPrimary font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>Anterior
                        </Link>
                    </li>

                    {allPages.map((page, index) => (
                        <li key={page + '-' + index} className="page-item px-1 font-fw5 text-fs2 text-colorPrimary rounded-brAll">
                            <Link
                                className={clsx(
                                    "page-link relative block w-fit px-4 py-1 movileS:px-0.5 movileS:py-0.5 movileM:px-2 mt-1 font-fw5 text-fs2font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none border-colorPrimary text-colorPrimary rounded-brAll shadow-custom-2 border-customBW",
                                    {
                                        'bg-colorPrimary shadow-none  text-colorSecondary hover:text-colorHover': page === currentPage,
                                    }
                                )}
                                href={createPageUrl(page)}
                            >
                                {page}
                            </Link>
                        </li>
                    ))}

                    <li className="page-item pl-5 movileS:pl-1 ">
                        <Link
                            className="page-link relative block text-colorPrimary font-fw4 outline-none transition-all duration-300 hover:text-colorHover focus:shadow-none whitespace-normal"
                            href={createPageUrl(currentPage + 1)}>Siguiente
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
