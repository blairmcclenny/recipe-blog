import { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, Node } from "@contentful/rich-text-types"
import { inlinesBase, marksBase, nodesBase } from "@/components/rich-text/base"
import {
  RichTextAsset,
  RichTextBlock,
  RichTextHyperlink,
  RichTextLinks,
} from "@/lib/types/rich-text-links"
import Link from "@/components/link"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"
import { TypographyBlockquote, TypographySmall } from "../typography"
import Image from "next/image"

export const options = (links: RichTextLinks): Options => {
  const assetMap = new Map()
  const entryMap = new Map()
  const hyperlinkMap = new Map()

  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry)
  }

  for (const asset of links.assets.block) {
    assetMap.set(asset.sys.id, asset)
  }

  for (const hyperlink of links.entries.hyperlink) {
    hyperlinkMap.set(hyperlink.sys.id, hyperlink)
  }

  return {
    renderMark: { ...marksBase },
    renderNode: {
      ...inlinesBase,
      ...nodesBase,
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const entry: RichTextBlock = entryMap.get(node.data.target.sys.id)

        if (
          entry.__typename === "LinkUrl" ||
          entry.__typename === "LinkAnchor" ||
          entry.__typename === "LinkContent" ||
          entry.__typename === "LinkIndexPage"
        ) {
          return (
            <div className="my-6 w-full">
              <Button asChild>
                <Link link={entry}>{entry.linkText}</Link>
              </Button>
            </div>
          )
        }

        if (entry.__typename === "Quote") {
          return (
            <div className="my-6 w-full">
              <blockquote>
                <span className='block -indent-[.45em] mt-6 border-l-2 pl-6 italic [&:before]:content-[open-quote] [&:after]:content-[close-quote] [quotes:"“"_"”"_"‘"_"’"]'>
                  {entry.quote}
                </span>
                <cite className="block mt-2 pl-6 text-sm text-muted-foreground">
                  - {entry.citation}
                </cite>
              </blockquote>
            </div>
          )
        }
      },
      [INLINES.ENTRY_HYPERLINK]: (node: Node, children: React.ReactNode) => {
        const hyperlink: RichTextHyperlink = hyperlinkMap.get(
          node.data.target.sys.id
        )

        switch (hyperlink.__typename) {
          case "Page":
            return (
              <NextLink
                href={hyperlink.slug === "home" ? "/" : `/${hyperlink.slug}`}
              >
                {children}
              </NextLink>
            )
          case "Event":
            return (
              <NextLink href={`/events/${hyperlink.slug}`}>{children}</NextLink>
            )
          case "Recipe":
            return (
              <NextLink href={`/recipes/${hyperlink.slug}`}>
                {children}
              </NextLink>
            )
          default:
            return <span>{children}</span>
        }
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: Node, next: React.ReactNode) => {
        const asset: RichTextAsset = assetMap.get(node.data.target.sys.id)

        switch (asset.contentType) {
          case "image/png":
            return (
              <Image
                src={asset.url}
                width={asset.width}
                height={asset.height}
                alt={asset.description || ""}
                className="rounded-lg"
              />
            )
          default:
            return null
        }
      },
    },
  }
}
