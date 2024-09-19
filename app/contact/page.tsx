"use client"

import { useState } from "react"
import { submitContactForm } from "./actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { TypographyH1 } from "@/components/typography"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    const result = await submitContactForm(formData)
    setIsSubmitting(false)

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Success",
        description: "Your message has been sent. We'll get back to you soon!",
      })

      const form = document.getElementById("contact-form") as HTMLFormElement
      form.reset()
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <TypographyH1>Contact Us</TypographyH1>
      <form id="contact-form" action={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            className="min-h-[100px]"
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  )
}
