import { sequelize } from "./dbconfig";

// Chame essa função apenas para alterar uma tabela
// Use quando:
// ainda está mudando os models (colunas/tabelas)
// e quer que o Sequelize crie ou atualize tabelas automaticamente
// não use para inserção de dados, deleção de dados... (coisas simples)
// DEPOIS de usar, APAGUE a chamada para essa função

export async function initDb() {
    await sequelize.sync({ alter: true });
}