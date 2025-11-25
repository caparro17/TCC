const express = require("express");
const controllerEstoque = require('../controllers/controllerEstoque');
const routers = express.Router();

routers.post("/movimentacao", controllerEstoque.registrarMovimentacao);

module.exports = routers;