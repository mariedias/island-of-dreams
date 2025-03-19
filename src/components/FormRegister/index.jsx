import Link from "next/link";

import { FormContainer } from "../FormContainer";
import { Input } from "../Input";
import { createUser } from "@/actions";
import { ButtonLoader } from "../ButtonLoader";

export default function FormResgiter() {
  return (
    <section className="bg-[url('/images/bg-island-of-dreams.png')] bg-cover bg-center min-h-screen w-full flex items-center justify-center">
      <div>
        <FormContainer title="claim your own island, register now!">
          <form
            className="flex flex-col gap-4 mt-5 items-center"
            action={createUser}
          >
            <Input
              name="email"
              id="email"
              type="email"
              placeholder="email"
              required
            />
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="username"
              minLength={1}
              maxLength={15}
              required
            />
            <Input
              name="password"
              id="password"
              type="password"
              placeholder="password"
              required
            />
            <ButtonLoader type="submit">register</ButtonLoader>
            <p className="text-[#8EB261] font-regular text-sm">
              already has an account?
              <Link href="/signin" className="font-medium text-base">
                {" "}
                sign in
              </Link>
            </p>
          </form>
        </FormContainer>
      </div>
    </section>
  );
}
