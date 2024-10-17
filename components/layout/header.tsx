// "use client"

// TODO: Size mobile nav to screen minus header height
// TODO: Add transition to mobile nav
// TODO: Add transition to mobile nav icon

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import useBodyScrollLock from "@/hooks/useBodyLockScroll"
// import useWindowScroll from "@/hooks/useWindowScroll"
// import useMediaQuery from "@/hooks/useMediaQuery"

import { getNavigation } from "@/lib/queries/navigation"
import Link from "next/link"

export default async function Header() {
  const data = await getNavigation({ title: "Header", isDraftMode: false })
  const links = data?.navigationCollection?.items[0]?.linksCollection?.items

  //   const isScrolled = useWindowScroll(50)
  //   const isMobile = useMediaQuery("(max-width: 768px)")
  //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  //   useBodyScrollLock(isMobileMenuOpen)

  //   useEffect(() => {
  //     if (!isMobile) {
  //       setIsMobileMenuOpen(false)
  //     }
  //   }, [isMobile])

  //   const toggleMobileMenu = () => {
  //     setIsMobileMenuOpen(!isMobileMenuOpen)
  //   }

  // temp state variables
  const isScrolled = false

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-background/80 backdrop-blur-sm h-16"
            : "bg-background h-24"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <Link
            href="/"
            className={`font-serif font-extrabold transition-all duration-300 ease-in-out ${
              isScrolled ? "text-xl" : "text-3xl"
            }`}
          >
            Lorem Ipsum
          </Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {links?.map((link) => (
                <li key={link.sys.id}>
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </nav>
          {/* {isMobile && (
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )} */}
        </div>
      </header>
      {/* {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm md:hidden">
          <nav className="h-full flex flex-col items-center justify-center space-y-8">
            <Button variant="ghost" size="lg" onClick={toggleMobileMenu}>
              Home
            </Button>
            <Button variant="ghost" size="lg" onClick={toggleMobileMenu}>
              About
            </Button>
            <Button variant="ghost" size="lg" onClick={toggleMobileMenu}>
              Contact
            </Button>
          </nav>
        </div>
      )} */}
    </>
  )
}
