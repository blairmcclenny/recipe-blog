import { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, Node } from "@contentful/rich-text-types"
import { marksBase, nodesBase } from "@/components/rich-text/base"
import {
  RichTextLinkRecipe,
  RichTextLinksRecipe,
} from "@/lib/types/rich-text-links"

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

        if (entry.__typename === "LinkUrl") {
          return (
            <a href={entry.linkUrl} target="_blank" rel="noopener noreferrer">
              {entry.linkText}
            </a>
          )
        }
      },
    },
  }
}
