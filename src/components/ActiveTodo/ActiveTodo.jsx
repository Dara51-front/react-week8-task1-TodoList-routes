import { useEffect, useState } from "react";
import styles from "../../App.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ActiveTodo = () => {
  const [editNow, setEditNow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/todos/" + id)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((todo) => {
        setTodo(todo);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [id]);

  if (error) {
    return <div className={styles.message}> {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = () => {
    setEditNow((prev) => !prev);
  };
  const deleteTodo = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    }).finally(() => {
      setIsLoading(false);
      navigate("/");
    });
  };

  return (
    <div className={styles.message}>
      <div className={styles.titleTodo}>
        {editNow ? (
          <>
            <EditForm
              value={todo.title}
              id={todo.id}
              completed={todo.completed}
              handleEdit={handleEdit}
            />
          </>
        ) : (
          <p className={styles.linkTask}>{todo.title}</p>
        )}
      </div>
      <div className={styles.changeButtons}>
        <>
          {editNow ? (
            <button
              className={styles.editButton}
              onClick={() => setEditNow(false)}
            >
              ✖
            </button>
          ) : (
            <button className={styles.editButton} onClick={handleEdit}>
              ✎
            </button>
          )}
        </>

        <button className={styles.deleteButton} onClick={deleteTodo}>
          {isLoading ? "..." : "🗑"}
        </button>

        <Link to="/" className={styles.backLink}>
          ↩
        </Link>
      </div>
    </div>
  );
};

const EditForm = ({ value, id, completed }) => {
  const [title, setTitle] = useState(value);
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const onChangeContent = (event) => {
    setTitle(event.target.value);
  };

  const onSaveNewContentClick = async () => {
    setIsloading(true);

    try {
      const response = await fetch("http://localhost:3000/todos/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: title,
          completed: completed,
        }),
      });

      const data = await response.json();
      console.log(data);
      setTitle(data.title);
      setIsloading(false);
      // handleEdit();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>....laoding</div>
      ) : (
        <input
          className={styles.editInput}
          type="text"
          value={title}
          onChange={onChangeContent}
        />
      )}
      <button className={styles.editButton} onClick={onSaveNewContentClick}>
        ✔
      </button>
    </>
  );
};
