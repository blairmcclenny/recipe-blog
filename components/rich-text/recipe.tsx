import { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, Node } from "@contentful/rich-text-types"
import { inlinesBase, marksBase, nodesBase } from "@/components/rich-text/base"
import {
  RichTextAssetRecipe,
  RichTextBlockRecipe,
  RichTextHyperlinkRecipe,
  RichTextLinksRecipe,
} from "@/lib/types/rich-text-links"
import Link from "@/components/link"
import NextLink from "next/link"
import { Button } from "@/components/ui/button"
import { TypographyBlockquote, TypographySmall } from "../typography"
import Image from "next/image"

export const options = (links: RichTextLinksRecipe): Options => {
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
        const entry: RichTextBlockRecipe = entryMap.get(node.data.target.sys.id)

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
              <TypographyBlockquote>
                <p>{entry.quote}</p>
              </TypographyBlockquote>
              <TypographySmall>{entry.citation}</TypographySmall>
            </div>
          )
        }
      },
      [INLINES.ENTRY_HYPERLINK]: (node: Node, children: React.ReactNode) => {
        const hyperlink: RichTextHyperlinkRecipe = hyperlinkMap.get(
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
        const asset: RichTextAssetRecipe = assetMap.get(node.data.target.sys.id)

        switch (asset.contentType) {
          case "image/png":
            return (
              <Image
                src={asset.url}
                width={asset.width}
                height={asset.height}
                alt={asset.description}
              />
            )
          default:
            return null
        }
      },
    },
  }
}
