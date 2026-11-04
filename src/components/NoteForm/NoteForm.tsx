import css from "./NoteForm.module.css";
import * as Yup from 'yup';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {useId} from "react";
import {getDefaultNoteTag, type Note} from "../../types/note.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "../../services/noteService.ts";

const INITIAL_VALUES: Note = {
  title: "",
  content: "",
  tag: getDefaultNoteTag(),
};

interface NoteFormProps {
  onClose: () => void,
  queryKey: string
}

function NoteForm({onClose, queryKey}: NoteFormProps) {
  const id = useId();
  const queryClient = useQueryClient();

  const createNoteM = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKey]});
      onClose();
    },
  });

  const handleSubmit = (values: Note): void => {
    createNoteM.mutate(values);
  };

  const NewNoteSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Title must be at least 3 characters")
      .max(30, "Title is too long")
      .required("Title is required"),
    content: Yup.string()
      .required("Content is required"),
  });

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={NewNoteSchema} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <Field
            id={`${id}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage
            name="title"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${id}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage
            name="content"
            component="span"
            className={css.error}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${id}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error}/>
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={false}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;