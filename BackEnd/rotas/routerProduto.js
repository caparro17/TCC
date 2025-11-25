const express = require("express");
const controllerProduto = require('../controllers/controllerProduto');
const routers = express.Router();

routers.post("/cadastrarprodutos", controllerProduto.cadastrarProduto);
routers.get("/listarprodutos", controllerProduto.listarProduto);
routers.put("/atualizarproduto/:id", controllerProduto.atualizarProduto);
routers.delete("/deletarproduto/:id", controllerProduto.deletarProduto);
routers.get("/listarproduto/:id", controllerProduto.listarProdutoID);
routers.get("/listarprodutonome", controllerProduto.listarProdutoNome);

module.exports = routers;