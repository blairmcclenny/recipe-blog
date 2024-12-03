import { fetchGraphQL } from "@/lib/api"
import { Pages, PageSlugs } from "@/lib/types/pages"
import {
  linkAnchorFields,
  linkContentFields,
  linkIndexPageFields,
  linkUrlFields,
} from "@/lib/queries/navigation/fragments"

export async function getPageSlugs(isDraftMode = false) {
  const query = `#graphql
    query PageSlugs {
      pageCollection(
        preview: ${isDraftMode ? "true" : "false"}
      ) {
        items {
          slug
        }
      }
    }
  `

  const data = await fetchGraphQL<PageSlugs>({
    query,
    preview: isDraftMode,
  })

  if (!data) {
    throw new Error("Something went wrong")
  }

  return data
}

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
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  contentType
                  url
                  width
                  height
                }
              }
              entries {
                hyperlink {
                  __typename
                  sys {
                    id
                  }
                  ... on Recipe {
                    slug
                  }
                  ... on Page {
                    slug
                  }
                  ... on Event {
                    slug
                  }
                }
                block {
                  ...linkUrlFields
                  ...linkAnchorFields
                  ...linkContentFields
                  ...linkIndexPageFields
                  ... on Quote {
                    __typename
                    sys {
                      id
                    }
                    quote
                    citation
                  }
                }
              }
            }
          }
          summary
        }
      }
    }
    ${linkUrlFields}
    ${linkAnchorFields}
    ${linkContentFields}
    ${linkIndexPageFields}
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
