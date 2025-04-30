import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({

      
      authorize: async (credentials) => {
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
        const isPasswordValid =await  bcrypt.compare(credentials.password as string, user.password)
        console.log("Hashed password:", user.password)
        console.log("Provided password:", credentials.password)
        console.log("Password valid:", isPasswordValid)

        
        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          fullName: user.fullName,
          onboardingCompleted: user.onboardingCompleted,
          userType: user.userType === "EMPLOYEE" ? "USER" : user.userType
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.fullName = token.fullName as string
        session.user.userType = token.userType as "ADMIN" | "USER"
        session.user.onboardingCompleted = token.onboardingCompleted as boolean
      }
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.fullName = user.fullName
        token.userType = user.userType
        token.onboardingCompleted = user.onboardingCompleted
      }
      return token
    }
  },
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  }
})
