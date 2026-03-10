"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { sentVerificationEmail } from "./emails";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { loginFormSchema } from "@/app/shared/schemas/loginFormSchema";

const actionClient = createSafeActionClient();

export const emailSignin = actionClient
  .schema(loginFormSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser?.email !== email) {
        return { error: "Пользователь с таким email не найден" };
      }

      if (!existingUser?.password) {
        return {
          error:
            "Для этого аккаунта использовался вход через Google или Яндекс",
        };
      }

      if (!existingUser.emailVerified) {
        const verificationToken = await generateEmailVerificationToken(
          existingUser.email
        );
        await sentVerificationEmail(email, verificationToken[0].token);
        return { success: "Письмо с подтверждением отправлено" };
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      return { success: "Вы успешно вошли" };
    } catch (error) {
      console.log("error", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Неверный логин или пароль" };
          default:
            return { error: "Something went wrong" };
        }
      }
      return { error: "Something went wrong" };
    }
  });
