"use client"

// TODO: Add transition to mobile nav
// TODO: Add transition to mobile nav icon

import { useState, useEffect, useRef } from "react"
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
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

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

  gsap.registerPlugin(useGSAP)

  const container = useRef(null)

  useGSAP(
    () => {
      gsap.to(".mobile-nav", {
        duration: 10,
        opacity: 1,
        ease: "power2.inOut",
      })
    },
    { scope: container }
  )

  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 bg-background h-16 md:h-24">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <NextLink
            href="/"
            className="font-serif font-extrabold text-2xl md:text-3xl"
          >
            Lorem Ipsum
          </NextLink>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              {links?.map((link) => (
                <li key={link.sys.id} className="relative">
                  <Link
                    link={link}
                    className="text-muted-foreground [&.active]:text-foreground hover:text-foreground transition-color p-bottom-0.5 before:absolute before:left-0 before:w-full before:bg-current before:h-px before:-bottom-0.5 before:transition before:origin-right hover:before:origin-left hover:before:scale-x-100 [&.active]:before:scale-x-100 before:scale-x-0"
                  >
                    {link.linkText}
                  </Link>
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
      {isMobile && (
        <div
          ref={container}
          className="fixed inset-0 top-16 md:top-24 z-40 bg-slate-50 md:hidden"
        >
          <nav className="mobile-nav h-full flex flex-col items-center justify-center space-y-8">
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
