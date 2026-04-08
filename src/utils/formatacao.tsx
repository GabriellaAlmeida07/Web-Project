export function formatarTotal(valor: number): number {
    // Formata em duas casas decimais apenas
    return Math.round((valor + Number.EPSILON) * 100) / 100;
}