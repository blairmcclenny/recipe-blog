import { getRecipes } from "@/lib/queries/recipes"
import { notFound } from "next/navigation"
import { draftMode } from "next/headers"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { TypographyH1 } from "@/components/typography"

export default async function Page() {
  const { isEnabled } = draftMode()

  const data = await getRecipes({
    limit: 20,
    isDraftMode: isEnabled,
  })
  const recipes = data?.recipeCollection?.items

  if (!recipes) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <TypographyH1>Recipes</TypographyH1>
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
    </div>
  )
}
