"use client";

import { ArrowLeft } from "@/components/icons/ArrowLeft";
import Image from "next/image";
import Link from "next/link";
import banner from "./not-found/hello-kitty-walking.gif";
import { FormContainer } from "@/components/FormContainer";

export default function NotFound() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <FormContainer>
        <section className="my-5 flex flex-col justify-center items-center">
          <h2 className="text-center text-xl font-medium text-[#FF9895]">
            uh-oh!
          </h2>
          <p className="mb-4 text-center text-md font-light text-[#FF9895]">
            looks like this dream drifted away with the tide...
          </p>
          <figure className="mb-5 w-40 h-40">
            <Image
              height={140}
              width={140}
              src={banner}
              alt="gif of hello kitty walking on the beach"
            />
          </figure>
          <p className="mt-5 mb-2 text-md font-medium text-[#8EB261]">
            let's return to your island
          </p>
            <Link href="/">
              <ArrowLeft className="size-8 text-[#8EB261] hover:text-[#adc98c95]" />
            </Link>
        </section>
      </FormContainer>
    </main>
  );
}
