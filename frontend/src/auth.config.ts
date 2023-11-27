import type { NextAuthConfig } from "next-auth"

declare module "@auth/core/types" {
  interface User {
    role?: string
    status?: string
    token?: string
  }
  interface Session {
    user: {
      id?: string
      role?: string
      status?: string
      token?: string
    } & DefaultSession["user"]
  }
}

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          status: user.status,
          token: user.token,
        }
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          status: token.status,
          token: token.token,
        },
      }
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      return true
    },
  },
} satisfies NextAuthConfig
