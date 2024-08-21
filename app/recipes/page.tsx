import Link from "next/link"
import { getAllRecipes, Recipe } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { TypographyLI, TypographyUL } from "@/components/typography"

export default async function Page() {
  const { isEnabled } = draftMode()
  const recipes: Recipe[] = await getAllRecipes(10, isEnabled)

  return (
    <div>
      <TypographyUL>
        {recipes.map((recipe: Recipe) => (
          <TypographyLI key={recipe.sys.id}>
            <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
          </TypographyLI>
        ))}
      </TypographyUL>
    </div>
  )
}
