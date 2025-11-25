const express = require("express");
const controllerRaiz = require('../controllers/controllerRoot');
const routers = express.Router();

routers.get('/', controllerRaiz.raiz)

module.exports = routers;