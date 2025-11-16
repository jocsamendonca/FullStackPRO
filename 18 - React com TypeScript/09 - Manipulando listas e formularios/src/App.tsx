import { useState } from 'react'

export default function App(){

  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([
    'Estudar react com typescript',
    'Comrpar pao meio dia',
    'Estudar ingles a noite'
  ])


  function handleRegister(){
    if(!input){
      alert("Preencha o nome da sua tarefa!")
      return;
    }

    setTasks(tarefas => [...tarefas, input])
    setInput("")

  }


  return(
    <div>
      <h1>Lista de tarefas</h1>
      <input
        placeholder="Digite o nome da tarefa..."
        value={input}
        onChange={ (e) => setInput(e.target.value) }
      />
      <button onClick={handleRegister}>Adicionar tarefa</button>

      <hr/>

      {tasks.map( (item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button>Excluir</button>
        </section>
      ) )}
    </div>
  )
}
