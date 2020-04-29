import cx from "classnames";
import React, { useContext, useState } from "react";

import { TodosContext } from "../features/TodosContext";
import ButtonIcon from "./ButtonIcon";

const TodoForm = (props) => {
  const { addTodo, updateTodo, deleteTodo } = useContext(TodosContext);

  const defaultValue = props.todo ? props.todo.note : "";
  const [note, setNote] = useState(defaultValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.todo !== undefined && note === "") {
      const res = confirm("Êtes-vous sûr de vouloir supprimer cet élèment ?");
      if (res === true) {
        deleteTodo(todo.id);
      }
    }

    if (props.todo !== undefined && note !== "") {
      updateTodo(props.todo.id, { note: note });
      props.changeEdit(false);
    }

    if (props.todo === undefined && note !== "") {
      addTodo({ note: note });
    }

    setNote("");
  };

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <form onSubmit={handleSubmit} className={cx(props.className, "flex")}>
      <input
        type="text"
        value={note}
        onChange={handleChange}
        autoFocus={true}
        onFocus={handleFocus}
        placeholder="What's on your mind?"
        className="w-full h-10 mr-4 py-1 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-yellow-400"
      />
      <ButtonIcon
        icon={props.todo ? "Save" : "Plus"}
        title="Add todo"
        variant="primary"
        className="flex-shrink-0"
      />
    </form>
  );
};

export default TodoForm;
