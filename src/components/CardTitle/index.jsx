import { TextDivider } from "../TextDivider";

export const CardTitle = (props) => {
  return (
    <section>
      <input
        {...props}
      />
      <TextDivider 
        className="flex justify-self-center mb-8 w-[40rem] h-[1px] bg-[#CCC] border-none"
      />
    </section>
  );
};
