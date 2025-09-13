import { useEffect, useState } from "react";

export const useTodoState = () => {
  const [todoList, setTodoList] = useState([]);
  const [isFoundTodo, setIsFoundTodo] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [foundedTodoList, setFoundedTodoList] = useState([]);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);

  const refreshTodos = () => {
    fetch("http://localhost:3000/todos")
      .then((response) => response.json())
      .then((todos) => {
        setTodoList(todos);
        return todos;
      });
  };

  useEffect(() => {
    refreshTodos();
  }, [todoList]);

  // Добавление задач
  const toAddTodo = (title) => {
    return fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        userId: 1,
        title: title,
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((newTodo) => {
        console.log("Новая задача добавлена:", newTodo);
        refreshTodos();
      });
  };

  // Удаление задач

  const toDeleteTodo = (id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      refreshTodos();
    });
  };

  //Обновление задач

  const toUpdateTodo = (id, updates) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userId: 1,
        ...updates,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then(() => {
        refreshTodos();
      });
  };
  const onCheckTodoChange = ({ id, title, completed }) => {
    toUpdateTodo(id, {
      title: title,
      completed: completed,
    });
  };

  return {
    todoList,
    isFoundTodo,
    foundedTodoList,
    isSortingEnabled,
    isSearchActive,

    setIsSearchActive,
    setIsFoundTodo,
    setFoundedTodoList,
    setIsSortingEnabled,

    refreshTodos,
    toAddTodo,
    toDeleteTodo,
    toUpdateTodo,
    onCheckTodoChange,

    getTodoList: () => {
      const list = isSearchActive ? foundedTodoList : todoList;

      if (isSortingEnabled) {
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      } else {
        return list;
      }
    },
  };
};
