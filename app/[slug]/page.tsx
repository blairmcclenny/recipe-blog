import renderRichText, { richTextOptions } from "@/components/rich-text"
import { getPages, getPageSlugs } from "@/lib/queries/pages"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const data = await getPageSlugs(false)
  const pageSlugs = data?.pageCollection?.items

  return pageSlugs?.map((pageSlug) => ({
    slug: pageSlug.slug,
  }))
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { isEnabled } = await draftMode()

  const data = await getPages({
    limit: 1,
    pageSlug: params.slug,
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
