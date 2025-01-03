import { BLOCKS, INLINES, MARKS, Node } from "@contentful/rich-text-types"
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
  TypographyTableWithBody,
  TypographyTableCell,
  TypographyTableHeader,
  TypographyTableRow,
  TypographyUL,
} from "@/components/typography"
import Link from "next/link"

export const marksBase = {
  [MARKS.BOLD]: (text: React.ReactNode) => (
    <strong className="font-bold">{text}</strong>
  ),
  [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
  [MARKS.UNDERLINE]: (text: React.ReactNode) => (
    <u className="underline">{text}</u>
  ),
}

export const inlinesBase = {
  [INLINES.HYPERLINK]: (node: Node, children: React.ReactNode) => {
    const href = node.data.uri

    return href.startsWith("#") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  },
}

export const nodesBase = {
  [BLOCKS.HEADING_1]: (node: Node, children: React.ReactNode) => (
    <TypographyH1>{children}</TypographyH1>
  ),
  [BLOCKS.HEADING_2]: (node: Node, children: React.ReactNode) => (
    <TypographyH2>{children}</TypographyH2>
  ),
  [BLOCKS.HEADING_3]: (node: Node, children: React.ReactNode) => (
    <TypographyH3>{children}</TypographyH3>
  ),
  [BLOCKS.HEADING_4]: (node: Node, children: React.ReactNode) => (
    <TypographyH4>{children}</TypographyH4>
  ),
  [BLOCKS.PARAGRAPH]: (node: Node, children: React.ReactNode) => (
    <TypographyP>{children}</TypographyP>
  ),
  [BLOCKS.UL_LIST]: (node: Node, children: React.ReactNode) => (
    <TypographyUL>{children}</TypographyUL>
  ),
  [BLOCKS.OL_LIST]: (node: Node, children: React.ReactNode) => (
    <TypographyOL>{children}</TypographyOL>
  ),
  [BLOCKS.LIST_ITEM]: (node: Node, children: React.ReactNode) => (
    <TypographyLI>{children}</TypographyLI>
  ),
  [BLOCKS.HR]: () => <TypographyHR />,
  [BLOCKS.TABLE]: (node: Node, children: React.ReactNode) => (
    <TypographyTableWithBody>{children}</TypographyTableWithBody>
  ),
  [BLOCKS.TABLE_ROW]: (node: Node, children: React.ReactNode) => (
    <TypographyTableRow>{children}</TypographyTableRow>
  ),
  [BLOCKS.TABLE_CELL]: (node: Node, children: React.ReactNode) => (
    <TypographyTableCell>{children}</TypographyTableCell>
  ),
  [BLOCKS.TABLE_HEADER_CELL]: (node: Node, children: React.ReactNode) => (
    <TypographyTableHeader>{children}</TypographyTableHeader>
  ),
  [BLOCKS.QUOTE]: (node: Node, children: React.ReactNode) => (
    <TypographyBlockquote>{children}</TypographyBlockquote>
  ),
}
