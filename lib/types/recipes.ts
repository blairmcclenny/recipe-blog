import { Document } from "@contentful/rich-text-types"
import { RichTextLinks } from "@/lib/types/rich-text-links"

export type RecipeSlugs = {
  recipeCollection: {
    items: {
      slug: string
    }[]
  }
}

export type Recipes = {
  recipeCollection: {
    total: number
    items: {
      sys: {
        id: string
      }
      title: string
      slug: string
      previewImage: {
        description: string
        url: string
        width: number
        height: number
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

export type RecipeBySlug = {
  recipeCollection: {
    items: {
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
        links: RichTextLinks
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

export type RecipeTagSlugs = {
  recipeTagCollection: {
    items: {
      slug: string
    }[]
  }
}

export type RecipesByTagSlug = {
  recipeTagCollection: {
    items: {
      title: string
      linkedFrom: {
        recipeCollection: {
          total: number
          items: {
            sys: {
              id: string
            }
            title: string
            slug: string
            previewImage: {
              description: string
              url: string
              width: number
              height: number
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
    }[]
  }
}
