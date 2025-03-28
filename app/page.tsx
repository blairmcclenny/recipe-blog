import renderRichText, { richTextOptions } from "@/components/rich-text"
import { getPages } from "@/lib/queries/pages"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

export default async function Home() {
  const { isEnabled } = await draftMode()

  const data = await getPages({
    limit: 1,
    pageSlug: "home",
    isDraftMode: isEnabled,
  })
  const page = data?.pageCollection?.items?.[0]

  if (!page) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {renderRichText(page.details.json, richTextOptions(page.details.links))}
    </div>
  )
}
