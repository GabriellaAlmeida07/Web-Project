import { Sequelize } from "sequelize";
import pg from "pg";

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialect: "postgres",
    dialectModule: pg,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false,
});