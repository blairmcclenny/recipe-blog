import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import { options as defaultOptions } from "@/components/rich-text/default"
import { options as recipeOptions } from "@/components/rich-text/recipe"

export {
  recipeOptions
}

export default function renderRichText(
  richText: Document,
  options: Options = defaultOptions
) {
  if (!richText) return null

  return documentToReactComponents(richText, options)
}
