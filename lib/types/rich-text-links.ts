import {
  LinkAnchor,
  LinkContent,
  LinkIndexPage,
  LinkUrl,
} from "@/lib/types/navigation"

export type RichTextLinkRecipe = LinkUrl &
  LinkAnchor &
  LinkContent &
  LinkIndexPage

export type RichTextLinksRecipe = {
  entries: {
    block: RichTextLinkRecipe[]
  }
}
