import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import LoginUser from "./core/application/usecase/LoginUser"
import { userDb } from "./lib/database"

const loginUser = LoginUser.getInstance(userDb)
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials)
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await loginUser.execute({ email, password })
          return user
        }
        return null
      },
    }),
  ],
})
