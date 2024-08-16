import { getAllRecipes, Recipe } from "@/lib/queries/recipes"

export default async function Page() {
  const recipes: Recipe[] = await getAllRecipes()

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <h2 key={recipe.sys.id}>{recipe.title}</h2>
      ))}
    </div>
  )
}
