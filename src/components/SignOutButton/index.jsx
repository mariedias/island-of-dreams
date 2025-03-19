"use client";

import { signOut } from "next-auth/react";
import { Button } from "../Button";

export const SignOutButton = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/signin" })}>
        logout
    </Button>
  );
};
