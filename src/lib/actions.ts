"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import RegisterGuestEntry from "@/core/application/usecase/RegisterGuestEntry"
import RegisterUser from "@/core/application/usecase/RegisterUser"
import RegisterGuestDeparture from "@/core/application/usecase/RegisterGuestDeparture"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { guestDb, userDb } from "./database"
import { redirect } from "next/navigation"

const registerUser = RegisterUser.getInstance(userDb)
const registerGuestEntry = RegisterGuestEntry.getInstance(guestDb)
const registerGuestDeparture = RegisterGuestDeparture.getInstance(guestDb)
export async function saveExitGuest(prevState: any, formData: FormData) {
  try {
    const parsed = z
      .object({
        id: z.string().min(1),
        departureDate: z.string().min(1),
      })
      .safeParse(Object.fromEntries(formData))
    if (parsed.success) {
      const { id, departureDate } = parsed.data
      await registerGuestDeparture.execute({
        id,
        departureDate: new Date(departureDate),
      })
    } else if (parsed.error) {
      throw new Error(parsed.error.message)
    }
    revalidatePath("/dashboard/exit")
    redirect("/dashboard")
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
  }
}
export async function saveEntryGuest(prevState: any, formData: FormData) {
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
        // @ts-ignore
        createdBy: session?.user?.id,
        apartment,
        observation,
      })
    } else {
      throw new Error(parsed.error.message)
    }
    revalidatePath("/dashboard/exit")
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return { message: error.message }
    }
  }
}
export async function saveEntryVehicle(prevState: any, formData: FormData) {
  const session = await auth()
  try {
    const parsed = z
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
    if (parsed.success) {
      const input = {
        ...parsed.data,
        entryDate: new Date(parsed.data.entryDate),
        // @ts-ignore
        createdBy: session?.user?.id,
      }
      await registerGuestEntry.execute(input)
      revalidatePath("/dashboard/exit")
    } else {
      throw new Error(parsed.error.message)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      return { message: error.message }
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
    if (error instanceof Error) {
      return "Credenciais inválidas"
    }
  }
}

export async function createUser(prevState: any, formData: FormData) {
  try {
    const parsed = z
      .object({
        name: z.string().min(1),
        email: z.string().email().min(1),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
      })
      .safeParse(Object.fromEntries(formData))
    if (parsed.success) {
      const { email, name, password, confirmPassword } = parsed.data
      await registerUser.execute({ email, name, password, confirmPassword })
    } else {
      throw new Error(parsed.error.message)
    }
    revalidatePath("/dashboard/user")
    redirect("/dashboard")
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message }
    }
  }
}
