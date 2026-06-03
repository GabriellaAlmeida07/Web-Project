import { ProdutoController } from "@/controllers/produto.controller";

export const runtime = "nodejs";

const controller = new ProdutoController();

type Params = {
    params: Promise<{ id: number }>;
};

// Pega produto por id
export async function GET(req: Request, { params }: Params) {
    try {
        const { id } = await params;

        const produto = await controller.findById(id);

        return Response.json(produto, {
            status: 200,
        });
    } catch (error) {
        return Response.json(
            {
                error: String(error),
            },
            {
                status: 500,
            }
        );
    }
}

// Essa rota é chamada na página HomeVendedor (/) ao clicar no botão de editar
export async function PUT(req: Request, { params }: Params) {
    try {
        const { id } = await params;
        const body = await req.json(); // Pega os dados enviados pelo formulário do front-end

        const resultado = await controller.update(id, body);

        return Response.json(resultado, { status: 200 });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}

// Essa rota é chamada na página HomeVendedor (/) ao clicar no botão de excluir
export async function DELETE(req: Request, { params }: Params) {
    try {
        const { id } = await params;

        const resultado = await controller.delete(id);

        return Response.json(resultado, { status: 200 });
    } catch (error) {
        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Erro interno do servidor",
            },
            { status: 400 }
        );
    }
}
