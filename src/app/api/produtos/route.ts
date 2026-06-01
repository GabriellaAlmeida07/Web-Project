import { ProdutoController } from "@/controllers/produto.controller";
import cloudinary from "@/cloudinary/config"; // Importação do Cloudinary 
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const controller = new ProdutoController();

export async function POST(req: Request) {
    try {
        // Em vez de ler JSON, agora lê FormData (para suportar o arquivo de imagem)
        const formData = await req.formData();
        const file = formData.get("img") as File | null;
        let imgUrl = ""; // Se a imagem for opcional, começa vazio

        // Se enviaram uma imagem, fazemos o upload no Cloudinary
        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadResult = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "produtos-devweb" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    },
                );
                uploadStream.end(buffer);
            });

            imgUrl = uploadResult.secure_url; // Pega a URL gerada
        }

        // Montamos o objeto (body) extraindo os dados do FormData
        // Como o FormData envia tudo como texto, converte os números (parseFloat/parseInt)
        const produtoData = {
            nome: formData.get("nome") as string,
            descricao: formData.get("descricao") as string,
            preco: parseFloat(formData.get("preco") as string) || 0,
            qtd_estoque: parseInt(formData.get("qtd_estoque") as string) || 0,
            avaliacao: parseInt(formData.get("avaliacao") as string) || 0,
            img_url: imgUrl, // Adiciona a URL pronta para ir pro banco
        };

        const produto = await controller.cadastrarProduto(produtoData);

        return NextResponse.json(
            {
                message: "Produto criado com sucesso!",
                produto,
            },
            { status: 201 },
        );
    } catch (error) {
        console.error("Erro no cadastro:", error);
        return NextResponse.json(
            { message: "Erro ao criar produto", error: String(error) },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const produtos = await controller.findAllProdutos();

        return NextResponse.json(produtos);
    } catch (error) {
        return NextResponse.json(
            {
                message: "Erro ao buscar produtos",
                error: String(error),
            },
            { status: 500 },
        );
    }
}

export async function PUT(req: Request, { params }: any) {
    try {
        const { id } = await params;
        const body = await req.json();

        // Repassamos o 'body' (que contém o novo nome, preço, etc.) para o controller
        const resultado = await controller.update(id, body);

        return Response.json(resultado, { status: 200 });
    } catch (error) {
        return Response.json({ error: String(error) }, { status: 500 });
    }
}
