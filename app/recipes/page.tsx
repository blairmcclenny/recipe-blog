import { Fragment } from "react"
import { getAllRecipes, Recipe } from "@/lib/queries/recipes"
import Link from "next/link"

export default async function Page() {
  const recipes: Recipe[] = await getAllRecipes()

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <Fragment key={recipe.sys.id}>
          <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
        </Fragment>
      ))}
    </div>
  )
}
