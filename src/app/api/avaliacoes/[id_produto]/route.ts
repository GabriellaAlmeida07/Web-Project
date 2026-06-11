import { NextResponse } from "next/server";
import { AvaliacaoController } from "@/controllers/avaliacao.controller";

const avaliacaoController = new AvaliacaoController();

// Função GET: Puxa as notas, calcula a média e conta o total
export async function GET(req: Request, { params }: { params: Promise<{ id_produto: string }> }) {
    try {
        const { id_produto } = await params; 
        const id = Number(id_produto);

        const avaliacoes = await avaliacaoController.buscarAvaliacoesPorProduto(id);

        // Se ninguém avaliou ainda, a média e o total são 0
        if (avaliacoes.length === 0) {
            return NextResponse.json({ media: 0, total: 0 });
        }

        // Soma todas as notas e divide pela quantidade de avaliações
        const soma = avaliacoes.reduce((acc: number, curr: any) => acc + curr.nota, 0);
        const media = Math.round(soma / avaliacoes.length);

        // Devolve a média E o total de avaliações!
        return NextResponse.json({ media, total: avaliacoes.length });
    } catch (error) {
        console.error("Erro ao buscar média:", error);
        return NextResponse.json({ error: "Erro ao calcular média" }, { status: 500 });
    }
}