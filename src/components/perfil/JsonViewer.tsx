
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
            <table className="min-w-full divide-y divide-colorGray">
                <thead className="bg-colorGray uppercase">
                    <tr>
                        <th className="px-6 py-3 text-left text-fs1rem font-fw9 text-colorPrimary">Datos</th>
                        <th className="px-6 py-3 text-left text-fs1rem font-fw9 text-colorPrimary">Detalles</th>
                    </tr>
                </thead>
                <tbody className="bg-colorSecondary divide-y divide-colorGray">
                    {Object.keys(data)
                        .filter(key => isAdmin || displayedKeys.includes(key)) // Muestra todos si es admin
                        .map((key) => (
                            <tr key={key} className='hover:bg-colorHoverGray'>
                                <td className="px-6 py-4 whitespace-nowrap text-fs1rem font-fw7 text-colorPrimary uppercase">
                                    {key}
                                </td>
                                <td className="px-6 py-4 text-fs2 font-fw5 text-colorPrimary">
                                    {formatValue(data[key], key)}  {/* Pasar ambos argumentos */}
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default JsonViewer;
