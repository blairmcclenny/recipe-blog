import renderRichText from "@/components/richText"
import { TypographyH1 } from "@/components/typography"
import { getPages, getPageSlugs } from "@/lib/queries/pages"

export async function generateStaticParams() {
  const data = await getPageSlugs(false)
  const pageSlugs = data?.pageCollection?.items

  return pageSlugs?.map((pageSlug) => ({
    slug: pageSlug.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getPages({
    limit: 1,
    pageSlug: params.slug,
    isDraftMode: false,
  })
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
