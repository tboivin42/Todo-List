import cx from "classnames";
import React, { useContext, useEffect, useState } from "react";

import { TodosContext } from "../features/TodosContext";
import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";
import TodoForm from "./TodoForm";
import { Key } from "react-feather";

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useContext(TodosContext);
  const [showEdit, setShowEdit] = useState(false);

  const archivedOrUnarchived = () => {
    toggleTodo(todo.id, todo.archived);
  };

  const setEdit = () => {
    setShowEdit(true);
  };

  const deleteOrCancel = () => {
    if (showEdit) {
      setShowEdit(false);
    } else {
      const res = confirm("Êtes-vous sûr de vouloir supprimer cet élèment ?");
      if (res === true) {
        deleteTodo(todo.id);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 27) {
      setShowEdit(false);
    }
  };

  const noteUnderline = cx("w-full px-4 py-2 truncate text-left", {
    "text-gray-500 line-through": todo.archived === true,
  });

  return (
    <div
      className="w-full flex justify-between rounded shadow-xs my-4 py-2"
      onKeyDown={handleKeyPress}
    >
      {showEdit ? (
        <TodoForm
          todo={todo}
          changeEdit={setShowEdit}
          className="w-full px-2 ml-1"
        />
      ) : (
        <>
          <div onClick={archivedOrUnarchived} className="py-2 px-4">
            <Icon name={todo.archived ? "CheckSquare" : "Square"} />
          </div>
          <div onClick={archivedOrUnarchived} className={noteUnderline}>
            {todo.note}
          </div>
        </>
      )}
      <div className="flex rounded space-x-3 px-1">
        {showEdit ? null : (
          <ButtonIcon
            icon={"Edit"}
            titre="Edit todo"
            variant="secondary"
            onClick={setEdit}
          />
        )}
        <ButtonIcon
          icon={!showEdit ? "Trash2" : "X"}
          titre="Delete todo"
          variant={!showEdit ? "danger" : "secondary"}
          onClick={deleteOrCancel}
        />
      </div>
    </div>
  );
};

export default TodoItem;
