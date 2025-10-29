/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginFormSchema } from "@/app/shared/schemas/loginFormSchema";
import { eq } from "drizzle-orm";
import { users } from "./schema";
import bcrypt from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Yandex({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
      authorization: {
        url: "https://oauth.yandex.ru/authorize",
        params: {
          response_type: "code",
          scope: "login:email login:info",
          force_confirm: "1",
        },
      },
    }),
    CredentialsProvider({
      //@ts-ignore
      authorize: async (credentials) => {
        const validatedFields = loginFormSchema.safeParse(credentials);

        if (validatedFields.success) {
          const user = await db.query.users.findFirst({
            where: eq(users.email, validatedFields.data.email),
          });

          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(
            validatedFields.data.password,
            user.password
          );

          if (passwordMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            };
          }

          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // user прилетает только при первом логине
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
