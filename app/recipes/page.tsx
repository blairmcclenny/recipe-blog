import { getRecipes } from "@/lib/queries/recipes"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { TypographyH1 } from "@/components/typography"
import RecipeGrid from "@/components/recipeGrid"
import PaginationController from "@/components/paginationController"

export default async function Page({
  searchParams,
}: {
  searchParams: { page?: number }
}) {
  const { page } = searchParams
  const { isEnabled } = draftMode()

  const limit = 20
  const skip = page ? (page - 1) * limit : 0

  const data = await getRecipes({
    limit,
    skip,
    isDraftMode: isEnabled,
  })

  const recipes = data?.recipeCollection?.items
  const totalPages = Math.ceil(data?.recipeCollection?.total / limit)

  if (!recipes || !recipes?.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 h-full">
      <TypographyH1>Recipes</TypographyH1>
      <div className="flex flex-col justify-between h-full">
      <RecipeGrid recipes={recipes} />
      <PaginationController totalPages={totalPages} />
      </div>
    </div>
  )
}
