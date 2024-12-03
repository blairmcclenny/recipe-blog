import PaginationController from "@/components/pagination-controller"
import RecipeGrid from "@/components/recipe-grid"
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

export default async function Page(
  props: {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ page?: number }>
  }
) {
  const searchParams = await props.searchParams;
  const params = await props.params;
  const { slug } = params
  const { page } = searchParams
  const { isEnabled } = await draftMode()

  const limit = 20
  const skip = page ? (page - 1) * limit : 0

  const data = await getRecipesByTagSlug({
    limit,
    skip,
    tagSlug: slug,
    isDraftMode: isEnabled,
  })

  const recipeTag = data?.recipeTagCollection?.items?.[0]
  const recipes = recipeTag?.linkedFrom?.recipeCollection?.items
  const totalRecipes = recipeTag?.linkedFrom?.recipeCollection?.total
  const totalPages = Math.ceil(totalRecipes / limit)

  if (!recipeTag || !recipes || !recipes?.length) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 h-full">
      <TypographyH1>{recipeTag.title}</TypographyH1>
      <div className="flex flex-col justify-between h-full">
        <RecipeGrid recipes={recipes} />
        <PaginationController totalPages={totalPages} />
      </div>
    </div>
  )
}
