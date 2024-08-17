import { getRecipeBySlug, Recipe } from "@/lib/queries/recipes"

export default async function Page({ params }: { params: { slug: string } }) {
  const recipe: Recipe = await getRecipeBySlug(params.slug)

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.summary}</p>
    </div>
  )
}
