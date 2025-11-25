const modelProduto = require('../models/modelProduto');

const controllerProduto = {

    //Controller para cadastrar produtos
    cadastrarProduto: async (req, res) => {
        const { nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual  } = req.body;

        console.log(req.body);

        try {
            const cadastro = await modelProduto.cadastrarProduto(nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual);

            console.log(cadastro);
            
            if (cadastro.affectedRows > 0) {
                res.status(201).json({ msg: "Produto cadastrado com sucesso" });
            }
            else {
                res.status(400).json({ msg: "Falha ao realizar o cadastro" });
            }
        }
        catch (erro) {
            res.status(500).json({ error: 'Erro ao tentar cadastrar o produto' });
        }
    },

    //Controller para listar produtos
    listarProduto: async (req, res) => {
        try {
            const produtos = await modelProduto.listarProdutos();

            res.status(200).json(produtos);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Erro ao buscar produtos' });
        }
    },

    //Listar produtos por ID
    listarProdutoID: async (req, res) => {
        try {
            const [produtos] = await modelProduto.listarProdutoID(req.params.id);

            console.log(produtos);

            res.status(200).json(produtos);
        } catch (erro) {
            res.status(500).json({ success: false, message: 'Erro ao buscar produtos' });
        }
    },

    listarProdutoNome: async(req,res)=>{
         try {
            const [produtos] = await modelProduto.listarProdutoNome(req.query.nome);

            res.status(200).json(produtos);
        } catch (erro) {
            res.status(500).json({ success: false, message: 'Erro ao buscar produtos' });
        }
    },

    //Controller para atualizar um produto
    atualizarProduto: async (req, res) => {
        const { nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual } = req.body;

        try {
            const consulta = await modelProduto.listarProdutoID(req.params.id);

            if (consulta.length > 0) {

                const atualizar = await modelProduto.atualizarProduto(nome, NCM, peso, fardo, preco, codigo, estoque_minimo, estoque_atual, req.params.id);

                if(atualizar){
                      res.status(200).json({ msg: "Produto atualizado com sucesso!!!" });
                }
                else{
                    res.status(401).json({msg:"Falha ao atualizar o produto"});
                }              
            }
            else {
                res.status(404).json({ msg: `O ID ${req.params.id} não existe na base de dados` })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar atualizar o produto'});
        }
    },

    deletarProduto: async (req, res) => {
        try {

            const consulta = await modelProduto.listarProdutoID(req.params.id);

            if (consulta.length > 0) {

                const resultado = await modelProduto.deletar(req.params.id);

                if (resultado.affectedRows > 0) {
                    res.status(204).end()
                }
                else {
                    res.status(404).json({ msg: "Erro ao deletar o produto" })
                }
            }
            else {
                res.status(404).json({ msg: "O ID não existe na base de dados" })
            }
        }
        catch (error) {
            res.status(500).json({ error: 'Erro ao tentar deletar' });
        }
    },
};

module.exports = controllerProduto;


