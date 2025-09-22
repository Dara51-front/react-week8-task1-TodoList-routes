import { useEffect, useState } from "react";

export const useTodoState = () => {
  const [todoList, setTodoList] = useState([]);
  const [isFoundTodo, setIsFoundTodo] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [foundedTodoList, setFoundedTodoList] = useState([]);
  const [isSortingEnabled, setIsSortingEnabled] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

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
  }, []);

  // Добавление задач
  const toAddTodo = (title) => {
    return fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        title: title,
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((newTodo) => {
        console.log("Новая задача добавлена:", newTodo);
        setTodoList([...todoList, newTodo]);
      });
  };

  // Удаление задач

  const toDeleteTodo = (id) => {
    return fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).finally(() => {
      setTodoList(todoList.filter((todo) => todo.id !== id));
    });
  };

  const onCheckTodoChange = (id) => {
    const changedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(changedTodoList);
    const updatedTodo = changedTodoList.find((todo) => todo.id === id);
    fetch("http://localhost:3000/todos/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })

      .catch((error) => {
        setError(error);
      });
  };

  const onSearchClick = () => {
    setIsSearchActive(true);
    const foundTodo = todoList.filter((todo) =>
      todo.title.includes(searchPhrase)
    );
    setFoundedTodoList(foundTodo);
    setIsFoundTodo(foundTodo.length > 0);
  };
  const onNotSearchClick = () => {
    setIsSearchActive(false);
    setFoundedTodoList(todoList);
    setIsFoundTodo(true);
    setSearchPhrase("");
  };

  const onSortClick = () => {
    setIsSortingEnabled(!isSortingEnabled);
  };

  return {
    todoList,
    isFoundTodo,
    foundedTodoList,
    isSortingEnabled,
    isSearchActive,
    searchPhrase,

    setIsSearchActive,
    setIsFoundTodo,
    setFoundedTodoList,
    setIsSortingEnabled,
    setSearchPhrase,

    refreshTodos,
    toAddTodo,
    toDeleteTodo,
    onSearchClick,
    onSortClick,
    onNotSearchClick,
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
