import { useState } from "react";
import "./App.css";
import Button from "./Button";

function App() {
  const [message, setMessage] = useState("Bem vindo ao projeto!");

  return (
    <div>
      <h1 className="titulo" data-testid="header">
        Sujeito Programador
      </h1>
      <p>{message}</p>

      <button onClick={() => setMessage("Estudando testes com reactjs")}>
        Alterar mensagem
      </button>

      <hr />
      <br />

      {/* Componente personalizado */}
      <Button onClick={() => alert("CLICOUU!!!")} disabled={false}>
        Clique!
      </Button>
    </div>
  );
}

export default App;
