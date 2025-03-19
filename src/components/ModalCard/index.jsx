"use client";

import { useRef, useState } from "react";
import { AddCardButton } from "../AddCardButton";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { CardTitle } from "../CardTitle";
import { CardInput } from "../CardInput";
import { Textarea } from "../Textarea";
import { Loader } from "../Loader";

export const ModalCard = ({ action }) => {
  const modalRef = useRef(null);

  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    await action(formData);

    setLoading(false);
    document.getElementById('dreamForm').reset();
    setSelectedValue("");

    modalRef.current.closeModal();
  };

  return (
    <>
      <Modal ref={modalRef}>
        <form onSubmit={handleSubmit} id="dreamForm">
          <CardTitle
            className="flex justify-self-center w-[38rem] mx-5 border-none font-light text-[#FF9895] text-5xl placeholder-[#FF9895] bg-white outline-none"
            name="title"
            id="title"
            type="text"
            placeholder="title"
            minLength={1}
            maxLength={15}
          />
          <CardInput
            type="text"
            name="description"
            id="description"
            placeholder="description (max: 50 characters)"
            minLength={0}
            maxLength={50}
            required
            className="flex justify-self-center mb-4 w-[40rem] h-10 text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-lg outline-none  border-[#CCC] placeholder-[#00000089] bg-white"
          />
          <div className="flex flex-row justify-center gap-x-4 mb-2">
            <div>
              <select
                onChange={handleChange}
                value={selectedValue}
                id="selectCategory"
                name="category"
                className="flex justify-self-center mb-2 ml-[6px] w-[19.5rem] h-10 text-[#00000089] font-light text-sm px-4 border-[1.5px] rounded-lg outline-none border-[#CCC] bg-white cursor-pointer"
              >
                <option
                  value=""
                  disabled={selectedValue !== ""}
                  className="font-light text-md text-[#CCC]"
                >
                  pick your dream category
                </option>
                <option
                  value="sweet"
                  className="font-light text-sm text-[#00000089]"
                >
                  sweet
                </option>
                <option
                  value="sour"
                  className="font-light text-sm text-[#00000089]"
                >
                  sour
                </option>
              </select>
            </div>
            <CardInput
              type="date"
              name="date"
              id="date"
              placeholder="date"
              className="custom-date-picker flex justify-self-center mb-2 mr-[6px] w-[19.5rem] h-10 text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-lg outline-none  border-[#CCC] placeholder-[#CCC] bg-white cursor-pointer"
              required
            />
          </div>
          <Textarea
            required
            rows={10}
            name="dream"
            placeholder="tell me about your dream..."
          />
          <div className="flex justify-center items-baseline pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "create"}
            </Button>
          </div>
        </form>
      </Modal>
      <AddCardButton onClick={() => modalRef.current.openModal()} />
    </>
  );
};
