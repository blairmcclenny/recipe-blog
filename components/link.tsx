"use client"

import React from "react"
import NextLink from "next/link"
import { cn, convertStringToHtmlId } from "@/lib/utils"
import {
  LinkAnchor,
  LinkContent,
  LinkContentEntry,
  LinkIndexPage,
  LinkIndexPageType,
  LinkUrl,
} from "@/lib/types/navigation"
import { usePathname } from "next/navigation"

const indexPagePathMap = {
  Recipes: "/recipes",
  Events: "/events",
}

function getIndexPagePath(indexPage: LinkIndexPageType) {
  return indexPagePathMap[indexPage]
}

const entryTypePathMap = {
  Event: "/events",
  EventTag: "/events/tags",
  Page: "",
  Recipe: "/recipes",
  RecipeTag: "/recipes/tags",
}

function getEntryPath(entry: LinkContentEntry) {
  if (entry.slug === "home") return "/"
  return `${entryTypePathMap[entry.__typename]}/${entry.slug}`
}

export default function Link({
  link,
  className,
  ...props
}: {
  link: LinkAnchor & LinkUrl & LinkContent & LinkIndexPage
  className?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()

  switch (link.__typename) {
    case "LinkUrl":
      return (
        <a
          href={link.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
          {...props}
        />
      )
    case "LinkAnchor":
      return (
        <a
          href={`#${convertStringToHtmlId(link.linkAnchor)}`}
          className={className}
          {...props}
        />
      )
    case "LinkContent":
      return (
        <NextLink
          href={getEntryPath(link.linkContent)}
          className={cn(
            className,
            getEntryPath(link.linkContent) === pathname &&
              "active pointer-events-none"
          )}
          {...props}
        />
      )
    case "LinkIndexPage":
      return (
        <NextLink
          href={getIndexPagePath(link.linkIndexPage)}
          className={cn(
            className,
            getIndexPagePath(link.linkIndexPage) === pathname &&
              "active pointer-events-none"
          )}
          {...props}
        />
      )
  }
}
