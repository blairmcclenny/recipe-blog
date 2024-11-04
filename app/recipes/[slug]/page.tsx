import { getRecipeBySlug, getRecipeSlugs } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { TypographyH1, TypographyP } from "@/components/typography"
import renderRichText, { recipeOptions } from "@/components/rich-text"

export async function generateStaticParams() {
  const data = await getRecipeSlugs()
  const recipeSlugs = data?.recipeCollection?.items

  return recipeSlugs?.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode()

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
      <TypographyP>{recipe.summary}</TypographyP>
      <div>
        {recipe.date &&
          new Date(recipe.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </div>
      <div>
        {renderRichText(
          recipe.details.json,
          recipeOptions(recipe.details.links)
        )}
      </div>
    </div>
  )
}
