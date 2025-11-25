const modelMovimentacao = require('../models/modelEstoque');

const controllerMovimentacao = {

    registrarMovimentacao: async (req, res) => {
        const { id, estoque, tipo, dataMovimento, idUsuario } = req.body;
        
        try {
            const produto = await modelMovimentacao.consultarEstoque(id);

            if (!produto) {
                return res.status(404).json({ msg: "Estoque não encontrado" });
            }
            else {
                const atualizarEstoque = await modelMovimentacao.atualizarEstoque(id, estoque);
                const registrarMovimentacao = await modelMovimentacao.registrarEstoque(id, estoque, tipo, dataMovimento, idUsuario);

                if(atualizarEstoque && registrarMovimentacao){
                    return res.status(201).json({ msg: "Movimentação registrada com sucesso" })
                }   
                else{
                    return res.status(500).json({ msg: "Erro ao atualizar estoque ou registrar movimentação" });
                }              
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Erro no servidor", error });
        }
    }
};

module.exports = controllerMovimentacao;