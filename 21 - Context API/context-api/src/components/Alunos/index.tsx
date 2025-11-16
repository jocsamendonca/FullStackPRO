import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import Nome from "../Nome";

const Alunos = () => {
  const { qtdAlunos, mudarNome } = useContext(UserContext);

  return (
    <div>
      <h3>Quantidade de alunos: {qtdAlunos}</h3>
      <button onClick={() => mudarNome("Jorge e Gabriel")}>Mudar nome</button>
      <br /> <br />
      <Nome />
    </div>
  );
};

export default Alunos;
