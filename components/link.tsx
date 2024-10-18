import NextLink from "next/link"

function getContentLink({
  type,
  slug,
}: {
  type: "Event" | "Page" | "Recipe"
  slug: string
}) {
  switch (type) {
    case "Event":
      return `/events/${slug}`
    case "Page":
      return `/${slug}`
    case "Recipe":
      return `/recipes/${slug}`
    default:
      return ""
  }
}

function getIndexLink(indexPage: "Recipes" | "Events") {
  switch (indexPage) {
    case "Recipes":
      return "/recipes"
    case "Events":
      return "/events"
    default:
      return ""
  }
}

function getHref({
  content,
  indexPage,
  section,
  url,
}: {
  content?: { type: "Event" | "Page" | "Recipe"; slug: string }
  indexPage?: "Recipes" | "Events"
  section?: string
  url?: string
}) {
  if (content) {
    return getContentLink(content)
  } else if (indexPage) {
    return getIndexLink(indexPage)
  } else if (section) {
    return `#${section}`
  } else if (url) {
    return url
  } else {
    return ""
  }
}

const isInternalLink = (type: string) =>
  type === "LinkContent" || type === "LinkIndex" || type === "LinkJump"

export default function Link({
  link,
  children,
}: {
  link: {
    type: "LinkContent" | "LinkIndex" | "LinkJump" | "LinkUrl"
    content?: { type: "Event" | "Page" | "Recipe"; slug: string }
    indexPage?: "Recipes" | "Events"
    section?: string
    url?: string
  }
  children: React.ReactNode
}) {
  const LinkComponent = isInternalLink(link.type) ? NextLink : "a"
  const href = getHref(link)

  return (
    <LinkComponent
      href={href}
      target={isInternalLink(link.type) ? "" : "_blank"}
      rel={isInternalLink(link.type) ? "" : "noopener noreferrer"}
    >
      {children}
    </LinkComponent>
  )
}
