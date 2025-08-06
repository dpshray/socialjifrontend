"use client"

import React, {useEffect, useMemo} from "react"


import ProtectedRoutes from "@/components/routes/ProtectedRoutes"
import useAuth from "@/hooks/useAuth"
import {Bell} from "lucide-react";
import GlobalHeader from "@/components/header/GlobalHeader";

export default function InfluencerLayout({children}: { children: React.ReactNode }) {
    const {user, loading} = useAuth()

    const sidebarItems = useMemo(
        () => [
            {label: "Dashboard", href: "/influencer/dashboard"},
            {label: "Gigs", href: "/influencer/gigs"},
            {label: "Payments", href: "/influencer/payments"},
            {label: "Profile", href: "/influencer/profile"},
            {label: "Reviews", href: "/influencer/reviews"},
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
                    user={{
                        name: user?.first_name ?? "Influencer",
                        email: user?.email ?? "user@example.com",
                        avatarUrl:
                            user?.image && user.image.startsWith("http")
                                ? user.image
                                : "/default-avatar.png",
                    }}
                    iconButtons={[

                        {
                            icon: <Bell className=" w-5 h-5  "/>,
                            label: "Messages",
                            notifications: messages,
                        },
                    ]}
                />
                <main className="container mx-auto flex-1 px-4 py-6 w-full">
                    {children}
                </main>
            </div>
        </ProtectedRoutes>
    )
}
