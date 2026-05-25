import { ProdutoController } from "@/controllers/produto.controller";

export const runtime = "nodejs";

const controller = new ProdutoController();

type Params = {
    params: Promise<{ id: string }>;
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

// Chame essa rota na página HomeCliente ao clicar no botão de editar
// export async function PUT() {
//     try {
        // Fução do controller
//         controller.suaFuncaoDeEdicaoDoProduto();
//     } catch (error) {

//     }
// }

// Chame essa rota na página HomeCliente ao clicar no botão de excluir
// export async function DELETE() {
//     try {
        // Fução do controller
//         controller.suaFuncaoDeDelecaoDoProduto();
//     } catch (error) {

//     }
// }
