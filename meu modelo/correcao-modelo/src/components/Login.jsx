import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAutenticado }) => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navegar = useNavigate();

    async function ValidarLogin(event) {
        event.preventDefault()
        try {
            const response = await fetch("http://localhost:3001/login", {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                },
                body: JSON.stringify({ usuario, senha }),
            });
            const dados = await response.json();
            if (response.status === 200) {
                setAutenticado(true);
                localStorage.setItem('usuario', dados.nome)
                localStorage.setItem('id', dados.id)
                localStorage.setItem('autenticado', 'true')
                navegar('/home')
            }
        }
        catch(erro){
            alert("usuario ou senha invalidaos");
        }
    
   }
    return (
        <>
            <div className="container vh-100 d-flex justify-content-center align-items-center">
                <div className="card shadow" style={{ width: '400px' }}>
                    <div className="card-header text-center">
                        <h3>Login</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={ValidarLogin}>
                            <div className="mb-3">
                                <label className="form-label">Usuário:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Senha:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Entrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Login;