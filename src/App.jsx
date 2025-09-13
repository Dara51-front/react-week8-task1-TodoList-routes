import { Outlet, Route, Routes, useMatch } from "react-router-dom";
import styles from "./App.module.css";
import { Todos } from "./Todos/Todos.jsx";
import { ToAddTodo } from "./ToAddTodo/ToAddTodo.jsx";
import { ControlPanel } from "./ControlPanel/ControlPanel.jsx";
import { useTodoState } from "./useCRUD.jsx";
import { ActiveTodo } from "./ActiveTodo/ActiveTodo.jsx";

const MainPage = () => {
  const checkAddress = useMatch("/todo/:id");
  return (
    <>
      <ControlPanel />
      <ToAddTodo />
      {!checkAddress ? <Todos /> : <Outlet />}
    </>
  );
};

export default function App() {
  const { isFoundTodo } = useTodoState();

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route path="todo/:id" element={<ActiveTodo />} />
        </Route>
      </Routes>

      {!isFoundTodo && (
        <div className={styles.notFoundDiv}>{"Ничего не найдено:("}</div>
      )}
    </>
  );
}
