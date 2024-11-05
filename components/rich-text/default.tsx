import { Options } from "@contentful/rich-text-react-renderer"
import { marksBase, nodesBase } from "@/components/rich-text/base"

export const options: Options = {
  renderMark: { ...marksBase },
  renderNode: { ...nodesBase },
}
