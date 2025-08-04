"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type NavItem = {
    label: string
    href: string
}

interface CategoryNavProps {
    categories: NavItem[]
}

export default function CategoryNav({ categories }: CategoryNavProps) {
    const scrollRef = useRef<HTMLUListElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const checkScrollability = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
        }
    }

    useEffect(() => {
        checkScrollability()
        const scrollElement = scrollRef.current
        if (scrollElement) {
            scrollElement.addEventListener("scroll", checkScrollability)
            return () => scrollElement.removeEventListener("scroll", checkScrollability)
        }
    }, [])

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })
    }

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })
    }

    return (
        <nav
            className="relative w-full bg-gradient-to-r"
            role="navigation"
            aria-label="Course Categories"
        >
            {/* Left Gradient Overlay */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Right Gradient Overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            {/* Left Arrow Button */}
            <button
                onClick={scrollLeft}
                className={cn(
                    "absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-300",
                    "w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg",
                    "flex items-center justify-center group",
                    canScrollLeft
                        ? "opacity-100 hover:shadow-xl hover:border-gray-300 hover:bg-gray-50"
                        : "opacity-40 cursor-not-allowed",
                )}
                disabled={!canScrollLeft}
                aria-label="Scroll categories left"
            >
                <ChevronLeft
                    className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        canScrollLeft ? "text-gray-700 group-hover:text-gray-900" : "text-gray-400",
                    )}
                />
            </button>

            {/* Right Arrow Button */}
            <button
                onClick={scrollRight}
                className={cn(
                    "absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-300",
                    "w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg",
                    "flex items-center justify-center group",
                    canScrollRight
                        ? "opacity-100 hover:shadow-xl hover:border-gray-300 hover:bg-gray-50"
                        : "opacity-40 cursor-not-allowed",
                )}
                disabled={!canScrollRight}
                aria-label="Scroll categories right"
            >
                <ChevronRight
                    className={cn(
                        "w-5 h-5 transition-colors duration-200",
                        canScrollRight ? "text-gray-700 group-hover:text-gray-900" : "text-gray-400",
                    )}
                />
            </button>

            {/* Scrollable Category List */}
            <ul ref={scrollRef} className={cn("flex gap-x-1 px-20 py-4 overflow-x-auto", "scrollbar-none scroll-smooth")}>
                {categories.map((category, idx) => (
                    <li key={idx} className="shrink-0">
                        <Link
                            href={category.href}
                            className={cn(
                                "relative inline-flex items-center px-4 py-2.5 text-sm font-medium",
                                "text-gray-600 hover:text-gray-900 transition-all duration-200",
                                "rounded-full border border-transparent hover:border-gray-200",
                                "hover:bg-gray-50/80 hover:shadow-sm",
                                "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300",
                                "group whitespace-nowrap",
                            )}
                        >
              <span className="relative">
                {category.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
