"use client"
import type React from "react"
import {memo, useCallback, useEffect, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {usePathname} from "next/navigation"
import {
    Bell,
    BoltIcon,
    BookOpenIcon,
    HeartIcon,
    Layers2Icon,
    LogOutIcon,
    type LucideIcon,
    LucideMail,
    Menu,
    PenIcon,
    PinIcon,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {authService} from "@/app/(auth)/auth.service";

export type Notification = {
    id: number
    user: string
    action: string
    target: string
    timestamp: string
    unread: boolean
    type?: "info" | "success" | "warning" | "error"
}

export type DropdownItemConfig = {
    icon: LucideIcon
    label: string
    onClick?: () => void
    href?: string
    separator?: boolean
    disabled?: boolean
}

export type IconButtonConfig = {
    icon: React.ReactElement
    label: string
    notifications?: Notification[]
    onClick?: () => void
}

export type NavItem = {
    label: string
    href: string
    disabled?: boolean
}

export type UserInfo = {
    name?: string
    email?: string
    avatarUrl?: string
    status?: "online" | "away" | "busy" | "offline"
}

export type GlobalHeaderProps = {
    logoHref?: string
    logoText?: string
    logoSrc?: string
    navItems: NavItem[]
    user: UserInfo
    iconButtons?: IconButtonConfig[]
    dropdownItems?: DropdownItemConfig[]
    onLogout?: () => void
    className?: string
    activeNavClass?: string
    inactiveNavClass?: string
    showUserStatus?: boolean
    maxNotifications?: number
}

const Dot = ({className, type = "info"}: { className?: string; type?: "info" | "success" | "warning" | "error" }) => {
    const colorMap = {
        info: "text-blue-500",
        success: "text-green-500",
        warning: "text-yellow-500",
        error: "text-red-500",
    }
    return (
        <span aria-hidden="true">
      <svg width="6" height="6" fill="currentColor" viewBox="0 0 6 6" className={cn(colorMap[type], className)}>
        <circle cx="3" cy="3" r="3"/>
      </svg>
    </span>
    )
}

const StatusIndicator = ({status}: { status: UserInfo["status"] }) => {
    if (!status || status === "offline") return null
    const statusColors = {
        online: "bg-green-500",
        away: "bg-yellow-500",
        busy: "bg-red-500",
    }
    return (
        <div
            className={cn(
                "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background",
                statusColors[status],
            )}
        />
    )
}

const DropdownItem = ({icon: Icon, label, onClick, href, separator, disabled}: DropdownItemConfig) => {
    const content = (
        <DropdownMenuItem onClick={onClick} disabled={disabled}>
            <Icon className="mr-2 h-4 w-4 text-muted-foreground"/>
            {label}
        </DropdownMenuItem>
    )
    return (
        <>
            {separator && <DropdownMenuSeparator/>}
            {href && !disabled ? <Link href={href}>{content}</Link> : content}
        </>
    )
}

const UserAvatar = memo(function UserAvatar({
                                                user,
                                                dropdownItems = [],
                                                onLogout,
                                                showUserStatus = false,
                                            }: {
    user: UserInfo
    dropdownItems?: DropdownItemConfig[]
    onLogout?: () => void
    showUserStatus?: boolean
}) {
    const defaultItems: DropdownItemConfig[] = [
        {icon: BoltIcon, label: "Dashboard"},
        {icon: Layers2Icon, label: "Projects"},
        {icon: BookOpenIcon, label: "Docs"},
        {icon: PinIcon, label: "Pinned", separator: true},
        {icon: PenIcon, label: "Settings"},
        {icon: LogOutIcon, label: "Logout", onClick: onLogout, separator: true},
    ]
    const items = dropdownItems.length ? dropdownItems : defaultItems
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                    <Avatar>
                        <AvatarImage src={user.avatarUrl || "/placeholder.svg?height=40&width=40"} alt="Avatar"/>
                        <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    {showUserStatus && <StatusIndicator status={user.status}/>}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-64 rounded-xl shadow-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border"
            >
                <DropdownMenuLabel className="flex items-center gap-3 px-3 py-2">
                    <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatarUrl || "/placeholder.svg?height=40&width=40"} alt="Avatar"/>
                            <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
                        </Avatar>
                        {showUserStatus && <StatusIndicator status={user.status}/>}
                    </div>
                    <div className="truncate">
                        <p className="text-sm font-medium truncate">{user.name || "User"}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email || "user@example.com"}</p>
                        {showUserStatus && user.status &&
                            <p className="text-xs text-muted-foreground capitalize">{user.status}</p>}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                {items.map((item, index) => (
                    <DropdownItem key={`${item.label}-${index}`} {...item} />
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
})

const IconButton = memo(function IconButton({
                                                icon,
                                                label,
                                                notifications = [],
                                                onClick,
                                                maxNotifications = 99,
                                            }: IconButtonConfig & { maxNotifications?: number }) {
    const [items, setItems] = useState(notifications)
    const unread = items.filter((n) => n.unread).length
    const markAllRead = useCallback(() => setItems((prev) => prev.map((n) => ({...n, unread: false}))), [])
    const handleClick = (id: number) => setItems((prev) => prev.map((n) => (n.id === id ? {...n, unread: false} : n)))
    const handleButtonClick = useCallback(() => onClick?.(), [onClick])

    if (notifications.length === 0 && onClick) {
        return (
            <Button variant="ghost" size="icon" aria-label={label} onClick={handleButtonClick}>
                {icon}
            </Button>
        )
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={label} className="relative">
                    {icon}
                    {unread > 0 && (
                        <Badge
                            className="absolute -top-2 left-full translate-x-[-50%] px-1 rounded-full min-w-[1.2rem] text-[10px]">
                            {unread > maxNotifications ? `${maxNotifications}+` : unread}
                        </Badge>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-80 p-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md rounded-xl shadow-xl border overflow-hidden"
                align="end"
            >
                <div className="flex items-center justify-between px-4 py-2 border-b">
                    <span className="text-sm font-semibold">{label}</span>
                    {unread > 0 && (
                        <button onClick={markAllRead} className="text-xs hover:underline text-muted-foreground">
                            Mark all as read
                        </button>
                    )}
                </div>
                <div className="max-h-60 overflow-y-auto">
                    {items.length === 0 ? (
                        <div
                            className="px-4 py-8 text-center text-sm text-muted-foreground">No {label.toLowerCase()} yet</div>
                    ) : (
                        <ul>
                            {items.map((n) => (
                                <li key={n.id}>
                                    <button
                                        onClick={() => handleClick(n.id)}
                                        className="w-full text-left px-4 py-2 hover:bg-accent/40 text-sm transition-colors"
                                    >
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <span className="font-medium">{n.user}</span> {n.action}{" "}
                                                <span className="font-medium">{n.target}</span>
                                                <div className="text-xs text-muted-foreground">{n.timestamp}</div>
                                            </div>
                                            {n.unread && <Dot type={n.type} className="mt-1"/>}
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
})

export default function GlobalHeader({
                                         logoHref,
                                         logoSrc = "/logo.png",
                                         navItems,
                                         user,
                                         iconButtons = [],
                                         dropdownItems = [],
                                         className,
                                         activeNavClass = "bg-navyBlue/80 px-3 py-2 rounded-md text-white",
                                         inactiveNavClass = "text-muted-foreground",
                                         showUserStatus = false,
                                         maxNotifications = 99,
                                     }: GlobalHeaderProps) {
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const finalIconButtons = iconButtons.length
        ? iconButtons
        : [
            {icon: <Bell className="h-5 w-5"/>, label: "Notifications", notifications: []},
            {icon: <LucideMail className="h-5 w-5"/>, label: "Messages", notifications: []},
            {icon: <HeartIcon className="h-5 w-5"/>, label: "Favorites", notifications: []},
        ]

    const basePath = logoHref ? logoHref : "/"
    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const handleLogout = useCallback(async () => {
        try {
            await authService.logout()
            console.log("Simulating logout...")
            localStorage.removeItem("_at")
            localStorage.removeItem("_role")
            window.location.href = "/login"
        } catch (err) {
            console.error("Logout failed", err)
        }
    }, [])

    return (
        <nav
            role="navigation"
            aria-label="Main"
            className={cn(
                "sticky top-0 z-50 w-full transition-shadow backdrop-blur-md",
                isScrolled && "shadow-md bg-white/80 dark:bg-neutral-900/80",
                className,
            )}
        >
            <header className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                <Link href={basePath} className="shrink-0 flex items-center gap-2">
                    <Image
                        src={logoSrc || "/placeholder.svg"}
                        alt="Logo"
                        width={56}
                        height={56}
                        className="w-full h-12 object-cover"
                        priority
                    />
                </Link>
                <ul className="hidden md:flex gap-4 items-center font-medium">
                    {navItems.map(({label, href, disabled}) => (
                        <li key={label}>
                            <Link
                                href={disabled ? "#" : href}
                                className={cn(
                                    "transition-colors duration-200 text-sm Capitalize",
                                    disabled && "opacity-50 cursor-not-allowed",
                                    pathname === href ? activeNavClass : inactiveNavClass,
                                )}
                                onClick={disabled ? (e) => e.preventDefault() : undefined}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="hidden md:flex items-center gap-3">
                    {finalIconButtons.map((button, index) => (
                        <IconButton key={`${button.label}-${index}`} {...button} maxNotifications={maxNotifications}/>
                    ))}
                    <UserAvatar
                        user={user}
                        dropdownItems={dropdownItems}
                        onLogout={handleLogout}
                        showUserStatus={showUserStatus}
                    />
                </div>
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <div className={' flex items-center space-x-3 md:hidden '}>
                        {finalIconButtons.map((button, index) => (
                            <IconButton key={`mobile-${button.label}-${index}`} {...button}
                                        maxNotifications={maxNotifications}/>
                        ))}
                        <UserAvatar
                            user={user}
                            dropdownItems={dropdownItems}
                            onLogout={handleLogout}
                            showUserStatus={showUserStatus}
                        />
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" aria-label="Toggle menu">
                                <Menu className="h-6 w-6 text-foreground"/>
                            </Button>
                        </SheetTrigger>
                    </div>
                    <SheetContent side="right" className="w-80 p-4">
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <Image
                                    src={logoSrc || "/placeholder.svg"}
                                    alt="Logo"
                                    width={56}
                                    height={56}
                                    className="w-fit h-12 object-cover"
                                    priority
                                />
                            </div>
                            <nav className="space-y-2 ">
                                {navItems.map(({label, href, disabled}) => (
                                    <Link
                                        key={label}
                                        href={disabled ? "#" : href}
                                        onClick={() => {
                                            if (!disabled) setIsMenuOpen(false)
                                        }}
                                        className={cn(
                                            "block py-2 text-sm transition-colors capitalize",
                                            disabled && "opacity-50 cursor-not-allowed",
                                            pathname === href
                                                ? "text-foreground font-semibold"
                                                : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </SheetContent>
                </Sheet>
            </header>
        </nav>
    )
}
