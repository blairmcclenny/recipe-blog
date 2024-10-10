import { getAllRecipes, getRecipeBySlug } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import { TypographyH1, TypographyP } from "@/components/typography"
import renderRichText from "@/components/richText"
import { Recipe } from "@/lib/queries/types"

export async function generateStaticParams() {
  const recipes: Recipe[] = await getAllRecipes()

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode()
  const recipe: Recipe = await getRecipeBySlug(params.slug, isEnabled)

  if (!recipe) {
    notFound()
  }

  return (
    <div>
      <TypographyH1>{recipe.title}</TypographyH1>
      <TypographyP>{recipe.summary}</TypographyP>
      {/* <div>
        {recipe.date &&
          new Date(recipe.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </div> */}
      <div>{renderRichText(recipe.details?.json)}</div>
    </div>
  )
}
