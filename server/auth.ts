import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.

      authorize: async (credentials, request) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(credentials.password as string, user.password)

        if (!isPasswordValid) {
          return null
        }

        return {
          ...user,
          id: user.id.toString()
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  }
})
