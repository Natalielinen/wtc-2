import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";
 
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
        allowDangerousEmailAccountLinking: true
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
      
  ],
})