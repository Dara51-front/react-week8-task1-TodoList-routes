import { useState } from "react";
import styles from "./controlePanel.module.css";

export const ControlPanel = ({
  onSearchClick,
  onSortClick,
  onNotSearchClick,
}) => {
  const [searchPhrase, setSearchPhrase] = useState("");

  const onSearchPhraseChange = ({ target }) => {
    setSearchPhrase(target.value);
  };

  return (
    <form className={styles.controlPanel}>
      <input
        className={styles.searchInput}
        type="text"
        value={searchPhrase}
        onChange={onSearchPhraseChange}
        placeholder="Введите что-то для поиска"
      />

      <button
        className={styles.searchButton}
        onClick={onSearchClick}
        disabled={!searchPhrase}
      >
        🔍
      </button>

      <button
        className={styles.searchButton}
        onClick={onNotSearchClick}
        disabled={!searchPhrase}
      >
        X
      </button>

      <label className={styles.sortingLabel}>
        <input
          className={styles.sortingCheckBox}
          type="checkbox"
          onChange={onSortClick}
        />
        <span className={styles.currentSortingCheckBox} type="checkbox"></span>
      </label>
    </form>
  );
};
