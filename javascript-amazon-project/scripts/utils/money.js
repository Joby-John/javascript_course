

export function formatCurrency(priceCents){
    return (Math.round(priceCents)/100).toFixed(2);
}

export default formatCurrency; // default is used if we want to export only one thing from the file, not suitable if we export multiple functions