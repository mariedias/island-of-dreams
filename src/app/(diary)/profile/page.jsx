import { options } from "@/app/api/auth/[...nextauth]/auth";
import { ArrowLeft } from "@/components/icons/ArrowLeft";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { UserCircle } from "@/components/icons/UserCircle";
import { ProfileTextfield } from "@/components/ProfileTextfield";
import db from "../../../../prisma/db";
import { SignOutButton } from "@/components/SignOutButton";
import { ModalUpdateUsername } from "@/components/ModalUpdateUsername";
import { updatePassword, updateUsername } from "@/actions";
import { ModalUpdatePassword } from "@/components/ModalUpdatePassword";

export default async function Profile() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
      where: {
          email: session.user.email
      }
  })

  return (
    <main>
      <Header />
      <div className="fixed top-44 left-5">
        <Link href="/">
          <ArrowLeft />
        </Link>
      </div>
      <section className="flex flex-col gap-10 justify-center items-center py-16">
        <div className="border-[3px] border-[#e7fefe98] rounded-full drop-shadow-lg">
          <UserCircle className="size-24 text-[#d7eeeec1]" />
        </div>
        <div className="flex flex-col gap-y-5">
          <ProfileTextfield>
            {user.username}
            <ModalUpdateUsername action={updateUsername} user={user}/>
          </ProfileTextfield>
          <ProfileTextfield>{user.email}</ProfileTextfield>
          <ProfileTextfield>
            ******
            <ModalUpdatePassword action={updatePassword} user={user}/>
          </ProfileTextfield>
        </div>
        <SignOutButton />
      </section>
    </main>
  );
}
