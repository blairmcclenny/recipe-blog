import {
  LinkAnchor,
  LinkContent,
  LinkIndexPage,
  LinkUrl,
} from "@/lib/types/navigation"
import { Quote } from "@/lib/types/quotes"

export type RichTextLinkRecipe = LinkUrl &
  LinkAnchor &
  LinkContent &
  LinkIndexPage &
  Quote

export type RichTextLinksRecipe = {
  entries: {
    block: RichTextLinkRecipe[]
  }
}
