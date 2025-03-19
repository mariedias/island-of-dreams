"use server";

import { Prisma } from "@prisma/client";

import db from "../../prisma/db";
import { redirect } from "next/navigation";

import bcrypt from "bcrypt";
import slugify from "slugify";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/auth";
import { revalidatePath } from "next/cache";

export async function createUser(formData) {
  try {
    console.log("Iniciando cadastro de usuário");

    const email = formData.get("email");
    const username = formData.get("username");
    const existingUser = await db.user.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
      return { error: "user already exists" };
    }

    const hashedPassword = bcrypt.hashSync(formData.get("password"), 10);

    await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    console.log("Cadastro finalizado");
  } catch (error) {
    console.log("Falha ao criar usuário =>", error);
    return { error: "authentication failed" };
  }

  redirect("/signin");
}

async function generateUniqueSlug(title) {
  let baseSlug = slugify(title, { lower: true, strict: true });
  let slug = baseSlug;
  let existingDream = await db.dream.findUnique({
    where: { slug },
  });
  let count = 1;

  while (existingDream) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

export async function createDream(formData) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("usuário não autenticado");
  }

  const title = formData.get("title");
  const slug = await generateUniqueSlug(title);
  const date = new Date(formData.get("date") + "T00:00:00")

  try {
    await db.dream.create({
      data: {
        title,
        slug,
        description: formData.get("description"),
        category: formData.get("category"),
        date,
        dream: formData.get("dream"),
        authorId: session.user.id,
      },
    });
  } catch (error) {
    console.log("Falha ao criar sonho", error);
    return;
  }

  revalidatePath("/");
}

export async function updateDream(formData, dream) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("usuário não autenticado");
  }

  const existingDream = await db.dream.findUnique({
    where: {
      id: dream.id,
    },
    select: {
      title: true,
    },
  });

  if (!existingDream) {
    throw new Error("Sonho não encontrado");
  }

  const title = formData.get("title");
  const lowercaseTitle = title.toLowerCase();
  const lowercaseExistingTitle = existingDream.title.toLowerCase();
  let slug = lowercaseExistingTitle == lowercaseTitle ? undefined : await generateUniqueSlug(title);
  const date = new Date(formData.get("date") + "T00:00:00");

  try {
    await db.dream.update({
      where: { id: dream.id },
      data: {
        title,
        slug,
        description: formData.get("description"),
        category: formData.get("category"),
        date,
        dream: formData.get("dream"),
      },
    });
  } catch(error) {
    console.log("Falha ao atualizar sonho =>", error);
    return;
  }
  
  revalidatePath(`/dreams/${dream.slug}`);
}

export async function deleteDream(dreamId) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("usuário não autenticado");
  }

  if (!dreamId) {
    console.error("Erro: ID do sonho é inválido", dreamId)
    return;
  }

  try {
    await db.dream.delete({
      where: {
        id: dreamId,
      },
    });

    console.log("Sonho deletado com sucesso!");
  } catch (error) {
    console.log("Falha ao deletar sonho", error);
    return;
  }
  revalidatePath(`/`);
}

export async function updateUsername(formData, user) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("usuário não autenticado");
  }

  const username = formData.get("username");
    const existingUser = await db.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return { error: "user already exists" };
    }

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        username,
      },
    });
  } catch(error) {
    console.log("Falha ao atualizar username =>", error);
    return;
  }
  
  revalidatePath(`/profile`);
}

export async function updatePassword(formData, user) {
  const session = await getServerSession(options);

  if (!session) {
    throw new Error("usuário não autenticado");
  }

  const hashedPassword = bcrypt.hashSync(formData.get("password"), 10);

  try {
    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
  } catch(error) {
    console.log("Falha ao atualizar senha =>", error);
    return;
  }
  
  revalidatePath(`/profile`);
}