import { Document } from "@contentful/rich-text-types"

export type RecipeSlugs = {
  recipeCollection: {
    items: {
      slug: string
    }[]
  }
}

export type Recipes = {
  recipeCollection: {
    items: {
      sys: {
        id: string
      }
      title: string
      slug: string
      summary: string
      date: string
      image: {
        description: string
        url: string
        width: number
        height: number
      }
      details: {
        json: Document
      }
      tagsCollection: {
        items: {
          sys: {
            id: string
          }
          title: string
          slug: string
        }[]
      }
    }[]
  }
}

export type RecipeTag = {
  sys: {
    id: string
  }
  title: string
  slug: string
  image: {
    description: string
    url: string
    width: number
    height: number
  }
  summary: string
}

export type Recipe = {
  sys: {
    id: string
  }
  title: string
  slug: string
  summary: string
  date: string
  image: {
    description: string
    url: string
    width: number
    height: number
  }
  details: {
    json: Document
  }
  tagsCollection: {
    items: {
      sys: {
        id: string
      }
      title: string
      slug: string
    }[]
  }
}
