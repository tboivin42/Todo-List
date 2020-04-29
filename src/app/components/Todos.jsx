import React, { useContext } from "react";

import { TodosContext } from "../features/TodosContext";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

const Todos = () => {
  const { todos } = useContext(TodosContext);

  function sortTodos() {
    let archivedTodos = [];
    let unarchivedTodos = [];

    todos.forEach((todo) => {
      if (todo.archived === false) {
        unarchivedTodos.push(todo);
      } else {
        archivedTodos.push(todo);
      }
    });

    unarchivedTodos.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    archivedTodos.sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
    return unarchivedTodos.concat(archivedTodos);
  }

  const sortedTodos = sortTodos();

  return (
    <section>
      <h1 className="mb-4 text-xl font-bold text-gray-600">To-Dos</h1>
      <TodoForm />
      <section>
        {sortedTodos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </section>
    </section>
  );
};

export default Todos;
