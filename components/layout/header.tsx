"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-background/80 backdrop-blur-sm h-16"
            : "bg-background h-24"
        }`}
      >
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <h1
            className={`font-bold transition-all duration-300 ease-in-out ${
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
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
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
      <main className="container mx-auto px-4 pt-32">
        <h2 className="text-2xl font-bold mb-4">Welcome to our page</h2>
        {[...Array(20)].map((_, i) => (
          <p key={i} className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        ))}
      </main>
    </div>
  )
}
