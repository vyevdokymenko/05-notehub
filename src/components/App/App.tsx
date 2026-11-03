import css from "./App.module.css";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";

function App() {

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination
          pageCount={12}
          onPageChange={() => {}}
          forcePage={1}
        />
        <button
          className={css.button}
        >
          Create note +
        </button>
      </header>
    </div>
  )
}

export default App
