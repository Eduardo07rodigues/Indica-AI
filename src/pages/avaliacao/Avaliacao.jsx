// import React from "react";
import styles from "./Avaliacao.module.css";
// import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Like from "../../assets/like.svg?react";
import popcorn from "../../assets/popcorn.png";
import { useNavigate } from "react-router-dom";
import { recomendarFilmes } from "../../APIs/Gemini";
import { useRef } from "react";

const Avaliacao = () => {
  // const location = useLocation();
  const genero = localStorage.getItem("genero");
  const navigate = useNavigate();
  const jaBuscou = useRef(false);
  const apiKey = "666443b918b6506de1c1b64c36e78501";
  const [filmes, setFilmes] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [filmesGostados, setFilmesGostados] = useState([]);
  const [loading, setLoading] = useState(false);

  const filmeAtual = filmes[indiceAtual];

  function proximoFilme() {
    setIndiceAtual((prev) => prev + 1);
  }

  function gostei() {
    setFilmesGostados((prev) => [...prev, filmeAtual.title]);
  }

  useEffect(() => {
    // setLoading(true);
    async function buscarFilmes() {
      const resposta = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genero}&sort_by=vote_count.desc&language=pt-BR`,
      );

      const dados = await resposta.json();
      setFilmes(dados.results);
    }

    async function buscarRecomendacao(nome) {
      const resposta = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(nome)}&language=pt-BR`,
      );

      const data = await resposta.json();

      return data.results[0];
    }

    console.log(filmesGostados);

    async function buscar() {
      const resposta = await recomendarFilmes(filmesGostados, genero);

      // const resposta = `{
      // "filmes": [
      // "O iluminado",
      // "It a coisa",
      // "Babadook"
      // ]
      // }`;

      const limpo = resposta.replace(/```json/g, "").replace(/```/g, "");

      const dados = JSON.parse(limpo);
      // const dados = JSON.parse(resposta);

      const filmesIA = dados.filmes;

      const filmesCompletos = await Promise.all(
        filmesIA.map((nome) => buscarRecomendacao(nome)),
      );

      setLoading(false);

      navigate("/indicacao", {
        state: {
          filmes: filmesCompletos,
        },
      });
    }

    if (filmesGostados.length === 3 && !jaBuscou.current) {
      jaBuscou.current = true;
      setLoading(true);
      buscar();
    }

    if (genero) {
      buscarFilmes();
    }
  }, [genero, filmesGostados, navigate]);

  if (loading) {
    return (
      <section>
        <div className={styles.loadingContainer}>
          <div className={styles.divUm}>
            <h1 className={`titulos ${styles.loadingTitulo}`}>
              Prepare sua pipoca
            </h1>
            <img className={styles.popcorn} src={popcorn} alt="" />
          </div>
          <h2 className={`titulos ${styles.loadingSub}`}>
            estamos buscando recomendações...
          </h2>
          <div className={styles.loading}></div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {filmes.length > 0 && (
        <>
          <div className={styles.quadrado}>
            <img
              src={`https://image.tmdb.org/t/p/w500${filmeAtual.poster_path}`}
              alt={filmeAtual.title}
            />
          </div>

          <div className={styles.avaliar}>
            <h2>{filmeAtual.title}</h2>

            <div className={styles.botoes}>
              <button className={styles.deslike} onClick={proximoFilme}>
                <img src={Like} alt="Não gostei" />
              </button>
              <button className={styles.nosaw} onClick={proximoFilme}>
                Não vi
              </button>
              <button
                className={styles.like}
                onClick={() => {
                  proximoFilme();
                  gostei();
                }}
              >
                <img src={Like} alt="Gostei" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Avaliacao;
