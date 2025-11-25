import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
function ListarProduto() {

    const [listaProduto, setListaProduto] = useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        async function getProdutos() {
            try {
                const busca = await fetch("http://localhost:3001/listarprodutos");
                const dadosProduto = await busca.json();
                setListaProduto(dadosProduto);
            } catch (error) {
                console.error(error);
            }
        }
        getProdutos();
    }, []);

    async function pesquisarProduto() {
        try {
            const resposta = await fetch(`http://localhost:3001/listarprodutonome?nome=${encodeURIComponent(busca)}`);
            const dados = await resposta.json();
            setListaProduto(dados);    
        }
        catch (erro) {
            alert("Produto não existe");
        }
    }

    async function excluirProduto(id) {
        if (!window.confirm(`Tem certeza que deseja excluir o produto ID ${id}?`)) {
            return;
        }
        try {
            const resposta = await fetch(`http://localhost:3001/deletarproduto/${id}`, {
                method: 'DELETE'
            });
            if (resposta.ok) {
                alert(`Produto ID ${id} excluído com sucesso!`);
                setListaProduto(listaProduto.filter(produto => produto.id !== id));
            } else {
                const erro = await resposta.json().catch(() => ({ message: resposta.statusText }));
                throw new Error(`Falha na exclusão: ${erro.message}`);
            }

        } catch (error) {
            console.error(error);
            alert(`Erro ao excluir produto: ${error.message || error}`);
        }
    }
    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Produtos Cadastrados</h1>
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Pesquisar produto"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={pesquisarProduto}>
                    Pesquisar
                </button>
            </div>
            <table className="table table-light table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID:</th>
                        <th>Nome:</th>
                        <th>Preço:</th>
                        <th>Estoque:</th>
                        <th>Ações</th>
                    </tr>

                </thead>
                <tbody>
                    {
                        listaProduto.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.preco}</td>
                                <td>{produto.estoque_atual}</td>
                                <td>
                                    <Link onClick={() => excluirProduto(produto.id)} className="me-2">Excluir</Link>
                                    <Link to={`/editar-produto/${produto.id}`}><i className="bi bi-pencil-square">Editar</i></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
export default ListarProduto;