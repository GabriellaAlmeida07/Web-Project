import { sequelize } from "./dbconfig";

// Chame essa função apenas para alterar uma tabela
// Use quando:
// ainda está mudando os models (colunas/tabelas)
// e quer que o Sequelize crie ou atualize tabelas automaticamente
// não use para inserção de dados, deleção de dados... (coisas simples)

export async function initDb() {
    await sequelize.sync({ alter: true });
}