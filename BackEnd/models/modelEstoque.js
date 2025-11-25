const conexao = require('../config/db');

const modelEstoque = {
    registrarEstoque: async (id, quantidade, tipo, dataMovimento, idUsuario) => {

        try {
            const resultado = await conexao.query(
                `INSERT INTO movimentacao_estoque (produtos_id, tipo, quantidade, data, usuario_id) 
                VALUES (?, ?, ?, ?, ?)`,
                [id, tipo, quantidade, dataMovimento, idUsuario]
            );
            return resultado;
        } catch (erro) {
            console.log(erro);
            return erro;
        }
    },

    consultarEstoque: async (id) => {
        try {
            const [resultado] = await conexao.query(
                "SELECT id, estoque_minimo, estoque_atual FROM produtos WHERE id = ?",
                [id]
            );
            return resultado;
        } catch (erro) {
            return erro;
        }
    },

    atualizarEstoque: async (id, estoque) => {
        try {
            const [resultado] = await conexao.query(
                "UPDATE produtos SET estoque_atual = ? WHERE id = ?",
                [estoque,id]
            );

            return resultado;
        } catch (erro) {
            return erro;
        }
    }
};

module.exports = modelEstoque;