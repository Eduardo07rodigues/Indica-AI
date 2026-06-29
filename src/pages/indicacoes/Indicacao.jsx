// import React from 'react'
import styles from "./indicacao.module.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Indicacao = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const filmes = location.state?.filmes;

  if (!filmes) return <h1>Nenhum filme encontrado</h1>;

  console.log(filmes);

  return (
    <section className={styles.container}>
      {filmes[0] && (
        <div className={styles.indicacao}>
          <img
            className={styles.capas}
            src={`https://image.tmdb.org/t/p/w500${filmes[0].poster_path}`}
            alt=""
          />
          <div className={styles.textos}>
            <h1 className={`titulos ${styles.nome}`}>{filmes[0].title}</h1>
            <p className={styles.sinopse}>{filmes[0].overview}</p>
          </div>
        </div>
      )}

      {filmes[1] && (
        <div className={styles.indicacao2}>
          <img
            className={styles.capas2}
            src={`https://image.tmdb.org/t/p/w500${filmes[1].poster_path}`}
            alt=""
          />
          <div className={styles.textos2}>
            <h1 className={`titulos ${styles.nome2}`}>{filmes[1].title}</h1>
            <p className={styles.sinopse2}>{filmes[1].overview}</p>
          </div>
        </div>
      )}

      {filmes[2] && (
        <div className={styles.indicacao}>
          <img
            className={styles.capas}
            src={`https://image.tmdb.org/t/p/w500${filmes[2].poster_path}`}
            alt=""
          />
          <div className={styles.textos}>
            <h1 className={`titulos ${styles.nome}`}>{filmes[2].title}</h1>
            <p className={styles.sinopse}>{filmes[2].overview}</p>
          </div>
        </div>
      )}
      <div className={styles.botaoFinal}>
        <button
          className={`titulos ${styles.inicio}`}
          onClick={() => navigate("/")}
        >
          inicio
        </button>
      </div>
    </section>
  );
};

export default Indicacao;
