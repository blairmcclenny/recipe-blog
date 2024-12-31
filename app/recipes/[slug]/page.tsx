import { getRecipeBySlug, getRecipeSlugs } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { TypographyH1, TypographyMuted } from "@/components/typography"
import renderRichText, { richTextOptions } from "@/components/rich-text"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export async function generateStaticParams() {
  const data = await getRecipeSlugs()
  const recipeSlugs = data?.recipeCollection?.items

  return recipeSlugs?.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export default async function Page(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const { isEnabled } = await draftMode()

  const data = await getRecipeBySlug({
    slug: params.slug,
    isDraftMode: isEnabled,
  })
  const recipe = data?.recipeCollection?.items?.[0]

  if (!recipe) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <TypographyH1>{recipe.title}</TypographyH1>
      <TypographyMuted>
        {recipe.date &&
          new Date(recipe.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </TypographyMuted>
      <div className="mt-12">
        {renderRichText(
          recipe.details.json,
          richTextOptions(recipe.details.links)
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        {recipe.tagsCollection.items.map((tag) => (
          <Link href={`/recipes/tags/${tag.slug}`} key={tag.sys.id}>
            <Badge variant="outline">{tag.title}</Badge>
          </Link>
        ))}
      </div>
    </div>
  )
}
