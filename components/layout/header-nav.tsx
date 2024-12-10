"use client"

// TODO: Size mobile nav to screen minus header height
// TODO: Add transition to mobile nav
// TODO: Add transition to mobile nav icon

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

import useBodyScrollLock from "@/hooks/use-body-lock-scroll"
import useWindowScroll from "@/hooks/use-window-scroll"
import useMediaQuery from "@/hooks/use-media-query"

import Link from "@/components/link"
import NextLink from "next/link"
import {
  LinkAnchor,
  LinkContent,
  LinkIndexPage,
  LinkUrl,
} from "@/lib/types/navigation"

export default function HeaderNav({
  links,
}: {
  links: (LinkAnchor & LinkUrl & LinkContent & LinkIndexPage)[]
}) {
  const isScrolled = useWindowScroll(50)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useBodyScrollLock(isMobileMenuOpen)

  useEffect(() => {
    if (!isMobile) {
      setIsMobileMenuOpen(false)
    }
  }, [isMobile])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-background h-24">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <NextLink
            href="/"
            className="font-serif font-extrabold transition-all duration-300 ease-in-out text-3xl"
          >
            Lorem Ipsum
          </NextLink>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {links?.map((link) => (
                <li key={link.sys.id}>
                  <Link link={link} className="text-red-500">{link.linkText}</Link>
                </li>
              ))}
            </ul>
          </nav>
          {isMobile && (
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          )}
        </div>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-24 z-40 bg-slate-50 md:hidden">
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
      )}
    </>
  )
}
