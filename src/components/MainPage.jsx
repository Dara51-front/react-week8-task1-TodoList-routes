import { ToAddTodo } from "./ToAddTodo/ToAddTodo";
import { Todos } from "./Todos/Todos";
import { useTodoState } from "../useCRUD";
import styles from "./ControlPanel/controlePanel.module.css";

export const MainPage = () => {
  const {
    getTodoList,
    onCheckTodoChange,
    toAddTodo,
    onSearchClick,
    onSortClick,
    onNotSearchClick,
    isSortingEnabled,
    isFoundTodo,
    searchPhrase,
    setSearchPhrase,
  } = useTodoState();
  const sortedTodoList = getTodoList();

  const onSearchPhraseChange = ({ target }) => {
    setSearchPhrase(target.value);
  };

  return (
    <>
      <form className={styles.controlPanel}>
        <input
          className={styles.searchInput}
          type="text"
          value={searchPhrase}
          onChange={onSearchPhraseChange}
          placeholder="Введите что-то для поиска"
        />
        <button
          type="button"
          className={styles.searchButton}
          onClick={onSearchClick}
          disabled={!searchPhrase}
        >
          🔍
        </button>
        <button
          type="button"
          className={styles.searchButton}
          onClick={onNotSearchClick}
          disabled={!searchPhrase}
        >
          ✕
        </button>

        <label className={styles.sortingLabel}>
          <input
            className={styles.sortingCheckBox}
            type="checkbox"
            checked={isSortingEnabled}
            onChange={onSortClick}
          />
          <span
            className={styles.currentSortingCheckBox}
            type="checkbox"
          ></span>
        </label>
      </form>

      <ToAddTodo toAddTodo={toAddTodo} />
      {isFoundTodo ? (
        <Todos todos={sortedTodoList} onCheckTodoChange={onCheckTodoChange} />
      ) : (
        <div className={styles.notFoundDiv}>{"Ничего не найдено:("}</div>
      )}
    </>
  );
};
