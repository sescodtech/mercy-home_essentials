import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import Credentials from "next-auth/providers/credentials";
import { User } from "@/models/User";
import connectDB from "@/lib/mongodb";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & any;
  }

  interface User {
    role: string;
  }
}

const client = new MongoClient(process.env.MONGODB_URI!);
const adapter = MongoDBAdapter(client);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
