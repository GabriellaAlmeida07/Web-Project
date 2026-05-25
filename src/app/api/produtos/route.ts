import { ProdutoController } from "@/controllers/produto.controller";

export const runtime = "nodejs";

const controller = new ProdutoController();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const produto = await controller.cadastrarProduto(body);

        return Response.json(
            {
                message: "Produto criado com sucesso!",
                produto,
            },
            { status: 201 }
        );
    } catch (error) {
        return Response.json(
            { message: "Erro ao criar produto", error: String(error) },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const produtos = await controller.findAllProdutos();

        return Response.json(produtos);
    } catch (error) {
        return Response.json(
            {
                message: "Erro ao buscar produtos",
                error: String(error),
            },
            { status: 500 }
        );
    }
}
