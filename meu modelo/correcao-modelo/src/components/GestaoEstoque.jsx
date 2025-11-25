import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

function GerenciadorDeEstoque() {

    const [listaDeProdutos, setListaDeProdutos] = useState([]);
    const [produtoEscolhido, setProdutoEscolhido] = useState(null);
    const [tipo, setTipo] = useState('entrada');
    const [quantidade, setQuantidade] = useState(1);
    const [data, setData] = useState(new Date().toISOString().slice(0, 10));
    const idUsuario = localStorage.getItem("id")

    const ESTOQUE_MINIMO = 10;

    async function buscarProdutos() {
        try {
            const busca = await fetch("http://localhost:3001/listarprodutos");
            const dados = await busca.json();
            console.log(dados)
            setListaDeProdutos(dados);
        } catch (erro) {
            console.error("Deu erro ao buscar os produtos:", erro);
        }
    }
    useEffect(() => {
        buscarProdutos();
    }, []);

    function abrirJanelaDeMovimento(produto) {
        setProdutoEscolhido(produto);
        setTipo('entrada');
        setQuantidade(1);
        setData(new Date().toISOString().slice(0, 10));
        const elementoJanela = document.getElementById('janelaDeMovimento');
        const minhaJanela = new window.bootstrap.Modal(elementoJanela);
        minhaJanela.show();
    }

    function fecharJanelaDeMovimento() {
        const elementoJanela = document.getElementById('janelaDeMovimento');
        const minhaJanela = window.bootstrap.Modal.getInstance(elementoJanela);
        if (minhaJanela) {
            minhaJanela.hide();
        }
    }

    async function salvarMovimentoDeEstoque() {
        if (quantidade <= 0) {
            alert("A quantidade deve ser pelo menos 1.");
            return;
        }

        let estoqueAtual = produtoEscolhido.estoque_atual;
        const qtdMovimento = Number(quantidade);
        let novoEstoque;

        if (tipo === 'saida') {
            novoEstoque = estoqueAtual - qtdMovimento;
            if (novoEstoque < ESTOQUE_MINIMO) {
                alert(`ATENÇÃO: O estoque do produto "${produtoEscolhido.nome}" ficará abaixo do mínimo!`);
            }
            if (novoEstoque < 0) {
                alert("ERRO: Estoque insuficiente para esta saída.");
                return;
            }
        } else {
            novoEstoque = estoqueAtual + qtdMovimento;
        }

        let produto = {
            id: produtoEscolhido.id,
            estoque: novoEstoque,
            tipo: tipo,
            dataMovimento: data,
            idUsuario: idUsuario,
        };

        try {
            console.log(`Enviando para o backend:`, produto);
            let atualizarEstoque = await fetch('http://localhost:3001/movimentacao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });

            const resultado = await atualizarEstoque.json();
            resultado.sucesso = true;
            if (resultado.sucesso) {
                alert(`Estoque do produto "${produto.nome}" atualizado com sucesso!`);
                fecharJanelaDeMovimento();
                await buscarProdutos();
            } else {
                alert(resultado.mensagem || `Ocorreu um erro ao salvar o produto.`);
                fecharJanelaDeMovimento();
            }

        } catch (erro) {
            alert(`Erro na comunicação com o servidor: ${erro}`);
            fecharJanelaDeMovimento();
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gerenciador de Estoque</h1>
                <Link to="/home" className="btn btn-secondary mb-3">
                    &larr; Voltar para a Home
                </Link>
            </div>
            <div className="table-responsive">
                <table className="table table-light table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nome do Produto</th>
                            <th>Estoque Atual</th>
                            <th>Preço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaDeProdutos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.estoque_atual}</td>
                                <td>R$ {produto.preco}</td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => abrirJanelaDeMovimento(produto)}>
                                        Movimentar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="janelaDeMovimento" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-nome">
                                Movimentar Estoque: {produtoEscolhido?.nome}
                            </h5>
                            <button type="button" className="btn-close" onClick={fecharJanelaDeMovimento}></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Estoque Atual:</strong> {produtoEscolhido?.estoque_atual}</p>

                            <div className="mb-3">
                                <label className="form-label">Tipo de Movimentação</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="tipo" value="entrada" checked={tipo === 'entrada'} onChange={(e) => setTipo(e.target.value)} />
                                    <label className="form-check-label">Entrada</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="tipo" value="saida" checked={tipo === 'saida'} onChange={(e) => setTipo(e.target.value)} />
                                    <label className="form-check-label">Saída</label>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Quantidade</label>
                                <input type="number" className="form-control" name="quantidade" min="1" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Data da Movimentação</label>
                                <input type="date" className="form-control" name="data" value={data} onChange={(e) => setData(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={fecharJanelaDeMovimento}>Cancelar</button>
                            <button type="button" className="btn btn-primary" onClick={salvarMovimentoDeEstoque}>Confirmar Movimentação</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GerenciadorDeEstoque;