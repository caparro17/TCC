require('dotenv').config();
const express = require("express");
const cors = require("cors");
const verificarConexao = require("../services/conexao");
const Router = require("../rotas/routers")

const app = express();
const port = process.env.PORT || 3002;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(Router);

const inicio = async () => {
  try {
    await verificarConexao(); 
    app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor rodando na URL: http://localhost:${port}`);
    });
  } catch (erro) {
    console.error("Não foi possível iniciar o servidor devido a falha na conexão.");
  }
};

inicio();

