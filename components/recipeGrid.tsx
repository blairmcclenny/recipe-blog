import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecipeGrid({
  recipes,
}: {
  recipes: {
    title: string
    slug: string
    sys: {
      id: string
    }
    previewImage?: {
      description: string
      url: string
      width: number
      height: number
    }
  }[]
}) {
  if (!recipes) {
    return null
  }

  return (
    <div className="@container">
      <div className="grid @lg:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <Link href={`/recipes/${recipe.slug}`} key={recipe.sys.id}>
            <Card>
              <img
                src={recipe?.previewImage?.url}
                alt={recipe?.previewImage?.description}
                className="aspect-square"
              />
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
