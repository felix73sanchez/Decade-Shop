export const currencyFormat = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'DOP',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(value);
};