import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function EditarProduto() {
    const navegar = useNavigate();

    useEffect(() => {
        const logado = localStorage.getItem("autenticado") === "true";
        if (!logado) navegar("/login", { replace: true });
    }, [navegar]);

    const { id } = useParams()

    const [nome, setNome] = useState('');
    const [NCM, setNCM] = useState('');
    const [peso, setPeso] = useState('');
    const [fardo, setFardo] = useState('');
    const [preco, setPreco] = useState('');
    const [codigo, setCodigo] = useState('');
    const [estoqueminimo, setEstoqueMinimo] = useState('');
    const [estoqueatual, setEstoqueAtual] = useState('');

    useEffect(() => {
        async function getProduto() {
            try {
                let consulta = await fetch(`http://localhost:3001/listarproduto/${id}`)
                let dadosProduto = await consulta.json()

                console.log(dadosProduto);

                setNome(dadosProduto.nome);
                setNCM(dadosProduto.NCM);
                setPeso(dadosProduto.peso);
                setFardo(dadosProduto.fardo);
                setPreco(dadosProduto.preco);
                setCodigo(dadosProduto.codigo);
                setEstoqueMinimo(dadosProduto.estoqueMinimo);
                setEstoqueAtual(dadosProduto.estoqueAtual);

            } catch (erro) {
                alert(`Erro ao buscar dados do Produto ${id}: ${erro}`);
            }
        }
        getProduto();
    }, [id])

    async function editarProduto(event) {
        event.preventDefault();

        let produtoAtualizado = {
            nome,
            NCM,
            peso: parseFloat(peso),
            fardo,
            preco: parseFloat(preco),
            codigo,
            estoqueminimo: parseInt(estoqueminimo),
            estoqueatual: parseInt(estoqueatual)
        }

        const produtoJson = JSON.stringify(produtoAtualizado);

        try {
            let edicao = await fetch(`http://localhost:3001/atualizarproduto/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: produtoJson
            })

            if (edicao.ok) {
                alert(`Produto ID ${id} editado com sucesso!`);
                navegar('/home');
            } else {
                const erroMsg = await edicao.json();
                alert(`Erro ao editar Produto: ${erroMsg.message || edicao.statusText}`);
            }

        } catch (erro) {
            alert(`Erro de conexão ao editar Produto: ${erro}`);
        }
    }

    return (
        <>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Editar Produto (ID: {id})</h1>
                </div>

                <form onSubmit={editarProduto} className="row g-3">

                    <div className="col-md-6">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nome" name="nome" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="NCM" className="form-label">NCM</label>
                        <input value={NCM} onChange={(e) => setNCM(e.target.value)} type="number" step="0.01" className="form-control" id="NCM" name="NCM" required />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="Peso" className="form-label">Peso</label>
                        <input value={peso} onChange={(e) => setPeso(e.target.value)} type="number" step="0.01" className="form-control" id="Peso" name="Peso" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fardo" className="form-label">Fardo</label>
                        { <input value={fardo} onChange={(e) => setFardo(e.target.value)} type="text" className="form-control" id="fardo" name="fardo" maxLength="3" /> }
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="preco" className="form-label">Preço</label>
                        <input value={preco} onChange={(e) => setPreco(e.target.value)} type="number" className="form-control" id="preco" name="preco" required />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="codigo" className="form-label">Codigo</label>
                        <input value={codigo} onChange={(e) => setCodigo(e.target.value)} type="number" className="form-control" id="codigo" name="codigo" />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="estoqueMinimo" className="form-label">Estoque Minimo</label>
                        <input value={estoqueminimo} onChange={(e) => setEstoqueMinimo(e.target.value)} type="text" className="form-control" id="estoqueminimo" name="estoqueminimo" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="estoqueatual" className="form-label">Estoque Atual</label>
                        <input value={estoqueatual} onChange={(e) => setMarca(e.target.value)} type="text" className="form-control" id="estoqueatual" name="estoqueatual" />
                    </div>
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-success">Salvar Edição</button>
                        <Link to={`/home`} className="btn btn-danger ms-2">Cancelar</Link>
                    </div>
                </form>
            </main>
        </>
    )
}
export default EditarProduto;