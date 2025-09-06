"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "@/server";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { generateEmailVerificationToken } from "./tokens";
import { registerFormSchema } from "@/app/shared/schemas/registerFormSchema";
import bcrypt from "bcrypt";
import { sentVerificationEmail } from "./emails";

const actionClient = createSafeActionClient();

export const emailRegister = actionClient
  .schema(registerFormSchema)
  .action(
    async ({
      parsedInput: { userEmail: email, userName: name, userPassword: password },
    }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      if (existingUser) {
        if (!existingUser.emailVerified) {
          const verificationToken = await generateEmailVerificationToken(email);
          await sentVerificationEmail(email, verificationToken[0].token);
          return { success: "Email confirmation resent" };
        }
        return { error: "User already exists" };
      }

      await db.insert(users).values({
        email,
        name,
        password: hashedPassword,
      });

      const verificationToken = await generateEmailVerificationToken(email);

      await sentVerificationEmail(email, verificationToken[0].token);

      return { success: "Email confirmation sent" };
    }
  );
