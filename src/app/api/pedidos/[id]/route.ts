import { PedidoController } from "@/controllers/pedido.controller";

export const runtime = "nodejs";
const controller = new PedidoController();

type Params = {
    params: Promise<{ id: number }>;
};

// Editar pedido ou marcar como entregue - PUT
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

// Excluir Pedido - DELETE
export async function DELETE(req: Request, { params }: Params) {
    try {
        const { id } = await params;

        const resultado = await controller.delete(id);

        return Response.json(resultado, { status: 200 });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
