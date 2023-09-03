import api from "@/services/api";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, req) {
        try {
          const response = await api.post(`/users/signin`, {
            email: credentials.email,
            password: credentials.password,
          });
          return { status: "success", data: response.data };
        } catch (error) {
          throw new Error(error.response.data.message);
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        const updatedSession = {
          ...token,
          user: session.data,
        };

        return updatedSession;
      }

      if (user) {
        token.accessToken = user.data.data.token;
        token.user = user.data.data.user;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    },
  },

  options: {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/",
      signOut: "/",
      error: "/",
      verifyRequest: "/",
      newUser: "/",
    },
  },
};

export default NextAuth(authOptions);
