import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { z } from "zod"
const URL = `${process.env.EXPRESS_URL}`
async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const url = `${URL}/login`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data = await res.json()
  cookies().set("token", data.token, { httpOnly: true })
  return data
}

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
          const user = loginUser({ email, password })
          return user
        }
        return null
      },
    }),
  ],
})
