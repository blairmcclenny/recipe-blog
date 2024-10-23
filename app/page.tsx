import renderRichText from "@/components/richText"
import { TypographyH1 } from "@/components/typography"
import { getPages } from "@/lib/queries/pages"

export default async function Home() {
  const data = await getPages({ limit: 1, pageSlug: "home", isDraftMode: false })
  const page = data?.pageCollection?.items?.[0]

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <TypographyH1>{page.title}</TypographyH1>
      <div>
        {renderRichText(page.details.json)}
      </div>
    </div>
  )
}
