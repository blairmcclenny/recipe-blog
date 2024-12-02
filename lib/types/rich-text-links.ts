import {
  LinkAnchor,
  LinkContent,
  LinkIndexPage,
  LinkUrl,
} from "@/lib/types/navigation"
import { Quote } from "@/lib/types/quotes"

export type RichTextAsset = {
  sys: {
    id: string
  }
  description: string
  contentType: string
  url: string
  width: number
  height: number
}

export type RichTextBlock = LinkUrl &
  LinkAnchor &
  LinkContent &
  LinkIndexPage &
  Quote

export type RichTextHyperlink = {
  __typename: string
  sys: {
    id: string
  }
  slug: string
}

export type RichTextLinks = {
  assets: {
    block: RichTextAsset[]
  }
  entries: {
    hyperlink: RichTextHyperlink[]
    block: RichTextBlock[]
  }
}
