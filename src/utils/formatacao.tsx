export function formatarTotal(valor: number): number {
    // Formata em duas casas decimais apenas
    return Math.round((valor + Number.EPSILON) * 100) / 100;
}

export function formatMoeda(value: number): string {
    if (isNaN(value)) return "";

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

export function filtraDigitos(value: string): string {
    return value.replace(/\D/g, "");
}

export function formatarData(timestamp: string | number) {
    const data = new Date(Number(timestamp));

    return data.toLocaleDateString("pt-BR");
}