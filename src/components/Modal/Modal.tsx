import css from "./Modal.module.css";
import {createPortal} from "react-dom";
import NoteForm from "../NoteForm/NoteForm.tsx";
import {useEffect} from "react";

interface ModalProps {
  onClose: () => void;
}

function Modal({onClose}: ModalProps) {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>
        <NoteForm onCancel={onClose}/>
      </div>
    </div>,
    document.body,
  );
}

export default Modal;