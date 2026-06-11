import { DataTypes } from 'sequelize';
import { sequelize } from './dbconfig'; 
export const Avaliacao = sequelize.define('Avaliacao', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_produto: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }
}, {
    tableName: 'Avaliacoes',
    timestamps: true 
});