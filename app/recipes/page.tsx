// import Link from "next/link"
// import { getAllRecipes} from "@/lib/queries/recipes"
// import { draftMode } from "next/headers"
// import { TypographyLI, TypographyUL } from "@/components/typography"
// import { Recipe } from "@/lib/queries/types"

// export default async function Page() {
//   const { isEnabled } = draftMode()
//   const recipes: Recipe[] = await getAllRecipes(10, isEnabled)

//   return (
//     <div>
//       <TypographyUL>
//         {recipes.map((recipe: Recipe) => (
//           <TypographyLI key={recipe.sys.id}>
//             <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
//           </TypographyLI>
//         ))}
//       </TypographyUL>
//     </div>
//   )
// }

import { getRecipeSlugs } from "@/lib/queries/recipes"
import { notFound } from "next/navigation"
// import { draftMode } from "next/headers"

export default async function Page() {
  // const { isEnabled } = draftMode()
  const data = await getRecipeSlugs()
  const recipes = data?.recipeCollection?.items

  if (!recipes) {
    notFound()
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div>{recipe.slug}</div>
      ))}
    </div>
  )
}
