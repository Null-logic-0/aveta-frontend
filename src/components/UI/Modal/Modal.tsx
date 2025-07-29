import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (typeof dialog.showModal === "function" && !dialog.open) {
      dialog.showModal();
    }

    const handleBackdropClick = (e: MouseEvent) => {
      if (e.target === dialog) onClose?.();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    dialog.addEventListener("click", handleBackdropClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.close();
      dialog.removeEventListener("click", handleBackdropClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const modalRoot = document.getElementById("modal");
  if (!modalRoot) return null;

  return createPortal(
    <dialog ref={dialogRef} className={classes.modal}>
      {children}
    </dialog>,
    modalRoot
  );
}
