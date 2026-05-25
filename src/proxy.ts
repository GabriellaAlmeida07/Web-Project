import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.AUTH_SECRET as string;

// Rotas públicas
const publicRoutes = ["/Login", "/Cadastro"];

// Rotas do cliente
const clienteRoutes = ["/HomeCliente", "/PedidosCliente"];

// Rotas do vendedor
const vendedorRoutes = [
    "/HomeVendedor",
    "/CadastroProduto",
    "/EdicaoProduto",
    "/PedidosVendedor",
    "/MsgsVendedor",
    "/"
];

export function proxy(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    const url = request.nextUrl.clone();
    const path = request.nextUrl.pathname;

    const isPublicRoute = publicRoutes.includes(path);
    const isClienteRoute = clienteRoutes.includes(path);
    const isVendedorRoute = vendedorRoutes.includes(path);

    // Não logado
    if (!token) {
        if (isPublicRoute) {
            return NextResponse.next();
        }

        url.pathname = "/Login";
        return NextResponse.redirect(url);
    }

    try {
        // Decodifica token
        const decoded = jwt.verify(token, secret) as JwtPayload & {
            sub: number;
            tipo: string;
        };

        const isCliente = decoded.tipo === "cliente";
        const isVendedor = decoded.tipo === "vendedor";

        // Já está logado e tentou acessar login/cadastro
        if (isPublicRoute) {
            if (isCliente) {
                url.pathname = "/HomeCliente";
            }

            if (isVendedor) {
                url.pathname = "/HomeVendedor";
            }

            return NextResponse.redirect(url);
        }

        // Cliente tentando acessar área vendedor
        if (isVendedorRoute && !isVendedor) {
            url.pathname = "/HomeCliente";
            return NextResponse.redirect(url);
        }

        // Vendedor tentando acessar área cliente
        if (isClienteRoute && !isCliente) {
            url.pathname = "/HomeVendedor";
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Token inválido:", error);

        url.pathname = "/Login";

        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: [
        "/Login",
        "/Cadastro",

        "/HomeCliente",
        "/PedidosCliente",

        "/HomeVendedor",
        "/CadastroProduto",
        "/PedidosVendedor",
        "/EdicaoProduto",
        "/MsgsVendedor",
        "/"
    ],
};