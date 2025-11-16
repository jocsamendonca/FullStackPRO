import { useContext } from "react";
import { UserContext } from "../../contexts/user";

const Footer = () => {
  const { novoAluno, qtdAlunos } = useContext(UserContext);
  return (
    <div>
      <h1>Footer</h1>
      <h3>Alunos online na plataforma: {qtdAlunos}</h3>
      <br />
      <button onClick={() => novoAluno()}>Novo aluno</button>
    </div>
  );
};

export default Footer;
