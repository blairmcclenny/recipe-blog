import { fetchGraphQL } from "@/lib/api"
import { HeaderNavigation } from "./types"

export async function getHeaderNavigation({ isDraftMode = false }) {
  const query = `#graphql
    query HeaderNavigation {
      navigationCollection(
        limit: 1, 
        where: { title: "Header" }
      ) {
        items {
          linksCollection(limit: 10) {
            items {
              type: __typename
              ... on LinkContent {
                sys {
                  id
                }
                text
                content {
                  ... on Event {
                    type: __typename
                    slug
                  }
                  ... on Page {
                    type: __typename
                    slug
                  }
                  ... on Recipe {
                    type: __typename
                    slug
                  }
                }
              }
              ... on LinkIndex {
                sys {
                  id
                }
                text
                indexPage
              }
              ... on LinkUrl {
                sys {
                  id
                }
                text
                url
              }
            }
          }
        }
      }
    }
  `

  const data = await fetchGraphQL<HeaderNavigation>({
    query,
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}
