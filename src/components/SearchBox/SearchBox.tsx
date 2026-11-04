import css from "./SearchBox.module.css";
import type { ChangeEventHandler } from "react";

interface SearchBoxProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function SearchBox({ onChange }: SearchBoxProps) {
  return <input className={css.input} type="text" placeholder="Search notes" onChange={onChange} />;
}

export default SearchBox;
