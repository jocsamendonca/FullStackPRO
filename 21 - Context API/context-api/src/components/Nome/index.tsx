import { useContext } from "react";
import { UserContext } from "../../contexts/user";

const Nome = () => {
  const { aluno } = useContext(UserContext);
  return (
    <div>
      <strong>Aluno: {aluno} </strong>
      <br />
    </div>
  );
};

export default Nome;
