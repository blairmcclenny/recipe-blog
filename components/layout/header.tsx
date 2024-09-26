"use client"

// TODO: Use real data for the header
// TODO: Size mobile nav to screen minus header height
// TODO: Add transition to mobile nav
// TODO: Add transition to mobile nav icon

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import useBodyScrollLock from "@/hooks/useBodyLockScroll"
import useWindowScroll from "@/hooks/useWindowScroll"

export default function Header() {
  const isScrolled = useWindowScroll(50)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useBodyScrollLock(isMobileMenuOpen)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)

      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-background/80 backdrop-blur-sm h-16"
            : "bg-background h-24"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1
            className={`font-serif font-extrabold transition-all duration-300 ease-in-out ${
              isScrolled ? "text-xl" : "text-3xl"
            }`}
          >
            Sticky Header
          </h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Button variant="ghost">Home</Button>
              </li>
              <li>
                <Button variant="ghost">About</Button>
              </li>
              <li>
                <Button variant="ghost">Contact</Button>
              </li>
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
      )}
    </>
  )
}
