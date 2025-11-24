"use client";

import { useState } from "react";
import TodoCard from "../../components/TodoCard";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Sample Todo 1", completed: false },
    { id: 2, title: "Sample Todo 2", completed: true },
  ]);
  const [newTitle, setNewTitle] = useState("");

  const addTodo = () => {
    if (!newTitle.trim()) return;
    const newTodo: Todo = { id: Date.now(), title: newTitle, completed: false };
    setTodos([newTodo, ...todos]);
    setNewTitle("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600 mb-6 text-center">
          My Todos
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Add new todo"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <div>
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos yet!</p>
          ) : (
            todos.map(todo => (
              <TodoCard
                key={todo.id}
                title={todo.title}
                completed={todo.completed}
                onToggle={() => toggleTodo(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
