export type Navigation = {
  navigationCollection: {
    items: {
      linksCollection: {
        items: {
          sys: {
            id: string
          }
          type: string
          text: string
          content: {
            type: string
            slug: string
          }
          indexPage: string
          url: string
        }[]
      }
    }[]
  }
}
