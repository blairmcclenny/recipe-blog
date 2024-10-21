import { fetchGraphQL } from "@/lib/api"
import { Pages } from "./types"

export async function getPages({
  limit,
  pageSlug,
  isDraftMode = false,
}: {
  limit?: number
  pageSlug?: string
  isDraftMode?: boolean
}) {
  const query = `#graphql
    query Pages($limit: Int, $where: PageFilter) {
      pageCollection(
        limit: $limit
        where: $where
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          title
          slug
          image {
            description
            url
            width
            height
          }
          details {
            json
          }
          summary
        }
      }
    }
  `

  const data = await fetchGraphQL<Pages>({
    query,
    variables: { limit, where: { slug: pageSlug } },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}
