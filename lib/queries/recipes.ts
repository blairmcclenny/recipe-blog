import { fetchGraphQL, fetchGraphQLv2 } from "../api"
import { RecipeSlugs } from "./types"

const RECIPE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  date
  image {
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

export async function getRecipeSlugs(isDraftMode = false) {
  const query = `#graphql
    query RecipeSlugs(
      $where: RecipeFilter
    ) {
      recipeCollection(
        where: $where
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          slug
        }
      }
    }
  `

  const data = await fetchGraphQLv2<RecipeSlugs>({
    query,
    variables: {
      where: { slug_exists: true },
    },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}
