import { Document } from "@contentful/rich-text-types"
import { RichTextLinks } from "@/lib/types/rich-text-links"

export type PageSlugs = {
  pageCollection: {
    items: {
      slug: string
    }[]
  }
}

export type Pages = {
  pageCollection: {
    items: {
      title: string
      slug: string
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
      summary: string
    }[]
  }
}
