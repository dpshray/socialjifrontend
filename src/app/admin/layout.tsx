'use client'
import type {ReactNode} from "react"
import ProtectedRoutes from "@/components/routes/ProtectedRoutes"
import type {NavItem} from "@/types/types"
import {authService} from "@/app/(auth)/auth.service"
import {Bell, HeartIcon, Layers2Icon, LogOutIcon, LucideMail, Settings2Icon,} from "lucide-react"
import GlobalHeader, {IconButtonConfig, Notification} from "@/components/header/GlobalHeader";


const sidebarItems: NavItem[] = [
    {label: "Influencer ", href: "/admin/influencers"},
    {label: "Brand", href: "/admin/brands"},
    {label: "Payment", href: "/admin/payments"},
    {label: "Gigs", href: "/admin/gigs"},

]

const notifications: Notification[] = [
    {
        id: 1,
        user: "System",
        action: "notified:",
        target: "New creator application received",
        timestamp: "2 min ago",
        unread: true,
    },
    {
        id: 2,
        user: "Billing",
        action: "confirmed:",
        target: "Payment processed successfully",
        timestamp: "1 hour ago",
        unread: true,
    },
    {
        id: 3,
        user: "Campaign",
        action: "started:",
        target: "Campaign launched successfully",
        timestamp: "Today",
        unread: false,
    },
]

const handleLogout = async () => {
    try {
        await authService.logout()
        localStorage.removeItem("_at")
        localStorage.removeItem("_role")
        window.location.href = "/login"
    } catch (error) {
        console.error("Logout failed:", error)
    }
}

const dropdownItems = [
    {icon: Layers2Icon, label: "Campaigns", href: "/brand/campaigns"},
    {icon: Settings2Icon, label: "Settings", href: "/brand/settings"},
    {
        icon: LogOutIcon,
        label: "Logout",
        separator: true,
        onClick: handleLogout,
    },
]

const iconButtons: IconButtonConfig[] = [
    {icon: <Bell className="h-5 w-5"/>, label: "Notifications", notifications},
    {icon: <LucideMail className="h-5 w-5"/>, label: "Messages", notifications: []},
    {icon: <HeartIcon className="h-5 w-5"/>, label: "Favorites", notifications: []},
]

export default function AdminLayout({children}: { children: ReactNode }) {
    return (
        <ProtectedRoutes allowedRoles="admin">
            <GlobalHeader
                navItems={sidebarItems}
                iconButtons={iconButtons}
                dropdownItems={dropdownItems}
                logoHref="/admin"
                user={{
                    name: "Admin User",
                    email: "admin@example.com",
                    avatarUrl: "/placeholder.svg?height=40&width=40",
                    status: "online",
                }}
                onLogout={handleLogout}
            />
            {children}
        </ProtectedRoutes>
    )
}
