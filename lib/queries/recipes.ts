import { fetchGraphQL } from "../api"
import { Document } from "@contentful/rich-text-types"

export interface Recipe {
  sys: {
    id: string
  }
  title: string
  slug: string
  summary: string
  date: string
  author: Author
  category: Category
  image: Image
  details: Details
  prepTime: string
  cookTime: string
  totalTime: string
  serves: string
  ingredients: Ingredients
  preparations: Preparations
}

type Author = {
  name: string
  slug: string
}

type Category = {
  name: string
  slug: string
}

type Image = {
  title: string
  description: string
  url: string
  width: string
  height: string
}

type Details = {
  json: Document
}

type Ingredients = {
  json: Document
}

type Preparations = {
  json: Document
}

const RECIPE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  slug
  summary
  date
  author {
    name
    slug
  }
  category {
    title
    slug
  }
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
  prepTime
  cookTime
  totalTime
  serves
  ingredients {
    json
  }
  preparations {
    json
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
