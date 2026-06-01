import { PedidoProps } from "@/entities/entities";
import { sequelize } from "@/models/dbconfig";
import { ItemPedido, Pedido } from "@/models/pedido.model";
import Produto from "@/models/produto.model";
import Usuario from "@/models/usuario.model";

export class PedidoController {
    async cadastrarPedido(data: PedidoProps) {
        const t = await sequelize.transaction();
        // Executado com transation para evitar problemas de integridade
        try {
            const pedido = await Pedido.create(
                {
                    data_registro: data.data_registro,
                    endereco_entrega: data.endereco_entrega,
                    valor_total: data.valor_total,
                    entregue: data.entregue,
                    id_cliente: data.id_cliente,
                },
                { transaction: t },
            );

            for (const item of data.itens) {
                const produto = await Produto.findByPk(item.id_produto, {
                    transaction: t,
                });

                if (!produto) throw new Error("Produto não encontrado");

                if (produto.dataValues.qtd_estoque < item.qtd) {
                    throw new Error("Estoque insuficiente");
                }

                await ItemPedido.create(
                    {
                        qtd: item.qtd,
                        preco_unitario: item.preco_unitario,
                        id_pedido: pedido.dataValues.id,
                        id_produto: item.id_produto,
                    },
                    { transaction: t },
                );

                await Produto.decrement(
                    { qtd_estoque: item.qtd },
                    {
                        where: { id: item.id_produto },
                        transaction: t,
                    },
                );
            }

            await t.commit();
            return pedido;
        } catch (err) {
            await t.rollback();
            throw err;
        }
    }

    // Usado na página PedidosVendedor
    async findAllPedidos() {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Produto,
                    as: "itens",

                    through: {
                        attributes: ["qtd", "preco_unitario"],
                    },
                },

                {
                    model: Usuario,

                    attributes: ["id", "nome", "celular", "email"],
                },
            ],
        });

        return pedidos.map((pedido: any) => ({
            ...pedido.toJSON(),

            itens: pedido.itens.map((prod: any) => ({
                ...prod.toJSON(),

                qtd: prod.ItemPedido.qtd,
                preco_unitario: prod.ItemPedido.preco_unitario,
            })),
        }));
    }

    // Usado na página PedidosCliente
    async findPedidosCliente(id: string) {
        const pedidos = await Pedido.findAll({
            where: {
                id_cliente: id,
            },

            include: [
                {
                    model: Produto,
                    as: "itens",

                    through: {
                        attributes: ["qtd", "preco_unitario"],
                    },
                },
            ],
        });

        return pedidos.map((pedido: any) => ({
            ...pedido.toJSON(),

            itens: pedido.itens.map((prod: any) => ({
                ...prod.toJSON(),

                qtd: prod.ItemPedido.qtd,
                preco_unitario: prod.ItemPedido.preco_unitario,
            })),
        }));
    }

    async update(id: string, dados: any) {
        const [linhasAfetadas] = await Pedido.update(dados, {
            where: { id: Number(id) },
        });

        return { message: "Pedido atualizado com sucesso!" };
    }

    async delete(id: string) {
        const linhasDeletadas = await Pedido.destroy({
            where: { id: Number(id) },
        });

        if (linhasDeletadas === 0) {
            throw new Error("Pedido não encontrado.");
        }

        return { message: "Pedido excluído com sucesso!" };
    }
}
