import React from "react";
import styles from "./Home.module.css";
import Icone from "../../assets/IconP.svg?react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  useEffect(() => {}, [location]);

  const generos = [
    {
      nome: "Ação",
      id: 28,
    },
    {
      nome: "Comédia",
      id: 35,
    },
    {
      nome: "Terror",
      id: 27,
    },
    {
      nome: "Romance",
      id: 10749,
    },
    {
      nome: "Animação",
      id: 16,
    },
  ];
  const [generoAtivo, setGeneroAtivo] = React.useState("");
  const navigate = useNavigate();

  localStorage.setItem("genero", generoAtivo);

  return (
    <section className={styles.homeContainer}>
      <div className={styles.intro}>
        <div className={styles.textos}>
          <h2 className={`titulos ${styles.homeSub}`}>escolha o</h2>
          <h1 className={`titulos ${styles.homeTitle}`}>Gênero</h1>
        </div>
        <img className={styles.iconeImg} src={Icone} alt="" />
      </div>
      <div className={styles.escolhas}>
        <div className={styles.generos}>
          {generos.map((genero) => (
            <button
              key={genero.id}
              className={generoAtivo === genero.id ? styles.ativo : ""}
              onClick={(e) => {
                e.preventDefault();
                setGeneroAtivo(genero.id);
              }}
            >
              {genero.nome}
            </button>
          ))}
        </div>
        <button
          disabled={!generoAtivo}
          className={`titulos ${styles.comecar}`}
          onClick={() =>
            navigate("/avaliacao", { state: { genero: generoAtivo } })
          }
        >
          Começar
        </button>
      </div>
    </section>
  );
};

export default Home;
