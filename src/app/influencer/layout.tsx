'use client'

import React, { useEffect, useMemo, useCallback } from "react"
import ProtectedRoutes from "@/components/routes/ProtectedRoutes"
import useAuth from "@/hooks/useAuth"
import {
    Bell,
    DollarSign,
    LogOutIcon,
    PinIcon,
    Settings2Icon,
} from "lucide-react"
import GlobalHeader from "@/components/header/GlobalHeader"
import { authService } from "@/app/(auth)/auth.service"

export default function InfluencerLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth()

    const sidebarItems = useMemo(
        () => [
            { label: "Dashboard", href: "/influencer/dashboard" },
            { label: "Gigs", href: "/influencer/gigs" },
            { label: "Payments", href: "/influencer/payments" },
            { label: "Profile", href: "/influencer/profile" },
            { label: "Reviews", href: "/influencer/reviews" },
            { label: "campaigns", href: "/influencer/campaigns" },
        ],
        []
    )

    const notifications = useMemo(
        () => [
            {
                id: 1,
                user: "Admin",
                action: "sent",
                target: "a new gig request",
                timestamp: "1h ago",
                unread: true,
            },
            {
                id: 2,
                user: "System",
                action: "processed",
                target: "your payout",
                timestamp: "2h ago",
                unread: true,
            },
            {
                id: 3,
                user: "Campaign Team",
                action: "launched",
                target: "a new campaign",
                timestamp: "3h ago",
                unread: false,
            },
        ],
        []
    )

    const messages = useMemo(
        () => [
            {
                id: 4,
                user: "BrandX",
                action: "sent",
                target: "a message",
                timestamp: "Just now",
                unread: true,
            },
        ],
        []
    )

    const handleLogout = useCallback(async () => {
        try {
            console.log("Logging out...")
            await authService.logout()
            console.log("Logout successful")
            localStorage.removeItem("_at")
            localStorage.removeItem("_role")
            window.location.href = "/login"
        } catch (err) {
            console.error("Logout failed", err)
        }
    }, [])

    const dropdownItems = useMemo(
        () => [
            { icon: DollarSign, label: "Payments", href: "/influencer/payments" },
            { icon: PinIcon, label: "Pinned", href: "/influencer/pinned", separator: true },
            { icon: Settings2Icon, label: "Settings", href: "/influencer/profile" },
            { icon: LogOutIcon, label: "Logout", separator: true, onClick: handleLogout },
        ],
        [handleLogout]
    )

    useEffect(() => {
        console.log("User:", user)
    }, [user, loading])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p className="text-muted-foreground text-sm">Loading...</p>
            </div>
        )
    }

    return (
        <ProtectedRoutes allowedRoles="influencer">
            <div className="min-h-screen bg-background flex flex-col">
                <GlobalHeader
                    navItems={sidebarItems}
                    logoHref="/influencer"
                    dropdownItems={dropdownItems}
                    user={{
                        name: `${user?.first_name ?? "User"}`,
                        email: user?.email ?? "",
                        avatarUrl: user?.image ?? "",
                    }}
                    iconButtons={[
                        {
                            icon: <Bell className="h-5 w-5" />,
                            label: "Notifications",
                            notifications,
                        },
                    ]}
                    onLogout={handleLogout}
                />
                <main className="container mx-auto flex-1 px-4 py-6 w-full">{children}</main>
            </div>
        </ProtectedRoutes>
    )
}
