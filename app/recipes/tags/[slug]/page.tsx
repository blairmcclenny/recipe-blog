import { TypographyH1 } from "@/components/typography"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  getAllRecipesByTagSlug,
  getRecipeTagSlugs,
} from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const data = await getRecipeTagSlugs()
  const recipeTagSlugs = data?.recipeTagCollection?.items

  return recipeTagSlugs?.map((recipeTag) => ({
    slug: recipeTag.slug,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { isEnabled } = draftMode()

  const data = await getAllRecipesByTagSlug({
    limit: 20,
    skip: 0,
    tagSlug: slug,
    isDraftMode: isEnabled,
  })
  const recipeTag = data?.recipeTagCollection?.items?.[0]
  const recipes = recipeTag?.linkedFrom?.recipeCollection?.items

  if (!recipeTag || !recipes) {
    notFound()
  }

  return (
    <div>
      <TypographyH1>{recipeTag.title}</TypographyH1>
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
