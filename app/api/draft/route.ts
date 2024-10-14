
import { getRecipeBySlug } from "@/lib/queries/recipes"
import { draftMode } from "next/headers"
import { redirect } from "next/navigation"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")
  const slug = searchParams.get("slug")

  if (!secret || !slug) {
    return new Response("Missing parameters", { status: 400 })
  }

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  const data = await getRecipeBySlug(slug)
  const recipe = data?.recipeCollection?.items?.[0]

  if (!recipe) {
    return new Response("Recipe not found", { status: 404 })
  }

  draftMode().enable()
  redirect(`/recipes/${recipe.slug}`)
}
