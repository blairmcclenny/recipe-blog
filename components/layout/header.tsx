import { getNavigation } from "@/lib/queries/navigation"
import HeaderNav from "@/components/layout/header-nav"

export default async function Header() {
  const data = await getNavigation({ title: "Header", isDraftMode: false })
  const links = data?.navigationCollection?.items?.[0]?.linksCollection?.items

  return <HeaderNav links={links} />
}
