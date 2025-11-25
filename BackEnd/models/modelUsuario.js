const conexao = require('../config/db');

const modelUsuario = {

    validarLogin: async (usuario, senha) => {
        try {
            const [result] = await conexao.query(
                "SELECT id, nome, email, senha FROM usuario WHERE email = ? AND senha = ?",
                [usuario, senha]
            );
            return result;
        } catch (erro) {
            return erro;
        }
    },
    cadastrarUsuario: async (nome, email, senha, cpf, telefone) => {
        try {
            const [resultado] = await conexao.query("INSERT INTO usuario (nome, email, senha, cpf, telefone) values(?,?,?,?,?)",
                [nome, email, senha, cpf, telefone])
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },
};

module.exports = modelUsuario;

