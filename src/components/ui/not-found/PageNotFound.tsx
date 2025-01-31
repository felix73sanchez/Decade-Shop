import { allFont } from "@/config/fonts";
import Link from "next/link";
import Image from "next/image";

// Note: PageNotFound component
export const PageNotFound = () => {
    return (
        <div className={`${allFont.className} flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle`}>
            <div className=" text-center px-5 mx-5 ">
                <h2 className="antialiased text-9xl">
                    404
                </h2>
                <p className="font-semibold text-2xl">Lo sentimos mucho! </p>
                <p className="font-light">
                    <span>Puedes regresar al </span>
                    <Link href='/'
                        className="font-normal hover:underline transition-all"
                    > inicio </Link>
                </p>

            </div>
            <div className="w-96 h-96">
                <Image
                    src="/imgs/starman_750x750.png"
                    alt="Starman"
                    className="p-5 sm:p-0"
                    width={550}
                    height={550}
                />

            </div>
        </div>
    )
}
