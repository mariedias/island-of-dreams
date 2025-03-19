"use client";

import { useRef, useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { CardTitle } from "../CardTitle";
import { CardInput } from "../CardInput";
import { Textarea } from "../Textarea";
import { Loader } from "../Loader";
import { ButtonLoader } from "../ButtonLoader";
import { redirect } from "next/navigation";

export const ModalExistingCard = ({ action, dream }) => {
  const modalRef = useRef(null);

  // State to manage input values
  const [title, setTitle] = useState(dream.title);
  const [description, setDescription] = useState(dream.description);
  const [selectedValue, setSelectedValue] = useState(dream.category);
  const [date, setDate] = useState(
    new Date(dream.date).toLocaleDateString("fr-CA")
  );
  const [dreamText, setDreamText] = useState(dream.dream);
  const [loading, setLoading] = useState(false);

  // Handlers for input changes
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleCategoryChange = (event) => setSelectedValue(event.target.value);
  const handleDateChange = (event) => setDate(event.target.value);
  const handleDreamTextChange = (event) => setDreamText(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.target);
      await action(formData, dream);

    } catch (error) {
      console.error("Erro ao atualizar sonho:", error);
    } finally {
      setLoading(false);
    }

    modalRef.current.closeModal();
    // redirect('/');
  };

  return (
    <>
      <Modal ref={modalRef}>
        <form onSubmit={handleSubmit}>
          <CardTitle
            className="flex justify-self-center w-[38rem] mx-5 border-none font-light text-[#FF9895] text-5xl placeholder-[#FF9895] bg-white outline-none"
            name="title"
            id="title"
            type="text"
            minLength={1}
            maxLength={15}
            value={title}
            onChange={handleTitleChange}
          />
          <CardInput
            type="text"
            name="description"
            id="description"
            minLength={0}
            maxLength={50}
            required
            className="flex justify-self-center mb-4 w-[40rem] h-10 text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-lg outline-none border-[#CCC] placeholder-[#00000089] bg-white"
            value={description}
            onChange={handleDescriptionChange}
          />
          <div className="flex flex-row justify-center gap-x-4 mb-2">
            <div>
              <select
                onChange={handleCategoryChange}
                value={selectedValue}
                id="selectCategory"
                name="category"
                className="flex justify-self-center mb-2 ml-[6px] w-[19.5rem] h-10 text-[#00000089] font-light text-sm px-4 border-[1.5px] rounded-lg outline-none border-[#CCC] bg-white cursor-pointer"
              >
                <option value="" disabled={selectedValue !== ""}>
                  pick your dream category
                </option>
                <option value="sweet">sweet</option>
                <option value="sour">sour</option>
              </select>
            </div>
            <CardInput
              type="date"
              name="date"
              id="date"
              className="custom-date-picker flex justify-self-center mb-2 mr-[6px] w-[19.5rem] h-10 text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-lg outline-none border-[#CCC] placeholder-[#CCC] bg-white cursor-pointer"
              required
              value={date}
              onChange={handleDateChange}
            />
          </div>
          <Textarea
            required
            rows={10}
            name="dream"
            value={dreamText}
            onChange={handleDreamTextChange}
          />
          <div className="flex justify-center items-baseline pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "save"}
            </Button>
          </div>
        </form>
      </Modal>
      <ButtonLoader onClick={() => modalRef.current.openModal()}>
        edit
      </ButtonLoader>
    </>
  );
};
