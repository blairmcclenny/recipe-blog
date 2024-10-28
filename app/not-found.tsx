import { TypographyH2, TypographyP } from "@/components/typography"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 text-center space-y-8">
      <TypographyH2>Not Found</TypographyH2>
      <TypographyP>Could not find requested resource</TypographyP>
      <Link href="/">Return Home</Link>
    </div>
  )
}
