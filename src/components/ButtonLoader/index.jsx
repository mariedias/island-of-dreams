"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../Button";
import { Loader } from "../Loader";

export const ButtonLoader = ({children, ...props}) => {
    const { pending } = useFormStatus();

    return (
        <Button disabled={ pending } {...props}>
            { pending ? <Loader /> : children }
        </Button>
    )
}