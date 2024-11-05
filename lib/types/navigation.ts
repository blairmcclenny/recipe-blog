type linkType = "LinkUrl" | "LinkAnchor" | "LinkContent" | "LinkIndexPage"

type linkBase = {
  __typename: linkType
  sys: {
    id: string
  }
  linkText: string
}

export type linkUrl = linkBase & {
  linkUrl: string
}

export type linkAnchor = linkBase & {
  linkAnchor: string
}

type NavigationContentType =
  | "Event"
  | "EventTag"
  | "Page"
  | "Recipe"
  | "RecipeTag"

export type linkContentEntry = {
  __typename: NavigationContentType
  slug: string
}

export type linkContent = linkBase & {
  linkContent: linkContentEntry
}

export type linkIndexPageType = "Recipes" | "Events"

export type linkIndexPage = linkBase & {
  linkIndexPage: linkIndexPageType
}

export type Navigation = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: (linkUrl & linkAnchor & linkContent & linkIndexPage)[]
      }
    }[]
  }
}
