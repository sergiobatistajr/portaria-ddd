"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import RegisterGuestEntry from "@/core/application/usecase/RegisterGuestEntry"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { guestDb } from "./database"

const registerGuestEntry = RegisterGuestEntry.getInstance(guestDb)
export async function saveEntryGuest(formData: FormData) {
  try {
    const session = await auth()
    const parsed = z
      .object({
        name: z.string().min(1),
        entryDate: z.string().min(1),
        observation: z.string().optional(),
        apartment: z.coerce.number().optional(),
      })
      .safeParse(Object.fromEntries(formData))
    if (parsed.success) {
      const { name, entryDate, apartment, observation } = parsed.data
      await registerGuestEntry.execute({
        name,
        entryDate: new Date(entryDate),
        createdBy: session?.user?.id,
        apartment,
        observation,
      })
    }
    revalidatePath("/dashboard/exit")
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}
export async function saveEntryVehicle(formData: FormData) {
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
        createdBy: session?.user?.id as string,
      }
      await registerGuestEntry.execute(input)
      revalidatePath("/dashboard/exit")
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
    console.log(formData)
    await signIn("credentials", Object.fromEntries(formData))
  } catch (error) {
    if (error instanceof Error) {
      return "Credenciais inválidas"
    }
  }
}

export async function createUser(formData: FormData) {}
