import { Model, DataTypes } from "sequelize";
import { sequelize } from "./dbconfig";
import Usuario from "./usuario.model";
import Produto from "./produto.model";

class Pedido extends Model {}

Pedido.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        data_registro: { type: DataTypes.STRING },
        endereco_entrega: { type: DataTypes.STRING },
        valor_total: { type: DataTypes.FLOAT },
        entregue: { type: DataTypes.BOOLEAN },
    },
    { sequelize: sequelize, timestamps: false }
);

// Um pedido pertence a um usuário
Pedido.belongsTo(Usuario, {
    foreignKey: "id_cliente", // FK será chamada de id_cliente
});

// Um usuário pode ter vários pedidos
Usuario.hasMany(Pedido, {
    foreignKey: "id_cliente", // FK será chamada de id_cliente
});

class ItemPedido extends Model {}

ItemPedido.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        qtd: { type: DataTypes.INTEGER, allowNull: false },
        // Para saber o quanto o cliente pagou no momento da compra,
        // pois o preço de um produto pode vir a ser alterado
        preco_unitario: { type: DataTypes.FLOAT, allowNull: false },
    },
    { sequelize: sequelize, timestamps: false }
);

// Relacionamento N:N entre Pedido e Produto usando ItemPedido
Pedido.belongsToMany(Produto, {
    through: ItemPedido,
    foreignKey: "id_pedido",
    as: "itens"
});

Produto.belongsToMany(Pedido, {
    through: ItemPedido,
    foreignKey: "id_produto",
});

export { Pedido, ItemPedido };
