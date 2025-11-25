const conexao = require('../config/db');
const { cadastrarProduto } = require('../controllers/controllerProduto');

const modelProduto = {

    cadastrarProduto: async (nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual) => {
        try {
            const [resultado] = await conexao.query("INSERT INTO produtos (nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual) values(?,?,?,?,?,?,?,?)",
                [nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual])
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    listarProdutos: async () => {
        try {
           const [produto]= await  conexao.query(
            "SELECT id, nome, preco, estoque_minimo, estoque_atual FROM produtos ORDER BY nome asc")
            return produto;
        }
        catch (erro) {
            return erro
        }
    },

    listarProdutoID: async (id) => {
        try {
            const [resultado] = await conexao.query(
                `SELECTnome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual FROM produtos WHERE id = ?`,
                [id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

     listarProdutoNome: async (nome) => {        
        try {
            const resultado = await conexao.query(
                `SELECT id, nome, preco, estoque_atual FROM produtos WHERE nome LIKE ?`,
                [`%${nome}%`]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    atualizarProduto: async (nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual, id) => {
        try {
            const [resultado] = await conexao.query(
                `UPDATE produtos SET nome = ?, NCM = ?, peso = ?, fardo = ?, preco = ?, codigo = ?, estoque_minimo = ?, estoque_atual = ?  
                 WHERE id = ?`,
                [nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual, id]);
            return resultado;
        }
        catch (erro) {
            return erro
        }
    },

    deletar: async (id) => {

        console.log(id);
        try {
           const [resultado] = await conexao.query('DELETE FROM produtos WHERE id = ?', [id]);
           return resultado
        }
        catch (erro) {
            console.log(erro);
            return erro
        }
    },
};

module.exports = modelProduto;

