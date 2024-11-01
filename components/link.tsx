import React from "react"
import NextLink from "next/link"
import {
  Entry,
  IndexPage,
  Link as LinkProps,
} from "@/lib/queries/navigation/types"
import { convertStringToHtmlId } from "@/lib/utils"

const indexPagePathMap = {
  Recipes: "/recipes",
  Events: "/events",
}

function getIndexPagePath(indexPage: IndexPage) {
  return indexPagePathMap[indexPage]
}

const entryTypePathMap = {
  Event: "/events",
  EventTag: "/events/tags",
  Page: "",
  Recipe: "/recipes",
  RecipeTag: "/recipes/tags",
}

function getEntryPath(entry: Entry) {
  if (entry.slug === "home") return "/"
  return `${entryTypePathMap[entry.type]}/${entry.slug}`
}

export default function Link({
  link,
  ...props
}: {
  link: LinkProps
  children: React.ReactNode
}) {
  switch (link.type) {
    case "LinkUrl":
      return (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    case "LinkAnchor":
      return <a href={`#${convertStringToHtmlId(link.anchor)}`} {...props} />
    case "LinkContent":
      return <NextLink href={getEntryPath(link.entry)} {...props} />
    case "LinkIndexPage":
      return <NextLink href={getIndexPagePath(link.indexPage)} {...props} />
  }
}
