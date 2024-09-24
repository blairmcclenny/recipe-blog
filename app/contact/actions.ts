"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"

const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Message must be 1000 characters or less"),
})

export async function submitContactForm(formData: FormData) {
  const result = ContactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  if (!result.success) {
    return { error: result.error.issues[0].message }
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  // TODO: Send the form data to the server and send an email
  console.log("Form submission:", result.data)

  revalidatePath("/")
  return { success: true }
}
