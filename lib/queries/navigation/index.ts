import { fetchGraphQL } from "@/lib/api"
import { Navigation } from "@/lib/types/navigation"
import {
  linkAnchorFields,
  linkContentFields,
  linkIndexPageFields,
  linkUrlFields,
} from "./fragments"

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
              ...linkUrlFields
              ...linkAnchorFields
              ...linkContentFields
              ...linkIndexPageFields
            }
          }
        }
      }
    }
    ${linkUrlFields}
    ${linkAnchorFields}
    ${linkContentFields}
    ${linkIndexPageFields}
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
