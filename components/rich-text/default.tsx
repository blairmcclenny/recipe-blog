import { Options } from "@contentful/rich-text-react-renderer"
import { inlinesBase, marksBase, nodesBase } from "@/components/rich-text/base"

export const options: Options = {
  renderMark: { ...marksBase },
  renderNode: { ...inlinesBase, ...nodesBase },
}
