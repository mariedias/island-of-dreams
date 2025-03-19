import Image from "next/image";
import { UserCircle } from "../icons/UserCircle";
import Link from "next/link";

export const Header = ({ children }) => {
  return (
    <header className="bg-[#F3E5DB] h-40 w-full flex justify-center items-center drop-shadow-lg">
      <Image
        src="/images/island-of-dreams.png"
        alt="Island of Dreams Logo"
        width={280}
        height={160}
        quality={100}
        priority
      />
      {children}
    </header>
  )
}
