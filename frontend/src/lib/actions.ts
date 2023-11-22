"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
const URL = `${process.env.EXPRESS_URL}`
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
      let token = cookies().get("token")?.value
      let url = `${URL}/users/${id}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, name, role, status }),
      })
      if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(errorMessage)
      }
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
      let token = cookies().get("token")?.value
      const url = `${URL}/users`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, name, password, confirmPassword, role }),
      })
      if (!res.ok) {
        const errorMessage = await res.text()
        throw new Error(errorMessage)
      }
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
