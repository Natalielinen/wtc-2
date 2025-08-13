'use server';

import {createSafeActionClient} from 'next-safe-action';
import { db } from '@/server';
import { eq } from 'drizzle-orm';
import { users } from '../schema';
import { generateEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './emails';
import { signIn } from '../auth';
import { AuthError } from 'next-auth';
import { loginFormSchema } from '@/app/shared/schemas/loginFormSchema';

const actionClient = createSafeActionClient();

export const emailSignin = actionClient
  .schema(loginFormSchema)
  .action(async ({ parsedInput: { userEmail: email, userPassword: password } }) => {

    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) });

    if(existingUser?.email !== email) {
      return { error: 'User not found' };

    }

    // if(!existingUser.emailVerified) {
    //   return { error: 'Email not verified' };
    // }


    console.log(email, password);
    return {success: "success"}

  });