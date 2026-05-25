import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PedidoController } from "@/controllers/pedido.controller";

const secret = process.env.AUTH_SECRET as string;

const controller = new PedidoController();

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

        // id do cliente vem do token e é passado no corpo da requisição para o controller
        const pedido = await controller.cadastrarPedido({
            ...body,

            id_cliente: decoded.sub,
        });

        return Response.json(pedido, {
            status: 201,
        });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ error: "Não autenticado" }, { status: 401 });
        }

        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

        const idCliente = decoded.sub as string;
        const tipo = decoded.tipo;

        let pedidos;

        if (tipo === "vendedor") {
            // Vendedor vê todos os pedidos
            pedidos = await controller.findAllPedidos();
        } else {
            // Cliente vê apenas os dele
            pedidos = await controller.findPedidosCliente(idCliente);
        }

        return Response.json(pedidos);
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
