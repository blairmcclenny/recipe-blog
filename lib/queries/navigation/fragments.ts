const commonFields = `#graphql
  __typename
  sys {
    id
  }
  linkText: text
`

export const linkUrlFields = `#graphql
  fragment linkUrlFields on LinkUrl {
    ${commonFields}
    linkUrl: url
  }
`

export const linkAnchorFields = `#graphql
  fragment linkAnchorFields on LinkAnchor {
    ${commonFields}
    linkAnchor: anchor
  }
`

export const linkContentFields = `#graphql
  fragment linkContentFields on LinkContent {
    ${commonFields}
    linkContent: entry {
      __typename
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
`

export const linkIndexPageFields = `#graphql
  fragment linkIndexPageFields on LinkIndexPage {
    ${commonFields}
    linkIndexPage: type
  }
`
