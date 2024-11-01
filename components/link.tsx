import React from "react"
import NextLink from "next/link"
import { EntryType, Link as LinkProps } from "@/lib/queries/navigation/types"
import { convertStringToHtmlId } from "@/lib/utils"

function getEntryTypePath(entryType: EntryType) {
  switch (entryType) {
    case "Event":
      return "/events"
    case "EventTag":
      return "/events/tags"
    case "Page":
      return ""
    case "Recipe":
      return "/recipes"
    case "RecipeTag":
      return "/recipes/tags"
  }
}

function getEntryHref(
  entryType: EntryType | undefined,
  slug: string | undefined
) {
  if (!slug || !entryType) return ""

  return `${getEntryTypePath(entryType)}/${slug}`
}

export default function Link({
  link,
  ...props
}: {
  link: LinkProps
  children: React.ReactNode
}) {
  switch (link.type) {
    case "URL":
      return (
        <a
          href={link?.url || ""}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    case "Anchor":
      return <a href={`#${convertStringToHtmlId(link?.anchor)}`} {...props} />
    case "Entry":
      return (
        <NextLink
          href={getEntryHref(link.entry?.type, link.entry?.slug)}
          {...props}
        />
      )
    case "Recipes":
      return <NextLink href={`/recipes`} {...props} />
    case "Events":
      return <NextLink href={`/events`} {...props} />
  }
}
