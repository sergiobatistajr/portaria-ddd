"use server"
import { z } from "zod"
import { signIn } from "@/auth"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const URL = `${process.env.EXPRESS_URL}`

export async function fixGuest(prevState: any, formData: FormData) {
  const validatedFields = z
    .object({
      id: z.string().min(1),
      name: z.string().min(1),
      entryDate: z.string().min(1),
      createdBy: z.string().min(1),
      status: z.string().min(1),
      plate: z.string().optional(),
      model: z.string().optional(),
      pax: z.coerce.number().optional(),
      apartment: z.coerce.number().optional(),
      observation: z.string().optional(),
      departureDate: z.string().optional(),
    })
    .safeParse(Object.fromEntries(formData))
  if (validatedFields.success) {
    const {
      id,
      createdBy,
      entryDate,
      name,
      status,
      apartment,
      departureDate,
      model,
      observation,
      pax,
      plate,
    } = validatedFields.data
    try {
      const session = await auth()
      const url = `${URL}/fix-guests/${id}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          createdBy,
          entryDate,
          name,
          status,
          apartment,
          departureDate,
          model,
          observation,
          pax,
          plate,
        }),
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
  revalidatePath("/dashboard/exit")
  revalidatePath("/dashboard/fix")
  revalidatePath("/dashboard/report")
  return {
    error: false,
    message: "Sucesso",
  }
}
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
      const session = await auth()
      const url = `${URL}/users/reset-password/${id}`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({ confirmPassword, password }),
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
      const session = await auth()
      const url = `${URL}/users/${id}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
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
      const session = await auth()
      const url = `${URL}/guests/${id}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({ departureDate }),
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
  revalidatePath("/dashboard/exit")
  revalidatePath("/dashboard/fix")
  revalidatePath("/dashboard/report")
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
        const session = await auth()
        const url = `${URL}/guests`
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify({
            name,
            entryDate,
            createdBy: session?.user?.id,
            apartment,
            observation,
          }),
        })
        if (!res.ok) {
          const errorMessage = await res.text()
          throw new Error(errorMessage)
        }
      } catch (error) {
        if (error instanceof Error) {
          return { error: true, message: error.message }
        }
      }
  } else if (validatedFields.error) {
    return { error: true, message: validatedFields.error.message }
  }
  revalidatePath("/dashboard/exit")
  revalidatePath("/dashboard/fix")
  revalidatePath("/dashboard/report")
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
        const session = await auth()
        const url = `${URL}/guests`
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(input),
        })
        if (!res.ok) {
          const errorMessage = await res.text()
          throw new Error(errorMessage)
        }
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
  revalidatePath("/dashboard/fix")
  revalidatePath("/dashboard/report")
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
      const session = await auth()
      const url = `${URL}/users`
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user.token}`,
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
