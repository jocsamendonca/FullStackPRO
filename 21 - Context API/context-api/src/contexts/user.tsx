import { createContext, useState, type ReactNode } from "react";

interface UserProviderProps {
  children: ReactNode;
}

type UserContextData = {
  aluno: string;
  qtdAlunos: number;
  mudarNome: (nome: string) => void;
  novoAluno: () => void;
};

export const UserContext = createContext({} as UserContextData);

const UserProvider = ({ children }: UserProviderProps) => {
  const [aluno, setAluno] = useState("Jocsã Mendonça");
  const [qtdAlunos, setQtdAlunos] = useState(40);

  function mudarNome(nome: string) {
    setAluno(nome);
  }

  function novoAluno() {
    setQtdAlunos((alunos) => alunos + 1);
  }

  return (
    <UserContext.Provider value={{ aluno, qtdAlunos, mudarNome, novoAluno }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
