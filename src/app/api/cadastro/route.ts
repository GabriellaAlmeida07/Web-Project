import { UsuarioController } from "@/controllers/usuario.controller";

export const runtime = "nodejs";

const controller = new UsuarioController();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await controller.cadastrarUsuario(body);

        return Response.json(
            {
                message: "Usuário criado com sucesso",
                ...result,
            },
            {
                status: 201,
            }
        );
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
