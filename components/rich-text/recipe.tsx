import { Options } from "@contentful/rich-text-react-renderer"
import { BLOCKS, Node } from "@contentful/rich-text-types"
import { Link, Links } from "@/lib/types/links"
import { marksBase, nodesBase } from "@/components/rich-text/base"

export const options = (links: Links): Options => {
  const entryMap = new Map()

  for (const entry of links.entries.block) {
    entryMap.set(entry.sys.id, entry)
  }

  return {
    renderMark: { ...marksBase },
    renderNode: {
      ...nodesBase,
      [BLOCKS.EMBEDDED_ENTRY]: (node: Node) => {
        const entry: Link = entryMap.get(node.data.target.sys.id)

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
