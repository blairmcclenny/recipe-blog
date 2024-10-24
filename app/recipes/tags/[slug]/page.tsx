import RecipeGrid from "@/components/recipeGrid"
import { TypographyH1 } from "@/components/typography"
import { getRecipesByTagSlug, getRecipeTagSlugs } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const data = await getRecipeTagSlugs()
  const recipeTagSlugs = data?.recipeTagCollection?.items

  return recipeTagSlugs?.map((recipeTag) => ({
    slug: recipeTag.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { isEnabled } = draftMode()

  const data = await getRecipesByTagSlug({
    limit: 20,
    skip: 0,
    tagSlug: slug,
    isDraftMode: isEnabled,
  })
  const recipeTag = data?.recipeTagCollection?.items?.[0]
  const recipes = recipeTag?.linkedFrom?.recipeCollection?.items

  if (!recipeTag || !recipes) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <TypographyH1>{recipeTag.title}</TypographyH1>
      <RecipeGrid recipes={recipes} />
    </div>
  )
}
