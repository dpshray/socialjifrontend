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
import {cn} from "@/lib/utils"
import {useMemo} from "react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChangeAction: (page: number) => void
    className?: string
    siblingCount?: number
    showBoundaries?: boolean
    showControls?: boolean
    labels?: {
        previous?: string
        next?: string
    }
}

export default function CustomPagination({
                                             currentPage,
                                             totalPages,
                                             onPageChangeAction,
                                             className = "",
                                             siblingCount = 1,
                                             showBoundaries = true,
                                             showControls = true,
                                             labels = {
                                                 previous: "Previous",
                                                 next: "Next",
                                             },
                                         }: PaginationProps) {
    const handlePageClick = (page: number) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChangeAction(page)
        }
    }

    const pageRange = useMemo<(number | "ellipsis")[]>(() => {
        const totalPageNumbers = siblingCount * 2 + 1
        const totalVisibleItems = totalPageNumbers + (showBoundaries ? 2 : 0)

        if (totalPages <= totalVisibleItems) {
            return Array.from({length: totalPages}, (_, i) => i + 1)
        }

        const pages: (number | "ellipsis")[] = []
        const leftSibling = Math.max(currentPage - siblingCount, 1)
        const rightSibling = Math.min(currentPage + siblingCount, totalPages)

        const shouldShowLeftDots = leftSibling > (showBoundaries ? 2 : 1)
        const shouldShowRightDots = rightSibling < (showBoundaries ? totalPages - 1 : totalPages)

        if (showBoundaries && leftSibling > 1) {
            pages.push(1)
            if (leftSibling > 2) {
                pages.push("ellipsis")
            }
        }

        for (let i = leftSibling; i <= rightSibling; i++) {
            pages.push(i)
        }

        if (showBoundaries && rightSibling < totalPages) {
            if (rightSibling < totalPages - 1) {
                pages.push("ellipsis")
            }
            pages.push(totalPages)
        }

        return pages
    }, [currentPage, totalPages, siblingCount, showBoundaries])

    if (totalPages <= 1) return null

    return (
        <Pagination>
            <PaginationContent className={cn('gap-1 rounded-lg border border-border p-1', className)}>
                {showControls && (
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            aria-label={labels.previous}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageClick(currentPage - 1)
                            }}
                            className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                        >
                            {labels.previous}
                        </PaginationPrevious>
                    </PaginationItem>
                )}
                {pageRange.map((page, index) => (
                    <PaginationItem key={index}>
                        {page === "ellipsis" ? (
                            <PaginationEllipsis/>
                        ) : (
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                aria-label={`Page ${page}`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handlePageClick(page)
                                }}
                            >
                                {page}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                ))}
                {showControls && (
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            aria-label={labels.next}
                            onClick={(e) => {
                                e.preventDefault()
                                handlePageClick(currentPage + 1)
                            }}
                            className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                        >
                            {labels.next}
                        </PaginationNext>
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    )
}
