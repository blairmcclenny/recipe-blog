import { fetchGraphQL } from "../api"
import { RecipeBySlug, Recipes, RecipeSlugs } from "./types"

export async function getAllRecipes(limit?: Number, isDraftMode = false) {
  const query = `#graphql
    query Recipes(
      $limit: Int
    ) {
      recipeCollection(
        where: { slug_exists: true }
        limit: $limit
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          sys {
            id
          }
          title
          slug
          image {
            description
            url
            width
            height
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
        }
      }
    }
  `

  const data = await fetchGraphQL<Recipes>({
    query,
    variables: { limit },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}

export async function getRecipeBySlug(slug: string, isDraftMode = false) {
  const query = `#graphql
    query RecipeBySlug(
      $where: RecipeFilter
    ) {
      recipeCollection(
        limit: 1
        where: $where
        preview: ${isDraftMode ? "true" : "false"}
      ) {
          items {
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
          }
        }
      }
    `

  const data = await fetchGraphQL<RecipeBySlug>({
    query,
    variables: { where: { slug } },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
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

  const data = await fetchGraphQL<RecipeSlugs>({
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
