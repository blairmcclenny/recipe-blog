import { getAllRecipes } from "@/lib/queries/recipes/recipes"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default async function Page() {
  const { isEnabled } = draftMode()

  const data = await getAllRecipes(20, isEnabled)
  const recipes = data?.recipeCollection?.items

  if (!recipes) {
    notFound()
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <Link href={`/recipes/${recipe.slug}`} key={recipe.sys.id}>
          <Card>
            <CardHeader>
              <CardTitle>{recipe.title}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  )
}
