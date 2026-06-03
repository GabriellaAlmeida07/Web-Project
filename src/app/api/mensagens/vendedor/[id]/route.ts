import { MensagemController } from "@/controllers/mensagem.controller";

export const runtime = "nodejs";

const controller = new MensagemController();

type Params = {
    params: Promise<{ id: number }>;
};

// GET mensagens por cliente
export async function GET(req: Request, { params }: Params) {
    try {
        const { id } = await params;

        const mensagens =
            await controller.findAllMsgsCliente(id);

        return Response.json(mensagens);
    } catch (error) {
        return Response.json(
            { error: String(error) },
            { status: 500 }
        );
    }
}