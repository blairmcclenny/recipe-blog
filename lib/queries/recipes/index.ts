import { fetchGraphQL } from "@/lib/api"
import {
  RecipeBySlug,
  Recipes,
  RecipesByTagSlug,
  RecipeSlugs,
  RecipeTagSlugs,
} from "@/lib/types/recipes"

import {
  linkAnchorFields,
  linkContentFields,
  linkIndexPageFields,
  linkUrlFields,
} from "@/lib/queries/navigation/fragments"

export async function getRecipeSlugs(isDraftMode = false) {
  const query = `#graphql
    query RecipeSlugs {
      recipeCollection(
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
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}

export async function getRecipes({
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
      $skip: Int
    ) {
      recipeCollection(
        limit: $limit
        skip: $skip
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        total
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
              links {
                entries {
                  hyperlink {
                    __typename
                    sys {
                      id
                    }
                    ... on Recipe {
                      slug
                    }
                    ... on Page {
                      slug
                    }
                    ... on Event {
                      slug
                    }
                  }
                  block {
                    ...linkUrlFields
                    ...linkAnchorFields
                    ...linkContentFields
                    ...linkIndexPageFields
                    ... on Quote {
                      __typename
                      sys {
                        id
                      }
                      quote
                      citation
                    }
                  }
                }
              }
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
      ${linkUrlFields}
      ${linkAnchorFields}
      ${linkContentFields}
      ${linkIndexPageFields}
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

export async function getRecipesByTagSlug({
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
              total
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
