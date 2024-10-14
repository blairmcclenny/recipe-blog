export async function fetchGraphQL(
  query: string,
  preview = false
): Promise<any> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
      // next: { tags: ["recipes"] },
    }
  )

  const data = await response.json()
  return data
}

export async function fetchGraphQLv2<T>({
  query,
  variables = {},
  tags = [],
  preview = false,
  revalidate,
}: {
  query: string
  variables?: any
  tags?: string[]
  preview?: boolean
  revalidate?: number
}): Promise<T | undefined> {
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query, variables }),
      next: { tags, ...{ revalidate } },
    }
  )

  const { data, errors } = await response.json()

  if (errors) {
    console.error(errors)
    throw new Error("error")
  }

  return data as T
}
