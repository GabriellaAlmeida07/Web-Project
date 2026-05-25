import { UsuarioController } from "@/controllers/usuario.controller";

export const runtime = "nodejs";

const controller = new UsuarioController();

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const result = await controller.login(body);

        const response = Response.json(result, {
            status: 200,
        });

        // Salva cookie no navegador
        response.headers.append(
            "Set-Cookie",
            `token=${
                result.token
            }; Path=/; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 30}`
        );

        return response;
    } catch (error) {
        return Response.json(
            {
                error: String(error),
            },
            {
                status: 401,
            }
        );
    }
}
