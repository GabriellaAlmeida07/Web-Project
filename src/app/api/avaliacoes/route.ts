import { NextResponse } from "next/server";
import { AvaliacaoController } from "@/controllers/avaliacao.controller";

const avaliacaoController = new AvaliacaoController();

// Função POST: Recebe os dados novos do site e salva no banco
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id_produto, id_cliente, nota } = body;

        if (!id_produto || !id_cliente || !nota) {
            return NextResponse.json({ error: "Faltando informações da avaliação" }, { status: 400 });
        }

        const novaAvaliacao = await avaliacaoController.cadastrarAvaliacao({
            id_produto,
            id_cliente,
            nota
        });

        return NextResponse.json({ message: "Avaliação salva!", avaliacao: novaAvaliacao }, { status: 201 });
        
    } catch (error) {
        console.error("Erro na API de avaliação:", error);
        return NextResponse.json({ error: "Erro interno ao salvar a avaliação" }, { status: 500 });
    }
}