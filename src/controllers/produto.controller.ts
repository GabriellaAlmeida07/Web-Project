import { ItemPedido } from "@/models/pedido.model";
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

    async findById(id: number) {
        return await Produto.findByPk(id);
    }

    async update(id: number, dados: any) {
        const [linhasAfetadas] = await Produto.update(dados, {
            where: { id: Number(id) },
        });

        if (linhasAfetadas === 0) {
            throw new Error(
                "Produto não encontrado ou nenhum dado foi alterado",
            );
        }

        return { message: "Produto atualizado com sucesso!" };
    }

    async delete(id: number) {
        // Verifica se há algum pedido que possui aquele item/produto
        const existePedido = await ItemPedido.findOne({
            where: {
                id_produto: Number(id),
            },
        });
        
        if (existePedido) {
            throw new Error(
                "Não é possível excluir um produto que possui pedidos."
            );
        }

        const linhasDeletadas = await Produto.destroy({
            where: { id: Number(id) },
        });

        if (linhasDeletadas === 0) {
            throw new Error("Produto não encontrado.");
        }

        return { message: "Produto excluído com sucesso!" };
    }
}
