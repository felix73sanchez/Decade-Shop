import { allFont } from "@/config/fonts"
import Link from "next/link"



export const Footer = () => {
    return (
        <div className="flex w-full justify-center text-xs mb-10">
            <Link
                href="/"
            >
                <span className={`${allFont.className} antialiased font-bold`}> Decade </span>
                <span>| Shop </span>
                <span> © </span>
                <span> {new Date().getFullYear()} </span>
            </Link>

            <Link
                href="/"
                className="mx-3"
            >
                Privacidad & Terminos
            </Link>

            <Link
                href="/"
                className="mx-3"
            >
                Location
            </Link>
        </div>
    )
}
