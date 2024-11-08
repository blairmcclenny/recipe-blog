import { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, Node } from "@contentful/rich-text-types"
import { marksBase, nodesBase } from "@/components/rich-text/base"
import {
  RichTextLinkRecipe,
  RichTextLinksRecipe,
} from "@/lib/types/rich-text-links"
import Link from "@/components/link"
import { Button } from "@/components/ui/button"
import { TypographyBlockquote, TypographySmall } from "../typography"

export const options = (links: RichTextLinksRecipe): Options => {
  const entryMap = new Map()

  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry)
  }

  return {
    renderMark: { ...marksBase },
    renderNode: {
      ...nodesBase,
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const entry: RichTextLinkRecipe = entryMap.get(node.data.target.sys.id)

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
    },
  }
}
