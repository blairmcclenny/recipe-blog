type NavigationLinkType =
  | "LinkUrl"
  | "LinkAnchor"
  | "LinkContent"
  | "LinkIndexPage"

type NavigationLinkBase = {
  __typename: NavigationLinkType
  sys: {
    id: string
  }
  linkText: string
}

export type NavigationLinkUrl = NavigationLinkBase & {
  linkUrl: string
}

export type NavigationLinkAnchor = NavigationLinkBase & {
  linkAnchor: string
}

type NavigationContentType =
  | "Event"
  | "EventTag"
  | "Page"
  | "Recipe"
  | "RecipeTag"

export type NavigationLinkContentEntry = {
  __typename: NavigationContentType
  slug: string
}

export type NavigationLinkContent = NavigationLinkBase & {
  linkContent: NavigationLinkContentEntry
}

export type NavigationLinkIndexPageType = "Recipes" | "Events"

export type NavigationLinkIndexPage = NavigationLinkBase & {
  linkIndexPage: NavigationLinkIndexPageType
}

export type Navigation = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: (NavigationLinkUrl &
          NavigationLinkAnchor &
          NavigationLinkContent &
          NavigationLinkIndexPage)[]
      }
    }[]
  }
}
