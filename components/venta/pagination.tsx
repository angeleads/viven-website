import type React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis if needed before range
    if (rangeStart > 2) {
      pages.push("...")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed after range
    if (rangeEnd < totalPages - 1) {
      pages.push("...")
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <nav className="flex items-center space-x-1">
            <PaginationButton href={`/venta?page=${currentPage - 1}`} disabled={currentPage === 1}>
              <ChevronLeft size={18} />
            </PaginationButton>

            {pageNumbers.map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500">
                  ...
                </span>
              ) : (
                <PaginationButton key={`page-${page}`} href={`/venta?page=${page}`} active={page === currentPage}>
                  {page}
                </PaginationButton>
              ),
            )}

            <PaginationButton href={`/venta?page=${currentPage + 1}`} disabled={currentPage === totalPages}>
              <ChevronRight size={18} />
            </PaginationButton>
          </nav>
        </div>
      </div>
    </div>
  )
}

interface PaginationButtonProps {
  href: string
  active?: boolean
  disabled?: boolean
  children: React.ReactNode
}

function PaginationButton({ href, active = false, disabled = false, children }: PaginationButtonProps) {
  const baseClasses = "flex items-center justify-center w-10 h-10 rounded-md transition-colors"

  if (disabled) {
    return <span className={`${baseClasses} text-gray-400 bg-gray-100 cursor-not-allowed`}>{children}</span>
  }

  if (active) {
    return <span className={`${baseClasses} bg-blue-600 text-white font-medium`}>{children}</span>
  }

  return (
    <Link href={href} className={`${baseClasses} text-gray-700 hover:bg-gray-100`}>
      {children}
    </Link>
  )
}
