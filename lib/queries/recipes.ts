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

export async function getAllRecipes() {
  const recipes = await fetchGraphQL(
    `query {
      recipeCollection {
        items {
          ${RECIPE_GRAPHQL_FIELDS}
        }
      }
    }`
  )

  return recipes?.data?.recipeCollection?.items
}
