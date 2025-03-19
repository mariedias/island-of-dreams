import { redirect } from "next/navigation";
import db from "../../../../../prisma/db";
import { DreamPage } from "@/components/DreamPage";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/auth";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons/ArrowLeft";

export async function generateStaticParams() {
  const dreams = await db.dream.findMany({
    select: {
      slug: true,
    },
  });
  return dreams.map((dream) => ({ slug: dream.slug }));
}

async function getDreamBySlug(slug) {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }

  try {
    const dream = await db.dream.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        date: true,
        dream: true,
      },
    });

    if (!dream) {
      throw new Error(`dream with slug ${slug} doesn't existing`);
    }

    return dream;
  } catch (error) {
    console.log("Falha ao obter slug =>", error?.message || error);
    return null;
  }
}

export default async function PageDream({ params }) {
  const { slug } = await params;
  
  if (!slug) {
    redirect("/not-found");
  }

  const dream = await getDreamBySlug(slug);

  if (!dream) {
    redirect("/not-found");
  }

  return (
    <div>
      <DreamPage dream={dream} />
    </div>
  );
}
