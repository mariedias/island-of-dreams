import Image from 'next/image';

export const FormContainer = ({ title, children }) => {
    return (
        <main className="bg-[#F3E5DB] w-[400px] h-auto pt-5 pb-10 px-6 rounded-3xl shadow-lg flex flex-col items-center">
            <Image src="/images/island-of-dreams.png" alt="Island of Dreams Logo"
            width={300}
            height={160}
            quality={100}
            priority
            />
            <h4 className="text-[#ff9895ac] text-lg text-center mt-2">{title}</h4>
            {children}
        </main>
    )
}