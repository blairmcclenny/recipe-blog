import { fetchGraphQL } from "../api"

const RECIPE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  date
  image {
    title
    description
    url
    width
    height
  }
  details {
    json
  }
  tagsCollection {
    items {
      sys {
        id
      }
      title
      slug
    }
  }
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
    }`,
    isDraftMode
  )

  return recipes?.data?.recipeCollection?.items
}

export async function getRecipeBySlug(slug: string, isDraftMode = false) {
  const recipe = await fetchGraphQL(
    `query {
        recipeCollection(where:{slug: "${slug}"}
        limit: 1
        preview: ${isDraftMode ? "true" : "false"}
      ) {
          items {
            ${RECIPE_GRAPHQL_FIELDS}
          }
        }
      }`,
    isDraftMode
  )

  return recipe?.data?.recipeCollection?.items[0]
}
