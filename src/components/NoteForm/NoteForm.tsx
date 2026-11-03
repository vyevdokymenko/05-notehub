import css from "./NoteForm.module.css";
import {ErrorMessage, Form, Formik, type FormikHelpers} from "formik";
import {useId} from "react";

interface NoteFormValues {
  title: string;
  content: string;
  tag: "" | "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

const INITIAL_VALUES: NoteFormValues = {
  title: "",
  content: "",
  tag: ""
};

function NoteForm() {
  const handleSubmit = (
    values: NoteFormValues,
    formikHelpers: FormikHelpers<NoteFormValues>
  ): void => {
    console.log(values);
    console.log(formikHelpers);
  };

  const id = useId();

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <input id={`${id}-title`} type="text" name="title" className={css.input}/>
          <ErrorMessage name="title" component="span" className={css.error}/>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error}/>
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          <ErrorMessage name="tag" component="span" className={css.error}/>
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
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