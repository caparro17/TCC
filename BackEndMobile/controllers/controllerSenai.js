const modelSenai = require('../models/modelSenai');

const controllerSenai = {

    //Controller para registrar 
    registrarColaborador: async (req, res) => {
        const { nome, NCM, peso, fardo, preco } = req.body;

        try {
            const resultado = await modelSenai.cadastrar(nome, NCM, peso, fardo, preco);
            if (resultado.affectedRows > 0) {
                res.status(201).json({ msg: "produto cadastrado com sucesso" });
            }
            else {
                res.status(400).json({ msg: "Falha ao realizar o cadastro" });
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar cadastrar' });
            console.log(erro);
            
        }
    },

    //Controller para listar
    listarSenai: async (req, res) => {
        try {
            const tenis = await modelSenai.listar();
            res.status(200).json(tenis);
        }
        catch (erro) {
            res.status(500).json({ error: "Erro ao obter a lista de colaboradores" });
        }
    },

    //Controller para atualizar
    atualizar: async (req, res) => {
        const { nome, marca, numero, tipo } = req.body;

        try {
            const consulta = await modelSenai.listarPorID(req.params.id);

            if (consulta.length > 0) {
                await modelSenai.atualizar(nome, marca, numero, tipo, req.params.id);
                res.status(200).json({ msg: "Dados atualizados com sucesso!!!" });
            }
            else {
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (erro) {
            console.log(erro)
            res.status(500).json({ error: 'Erro ao tentar atualizar' });
        }
    },

    //Controller para deletar
    deletar: async (req, res) => {
        try {

            const consulta = await modelSenai.listarPorID(req.params.id)

            if (consulta.length > 0) {

                const resultado = await modelSenai.deletar(req.params.id);

                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    res.status(404).json({ msg: "Erro ao deletar o tenis" })
                    console.log(erro)
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },
};

module.exports = controllerSenai;