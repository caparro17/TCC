const express = require('express');
const controllerSenai = require('../controllers/controllerSenai');
const routers = express.Router();

routers.post('/registrar', controllerSenai.cadastrarProduto);
routers.get('/listar', controllerSenai.listarSenai);
routers.put('/editarColaborador/:id', controllerSenai.atualizar);
routers.delete('/excluirColaborador/:id', controllerSenai.deletar)

module.exports = routers;