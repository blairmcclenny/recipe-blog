import { fetchGraphQL } from "@/lib/api"
import { SocialMedia } from "./types"

export async function getSocialMedia({
  limit = 1,
  title = "Social Media",
  isDraftMode = false,
}: {
  limit?: number
  title?: string
  isDraftMode?: boolean
}) {
  const query = `#graphql
    query Recipes(
      $limit: Int
      $where: SocialMediaFilter
    ) {
      socialMediaCollection(
        limit: $limit
        where: $where
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          instagram
          youTube
          tikTok
        }
      }
    }
  `

  const data = await fetchGraphQL<SocialMedia>({
    query,
    variables: { limit, where: { title } },
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}
