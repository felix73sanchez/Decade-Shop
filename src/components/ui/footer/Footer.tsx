import { allFont } from "@/config/fonts"
import Link from "next/link"



export const Footer = () => {
    return (
        <div className="flex w-full justify-center gap-g8 text-fs1 bottom-0 uppercase mb-5">
            <Link
                href="/"
            >
                <span className={`${allFont.className} antialiased font-fw7`}> Deca </span>
                <span className="font-fw7">| Shop </span>
                <span> © </span>
                <span> {new Date().getFullYear()} </span>
            </Link>

            <Link
                href="/"
                className=""
            > Privacidad & Terminos
            </Link>

            <Link
                href="/"
                className=""
            >Location
            </Link>
        </div>
    )
}
