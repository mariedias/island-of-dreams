"use client"

import { useSession } from "next-auth/react";
import { useFormStatus } from "react-dom";
import { Loader } from "../Loader";

export const Button = ({ children, ...props }) => {

    // const { pending } = useFormStatus();
    // const { data: session } = useSession();

    return (
        <button 
            className="bg-[#88C3C3] hover:opacity-90 text-white text-md font-medium w-40 h-auto p-2.5 rounded-3xl drop-shadow-md cursor-pointer" 
            {...props}
        >
            {children}
            {/* { pending ? <Loader /> : children } */}
        </button>
    );
}