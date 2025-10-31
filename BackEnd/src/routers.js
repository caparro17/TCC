const express = require('express');
const connection = require('./db');
const bcrypt = require('bcrypt');
const salt = 10; 
const routers = express.Router();

    routers.get('/', (req,res)=>{
        res.status(200).json({msg:"Bem - Vindo(a) a API"})
    });

    //rota para cadastratar prdutos
    routers.post('/produtos', async(req, res)=>{
        const{id,nome,NCM,peso,fardo,preco} = req.body;
        console.log(req.body);

        const password = await bcrypt.hash(senha,salt)
        console.log(password);

        try{
            //chamada da função para cadastrar um produto
            const cadastrar = connection.query("INSERT INTO produtos values(?,?,?,?,?,?)",[id,nome,NCM,peso,fardo,preco], (erro)=>{
                if (erro){
                    res.status(401).json({msg:"Erro ao cadastrar"})
                }
                else{
                    res.status(200).json({msg:"produto cadastrado com sucesso!!!"});
                }
            })
    
            
        }
        catch(erro){
            console.log(erro)
        }
    });

    module.exports = routers;