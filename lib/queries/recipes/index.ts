import { fetchGraphQL } from "@/lib/api"
import {
  RecipeBySlug,
  Recipes,
  RecipesByTagSlug,
  RecipeSlugs,
  RecipeTagSlugs,
} from "./types"

export async function getAllRecipes({
  limit = 0,
  skip = 0,
  isDraftMode = false,
}: {
  limit?: number
  skip?: number
  isDraftMode?: boolean
}) {
  const query = `#graphql
    query Recipes(
      $limit: Int
    ) {
      recipeCollection(
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
        }
      }
    }
  `

  const data = await fetchGraphQL<Recipes>({
    query,
    variables: { limit, skip },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}

export async function getAllRecipesByTagSlug({
  limit = 0,
  skip = 0,
  tagSlug,
  isDraftMode = false,
}: {
  limit?: number
  skip?: number
  tagSlug: string
  isDraftMode?: boolean
}) {
  const query = `#graphql
    query Recipes(
      $limit: Int
      $skip: Int
      $where: RecipeTagFilter
    ) {
      recipeTagCollection(
        where: $where
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          title
          linkedFrom {
            recipeCollection(limit: $limit, skip: $skip) {
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
              }
            }
          }
        }
      }
    }
  `

  const data = await fetchGraphQL<RecipesByTagSlug>({
    query,
    variables: {
      limit,
      skip,
      where: {
        slug: tagSlug,
      },
    },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}

export async function getRecipeBySlug({
  slug,
  isDraftMode = false,
}: {
  slug: string
  isDraftMode?: boolean
}) {
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

export async function getRecipeTagSlugs(isDraftMode = false) {
  const query = `#graphql
    query RecipeTagSlugs {
      recipeTagCollection(
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          slug
        }
      }
    }
  `

  const data = await fetchGraphQL<RecipeTagSlugs>({
    query,
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}
