type LinkType = "LinkUrl" | "LinkAnchor" | "LinkContent" | "LinkIndexPage"

type LinkBase = {
  __typename: LinkType
  sys: {
    id: string
  }
  linkText: string
}

export type LinkUrl = LinkBase & {
  linkUrl: string
}

export type LinkAnchor = LinkBase & {
  linkAnchor: string
}

type ContentType = "Event" | "EventTag" | "Page" | "Recipe" | "RecipeTag"

export type LinkContentEntry = {
  __typename: ContentType
  slug: string
}

export type LinkContent = LinkBase & {
  linkContent: LinkContentEntry
}

export type LinkIndexPageType = "Recipes" | "Events"

export type LinkIndexPage = LinkBase & {
  linkIndexPage: LinkIndexPageType
}

export type Navigation = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: (LinkUrl & LinkAnchor & LinkContent & LinkIndexPage)[]
      }
    }[]
  }
}
