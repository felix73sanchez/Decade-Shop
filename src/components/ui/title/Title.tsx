import { allFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
    return (
        <div className={` ${className} ${allFont.className}`}>
            <h1 className={`p-p8 pl-5 antialiased mysm:text-fs1 text-fs1.2rem font-fw9  border-b-customBW border-colorPrimary bg-color3`}>
                {title}
            </h1>
            {/*
                subtitle && (
                    <h3 className="text-xl mb-5">
                        {subtitle}
                    </h3>
                )
            */}

        </div>
    )
}
