import { allFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
    return (
        <div className={`mt-3 ${className}`}>
            <h1 className={`${allFont.className} antialiased text-4xl font-semibold mt-20 my-7`}>
                {title}
            </h1>
            {
                subtitle && (
                    <h3 className="text-xl mb-5">
                        {subtitle}
                    </h3>
                )
            }

        </div>
    )
}
