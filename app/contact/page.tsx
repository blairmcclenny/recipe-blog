import { TypographyH1 } from "@/components/typography"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="max-w-lg mx-auto space-y-4">
      <TypographyH1>Contact</TypographyH1>
      <Input type="text" placeholder="Name" />
      <Input type="email" placeholder="Email" />
      <Textarea placeholder="Type your message here." />
      <Button type="submit">Send</Button>
    </div>
  )
}
