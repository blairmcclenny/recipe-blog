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
              ... on Link {
                sys {
                  id
                }
                text
                type
                url
                anchor
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
