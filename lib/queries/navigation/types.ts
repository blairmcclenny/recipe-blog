export type Navigation = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: {
          sys: {
            id: string
          }
          type: "LinkContent" | "LinkIndex" | "LinkJump" | "LinkUrl"
          text: string
          content?: {
            type: "Event" | "Page" | "Recipe"
            slug: string
          }
          indexPage?: "Recipes" | "Events"
          url?: string
        }[]
      }
    }[]
  }
}
