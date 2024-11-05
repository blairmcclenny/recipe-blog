import {
  linkAnchor,
  linkContent,
  linkIndexPage,
  linkUrl,
} from "@/lib/types/navigation"

export type RichTextLinkRecipe = linkUrl &
  linkAnchor &
  linkContent &
  linkIndexPage

export type RichTextLinksRecipe = {
  entries: {
    block: RichTextLinkRecipe[]
  }
}
