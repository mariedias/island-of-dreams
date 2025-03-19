"use client";

import { useRef, useState } from "react";
import { Button } from "../Button";
import { ButtonLoader } from "../ButtonLoader";
import { Modal } from "../Modal";
import { redirect } from "next/navigation";
import { Loader } from "../Loader";

export const ModalDeleteDream = ({ action, dreamId }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await action(dreamId);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao deletar sonho:", error);
    }
    modalRef.current.closeModal();
    redirect('/');
  };

  return (
    <>
      <Modal
        ref={modalRef}
        className="w-[30rem] h-[16rem] p-10 rounded-3xl border-none bg-white drop-shadow-lg"
      >
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-5 mt-6">
          <p className="text-[#00000089] font-light px-5 pt-2 pb-5 text-justify">are you sure you want to delete this dream?</p>
          <div className="flex gap-x-5">
            <Button type="button" onClick={() => modalRef.current.closeModal()}>
              cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "delete"}
            </Button>
          </div>
        </form>
      </Modal>
      <ButtonLoader onClick={() => modalRef.current.openModal()}>
        delete
      </ButtonLoader>
    </>
  );
};
