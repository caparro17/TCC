const express = require("express");
const cors = require("cors");
const conexao = require("../config/db")
const routerUsuario = require("../rotas/routersUsuario");
const routerProduto = require('../rotas/routerProduto');
const routerEstoque = require('../rotas/routerEstoque');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use(routerUsuario);
app.use(routerProduto);
app.use(routerEstoque);

const verificarConexao = async () => {
  try {
    await conexao.query("SELECT 1");
    console.log("Conexão com o banco de dados está ativa");
    app.listen(port, () => {
      console.log(`Servidor rodando na url: http://localhost:${port}`);
    });
  } catch (erro) {
    console.log("Erro: Falha na conexão com o banco de dados \n" + erro);
  }
};

verificarConexao();


