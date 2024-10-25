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
import useMediaQuery from "@/hooks/useMediaQuery"

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

    if (pageNumber.toString() === "1") {
      params.delete("page")
    }

    return `${pathname}?${params.toString()}`
  }

  const [isMounted, setIsMounted] = useState(false)
  const isCompact = useMediaQuery("(max-width: 640px)")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const allPages = isCompact
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
