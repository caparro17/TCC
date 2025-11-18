const client = require('../config/db');

const verificarConexao = async () => {
  try {
    await client.query("SELECT 1");
    console.log("Conexão com o banco de dados está ativa");
  } catch (erro) {
    console.error("Erro na conexão com o banco de dados:\n", erro);
    throw erro;
  }
};

module.exports = verificarConexao;
