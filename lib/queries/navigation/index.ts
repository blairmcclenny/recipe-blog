import { fetchGraphQL } from "@/lib/api"
import { Navigation } from "./types"

export async function getNavigation({
  title,
  isDraftMode = false,
}: {
  title: "Header" | "Footer"
  isDraftMode?: boolean
}) {
  const query = `#graphql
    query Navigation($where: NavigationFilter) {
      navigationCollection(
        limit: 1, 
        where: $where
      ) {
        items {
          linksCollection {
            items {
              type: __typename
              ... on LinkAnchor {
                sys {
                  id
                }
                text
                anchor
              }
              ... on LinkContent {
                sys {
                  id
                }
                text
                entry {
                  type: __typename
                  ... on Event {
                    slug
                  }
                  ... on EventTag {
                    slug
                  }
                  ... on Page {
                    slug
                  }
                  ... on Recipe {
                    slug
                  }
                  ... on RecipeTag {
                    slug
                  }
                }
              }
              ... on LinkIndexPage {
                sys {
                  id
                }
                text
                indexPage: type
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

  const data = await fetchGraphQL<Navigation>({
    query,
    variables: {
      where: {
        title,
      },
    },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}
