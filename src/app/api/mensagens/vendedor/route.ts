import { MensagemController } from "@/controllers/mensagem.controller";

const controller = new MensagemController();

export async function GET() {
    try {
        const clientes = await controller.findClientesComMensagens();

        return Response.json(clientes);
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: String(error) },
            { status: 500 }
        );
    }
}