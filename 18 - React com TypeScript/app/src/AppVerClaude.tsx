import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("@taskList");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Erro ao carregar tarefas:", error);
      return [];
    }
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem("@taskList", JSON.stringify(tasks));
    } catch (error) {
      console.error("Erro ao salvar tarefas:", error);
    }
  }, [tasks]);

  function handleSubmit() {
    if (!input.trim()) {
      alert("Preencha o nome da sua tarefa!");
      return;
    }

    if (editingIndex !== null) {
      // Editando tarefa existente
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = input.trim();
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      // Adicionando nova tarefa
      setTasks((prev) => [...prev, input.trim()]);
    }

    setInput("");
  }

  function handleEdit(index: number) {
    setInput(tasks[index]);
    setEditingIndex(index);
  }

  function handleDelete(index: number) {
    // Se estiver editando a tarefa que será deletada, cancela a edição
    if (editingIndex === index) {
      setEditingIndex(null);
      setInput("");
    }

    setTasks((prev) => prev.filter((_, i) => i !== index));
  }

  function handleCancel() {
    setEditingIndex(null);
    setInput("");
  }

  return (
    <div>
      <h1>Lista de tarefas</h1>
      <input
        placeholder="Digite o nome da tarefa..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editingIndex !== null ? "Atualizar tarefa" : "Adicionar tarefa"}
      </button>
      {editingIndex !== null && (
        <button onClick={handleCancel}>Cancelar</button>
      )}

      <hr />

      {tasks.map((task, index) => (
        <section
          key={index}
          style={{
            backgroundColor: editingIndex === index ? "#f0f0f0" : "transparent",
            padding: "8px",
            margin: "4px 0",
          }}
        >
          <span>{task}</span>
          <button
            onClick={() => handleEdit(index)}
            disabled={editingIndex !== null && editingIndex !== index}
          >
            Editar
          </button>
          <button onClick={() => handleDelete(index)}>Excluir</button>
        </section>
      ))}
    </div>
  );
}
