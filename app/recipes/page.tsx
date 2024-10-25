import { getRecipes } from "@/lib/queries/recipes"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { TypographyH1 } from "@/components/typography"
import RecipeGrid from "@/components/recipeGrid"
import PaginationController from "@/components/paginationController"

type Params = {
  page?: number
}

export default async function Page({ searchParams }: { searchParams: Params }) {
  const { isEnabled } = draftMode()
  const { page } = searchParams

  const recipesPerPage = 20
  const skip = page ? (page - 1) * recipesPerPage : 0

  const data = await getRecipes({
    limit: recipesPerPage,
    skip,
    isDraftMode: isEnabled,
  })

  const recipes = data?.recipeCollection?.items
  const totalPages = Math.ceil(data?.recipeCollection?.total / recipesPerPage)

  if (!recipes) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <TypographyH1>Recipes</TypographyH1>
      <RecipeGrid recipes={recipes} />
      <PaginationController totalPages={totalPages} />
    </div>
  )
}
