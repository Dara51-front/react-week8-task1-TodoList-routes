import { useState } from "react";
import styles from "../App.module.css";
import { useTodoState } from "../useCRUD";
import { Link } from "react-router-dom";

export const Todos = ({}) => {
  const { getTodoList, onCheckTodoChange } = useTodoState();
  const sortedTodoList = getTodoList();

  const checkTextLength = (str, n) =>
    str.length > n ? str.slice(0, n - 1) + "..." : str;

  return (
    <div>
      <ul className={styles.listTodos}>
        {sortedTodoList.map(({ id, title, completed }) => (
          <li className={styles.message} key={id}>
            <div className={styles.checkboxLabel}>
              <input
                className={styles.checkbox}
                type="checkbox"
                name={`checkTodo-${id}`}
                onChange={(e) =>
                  onCheckTodoChange({ id, title, completed: e.target.checked })
                }
                checked={completed}
              />
              <span className={styles.currentcheckbox}></span>

              <Link className={styles.editTask} to={`todo/${id}`}>
                {checkTextLength(title, 40)}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
