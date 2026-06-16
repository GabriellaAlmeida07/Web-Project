import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { MensagemController } from "@/controllers/mensagem.controller";

const secret = process.env.AUTH_SECRET as string;

const controller = new MensagemController();

export async function POST(req: Request) {
    try {
        const body = await req.json();

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

        // id do usuário vem do token e é passado no corpo da requisição para o controller
        const msg = await controller.cadastrarMsg({
            id_remetente: decoded.sub,
            id_cliente:
                decoded.tipo === "cliente" ? decoded.sub : body.id_cliente,
            conteudo: body.conteudo,
            tipo_remetente: body.tipo_remetente,
            data_envio: Date.now().toString(),
        });

        return Response.json(msg, {
            status: 201,
        });
    } catch (error) {
        console.error("ERRO AO CADASTRAR MSG:", error);
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
