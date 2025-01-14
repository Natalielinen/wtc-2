/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, hashSync } from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "../models/User";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();
        
        if (!credentials) {
          return null;
        }
 
        const values = {
          email: credentials.email,
        }

        const findUser = await User.findOne(values);

        if (!findUser) {
          return null;
        };

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          return null;
        };

        if (!findUser.verified) {
          return null;
        };

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
        }
      },
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
     strategy: 'jwt'
   },
  callbacks: {
    async signIn({user, account}) {
      try {
        if (account?.provider === 'credentials') {
          return true;
        };

        if (!user.email) {
          return false;
        }

       await dbConnect();

       await User.create({
         email: user.email,
         fullName: user.name || 'User #' + user.id,
         password: hashSync(user.id.toString(), 10), // to change
         verified: new Date(),
         provider: account?.provider,
         providerId: account?.providerAccountId,
       });


        return true;

      } catch (e) {
        console.log(e);
        return false;
      }
      
    },
    async jwt({token, user}) {
      if (!token.email) {
        token.sub = user.id; 
        return token;
      }
    

    const findUser = await User.findOne({email: token.email});

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
      };

      return token;
    },

    session({session, token}) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.sub as string;
        
      };

      return session;
    
    }

  }
};