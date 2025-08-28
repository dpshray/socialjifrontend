'use client'

import React, { useEffect, useState } from 'react'
import { BriefcaseIcon, DollarSign, Plus, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import InfluencerChart from '@/components/chart/Influencer'
import LatestGigsTable from '@/components/table/userTable'
import { Button } from '@/components/ui/button'
import { ComingStatsCard, InfluencerStatsCard } from '@/components/card/influencer/influencer-dashboard'
import influencerService from '@/services/InfluencerService'
import { DashboardUserCard } from '@/components/card/card'
import { toast } from 'sonner'

interface SocialMediaIcon {
    image: string
    title: string
    description: string
    type: string
}

const socialMediaIcons: SocialMediaIcon[] = [
    { image: '/instagram.png', title: 'Instagram', description: 'Connect Account', type: 'instagram' },
    { image: '/facebook1.png', title: 'Facebook', description: 'Connect Account', type: 'facebook' },
]

export default function InfluencerDashboard() {
    const [loadingType, setLoadingType] = useState<string | null>(null)
    const [dashboardData, setDashboardData] = useState<any>(null)
    const [gigChartData, setGigChartData] = useState<any[]>([])
    const [campaignChartData, setCampaignChartData] = useState<any[]>([])
    const [loadingDashboard, setLoadingDashboard] = useState(true)

    const handleConnect = (type: string) => {
        if (type === 'facebook') {
            const token = localStorage.getItem('_at')
            if (!token) {
                toast.error('User token not found. Please log in.')
                return
            }
            setLoadingType(type)
            window.location.href = `https://socialapi.stage.dworklabs.com/api/v1/social-data-fetcher/fb?token=${encodeURIComponent(token)}`
        } else {
            toast.error('This feature is not available yet.')
        }
    }

    useEffect(() => {
        const fetchInfluencerData = async () => {
            setLoadingDashboard(true)
            try {
                const response = await influencerService.influencerDashboard()
                setDashboardData(response)
                setGigChartData(response?.no_of_gigs_published_on_current_year || [])
                setCampaignChartData(response?.campaign_published_on_current_year || [])
            } catch {
                setDashboardData(null)
            } finally {
                setLoadingDashboard(false)
            }
        }
        fetchInfluencerData()
    }, [])

    const statsData = [
        { title: 'Total Gigs', value: dashboardData?.total_gigs_count?.toString() ?? '0', icon: BriefcaseIcon },
        { title: 'Reviews Received', value: dashboardData?.total_reviews_received_from_gigs_count?.toString() ?? '0', icon: TrendingUp },
        { title: 'Reviews Given', value: dashboardData?.total_reviews_given_count?.toString() ?? '0', icon: DollarSign },
        { title: 'Campaign Bids', value: dashboardData?.total_bidded_on_campaign_count?.toString() ?? '0', icon: TrendingUp },
    ]
    console.log('campaignChartData',campaignChartData)

    const isConnected = (platformType: string) =>
        dashboardData?.social_followers?.some(
            (follower: any) => follower.social_site.name.toLowerCase() === platformType.toLowerCase()
        ) ?? false

    const getFollowerData = (platformType: string) =>
        dashboardData?.social_followers?.find(
            (follower: any) => follower.social_site.name.toLowerCase() === platformType.toLowerCase()
        )

    return (
        <section className="w-full py-8 bg-background container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here&#39;s your performance overview.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 space-y-6">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {loadingDashboard
                                ? Array.from({ length: 4 }).map((_, idx) => <InfluencerStatsCard key={idx} title="" value="" icon={BriefcaseIcon} />)
                                : statsData.map((stat, idx) => (
                                    <InfluencerStatsCard key={idx} title={stat.title} value={stat.value} icon={stat.icon} />
                                ))}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {loadingDashboard
                                ? Array.from({ length: 4 }).map((_, idx) => <ComingStatsCard key={idx} />)
                                : Array.from({ length: 4 }).map((_, idx) => <ComingStatsCard key={idx} />)}
                        </div>
                    </div>

                    <aside className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {socialMediaIcons.map((icon) => {
                                const connected = isConnected(icon.type)
                                const followerData = getFollowerData(icon.type)
                                return (
                                    <div
                                        key={icon.type}
                                        className="flex items-center space-x-3 p-3 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800"
                                    >
                                        <Image
                                            src={icon.image || '/placeholder.svg'}
                                            alt={`${icon.title} logo`}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 object-contain"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{icon.title}</p>
                                            {connected && followerData ? (
                                                <>
                                                    <p className="text-xs text-green-600">Connected</p>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                                        {followerData.follower_count.toLocaleString()} followers
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="text-xs text-gray-600 dark:text-gray-400">{icon.description}</p>
                                            )}
                                        </div>
                                        {!connected && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleConnect(icon.type)}
                                                disabled={loadingType === icon.type}
                                            >
                                                {loadingType === icon.type ? 'Connecting...' : 'Connect'}
                                            </Button>
                                        )}
                                        {connected && (
                                            <Button variant="secondary" size="sm">
                                                Manage
                                            </Button>
                                        )}
                                    </div>
                                )
                            })}
                            <div className="flex items-center space-x-3 p-3 border rounded-lg border-dashed dark:border-gray-600 bg-white dark:bg-gray-800">
                                <Button variant="outline" size="sm" className="w-6 h-6 p-0 bg-transparent" disabled>
                                    <Plus className="w-4 h-4" />
                                </Button>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Add Platform</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Connect more social media</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                        {loadingDashboard ? (
                            <div className="h-[300px] w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
                        ) : (
                            <InfluencerChart gigsData={gigChartData} campaignData={campaignChartData} />
                        )}
                    </div>

                    <aside className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Influencers</h2>
                        <div className="space-y-3">
                            {loadingDashboard
                                ? Array.from({ length: 3 }).map((_, idx) => (
                                    <div key={idx} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                                ))
                                : dashboardData?.top_influencer_with_max_followers_count?.slice(0, 3).map((influencer: any) => (
                                    <DashboardUserCard
                                        key={influencer.id}
                                        image={influencer.image}
                                        name={`${influencer.first_name} ${influencer.last_name}`}
                                        username={influencer.nick_name}
                                        followers={influencer.social_profiles_sum_follower}
                                        growthRate={Math.round(influencer.avg_follower_growth_rate_per_week)}
                                    />
                                ))}
                        </div>
                    </aside>
                </div>

                <div className="mt-10">
                    <LatestGigsTable />
                </div>
            </div>
        </section>
    )
}
