import { allFont } from "@/config/fonts"
import Link from "next/link"



export const Footer = () => {
    return (
        <div className="flex flex-grow movileS:flex-col w-full justify-center items-center gap-g8 text-fs1 mysm:text-xs movileS:text-xs bottom-0 uppercase my-5">
            <Link className="col-span-1"
                href="/"
            >
                <span className={`${allFont.className} antialiased font-fw7`}> Deca </span>
                <span className="font-fw7">| Shop </span>
                <span> © </span>
                <span> {new Date().getFullYear()} </span>
            </Link>

            <Link
                href="/"
                className="col-span-1"
            > Privacidad & Terminos
            </Link>

            <Link
                href="/"
                className="col-span-1"
            >Location
            </Link>
        </div>
    )
}
