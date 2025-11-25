import { data, Link, useNavigate } from 'react-router-dom';
import ListarProduto from './ListarProduto';
import { useState, useEffect } from "react";

const CadastrarProduto = () => {

    const navegar = useNavigate();
    useEffect(() => {
        const logado = localStorage.getItem("autenticado") === "true";
        if (!logado) navegar("/login", { replace: true });
    }, [navegar]);

    const [nome, setNome] = useState('');
    const [NCM, setNCM] = useState('');
    const [peso, setPeso] = useState('');
    const [fardo, setFardo] = useState('');
    const [preco, setPreco] = useState('');
    const [codigo, setCodigo] = useState('');
    const [estoqueminimo, setEstoqueMinimo] = useState('');
    const [estoqueatual, setEstoqueAtual] = useState('');
   
    const handleSubmit = (e) => {
        e.preventDefault();

        const novoProduto = {
            nome,
            NCM,
            peso,
            fardo,
            preco: parseFloat(preco),
            codigo,
            estoqueminimo: parseInt(estoqueminimo),
            estoqueatual: parseInt(estoqueatual)
                        
        };
        console.log("Novo Produto a ser cadastrado:", novoProduto);

        fetch('http://localhost:3001/cadastrarprodutos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto)
        })
            .then(response => response.json())
            .then(data => {
                alert('Produto cadastrado com sucesso!');

            })
            .catch(error => {
                console.error('Erro ao cadastrar produto:', error);
                alert('Erro ao cadastrar produto.');
            });

    };

    return (
        <div>
            <main className="container mt-4">
                <Link to="/home" className="btn btn-secondary mb-3">
                    &larr; Voltar para a Home
                </Link>
                <div className="card">
                    <div className="card-header">
                        <h2>Cadastro de Produto</h2>
                    </div>
                    <div className='container mt-2'>

                        <form onSubmit={handleSubmit} className="row g-3">

                            <div className="col-md-6">
                                <label htmlFor="nome" className="form-label">Nome</label>
                                <input
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="nome"
                                    name="nome"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="NCM" className="form-label">NCM</label>
                                <input
                                    value={NCM}
                                    onChange={(e) => setNCM(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    id="NCM"
                                    name="NCM"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="Peso" className="form-label">Peso</label>
                                <input
                                    value={peso}
                                    onChange={(e) => setPeso(e.target.value)}
                                    type="number"
                                    step="0.01"
                                    className="form-control"
                                    id="peso"
                                    name="peso"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="Fardo" className="form-label">Fardo</label>
                                <input
                                    value={fardo}
                                    onChange={(e) => setFardo(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="fardo"
                                    name="fardo"
                                    maxLength="3"
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="preco" className="form-label">Preço</label>
                                <input
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    id="Preço"
                                    name="Preço"
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="codigo" className="form-label">Codigo </label>
                                <input
                                    value={codigo}
                                    onChange={(e) => setCodigo(e.target.value)}
                                    type="number"
                                    className="form-control"
                                    id="codigo"
                                    name="codigo"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="estoque_minimo" className="form-label">Estoque Minimo</label>
                                <input
                                    value={estoqueminimo}
                                    onChange={(e) => setEstoqueMinimo(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="estoque_minimo"
                                    name="estoque_minimo"
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="estoque_atual" className="form-label">Estoque Atual</label>
                                <input
                                    value={estoqueatual}
                                    onChange={(e) => setEstoqueAtual(e.target.value)}
                                    type="text"
                                    className="form-control"
                                    id="estoque_atual"
                                    name="estoque_atual"
                                />
                            </div>

                            <div className="col-12 mt-4 mb-4">
                                <button type="submit" className="btn btn-primary">Cadastrar Produto</button>
                            </div>
                        </form>
                    </div>

                    <div className="card-body">
                        <hr className="my-4" />
                        <ListarProduto />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CadastrarProduto;