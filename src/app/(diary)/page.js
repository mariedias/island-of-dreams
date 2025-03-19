import { createDream } from "@/actions";
import { ModalCard } from "@/components/ModalCard";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { Card } from "@/components/Card";
import db from "../../../prisma/db";
import Link from "next/link";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { ChevronLeft } from "@/components/icons/ChevronLeft";
import { SearchBar } from "@/components/SearchBar";
import { Header } from "@/components/Header";
import { UserCircle } from "@/components/icons/UserCircle";

async function getAllDreams(page, searchTerm) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }

  try {
    let where = { authorId: session.user.id };

    if (searchTerm) {
      where.OR = [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ];
    }

    const perPage = 5;
    // const page = Number(query.page) || 1;
    const skip = (page - 1) * perPage;
    const totalItems = await db.dream.count({ where });
    const totalPages = Math.ceil(totalItems / perPage);
    const prev = page > 1 ? page - 1 : null;
    const next = page < totalPages ? page + 1 : null;

    const dreams = await db.dream.findMany({
      take: perPage,
      skip,
      where,
      orderBy: { id: "desc" },
      select: {
        title: true,
        description: true,
        category: true,
        date: true,
        slug: true,
        dream: true
      },
    });

    return { data: dreams, prev, next };
  } catch (error) {
    console.error("Erro ao obter dreams: ", error);
    return { data: [], prev: null, next: null };
  }
}

export default async function Home({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || 1);
  const searchTerm = searchParams?.q;
  const {
    data: dreams,
    prev,
    next,
  } = await getAllDreams(currentPage, searchTerm);

  // const addDream = createDream;

  return (
    <main className="flex flex-col justify-center items-center">
      <Header>
        <div className="fixed right-16 flex items-center bg-[#F3E5DB] drop-shadow-md rounded-full">
          <Link href="/profile">
            <UserCircle />
          </Link>
        </div>
      </Header>
      <SearchBar />
      <section className="pt-10 px-12 grid gap-y-4 gap-x-10 lg:grid-cols-5 md:grid-cols-2 md:pb-24 sm:pb-24">
        {dreams.map((dream) => (
          <Card key={dream.id} dream={dream} />
        ))}
        <div className="fixed bottom-5 left-0 right-0 flex flex-row justify-center">
          {prev && (
            <Link
              href={{ pathname: "/", query: { page: prev, q: searchTerm } }}
            >
              <ChevronLeft />
            </Link>
          )}
          {next && (
            <Link
              href={{ pathname: "/", query: { page: next, q: searchTerm } }}
            >
              <ChevronRight />
            </Link>
          )}
        </div>
      </section>
      <ModalCard action={createDream} />
    </main>
  );
}
