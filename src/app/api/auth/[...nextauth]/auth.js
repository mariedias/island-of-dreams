import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import db from "../../../../../prisma/db";
import bcrypt from "bcrypt";

export const options = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    Credentials({
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await db.user.findFirst({
            where: {
              username: credentials.username,
            },
          });

          if (!foundUser) {
            throw new Error("user not found");
          }

          console.log("usuário encontrado");

          const passMatch = bcrypt.compareSync(
            credentials.password,
            foundUser.password
          );

          if (!passMatch) {
            throw new Error("incorrect password");
          }

          console.log("Usuário correto");
          delete foundUser.password;
          return foundUser;
        } catch (error) {
          console.error("Erro de autenticação =>", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = parseInt(token.sub);
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
