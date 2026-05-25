import Produto from "@/models/produto.model";

export class ProdutoController {
    async cadastrarProduto(data: any) {
        const produto = await Produto.create({
            nome: data.nome,
            descricao: data.descricao,
            preco: data.preco,
            qtd_estoque: data.qtd_estoque,
            avaliacao: 0,
            img_url: data.img_url ?? null,
        });

        return produto;
    }

    async findAllProdutos() {
        return await Produto.findAll();
    }

    async findById(id: string) {
        return await Produto.findByPk(id);
    }

    // Editar produto

    // Excluir produto
}
