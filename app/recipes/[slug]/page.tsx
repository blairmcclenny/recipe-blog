import { getAllRecipes, getRecipeBySlug, Recipe } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

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
      <h1>{recipe.title}</h1>
      <p>{recipe.summary}</p>
    </div>
  )
}
