import { useState, type FormEvent } from "react";
import "./App.css";

interface Resultado {
  nome: string;
  idade: number;
}

function App() {
  const [nome, setNome] = useState("");
  const [ano, setAno] = useState("");
  const [resultado, setResultado] = useState<Resultado | null>(null);

  const calcularIdade = (e: FormEvent) => {
    e.preventDefault();

    const idade = new Date().getFullYear() - Number(ano);
    setResultado({ nome, idade });

    // Limpar formulário
    setNome("");
    setAno("");
  };

  return (
    <div className="container">
      <h1 className="title">Descubra sua idade</h1>

      <form className="form" onSubmit={calcularIdade}>
        <label>Digite seu nome</label>
        <input
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>Ano de nascimento</label>
        <input
          type="number"
          placeholder="Ex: 1990"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          min="1900"
          max={new Date().getFullYear()}
          required
        />

        <button type="submit">Calcular idade</button>
      </form>

      {resultado && (
        <h2>
          {resultado.nome} tem {resultado.idade} anos
        </h2>
      )}
    </div>
  );
}

export default App;
