import css from "./App.module.css";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import {useState} from "react";
import Modal from "../Modal/Modal.tsx";

function App() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const modalOpen = (): void => {
    setIsModalOpened(true);
  }

  const modalClose = (): void => {
    setIsModalOpened(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination
          pageCount={12}
          onPageChange={() => {}}
          forcePage={1}
        />
        <button className={css.button} onClick={modalOpen}>
          Create note +
        </button>
        {isModalOpened && <Modal onClose={modalClose} />}
      </header>
    </div>
  )
}

export default App
