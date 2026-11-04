import css from "./App.module.css";
import Pagination from "../Pagination/Pagination.tsx";
import SearchBox from "../SearchBox/SearchBox.tsx";
import {type ChangeEvent, useState} from "react";
import Modal from "../Modal/Modal.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes} from "../../services/noteService.ts";
import {useDebouncedCallback} from "use-debounce";
import NoteList from "../NoteList/NoteList.tsx";

const QUERY_KEY = "notes";

function App() {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const [searchText, setSearchText] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const {data, isSuccess} = useQuery({
    queryKey: [QUERY_KEY, searchText, page],
    queryFn: () => fetchNotes({searchText: searchText, page: page}),
    placeholderData: keepPreviousData,
  });

  const updateSearchText = useDebouncedCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value),
    300,
  );

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchText}/>
        {
          isSuccess && data.totalPages > 1 && <Pagination
            pageCount={data.totalPages}
            onPageChange={({selected}) => setPage(selected + 1)}
            forcePage={page - 1}
          />
        }
        <button className={css.button} onClick={() => setIsModalOpened(true)}>
          Create note +
        </button>
        {isModalOpened && <Modal onClose={() => setIsModalOpened(false)}/>}
      </header>
      <section>
        {isSuccess && <NoteList queryKey={QUERY_KEY} notes={data.notes}/>}
      </section>
    </div>
  );
}

export default App;
