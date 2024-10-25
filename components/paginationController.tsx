"use client"

import { useEffect, useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn, generatePagination, generatePaginationCompact } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"

export default function PaginationController({
  totalPages,
}: {
  totalPages: number
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    
    if (pageNumber === 1) {
      params.delete("page")
    }

    return `${pathname}?${params.toString()}`
  }

  const [isMounted, setIsMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)")

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange)
    }
  }, [])

  const allPages = isMobile
    ? generatePaginationCompact(currentPage, totalPages)
    : generatePagination(currentPage, totalPages)

  return (
    <Pagination className={cn(!isMounted && "invisible")}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none" : ""}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          return (
            <PaginationItem key={`${page}-${index}`}>
              {page !== "..." ? (
                <PaginationLink
                  href={createPageURL(page)}
                  isActive={currentPage === page}
                  className={cn(
                    "min-w-9 w-fit px-2.5",
                    currentPage === page ? "pointer-events-none" : ""
                  )}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={currentPage >= totalPages ? "pointer-events-none" : ""}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
