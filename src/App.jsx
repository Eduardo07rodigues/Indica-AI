// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./componentes/Header";
import Home from "./pages/home/Home";
import Avaliacao from "./pages/avaliacao/Avaliacao";
import Indicacao from "./pages/indicacoes/Indicacao";

function App() {
  return (
    <section>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/avaliacao" element={<Avaliacao />} />
        <Route path="/indicacao" element={<Indicacao />} />
      </Routes>
    </section>
  );
}

export default App;
