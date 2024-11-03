import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, Node } from "@contentful/rich-text-types"
import {
  // TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyHR,
  TypographyLI,
  TypographyOL,
  TypographyP,
  TypographyUL,
} from "@/components/typography"

// TODO
// Audit and update types (richText, options)

const defaultOptions = () => {
  return {
    renderMark: {},
    renderNode: {
      [BLOCKS.HEADING_1]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyH1>{children}</TypographyH1>,
      [BLOCKS.HEADING_2]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyH2>{children}</TypographyH2>,
      [BLOCKS.HEADING_3]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyH3>{children}</TypographyH3>,
      [BLOCKS.HEADING_4]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyH4>{children}</TypographyH4>,
      [BLOCKS.PARAGRAPH]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyP>{children}</TypographyP>,
      [BLOCKS.UL_LIST]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyUL>{children}</TypographyUL>,
      [BLOCKS.OL_LIST]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyOL>{children}</TypographyOL>,
      [BLOCKS.LIST_ITEM]: (
        node: Node,
        children: React.ReactNode
      ) => <TypographyLI>{children}</TypographyLI>,
      [BLOCKS.HR]: () => <TypographyHR />,
      // [BLOCKS.QUOTE]: (node: React.ReactNode, children: React.ReactElement) => (
      //   <TypographyBlockquote>{children}</TypographyBlockquote>
      // ),
    },
  }
}

export default function renderRichText(
  richText: any,
  options: any = defaultOptions
) {
  if (!richText) return null

  return documentToReactComponents(richText, options())
}
