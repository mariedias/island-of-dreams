import Link from "next/link";
import { TextDivider } from "../TextDivider";

export const Card = ({ dream }) => {
  return (
    <Link href={`/dreams/${dream.slug}`}>
      <article className="relative bg-white w-60 h-[19rem] rounded-3xl shadow-xl cursor-pointer">
        <header>
          <h3 className="px-4 pt-2 mt-2 text-center text-2xl font-light text-[#FF9895]">
            {dream.title}
          </h3>
          <TextDivider className="flex justify-self-center w-[13rem] h-[1.5px] mb-4 mt-2" />
        </header>
        <section>
          <p className="text-[#00000089] font-light px-4 pb-2 text-justify">
            {dream.description}
          </p>
          <p className="text-[#CCC] font-light px-4 pb-2">
            &lt;{dream.category}&gt;
          </p>
        </section>
        <footer>
          <p className="absolute bottom-2 right-2 text-[#CCC] text-xs font-light px-3 pb-2">
            {new Date(dream.date).toLocaleDateString("pt-BR")}
          </p>
        </footer>
      </article>
    </Link>
  );
};
