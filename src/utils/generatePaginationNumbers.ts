// Objetivo: Generar un array con los numeros de paginacion a mostrar en la paginacion de la tabla

// [1, 2, 3, 4, 5,...,7]
// [1, 2, 3,...,48, 49, 50]

export const generatePaginationNumbers = (totalPages: number, currentPage: number) => {

    // Si el numero total de paginas es 7 o menos, se muestran todas las paginas sin puntos suspensivos

    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1); // [1, 2, 3, 4, 5, 6, 7]
    }

    // Si la pagina actual esta entre las primeras 3 paginas, se muestran las primeras 3, puntos suspensivos y las ultimas 2 paginas.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages]; // [1, 2, 3, ..., 49, 50]
    }

    // Si la pagina actual esta entre las ultimas 3 paginas, se muestran las primeras 2 paginas, puntos suspensivos y las ultimas 3 paginas.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]; // [1, 2, ..., 48, 49, 50]
    }

    // Si la pagina actual esta en otro lugar medio, mostrar la primera pagina con puntos suspensivos, la pagina actual y la ultima pagina con puntos suspensivos.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,        // [1, ..., 4, 5, 6, ..., 50]
        currentPage + 1,
        '...',
        totalPages
    ];

}