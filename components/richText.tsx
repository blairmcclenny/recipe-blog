import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import {
  TypographyBlockquote,
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

const defaultOptions = {
  renderMark: {},
  renderNode: {
    [BLOCKS.HEADING_1]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <TypographyH1>{children}</TypographyH1>,
    [BLOCKS.HEADING_2]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <TypographyH2>{children}</TypographyH2>,
    [BLOCKS.HEADING_3]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <TypographyH3>{children}</TypographyH3>,
    [BLOCKS.HEADING_4]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <TypographyH4>{children}</TypographyH4>,
    [BLOCKS.PARAGRAPH]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <TypographyP>{children}</TypographyP>,
    [BLOCKS.UL_LIST]: (node: React.ReactNode, children: React.ReactElement) => (
      <TypographyUL>{children}</TypographyUL>
    ),
    [BLOCKS.OL_LIST]: (node: React.ReactNode, children: React.ReactElement) => (
      <TypographyOL>{children}</TypographyOL>
    ),
    [BLOCKS.LIST_ITEM]: (
      node: React.ReactNode,
      children: React.ReactElement
    ) => <TypographyLI>{children}</TypographyLI>,
    [BLOCKS.HR]: () => <TypographyHR />,
    [BLOCKS.QUOTE]: (node: React.ReactNode, children: React.ReactElement) => (
      <TypographyBlockquote>{children}</TypographyBlockquote>
    ),
  },
}

export default function renderRichText(
  richText: any,
  options: any = defaultOptions
) {
  if (!richText) return null

  return documentToReactComponents(richText, options)
}
