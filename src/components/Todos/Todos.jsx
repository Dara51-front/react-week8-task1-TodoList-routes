import { useState } from "react";
import styles from "../../App.module.css";
import { Link } from "react-router-dom";

export const Todos = ({ todos: sortedTodoList, onCheckTodoChange }) => {
  const checkTextLength = (str, n) =>
    str.length > n ? str.slice(0, n - 1) + "..." : str;

  return (
    <div>
      <ul className={styles.listTodos}>
        {sortedTodoList.map(({ id, title, completed }) => (
          <li className={styles.message} key={id}>
            <div className={styles.checkboxLabel}>
              <label className={styles.checkboxLabel}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  name={`checkTodo-${id}`}
                  checked={completed}
                  onChange={() => {
                    console.log("onChange сработал, id:", id);
                    onCheckTodoChange(id);
                  }}
                />
                <span className={styles.currentcheckbox}></span>
              </label>
              <Link className={styles.editTask} to={`todo/${id}`}>
                {checkTextLength(title, 39)}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
