import {
  NavigationLinkAnchor,
  NavigationLinkContent,
  NavigationLinkIndexPage,
  NavigationLinkUrl,
} from "./navigation"

export type RichTextLinkRecipe = NavigationLinkUrl &
  NavigationLinkAnchor &
  NavigationLinkContent &
  NavigationLinkIndexPage

export type RichTextLinksRecipe = {
  entries: {
    block: RichTextLinkRecipe[]
  }
}
