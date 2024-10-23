import renderRichText from "@/components/richText"
import { TypographyH1 } from "@/components/typography"
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

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode()

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
      <TypographyH1>{page.title}</TypographyH1>
      <div>{renderRichText(page.details.json)}</div>
    </div>
  )
}
