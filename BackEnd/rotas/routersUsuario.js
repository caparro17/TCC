const express = require("express");
const controllerUsuario = require('../controllers/controllerUsuario');
const routers = express.Router();

routers.post('/login', controllerUsuario.login); 
routers.post('/cadastrarusuario', controllerUsuario.cadastrarUsuario); 

module.exports = routers;
