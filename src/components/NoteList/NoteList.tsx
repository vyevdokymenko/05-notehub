import css from "./NoteList.module.css";
import type { Note } from "../../types/note.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../services/noteService.ts";
import Loader from "../Loader/Loader.tsx";
import { useState } from "react";

interface NoteListProps {
  queryKey: string;
  notes: Note[];
}

function NoteList({ notes, queryKey }: NoteListProps) {
  const queryClient = useQueryClient();
  const deleteNoteM = useMutation({
    mutationFn: deleteNote,
    onMutate: (noteId) => setDeletingId(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
    onSettled: () => setDeletingId(null),
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = (noteId: Note["id"]) => {
    deleteNoteM.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note: Note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          {deletingId === note.id && <Loader />}
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
              disabled={deletingId === note.id}
            >
              {deletingId === note.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
