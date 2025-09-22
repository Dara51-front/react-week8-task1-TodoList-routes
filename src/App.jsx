import { Route, Routes } from "react-router-dom";
// import styles from './App.module.css';
// import { useTodoState } from './useCRUD.jsx';
import { ActiveTodo } from "./components/ActiveTodo/ActiveTodo.jsx";
import { MainPage } from "./components/MainPage.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="todo/:id" element={<ActiveTodo />} />
      </Routes>
    </>
  );
}
