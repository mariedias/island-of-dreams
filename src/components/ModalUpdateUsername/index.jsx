"use client";

import { useRef, useState } from "react";
import { Modal } from "../Modal";
import { IconButton } from "../IconButton";
import { Edit } from "../icons/Edit";
import { CardInput } from "../CardInput";
import { Button } from "../Button";
import { Loader } from "../Loader";

export const ModalUpdateUsername = ({ action, user }) => {
  const modalRef = useRef(null);

  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(event.target);
      await action(formData, user);
      setLoading(false);
    } catch (error) {
      console.error("Erro atualizar username", error);
    }
    
    modalRef.current.closeModal();
  };

  return (
    <>
      <Modal
        ref={modalRef}
        className="w-[30rem] h-[16rem] p-4 rounded-3xl border-none bg-white drop-shadow-lg"
      >
        <form
          id="usernameForm"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-5 mt-6"
        >
          <p className="text-[#00000089] font-light px-5 text-justify">
            update your username
          </p>
          <CardInput
            type="text"
            name="username"
            id="username"
            minLength={1}
            maxLength={15}
            value={username}
            onChange={handleUsernameChange}
            required
            className="flex justify-self-center w-[21rem] h-9 text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-full outline-none  border-[#CCC] placeholder-[#00000089] bg-white"
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
