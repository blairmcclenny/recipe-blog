import Link from "next/link"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

function BackgroundGradient() {
  const gradients = [
    `bg-gradient-to-br from-yellow-400 to-red-200`,
    `bg-gradient-to-br from-green-400 to-blue-200`,
    `bg-gradient-to-br from-pink-400 to-purple-200`,
    `bg-gradient-to-br from-blue-400 to-green-200`,
    `bg-gradient-to-br from-purple-400 to-pink-200`,
  ]
  const gradient = gradients[Math.floor(Math.random() * gradients.length)]

  return <div className={`aspect-square ${gradient}`} />
}

export default function RecipeGrid({
  recipes,
}: {
  recipes: {
    title: string
    slug: string
    sys: {
      id: string
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
              <BackgroundGradient />
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
