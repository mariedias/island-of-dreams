"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { IconButton } from "../IconButton";
import { Close } from "../icons/Close";

export const Modal = forwardRef(({ children, ...props }, ref) => {
  const dialogRef = useRef(null);

  const closeModal = () => {
    dialogRef.current.close();
  };

  const openModal = () => {
    dialogRef.current.showModal();
  };

  useImperativeHandle(ref, () => {
    return {
      closeModal,
      openModal,
    };
  });

  return (
      <dialog
        ref={dialogRef}
        className="resize-none w-[50rem] h-[30rem] p-10 rounded-3xl border-none bg-white"
        {...props}
      >
        <header className="flex justify-end">
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </header>
        {children}
      </dialog>
  );
});
