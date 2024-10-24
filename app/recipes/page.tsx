import { getRecipes } from "@/lib/queries/recipes"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { TypographyH1 } from "@/components/typography"
import RecipeGrid from "@/components/recipeGrid"

export default async function Page() {
  const { isEnabled } = draftMode()

  const data = await getRecipes({
    limit: 20,
    isDraftMode: isEnabled,
  })
  const recipes = data?.recipeCollection?.items

  if (!recipes) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <TypographyH1>Recipes</TypographyH1>
      <RecipeGrid recipes={recipes} />
    </div>
  )
}
