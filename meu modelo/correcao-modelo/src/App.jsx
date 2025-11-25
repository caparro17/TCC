import Home from "./components/Home";
import CadastrarProduto from "./components/CadastrarProduto";
import EditarProduto from "./components/EditarProduto";
import GerenciadorDeEstoque from "./components/GestaoEstoque";
import Login from "./components/Login";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { useState } from "react";

function App() {
  const [estaAutenticado, setEstaAutenticado] = useState(
    () => localStorage.getItem("autenticado") === "true"
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setAutenticado={setEstaAutenticado} />} />
          <Route path="/home" element={estaAutenticado ? <Home /> : <Navigate to="/login" />} />
          <Route path="/estoque" element={estaAutenticado ? <GerenciadorDeEstoque /> : <Navigate to="/login" />} />
          <Route path="/cadastrar-produto" element={estaAutenticado ? <CadastrarProduto /> : <Navigate to="/login" />} />
          <Route path="/editar-produto/:id" element={estaAutenticado ? <EditarProduto /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
