"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import {Menu, Sparkles, X} from "lucide-react"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"

interface NavLink {
    label: string
    href: string
}

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const pathname = usePathname()

    const navLinks: NavLink[] = [
        {label: "Insights", href: "/insights"},
        {label: "Explore", href: "/explore"},
        {label:"How it works", href:"/how-it-works"},
        {label: "Contact", href: "/contact-us"},
        {label: "FAQ", href: "/faq"}
    ]

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
    const closeMobileMenu = () => setIsMobileMenuOpen(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        const handleResize = () => window.innerWidth >= 768 && setIsMobileMenuOpen(false)

        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (isMobileMenuOpen && !target.closest("nav")) {
                setIsMobileMenuOpen(false)
            }
        }

        if (isMobileMenuOpen) {
            document.addEventListener("click", handleClickOutside)
        }

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [isMobileMenuOpen])

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled
                    ? "bg-white/95 border-b border-gray-200/80 shadow-sm backdrop-blur-md"
                    : "bg-white/90 border-b border-gray-200/50 backdrop-blur-sm"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 font-bold bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text hover:from-purple-600 hover:to-indigo-700 transition-all"
                    >
                        <span className="text-sm sm:text-2xl">SocialJi</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <div className="flex gap-6 items-center">
                            {navLinks.map(({href, label}) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "text-sm font-medium transition-colors flex items-center gap-1.5",
                                        pathname === href
                                            ? "text-purple-600 font-semibold"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {label}
                                    {label === "Explore" && <Sparkles className="w-4 h-4"/>}
                                </Link>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" asChild>
                                <Link href="/register" onClick={closeMobileMenu}>
                                    Get started
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/login" onClick={closeMobileMenu} className="btn-gradient">
                                    Login
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Tablet Menu */}
                    <div className="hidden md:flex lg:hidden items-center gap-4">
                        <div className="flex gap-4 items-center">
                            {navLinks.map(({href, label}) => (
                                <Link
                                    key={href}
                                    href={href}
                                    className={cn(
                                        "text-sm font-medium transition-colors flex items-center gap-1.5",
                                        pathname === href
                                            ? "text-purple-600 font-semibold"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {label === "Explore" && <Sparkles className="w-4 h-4"/>}
                                    {label}
                                </Link>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/register" onClick={closeMobileMenu} className="text-xs px-3">
                                    Get started
                                </Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/login" onClick={closeMobileMenu} className="btn-gradient text-xs px-3">
                                    Login
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                            className="h-8 w-8 p-0"
                        >
                            {isMobileMenuOpen ? <X className="w-4 h-4"/> : <Menu className="w-4 h-4"/>}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div
                className={cn(
                    "md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-200/50",
                    isScrolled ? "bg-white/95 backdrop-blur-md" : "bg-white/90 backdrop-blur-sm",
                    isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="container mx-auto px-4 py-4 space-y-6 sm:px-6 sm:py-6">
                    <div className="space-y-4">
                        {navLinks.map(({href, label}) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={closeMobileMenu}
                                className={cn(
                                    "block text-base font-medium transition-colors py-1 flex items-center gap-2",
                                    pathname === href
                                        ? "text-purple-600 font-semibold"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {label === "Explore" && <Sparkles className="w-4 h-4"/>}
                                {label}
                            </Link>
                        ))}
                    </div>
                    <div className="space-y-3 pt-4 border-t border-gray-200/50">
                        <Button variant="outline" asChild className="w-full bg-transparent">
                            <Link href="/register" onClick={closeMobileMenu}>
                                Get started
                            </Link>
                        </Button>
                        <Button asChild className="w-full">
                            <Link href="/login" onClick={closeMobileMenu} className="btn-gradient">
                                Login
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
