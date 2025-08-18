'use client'

import React, {useEffect} from "react"
import GlobalHeader from "@/components/header/GlobalHeader"
import ProtectedRoutes from "@/components/routes/ProtectedRoutes"
import {Bell, BookOpenIcon, DollarSign, Layers2Icon, LogOutIcon, PinIcon, Settings2Icon} from "lucide-react"
import useAuth from "@/hooks/useAuth"
import {NavItem} from "@/types/types"
import {authService} from "@/app/(auth)/auth.service";


const sidebarItems: NavItem[] = [
    {label: "Dashboard", href: "/brand/dashboard"},
    {label: "Profile", href: "/brand/profile"},
    {label: "Search Gigs", href: "/brand/search-gigs"},
    {label: "Discover Creators", href: "/brand/hire-influencers"},
    {label: "campaigns", href: "/brand/campaigns"},

]

const notifications = [
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

const BrandLayout = ({children}: { children: React.ReactNode }) => {
    const {user} = useAuth()

    useEffect(() => {
        console.log("User:", user)
    }, [user])

    const handleLogout = async () => {
        try {
            await authService.logout()
            localStorage.removeItem("_at")
            localStorage.removeItem("_role")
            window.location.href = "/login"
        } catch (err) {
            console.error("Logout failed", err)
        }
    }

    const dropdownItems = [
        {icon: DollarSign, label: "Payments", href: "/brand/payments"},
        {icon: Layers2Icon, label: "Campaigns", href: "/brand/campaigns"},
        {icon: BookOpenIcon, label: "Docs", href: "/brand/docs"},
        {icon: PinIcon, label: "Pinned", href: "/brand/pinned", separator: true},
        {icon: Settings2Icon, label: "Settings", href: "/brand/settings"},

        {
            icon: LogOutIcon,
            label: "Logout",
            separator: true,
            onClick: handleLogout,
        },
    ]

    return (
        <ProtectedRoutes allowedRoles="brand">
            <GlobalHeader
                logoHref="/brand"
                navItems={sidebarItems}
                dropdownItems={dropdownItems}
                user={{
                    name: `${user?.first_name ?? "User"}`,
                    email: user?.email ?? "",
                    avatarUrl: user?.image ?? "",
                }}
                iconButtons={[
                    {
                        icon: <Bell className="h-5 w-5"/>,
                        label: "Notifications",
                        notifications,
                    },
                ]}
            />
            <main className="container mx-auto min-h-screen ">{children}</main>
        </ProtectedRoutes>
    )
}

export default BrandLayout
