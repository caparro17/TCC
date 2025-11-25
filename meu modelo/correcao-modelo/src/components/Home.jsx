import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
const Home = () => {
    const navegar = useNavigate();

    useEffect(() => {
        const logado = localStorage.getItem("autenticado") === "true";
        if (!logado) navegar("/login", { replace: true });
    }, [navegar]);
    const usuario = localStorage.getItem("usuario");

    function logout(){
    localStorage.removeItem('autenticado');
    localStorage.removeItem('usuario');
    navegar("/login", { replace: true })
    }
    return (
        <div>
            <div className="container mt-4">
                <div className="d-flex align-items-center">
                    <span className="h3 mb-0">Bem-Vindo: {usuario}</span>
                    <button
                        type="button"
                        className="btn btn-link h4 mb-0 ms-auto p-0"
                        onClick={logout}
                    >
                        Fazer logout
                    </button>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h2>Painel Principal</h2>
                    </div>
                    <div className="card-body">
                        <p>Selecione uma das opções abaixo para começar:</p>
                        <div className="list-group">
                            <Link to="/cadastrar-produto" className="list-group-item list-group-item-action">
                                1. Cadastro de Produto
                            </Link>
                            <Link to="/estoque" className="list-group-item list-group-item-action">
                                2. Gestão de Estoque
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;