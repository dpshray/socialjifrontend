"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import {BriefcaseBusiness, Building2, CreditCard, Users} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {ProfileStatsCard} from "@/components/card/profile-stats-card"
import {formatCompactNumber} from "@/lib/utils"
import adminService from "@/services/admin.service"

interface DashboardStatsResponse {
    brand_count: number
    influencer_count: number
    gig_count: number
    succesful_payment: number
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStatsResponse | null>(null)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await adminService.adminDashboardStats()
                setStats(response)
                console.log("Stats:", response)
            } catch (error) {
                console.error("Error fetching stats:", error)
            }
        }

        fetchStats()
    }, [])

    const statCards = stats
        ? [
            {
                title: "Influencer",
                value: formatCompactNumber(stats.influencer_count),
                description: "Total Influencers",
                icon: <Users className="h-6 w-6 text-white"/>,
                colorClass: "bg-blue-500",
            },
            {
                title: "Brand",
                value: formatCompactNumber(stats.brand_count),
                description: "Total Brands",
                icon: <Building2 className="h-6 w-6 text-white"/>,
                colorClass: "bg-emerald-500",
            },
            {
                title: "Gig",
                value: formatCompactNumber(stats.gig_count),
                description: "Total Gigs",
                icon: <BriefcaseBusiness className="h-6 w-6 text-white"/>,
                colorClass: "bg-purple-500",
            },
            {
                title: "Transaction",
                value: formatCompactNumber(stats.succesful_payment),
                description: "Total Payments",
                icon: <CreditCard className="h-6 w-6 text-white"/>,
                colorClass: "bg-orange-500",
            },
        ]
        : []

    return (
        <section className="container mx-auto px-4 sm:p-4 md:p-6 lg:p-8 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <ProfileStatsCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                        icon={stat.icon}
                        colorClass={stat.colorClass}
                        isLoading={!stats}
                    />
                ))}
            </div>

            <Card className="shadow-md border-0">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/admin/influencers">
                        <Button variant="outline" className="w-full">View All Influencers</Button>
                    </Link>
                    <Link href="/admin/brands">
                        <Button variant="outline" className="w-full">View All Brands</Button>
                    </Link>
                    <Link href="/admin/gigs">
                        <Button variant="outline" className="w-full">View All Gigs</Button>
                    </Link>
                    <Link href="/admin/payments">
                        <Button variant="outline" className="w-full">View All Payments</Button>
                    </Link>
                </CardContent>
            </Card>
        </section>
    )
}
