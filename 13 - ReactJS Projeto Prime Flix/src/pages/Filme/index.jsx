import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./filme-info.css";
import { toast } from "react-toastify";

const Filme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      axios({
        method: "get",
        url: `https://api.themoviedb.org/3/movie/${id}`,
        params: {
          api_key: "c78dc951bf15cb2bf70c55e705418638",
          language: "pt-Br",
        },
      })
        .then((response) => {
          // console.log(response.data);
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("Filme não encontrado.");
          navigate("/", { replace: true });
          return;
        });
    }

    loadFilme();

    // Esta é a cleanup function
    return () => {
      console.log("Componente desmontado");
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmeSalvo) => filmeSalvo.id === filme.id
    );

    if (hasFilme) {
      // alert("Esse filme já está na lista!");
      toast.warn("Esse filme já está na lista!");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    // alert("Filme salvo com sucesso!");
    toast.success("Filme salvo com sucesso!");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1> {filme.title} </h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <h3> Sinopse </h3>
      <span> {filme.overview} </span>
      <strong>Avaliação: {filme.vote_average} /10 </strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            href={`https://youtube.com/results?search_query=${filme.title} trailer`}
            target="_blank"
            rel="external"
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
};

export default Filme;
