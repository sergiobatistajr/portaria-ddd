"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import RegisterGuestEntry from "@/core/application/usecase/RegisterGuestEntry"
import RegisterUser from "@/core/application/usecase/RegisterUser"
import RegisterGuestDeparture from "@/core/application/usecase/RegisterGuestDeparture"
import UpdateUser from "@/core/application/usecase/UpdateUser"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { guestDb, userDb } from "./database"
import { redirect } from "next/navigation"
import ResetPassword from "@/core/application/usecase/ResetPassword"

const registerUser = RegisterUser.getInstance(userDb)
const registerGuestEntry = RegisterGuestEntry.getInstance(guestDb)
const registerGuestDeparture = RegisterGuestDeparture.getInstance(guestDb)
const updateuser = UpdateUser.getInstance(userDb)
const resetPasswordUser = ResetPassword.getInstance(userDb)
export async function resetPassword(prevState: any, formData: FormData) {
  const validatedFields = z
    .object({
      id: z.string().min(1),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
    })
    .safeParse(Object.fromEntries(formData))
  if (validatedFields.success) {
    const { id, confirmPassword, password } = validatedFields.data
    try {
      await resetPasswordUser.execute({ id, confirmPassword, password })
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message }
      }
    }
  } else if (validatedFields.error) {
    return { message: validatedFields.error.message }
  }
  revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}
export async function updateUser(prevState: any, formData: FormData) {
  const validatedFields = z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
      email: z.string().email().min(1),
      status: z.string().min(1),
      role: z.string().min(1),
    })
    .safeParse(Object.fromEntries(formData))
  if (validatedFields.success) {
    const { email, name, id, status, role } = validatedFields.data
    try {
      await updateuser.execute({
        email,
        id,
        name,
        role,
        status,
      })
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message }
      }
    }
  } else if (validatedFields.error) {
    return { message: validatedFields.error.message }
  }
  revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}

export async function saveExitGuest(prevState: any, formData: FormData) {
  const validatedFields = z
    .object({
      id: z.string().min(1),
      departureDate: z.string().min(1),
    })
    .safeParse(Object.fromEntries(formData))
  if (validatedFields.success) {
    const { id, departureDate } = validatedFields.data
    try {
      await registerGuestDeparture.execute({
        id,
        departureDate: new Date(departureDate),
      })
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message }
      }
    }
  } else if (validatedFields.error) {
    return { message: validatedFields.error.message }
  }
  revalidatePath("/dashboard/exit")
}
export async function saveEntryGuest(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  const validatedFields = z
    .object({
      name: z.string().min(1),
      entryDate: z.string().min(1),
      observation: z.string().optional(),
      apartment: z.coerce.number().optional(),
    })
    .safeParse(Object.fromEntries(formData))
  if (validatedFields.success) {
    const { name, entryDate, apartment, observation } = validatedFields.data
    if (session?.user.id)
      try {
        await registerGuestEntry.execute({
          name,
          entryDate: new Date(entryDate),
          createdBy: session?.user?.id,
          apartment,
          observation,
        })
      } catch (error) {
        if (error instanceof Error) {
          return { error: true, message: error.message }
        }
      }
  } else if (validatedFields.error) {
    return { error: true, message: validatedFields.error.message }
  }
  revalidatePath("/dashboard/exit")
  return {
    error: false,
    message: "Sucesso",
  }
}
export async function saveEntryVehicle(prevState: any, formData: FormData) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  const validatedFields = z
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
  if (validatedFields.success) {
    if (session?.user.id) {
      const input = {
        ...validatedFields.data,
        entryDate: new Date(validatedFields.data.entryDate),
        createdBy: session?.user?.id,
      }
      try {
        await registerGuestEntry.execute(input)
      } catch (error) {
        if (error instanceof Error) {
          return {
            error: true,
            message: error.message,
          }
        }
      }
    }
  } else if (validatedFields.error) {
    return {
      error: true,
      message: validatedFields.error.message,
    }
  }
  revalidatePath("/dashboard/exit")
  return {
    error: false,
    message: "Sucesso",
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
  const validatedFields = z
    .object({
      name: z.string().min(1),
      email: z.string().email().min(1),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
      role: z.string().min(1),
    })
    .safeParse(Object.fromEntries(formData))
  if (validatedFields.success) {
    const { email, name, password, confirmPassword, role } =
      validatedFields.data
    try {
      await registerUser.execute({
        email,
        name,
        password,
        confirmPassword,
        role,
      })
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message }
      }
    }
  } else if (validatedFields.error) {
    return { message: validatedFields.error.message }
  }
  revalidatePath("/dashboard/user")
  redirect("/dashboard/user")
}
