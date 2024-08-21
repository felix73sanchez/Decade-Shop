import { allFont } from "@/config/fonts";
import React from 'react';

const JsonViewer: React.FC<{ data: Record<string, any> }> = ({ data }) => {
    const formatValue = (value: any, key: string) => {
        if (key === 'emailVerified' && value === null) {
            return 'No verificado'; // Mostrar 'No verificado' si el valor de emailVerified es null
        }

        if (typeof value === 'string') {
            // Intentar parsear la fecha solo si el valor parece ser una fecha
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                return date.toLocaleDateString(); // Formato de fecha local
            }
            // Si el valor es una cadena que no es una fecha, devolverlo tal cual
            return value;
        }

        // Para otros tipos de valores (números, booleanos, etc.), devolver el valor en su forma natural
        return value === null ? 'No disponible' : JSON.stringify(value, null, 2);
    };

    // Claves específicas a mostrar si no es admin
    const displayedKeys = ['name', 'email', 'emailVerified'];

    // Verifica el rol
    const isAdmin = data.role === 'admin';

    return (
        <div className="">
            <div className={`${allFont.className}  min-w-full`}>
    {Object.keys(data)
        .filter(key => isAdmin || displayedKeys.includes(key)) // Muestra todos si es admin
        .map((key) => (
            <React.Fragment key={key}>
                <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-y-4 gap-y-0 bg-colorSecondary hover:bg-colorHover hover:border-colorPrimary hover:rounded-brAll hover:border-customBW transition duration-300 ease-in-out px-5 py-3 uppercase">
                    <div className=" font-fw7 text-fs1rem">
                        {key}
                    </div>
                    <div className="font-fw5 text-fs2">
                        {formatValue(data[key], key)}  {/* Pasar ambos argumentos */}
                    </div>
                </div>
            </React.Fragment>
        ))}
</div>

        </div>
    );
};

export default JsonViewer;
