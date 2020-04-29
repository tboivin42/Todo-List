import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const TodosContext = createContext({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
});

const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const methods = {
    addTodo: (todo) => {
      axios
        .post("http://localhost:3000/api/todos", todo)
        .then((res) => {
          setTodos([...todos, res.data]);
        })
        .catch((err) => console.log(err));
    },

    updateTodo: (id, todo) => {
      let newArr = [...todos];

      axios
        .put(`http://localhost:3000/api/todos/${id}`, todo)
        .then((res) => {
          const index = todos.findIndex((item) => item.id === res.data.id);
          newArr[index] = { ...newArr[index], note: res.data.note };
          setTodos(newArr);
        })
        .catch((err) => console.log(err));
    },

    toggleTodo: (id, archived) => {
      let newArr = [...todos];

      if (archived === true) {
        axios
          .post(`http://localhost:3000/api/todos/${id}/unarchive`)
          .then((res) => {
            const index = todos.findIndex((item) => item.id === res.data.id);
            newArr[index] = { ...newArr[index], archived: false };
            setTodos(newArr);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post(`http://localhost:3000/api/todos/${id}/archive`)
          .then((res) => {
            const index = newArr.findIndex((item) => item.id === res.data.id);
            newArr[index] = { ...newArr[index], archived: true };
            setTodos(newArr);
          })
          .catch((err) => console.log(err));
      }
    },

    deleteTodo: (id) => {
      let newArr = [...todos];

      axios
        .delete(`http://localhost:3000/api/todos/${id}`)
        .then((res) => {
          const index = todos.findIndex((item) => item.id === res.data.id);
          newArr.splice(index, 1);
          setTodos(newArr);
        })
        .catch((err) => console.log(err));
    },
  };

  return (
    <TodosContext.Provider value={{ todos, ...methods }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
