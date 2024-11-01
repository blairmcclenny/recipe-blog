export type EntryType = "Event" | "EventTag" | "Page" | "Recipe" | "RecipeTag"

export type Link = {
  sys: {
    id: string
  }
  text: string
  type: "URL" | "Anchor" | "Entry" | "Recipes" | "Events"
  url?: string
  anchor?: string
  entry?: {
    type: EntryType
    slug: string
  }
}

export type Navigation = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: Link[]
      }
    }[]
  }
}
