import { useEffect, useState } from "react";
import styles from "../App.module.css";
import { useTodoState } from "../useCRUD";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ActiveTodo = ({}) => {
  const [editNow, setEditNow] = useState(false);
  const [changedTodo, setChangedTodo] = useState("");

  const { toUpdateTodo, todoList, toDeleteTodo, onCheckTodoChange } =
    useTodoState();

  const params = useParams();
  const navigate = useNavigate();
  const activeTodo = todoList.find((todo) => todo.id === params.id);

  useEffect(() => {
    if (activeTodo) {
      setChangedTodo(activeTodo.title);
    }
  }, []);

  if (!activeTodo) {
    return <div className={styles.message}> Задача не найдена</div>;
  }
  const { completed, title, id } = activeTodo || {};

  const onChangeContent = (event) => {
    event.preventDefault();
    setChangedTodo(event.target.value);
  };

  const onChangeTodoClick = () => {
    setEditNow(true);
    setChangedTodo(title);
  };

  const onSaveNewContentClick = () => {
    toUpdateTodo(id, {
      title: changedTodo,
      completed: completed,
    }).finally(() => {
      setEditNow(false);
    });
  };

  const onDeleteTodo = () => {
    toDeleteTodo(id).finally(() => {
      navigate("/");
    });
  };

  return (
    <div className={styles.message} key={id}>
      <div className={styles.titleTodo}>
        <label className={styles.checkboxLabel}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name={`checkTodo-${id}`}
            onChange={(e) =>
              onCheckTodoChange({ id, title, completed: e.target.checked })
            }
            checked={activeTodo.completed}
          />
          <span className={styles.currentcheckbox}></span>
        </label>
        {editNow ? (
          <input
            type="text"
            className={styles.linkTask}
            onChange={onChangeContent}
            value={changedTodo}
          />
        ) : (
          <span className={styles.linkTask}>{title}</span>
        )}
      </div>
      <div className={styles.changeButtons}>
        <button
          className={styles.changeContentButton}
          onClick={() => {
            editNow ? onSaveNewContentClick() : onChangeTodoClick();
          }}
        >
          {editNow ? `✔` : `✎`}
        </button>
        <button className={styles.deleteButton} onClick={onDeleteTodo}>
          ✖
        </button>

        <Link to="/" className={styles.backLink}>
          ↩
        </Link>
      </div>
    </div>
  );
};
