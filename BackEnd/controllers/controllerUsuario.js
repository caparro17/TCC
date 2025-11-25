const modelUsuario = require('../models/modelUsuario');

const controllerUsuario = {
    
    login: async (req, res) => {
        const { usuario, senha } = req.body;

        console.log(req.body);
        try {
            const resultado = await modelUsuario.validarLogin(usuario, senha);
            
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            }
            else {
                res.status(401).json({ msg: "Email ou senha inválidos" });
            }
        }
        catch (error) {
            res.status(500).json(error);
        }
    },
    cadastrarUsuario: async (req, res) => {
        const { nome, email, senha, cpf, telefone  } = req.body;

        try {
            const cadastro = await modelUsuario.cadastrarUsuario(nome, email, senha, cpf, telefone  );

            if (cadastro.affectedRows > 0) {
                res.status(201).json({ msg: "usuario cadastrado com sucesso" });
            }
            else {
                res.status(400).json({ msg: "Falha ao realizar o cadastro" });
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar cadastrar o usuario' });
            
        }
    }
};

module.exports = controllerUsuario;


