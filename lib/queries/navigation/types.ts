export type EntryType = "Event" | "EventTag" | "Page" | "Recipe" | "RecipeTag"

export type Entry = {
  type: EntryType
  slug: string
}

export type IndexPage = "Recipes" | "Events"

export type Link = {
  type: string
  sys: {
    id: string
  }
  text: string
  anchor: string
  entry: Entry
  indexPage: IndexPage
  url: string
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
