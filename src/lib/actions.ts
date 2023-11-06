"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import GuestRepositoryDatabase from "@/core/infra/db/GuestRepositoryDatabase"
import RegisterGuestEntry from "@/core/application/usecase/RegisterGuestEntry"
import { auth } from "@/auth"

export async function saveEntryGuest(formData: FormData) {
  const db = new GuestRepositoryDatabase()
  const session = await auth()
  try {
    const newGuest = z
      .object({
        name: z.string().min(1),
        entryDate: z.string().min(1),
        observation: z.string().optional(),
        apartment: z.coerce.number().optional(),
      })
      .safeParse(Object.fromEntries(formData))
    if (newGuest.success) {
      const input = {
        ...newGuest.data,
        entryDate: new Date(newGuest.data.entryDate),
        createdBy: session.user.id as string,
      }
      await new RegisterGuestEntry(db).execute(input)
    } else {
      console.log(newGuest.error)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export async function saveEntryVehicle(formData: FormData) {
  const db = new GuestRepositoryDatabase()
  const session = await auth()
  try {
    const newGuest = z
      .object({
        name: z.string().min(1),
        entryDate: z.string().min(1),
        plate: z.string().min(1),
        model: z.string().min(1),
        pax: z.coerce.number().min(1).nonnegative(),
        observation: z.string().optional(),
        apartment: z.coerce.number().optional(),
      })
      .safeParse(Object.fromEntries(formData))
    if (newGuest.success) {
      const input = {
        ...newGuest.data,
        entryDate: new Date(newGuest.data.entryDate),
        createdBy: session.user.id as string,
      }
      await new RegisterGuestEntry(db).execute(input)
    } else {
      console.log(newGuest.error)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData))
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin"
    }
    throw error
  }
}

export async function createUser(formData: FormData) {}
