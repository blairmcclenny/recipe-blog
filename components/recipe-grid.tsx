import Link from "next/link"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

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
    tagsCollection: {
      items: {
        sys: {
          id: string
        }
        title: string
        slug: string
      }[]
    }
  }[]
}) {
  if (!recipes) {
    return null
  }

  return (
    <div className="@container mt-6">
      <div className="grid @lg:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.sys.id}>
            <Link href={`/recipes/${recipe.slug}`}>
              {recipe.previewImage ? (
                <Image
                  src={recipe.previewImage.url}
                  alt={recipe.previewImage?.description || ""}
                  width={recipe.previewImage.width}
                  height={recipe.previewImage.height}
                  className="aspect-square"
                />
              ) : (
                <div className="aspect-square bg-muted" />
              )}
            </Link>
            <CardHeader>
              <Link href={`/recipes/${recipe.slug}`}>
                <CardTitle className="leading-tight">{recipe.title}</CardTitle>
              </Link>
            </CardHeader>
            <CardFooter className="flex-wrap gap-1">
              {recipe.tagsCollection.items.map((tag) => (
                <Link href={`/recipes/tags/${tag.slug}`} key={tag.sys.id}>
                  <Badge variant="outline">{tag.title}</Badge>
                </Link>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
