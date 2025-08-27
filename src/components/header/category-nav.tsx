"use client"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { tagsService } from "@/services/tagsService"

export type NavItem = {
    label: string
    value: number
}

interface CategoryNavProps {
    onCategoryClick?: (value: number) => void
}

function Skeleton() {
    return (
        <div className="inline-block h-8 w-24 animate-pulse rounded-full bg-gray-300" />
    )
}

export default function CategoryNav({ onCategoryClick }: CategoryNavProps) {
    const scrollRef = useRef<HTMLUListElement>(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const [tags, setTags] = useState<NavItem[]>([])
    const [loading, setLoading] = useState(false)

    const checkScrollability = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
        }
    }

    useEffect(() => {
        checkScrollability()
        const scrollEl = scrollRef.current
        if (scrollEl) {
            scrollEl.addEventListener("scroll", checkScrollability)
            return () => scrollEl.removeEventListener("scroll", checkScrollability)
        }
    }, [])

    useEffect(() => {
        if (scrollRef.current) {
            const { scrollWidth, clientWidth } = scrollRef.current
            setCanScrollRight(scrollWidth > clientWidth)
        }
    }, [tags])

    const handleCategoryClick = (value: number) => () => {
        if (onCategoryClick) onCategoryClick(value)
    }

    const scrollLeft = () => scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" })

    const scrollRight = () => scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" })

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const response = await tagsService.getAllTags()
                if (response) {
                    const mappedTags = response.data.map((tag: { id: number; name: string }) => ({
                        label: tag.name,
                        value: tag.id,
                    }))
                    setTags(mappedTags)
                }
            } catch {}
            setLoading(false)
        }
        fetchCategories()
    }, [])

    return (
        <nav className="relative w-full bg-white" role="navigation" aria-label="Course Categories">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />
            {!loading && canScrollLeft && (
                <button
                    onClick={scrollLeft}
                    className={cn(
                        "absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-300",
                        "w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg",
                        "flex items-center justify-center group",
                        "opacity-100 hover:shadow-xl hover:border-gray-300 hover:bg-gray-50"
                    )}
                    aria-label="Scroll categories left"
                >
                    <ChevronLeft className="w-5 h-5 text-black group-hover:text-gray-900 transition-colors duration-200" />
                </button>
            )}
            {!loading && canScrollRight && (
                <button
                    onClick={scrollRight}
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all duration-300",
                        "w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg",
                        "flex items-center justify-center group",
                        "opacity-100 hover:shadow-xl hover:border-gray-300 hover:bg-gray-50"
                    )}
                    aria-label="Scroll categories right"
                >
                    <ChevronRight className="w-5 h-5 text-black group-hover:text-gray-900 transition-colors duration-200" />
                </button>
            )}
            <ul
                ref={scrollRef}
                className={cn("flex gap-x-1 px-20 py-4 overflow-x-auto scrollbar-none scroll-smooth text-black")}
            >
                {loading
                    ? Array.from({ length: 8 }).map((_, idx) => (
                        <li key={idx} className="shrink-0">
                            <Skeleton />
                        </li>
                    ))
                    : tags.map((category, idx) => (
                        <li key={idx} className="shrink-0">
                            <Button
                                onClick={handleCategoryClick(category.value)}
                                className={cn(
                                    "relative inline-flex items-center px-4 py-2.5 text-sm font-medium",
                                    "text-black hover:text-black transition-all duration-200",
                                    "rounded-full border border-transparent hover:border-gray-300",
                                    "!bg-white hover:shadow-sm",
                                    "focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300",
                                    "group whitespace-nowrap"
                                )}
                            >
                  <span className="relative">
                    {category.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-300 group-hover:w-full" />
                  </span>
                            </Button>
                        </li>
                    ))}
            </ul>
        </nav>
    )
}
