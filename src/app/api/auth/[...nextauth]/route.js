import NextAuth from "next-auth";
import connectionDb from "@/db/db";
import GithubProvider from "next-auth/providers/github";
import User from "@/model/user";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { sign } from "jsonwebtoken";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        console.log(credentials, "cred");
        const { email, password } = credentials;
        try {
          await connectionDb();
          const user = await User.findOne({ email: email });
          if (!user) {
            return null;
          }

          let pass = bcrypt.compare(password, user.password);

          if (!pass) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      console.log(session);
      return session;
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/login",
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
