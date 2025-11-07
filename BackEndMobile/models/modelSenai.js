const { query } = require('../config/db');
const executeQuery = require('../services/query');

const modelSenai = {

    //Registrar
    cadastrar: async (nome, NCM, peso, fardo, preco) => {
        try {
            return await executeQuery(`INSERT INTO produtos (nome, NCM, peso, fardo, preco) values (?,?,?,?,?)`, [nome, NCM, peso, fardo, preco])
        } catch (error) {
            throw error
        }
    }
}

    
module.exports = modelSenai;
