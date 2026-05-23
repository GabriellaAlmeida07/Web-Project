import { Model, DataTypes } from "sequelize";
import { sequelize } from "./dbconfig";

class Produto extends Model {}

Produto.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        descricao: { type: DataTypes.STRING },
        preco: { type: DataTypes.FLOAT },
        qtd_estoque: { type: DataTypes.INTEGER },
        avaliacao: { type: DataTypes.INTEGER },
        img_url: { type: DataTypes.STRING }
    },
    { sequelize: sequelize, timestamps: false }
);

export default Produto;
