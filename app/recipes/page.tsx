import { Fragment } from "react"
import Link from "next/link"
import { getAllRecipes, Recipe } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"

export default async function Page() {
  const { isEnabled } = draftMode()
  const recipes: Recipe[] = await getAllRecipes(10, isEnabled)

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
