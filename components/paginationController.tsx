"use client"

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

function MobilePagination({
  totalPages,
  currentPage,
  createPageUrl,
}: {
  totalPages: number
  currentPage: number
  createPageUrl: (pageNumber: number | string) => string
}) {
  const allPages = generatePaginationCompact(currentPage, totalPages)

  const noPrev = currentPage <= 1
  const noNext = currentPage >= totalPages

  return (
    <Pagination className="lg:hidden">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            className={cn(noPrev && "pointer-events-none")}
            aria-disabled={noPrev}
            tabIndex={noPrev ? -1 : undefined}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          return (
            <PaginationItem key={`${page}-${index}-desktop`}>
              {page !== "..." ? (
                <PaginationLink
                  href={createPageUrl(page)}
                  isActive={currentPage === page}
                  className={cn(
                    "min-w-9 w-fit px-2.5",
                    currentPage === page && "pointer-events-none"
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
            href={createPageUrl(currentPage + 1)}
            className={cn(noNext && "pointer-events-none")}
            aria-disabled={noNext}
            tabIndex={noNext ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function DesktopPagination({
  totalPages,
  currentPage,
  createPageUrl,
}: {
  totalPages: number
  currentPage: number
  createPageUrl: (pageNumber: number | string) => string
}) {
  const allPages = generatePagination(currentPage, totalPages)

  const noPrev = currentPage <= 1
  const noNext = currentPage >= totalPages

  return (
    <Pagination className="max-lg:hidden">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageUrl(currentPage - 1)}
            className={cn(noPrev && "pointer-events-none")}
            aria-disabled={noPrev}
            tabIndex={noPrev ? -1 : undefined}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          return (
            <PaginationItem key={`${page}-${index}-mobile`}>
              {page !== "..." ? (
                <PaginationLink
                  href={createPageUrl(page)}
                  isActive={currentPage === page}
                  className={cn(
                    "min-w-9 w-fit px-2.5",
                    currentPage === page && "pointer-events-none"
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
            href={createPageUrl(currentPage + 1)}
            className={cn(noNext && "pointer-events-none")}
            aria-disabled={noNext}
            tabIndex={noNext ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default function PaginationController({
  totalPages,
}: {
  totalPages: number
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber.toString() !== "1") {
      params.set("page", pageNumber.toString())
      return `${pathname}?${params.toString()}`
    } else {
      params.delete("page")
      return pathname
    }
  }

  return (
    <>
      <MobilePagination
        totalPages={totalPages}
        currentPage={currentPage}
        createPageUrl={createPageUrl}
      />
      <DesktopPagination
        totalPages={totalPages}
        currentPage={currentPage}
        createPageUrl={createPageUrl}
      />
    </>
  )
}
