import Link from "next/link";
import { ArrowLeft } from "../icons/ArrowLeft";
import { TextDivider } from "../TextDivider";
import { ModalExistingCard } from "../ModalExistingCard";
import { deleteDream, updateDream } from "@/actions";
import { ModalDeleteDream } from "../ModalDeleteDream";

export const DreamPage = ({ dream }) => {
  return (
    <main className="flex flex-col gap-y-5 justify-center items-center min-h-screen">
      <div className="fixed top-5 left-5">
        <Link href="/">
          <ArrowLeft />
        </Link>
      </div>
      <article className="relative w-[50rem] h-auto min-h-[30rem] p-10 rounded-3xl bg-white drop-shadow-lg">
        <header>
          <h2 className="flex justify-self-center w-[40rem] font-light text-[#FF9895] text-5xl">
            {dream.title}
          </h2>
          <TextDivider className="flex justify-self-center mb-5 mt-2 w-[42.5rem] h-[1px] bg-[#CCC] border-none" />
        </header>
        <section>
          <p className="text-[#00000089] font-light px-5 pb-2 text-justify">
            {dream.description}
          </p>
          <p className="text-[#CCC] font-light px-5 pb-2">
            &lt;{dream.category}&gt;
          </p>
          <p className="text-[#00000089] font-light px-5 pb-2 text-justify">
            {dream.dream}
          </p>
        </section>
        <footer>
          <p className="absolute bottom-2 right-2 text-[#CCC] text-xs font-light px-3 pb-2">
            {/* {new Date(dream.date).toLocaleDateString()} */}
            {new Date(dream.date).toLocaleDateString("pt-BR")}
          </p>
        </footer>
      </article>
      <div className="flex gap-20">
        <ModalExistingCard action={updateDream} dream={dream}/>
        <ModalDeleteDream action={deleteDream} dreamId={dream.id}/>
      </div>
    </main>
  );
};
