import renderRichText from "@/components/richText"
import { TypographyH1 } from "@/components/typography"
import { getPages } from "@/lib/queries/pages"

export default async function Home() {
  const data = await getPages({ pageSlug: "home", isDraftMode: false })
  const page = data?.pageCollection?.items?.[0]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TypographyH1>{page.title}</TypographyH1>
      <div className="prose lg:prose-lg">
        {renderRichText(page.details.json)}
      </div>
    </main>
  )
}
