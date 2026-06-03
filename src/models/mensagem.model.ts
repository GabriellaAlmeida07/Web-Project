import { Model, DataTypes } from "sequelize";
import { sequelize } from "./dbconfig";
import Usuario from "./usuario.model";

class Mensagem extends Model {}

// Todos os usários do tipo vendedor poderão ver o chat com o cliente, mesmo
// que ele não tenha sido quem primeiramente interagiu.
// Todos os vendedores acessam o "mesmo" chat com os clientes, por isso, não
// é armazenado o destinatário.

Mensagem.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        id_remetente: { type: DataTypes.INTEGER, allowNull: false },
        id_cliente: { type: DataTypes.INTEGER, allowNull: false },
        tipo_remetente: { type: DataTypes.STRING, allowNull: false },
        conteudo: { type: DataTypes.STRING },
        data_envio: { type: DataTypes.STRING },
    },
    { sequelize: sequelize, tableName: "Mensagens", timestamps: false }
);

// Uma mensagem pertence a um usuário remetente
Mensagem.belongsTo(Usuario, {
    foreignKey: "id_remetente", // FK será chamada de id_remetente
    as: "remetente",
});

// Uma mensagem pertence a um usuário cliente
Mensagem.belongsTo(Usuario, {
    foreignKey: "id_cliente", // FK será chamada de id_cliente
    as: "cliente",
});

export default Mensagem;
