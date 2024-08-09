import { allFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
    return (
        <div className={` ${className} ${allFont.className}`}>
            <h1 className={`pb-3 pl-5 mysm:pl-2 antialiased text-fsHeader font-fw7 uppercase`}>
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
7