type LinkBase = {
  __typename: LinkType
  sys: {
    id: string
  }
  linkText: string
}

type LinkUrl = LinkBase & {
  linkUrl: string
}

type LinkAnchor = LinkBase & {
  linkAnchor: string
}

type LinkContent = LinkBase & {
  linkContent: {
    __typename: ContentType
    slug: string
  }
}

type LinkIndexPage = LinkBase & {
  linkIndexPage: string
}

type ContentType = "Event" | "EventTag" | "Page" | "Recipe" | "RecipeTag"

type LinkType = "LinkUrl" | "LinkAnchor" | "LinkContent" | "LinkIndexPage"

export type Link = LinkUrl & LinkAnchor & LinkContent & LinkIndexPage

export type Links = {
  entries: {
    block: Link[]
  }
}
