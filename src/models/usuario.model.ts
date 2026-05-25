import { Model, DataTypes } from "sequelize";
import { sequelize } from "./dbconfig";

class Usuario extends Model {}

Usuario.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        nome: { type: DataTypes.STRING, allowNull: false },
        cpf: { type: DataTypes.STRING },
        celular: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, allowNull: false, unique: true }, // Não permite duplicação de email no BD
        senha_hash: { type: DataTypes.STRING, allowNull: false },
        tipo: { type: DataTypes.STRING, allowNull: false },
    },
    { sequelize: sequelize, timestamps: false }
);

export default Usuario;