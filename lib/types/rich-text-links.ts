import {
  LinkAnchor,
  LinkContent,
  LinkIndexPage,
  LinkUrl,
} from "@/lib/types/navigation"
import { Quote } from "@/lib/types/quotes"

export type RichTextBlockRecipe = LinkUrl &
  LinkAnchor &
  LinkContent &
  LinkIndexPage &
  Quote


export type RichTextHyperlinkRecipe = {
  __typename: string
  sys: {
    id: string
  }
  slug: string
}

export type RichTextLinksRecipe = {
  entries: {
    hyperlink: RichTextHyperlinkRecipe[]
    block: RichTextBlockRecipe[]
  }
}
