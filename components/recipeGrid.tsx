import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

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
              {recipe.previewImage ? (
                <Image
                  src={recipe.previewImage.url}
                  alt={recipe.previewImage?.description}
                  width={recipe.previewImage.width}
                  height={recipe.previewImage.height}
                  className="aspect-square"
                />
              ) : (
                <div className="aspect-square bg-muted" />
              )}

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
