import { Sequelize } from "sequelize";
import pg from "pg";

// Evita tentar sincronizar mais de uma vez (evita sobrecarga)
 
declare global {
    var sequelizeGlobal: Sequelize | undefined;
}

export const sequelize =
    global.sequelizeGlobal ??
    new Sequelize(process.env.DATABASE_URL!, {
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

if (process.env.NODE_ENV !== "production") {
    global.sequelizeGlobal = sequelize;
}