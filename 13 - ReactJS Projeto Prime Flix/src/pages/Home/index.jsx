import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import api from "../../services/api";

const Home = () => {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // async function loadFilmes() {
    //   axios({
    //     method: "get",
    //     url: "https://api.themoviedb.org/3/movie/now_playing",
    //     params: {
    //       api_key: "c78dc951bf15cb2bf70c55e705418638",
    //       language: "pt-Br",
    //       page: 1,
    //     },
    //   }).then((respose) => {
    //     console.log(respose.data.results.slice(0, 10));
    //     setFilmes(respose.data.results.slice(0, 10));
    //     setLoanding(false);
    //   });
    // }
    // loadFilmes();
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "c78dc951bf15cb2bf70c55e705418638",
          language: "pt-BR",
          page: 1,
        },
      });

      console.log(response.data.results.slice(0, 10));
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false);
    }

    loadFilmes();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Carregando filmes...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                // src={`https://api.themoviedb.org/3/movie/${filme.id}/images`}
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
