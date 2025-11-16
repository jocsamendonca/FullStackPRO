import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Inicialização lazy - executa apenas uma vez
  const [tasks, setTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("@taskList");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erro ao carregar tarfas:", error);
      return [];
    }
  });

  const [editTask, setEditTask] = useState({
    enabled: false,
    task: "",
  });

  useEffect(() => {
    try {
      localStorage.setItem("@taskList", JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
    }
  }, [tasks]);

  const handleRegister = useCallback(() => {
    if (!input) {
      alert("Preencha o nome da sua tarefa!");
      return;
    }

    if (editTask.enabled) {
      handleSaveEdit();
      return;
    }

    setTasks((tarefas) => [...tarefas, input]);
    setInput("");
  }, [input, tasks]);

  function handleSaveEdit() {
    const findIndexTask = tasks.findIndex((task) => task === editTask.task);
    const allTasks = [...tasks];

    allTasks[findIndexTask] = input;
    setTasks(allTasks);

    setEditTask({
      enabled: false,
      task: "",
    });
    setInput("");
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter((task) => task !== item);
    setTasks(removeTask);
  }

  function handleEdit(item: string) {
    inputRef.current?.focus();

    setInput(item);
    setEditTask({
      enabled: true,
      task: item,
    });
  }

  const totalTasks = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input
        placeholder="Digite o nome da tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        ref={inputRef}
      />
      <button onClick={handleRegister}>
        {editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}
      </button>

      <hr />

      <strong>Você tem {totalTasks} tarefas! </strong>
      <br />
      <br />

      {tasks.map((item, index) => (
        <section key={index}>
          <span>{item}</span>
          <button onClick={() => handleEdit(item)}>Editar</button>
          <button onClick={() => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}
