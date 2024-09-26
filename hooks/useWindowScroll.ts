import { useEffect, useState } from "react"

export default function useWindowScroll(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > threshold ? setIsScrolled(true) : setIsScrolled(false)
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold])

  return isScrolled
}
