import css from "./NoteList.module.css";
import type {Note} from "../../types/note.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteNote} from "../../services/noteService.ts";

interface NoteListProps {
  notes: Note[];
  queryKey: string;
}

function NoteList({notes, queryKey}: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteNoteM = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKey]});
    },
  });

  const handleDelete = (noteId: Note["id"]) => {
    deleteNoteM.mutate(noteId);
  }

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => handleDelete(note.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;