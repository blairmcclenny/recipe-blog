import Copyright from "./copyright"
import { getNavigation } from "@/lib/queries/navigation"
import Link from "@/components/link"
import SocialMedia from "@/components/social-media"

export default async function Footer() {
  const data = await getNavigation({
    title: "Footer",
    isDraftMode: false,
  })
  const links = data?.navigationCollection?.items?.[0]?.linksCollection?.items

  return (
    <footer>
      <div className="container mx-auto px-4 py-8 space-y-4 items-center">
        <nav className="flex gap-4 justify-center">
          <ul className="flex space-x-4">
            {links?.map((link) => (
              <li key={link.sys.id}>
                <Link link={link}>{link.linkText}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <SocialMedia />
        <p className="text-center text-sm text-muted-foreground">
          &copy; <Copyright /> Savor and Spice
        </p>
      </div>
    </footer>
  )
}
