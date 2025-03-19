"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

import { FormContainer } from "../FormContainer";
import { Input } from "../Input";
import { Button } from "../Button";
import { useState } from "react";
import { Loader } from "../Loader";

export default function FormLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginAttempt = async (e) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      callbackUrl: "/",
      username,
      password,
    });
    setLoading(false);
  };

  return (
    <section className="bg-[url('/images/bg-island-of-dreams.png')] bg-cover bg-center min-h-screen w-full flex items-center justify-center">
      <div>
        <FormContainer title="find your way back to the island">
          <form
            className="flex flex-col gap-4 mt-5 items-center"
            onSubmit={loginAttempt}
          >
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="username"
              minLength={1}
              maxLength={15}
              required
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "sign in"}
            </Button>
            <p className="text-[#8EB261] font-regular text-sm">
              don't have an account?
              <Link href="/signup" className="font-medium text-base">
                {" "}
                register
              </Link>
            </p>
          </form>
        </FormContainer>
      </div>
    </section>
  );
}
