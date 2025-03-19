"use client";

import { useRef, useState } from "react";
import { Modal } from "../Modal";
import { IconButton } from "../IconButton";
import { Edit } from "../icons/Edit";
import { CardInput } from "../CardInput";
import { Button } from "../Button";
import { Loader } from "../Loader";

export const ModalUpdatePassword = ({ action, user }) => {
  const modalRef = useRef(null);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.target);
      await action(formData, user);
      setLoading(false);
    } catch (error) {
      console.error("Erro atualizar senha", error);
    }
    setPassword("");
    modalRef.current.closeModal();
  };

  return (
    <>
      <Modal
        ref={modalRef}
        className="w-[30rem] h-[16rem] p-4 rounded-3xl border-none bg-white drop-shadow-lg"
      >
        <form
          id='passwordForm'
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-5 mt-6"
        >
          <p className="text-[#00000089] font-light px-5 text-justify">
            update your password
          </p>
          <CardInput
            type="password"
            name="password"
            id="password"
            placeholder="your password"
            minLength={1}
            value={password}
            onChange={handlePasswordChange}
            required
            className="flex justify-self-center w-[21rem] h-9 text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-full outline-none  border-[#CCC] placeholder-[#CCC] bg-white"
          />
          <div className="flex gap-x-3">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "save "}
            </Button>
          </div>
        </form>
      </Modal>
      <IconButton onClick={() => modalRef.current.openModal()}>
        <Edit />
      </IconButton>
    </>
  );
};
