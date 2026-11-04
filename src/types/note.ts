export const noteTags = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;
export type NoteTag = (typeof noteTags)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewNote {
  title: string;
  content: string;
  tag: NoteTag;
}

export const getDefaultNoteTag = (): NoteTag => {
  return noteTags[0];
};
