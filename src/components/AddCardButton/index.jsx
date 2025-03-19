import { Add } from "../icons/Add";

export const AddCardButton = (props) => {
  return (
    <button {...props} className="fixed bottom-5 left-5 outline-none border-none bg-[#88C3C3] w-20 h-20 rounded-full drop-shadow-md flex justify-center items-center hover:opacity-95 hover:scale-105">
        <Add />
    </button>
  );
};
