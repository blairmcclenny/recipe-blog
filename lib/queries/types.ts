import { Document } from "@contentful/rich-text-types"

export type RecipeTag = {
  sys: {
    id: string
  }
  title: string
  slug: string
  image: {
    description: string
    width: number
    height: number
    url: string
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
    title: string
    description: string
    url: string
    width: number
    height: number
  }
  details: {
    json: Document
  }
  tagsCollection: {
    items: RecipeTag[]
  }
}
