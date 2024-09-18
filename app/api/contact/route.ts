import { NextResponse } from "next/server"
import { z } from "zod"
// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, message } = result.data

    // Store the submission in the database
    // const submission = await prisma.contactSubmission.create({
    //   data: {
    //     name,
    //     email,
    //     message,
    //   },
    // })

    // Optionally, you can still send an email notification
    await sendEmail({
      to: "your-email@example.com",
      subject: "New Contact Form Submission",
      body: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    })

    return NextResponse.json(
      {
        message: "Contact form submitted successfully",
        // submissionId: submission.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    // await prisma.$disconnect()
  }
}

async function sendEmail({
  to,
  subject,
  body,
}: {
  to: string
  subject: string
  body: string
}) {
  console.log(`Sending email to ${to}:`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)
  await new Promise((resolve) => setTimeout(resolve, 1000))
}
