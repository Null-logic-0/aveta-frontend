import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
};

export default function Modal({ children, onClose, className }: ModalProps) {
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
    <dialog
      ref={dialogRef}
      className={twMerge(
        `fixed top-[10vh] left-1/2 -translate-x-1/2 w-[30rem] max-h-[80vh] p-8 bg-[#1e1e25] border border-[#3b3a3f] rounded-3xl z-40 shadow-[0_2px_8px_rgba(0,0,0,0.26)] flex flex-col justify-between ${classes.modal}`,
        className
      )}
    >
      {children}
    </dialog>,
    modalRoot
  );
}
