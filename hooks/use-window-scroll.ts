import { useEffect, useState } from "react"

export default function useWindowScroll(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > threshold ? setIsScrolled(true) : setIsScrolled(false)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return isScrolled
}
