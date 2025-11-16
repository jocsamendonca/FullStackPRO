import { useContext } from 'react'
import { Nome } from '../Nome'
import { UserContext } from '../../contexts/user'

export function Alunos(){
  const { qtdAlunos, mudaNome } = useContext(UserContext);

  return(
    <div>
      <h3>Quantidade de alunos: {qtdAlunos}</h3>
      <button onClick={ () => mudaNome("Matheus Fraga") }>
        Mudar nome
      </button>

      <br/> <br/>
      <Nome/>
    </div>
  )
}