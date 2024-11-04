import React from "react"
import NextLink from "next/link"
import { convertStringToHtmlId } from "@/lib/utils"
import {
  NavigationLinkAnchor,
  NavigationLinkContent,
  NavigationLinkContentEntry,
  NavigationLinkIndexPage,
  NavigationLinkIndexPageType,
  NavigationLinkUrl,
} from "@/lib/types/navigation"

const indexPagePathMap = {
  Recipes: "/recipes",
  Events: "/events",
}

function getIndexPagePath(indexPage: NavigationLinkIndexPageType) {
  return indexPagePathMap[indexPage]
}

const entryTypePathMap = {
  Event: "/events",
  EventTag: "/events/tags",
  Page: "",
  Recipe: "/recipes",
  RecipeTag: "/recipes/tags",
}

function getEntryPath(entry: NavigationLinkContentEntry) {
  if (entry.slug === "home") return "/"
  return `${entryTypePathMap[entry.__typename]}/${entry.slug}`
}

export default function Link({
  link,
  ...props
}: {
  link: NavigationLinkAnchor &
    NavigationLinkUrl &
    NavigationLinkContent &
    NavigationLinkIndexPage
  children: React.ReactNode
}) {
  switch (link.__typename) {
    case "LinkUrl":
      return (
        <a
          href={link.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    case "LinkAnchor":
      return (
        <a href={`#${convertStringToHtmlId(link.linkAnchor)}`} {...props} />
      )
    case "LinkContent":
      return <NextLink href={getEntryPath(link.linkContent)} {...props} />
    case "LinkIndexPage":
      return <NextLink href={getIndexPagePath(link.linkIndexPage)} {...props} />
  }
}
