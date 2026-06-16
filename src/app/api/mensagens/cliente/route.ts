import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { MensagemController } from "@/controllers/mensagem.controller";

const secret = process.env.AUTH_SECRET as string;
const controller = new MensagemController();

export async function GET() {
    try {
        // Pega cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        if (!token) {
            return Response.json({ error: "Não autenticado" }, { status: 401 });
        }

        // Decodifica token
        const decoded = jwt.verify(token, secret) as unknown as {
            sub: number;
            tipo: string;
        };

        const mensagens = await controller.findAllMsgsCliente(
            decoded.sub
        );

        return Response.json(mensagens);
    } catch (error) {
        return Response.json(
            { error: String(error) },
            { status: 500 }
        );
    }
}