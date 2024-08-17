import { Fragment } from "react"
import { getAllRecipes, Recipe } from "@/lib/queries/recipes"

export default async function Page() {
  const recipes: Recipe[] = await getAllRecipes()

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <Fragment key={recipe.sys.id}>
          <h2 key={recipe.sys.id}>{recipe.title}</h2>
          <p>{recipe.summary}</p>
        </Fragment>
      ))}
    </div>
  )
}
