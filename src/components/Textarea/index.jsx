export const Textarea = ({ children, ...props }) => {
  return (
    <textarea className="resize-none flex justify-self-center mb-4 w-[40rem] max-h-[88px] text-[#00000089] font-light text-sm p-4 border-[1.5px] rounded-lg outline-none  border-[#CCC] placeholder-[#00000089] bg-white" {...props}>
        {children}
    </textarea>
  );
};
