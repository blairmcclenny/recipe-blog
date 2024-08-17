import { fetchGraphQL } from "../api"

export interface Recipe {
  sys: {
    id: string
  }
  title: string
  slug: string
  summary: string
}

const RECIPE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
`

export async function getAllRecipes(limit = 10, isDraftMode = false) {
  const recipes = await fetchGraphQL(
    `query {
      recipeCollection(
        where: { slug_exists: true }
        limit: ${limit}
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          ${RECIPE_GRAPHQL_FIELDS}
        }
      }
    }`
  )

  return recipes?.data?.recipeCollection?.items
}
