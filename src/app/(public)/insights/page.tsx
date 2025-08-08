'use client'

import {useEffect, useState} from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs'
import {Activity, Brain, Briefcase, Eye, PieChart, Sparkles, Star, Tag, TrendingUp, Users, Zap,} from 'lucide-react'
import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from 'recharts'
import HeroSection from '@/components/header/HeroSection'
import dashboardService from '@/services/dashboardService'
import {TopPerformingCreators} from '@/components/card/dashboard/top-performing-creators'
import {InsightsCategoryGraph} from '@/components/card/dashboard/category-graph'
import {PlatformsPieChart} from '@/components/card/dashboard/platforms-pie-chart'
import InsightStatCard from '@/components/card/InsightStatsCard'
import {GigStats} from '@/types/influencers'

interface SocialProfile {
    platform: string
    follower_count: number | string
    highest_like: number
    follower_growth_rate_per_week: number
}

interface Influencers {
    id: number
    first_name: string
    last_name: string | null
    nick_name: string
    address: string | null
    image: string
    influencer_rating: number
    social_profiles: SocialProfile[] | null
    gig_stats?: GigStats | null
}

const performanceData = [
    {month: 'Jan', engagement: 4.2, reach: 2.5, conversions: 3.1, roi: 380},
    {month: 'Feb', engagement: 4.8, reach: 2.8, conversions: 3.5, roi: 420},
    {month: 'Mar', engagement: 5.1, reach: 3.2, conversions: 4.2, roi: 450},
    {month: 'Apr', engagement: 4.9, reach: 3.0, conversions: 3.8, roi: 410},
    {month: 'May', engagement: 5.5, reach: 3.8, conversions: 4.8, roi: 480},
    {month: 'Jun', engagement: 6.2, reach: 4.2, conversions: 5.2, roi: 520},
]

export default function InsightsPage() {
    const [topCreators, setTopCreators] = useState<Influencers[]>([])
    const [statsData, setStatsData] = useState<
        {
            label: string
            value: number
            percentageChange: number
            icon: React.ElementType
        }[]
    >([])

    useEffect(() => {
        const fetchTopInfluencers = async () => {
            try {
                const params = {per_page: 6, page: 1}
                const response = await dashboardService.getTopCreators(params)
                setTopCreators(response.data)
            } catch (error) {
                console.error('Error fetching top creators:', error)
            }
        }
        fetchTopInfluencers()
    }, [])

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const response = await dashboardService.getInsightsStats()
                const transformed = [
                    {
                        label: 'New Gigs',
                        value: response.gig.new_gig_this_month,
                        percentageChange: response.gig.increase_on_gigs_by_percentage,
                        icon: Activity,
                    },
                    {
                        label: 'New Influencers',
                        value: response.influencer.new_influencer_this_month,
                        percentageChange: response.influencer.increase_on_influencer_by_percentage,
                        icon: Users,
                    },
                    {
                        label: 'New Brands',
                        value: response.brand.new_brand_this_month,
                        percentageChange: response.brand.increase_on_brand_by_percentage,
                        icon: Briefcase,
                    },
                    {
                        label: 'New Reviews',
                        value: response.reviews.new_review_this_month,
                        percentageChange: response.reviews.increase_on_review_by_percentage,
                        icon: Star,
                    },
                ]
                setStatsData(transformed)
            } catch (error) {
                console.error('Error fetching insight stats:', error)
            }
        }
        fetchStatsData()
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            <HeroSection
                imageSrc="/hero1.png"
                title="Insights Dashboard"
                description="Smart analytics powered by AI to track performance and optimize your strategy"
                icon={<Brain className="w-6 h-6 text-violet-600"/>}
                badgeContent={
                    <>
                        <Sparkles className="w-3 h-3 mr-1"/>
                        <span className="text-white">AI-Powered Analytics</span>
                    </>
                }
            />
            <div className="container mx-auto section-padding py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statsData.map((stat, index) => (
                        <InsightStatCard
                            key={index}
                            icon={stat.icon}
                            label={stat.label}
                            value={stat.value}
                            percentageChange={stat.percentageChange}
                        />
                    ))}
                </div>
                <Tabs defaultValue="performance" className="space-y-8">
                    <TabsList className="glass-card p-1 h-12 border-0">
                        <TabsTrigger
                            value="performance"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <Activity className="w-4 h-4 mr-2"/>
                            Performance
                        </TabsTrigger>
                        <TabsTrigger
                            value="platforms"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <PieChart className="w-4 h-4 mr-2"/>
                            Platforms
                        </TabsTrigger>
                        <TabsTrigger
                            value="creators"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <Users className="w-4 h-4 mr-2"/>
                            Top Creators
                        </TabsTrigger>
                        <TabsTrigger
                            value="categories"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <Tag className="w-4 h-4 mr-2"/>
                            Categories
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="performance" className="space-y-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="glass-card border-0">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2">
                                        <TrendingUp className="w-5 h-5 text-violet-600"/>
                                        <span>Engagement Trends</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Monthly engagement rate performance over time
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <LineChart data={performanceData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                            <XAxis dataKey="month" stroke="#64748b" fontSize={12}/>
                                            <YAxis stroke="#64748b" fontSize={12}/>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="engagement"
                                                stroke="url(#gradient1)"
                                                strokeWidth={3}
                                                dot={{fill: '#8b5cf6', strokeWidth: 2, r: 6}}
                                                activeDot={{r: 8, fill: '#8b5cf6'}}
                                            />
                                            <defs>
                                                <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#8b5cf6"/>
                                                    <stop offset="100%" stopColor="#3b82f6"/>
                                                </linearGradient>
                                            </defs>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card className="glass-card border-0">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2">
                                        <Eye className="w-5 h-5 text-blue-600"/>
                                        <span>Reach & Conversions</span>
                                    </CardTitle>
                                    <CardDescription>Reach and conversion metrics comparison</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <AreaChart data={performanceData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                            <XAxis dataKey="month" stroke="#64748b" fontSize={12}/>
                                            <YAxis stroke="#64748b" fontSize={12}/>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="reach"
                                                stackId="1"
                                                stroke="#3b82f6"
                                                fill="url(#gradient2)"
                                                strokeWidth={2}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="conversions"
                                                stackId="2"
                                                stroke="#10b981"
                                                fill="url(#gradient3)"
                                                strokeWidth={2}
                                            />
                                            <defs>
                                                <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                                </linearGradient>
                                                <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.8}/>
                                                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.1}/>
                                                </linearGradient>
                                            </defs>
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="glass-card border-0 bg-gradient-to-br from-violet-50 to-blue-50">
                            <CardHeader>
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-white"/>
                                    </div>
                                    <div>
                                        <CardTitle className="text-slate-900">AI-Powered Insights</CardTitle>
                                        <CardDescription>Smart recommendations based on your data</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className="h-2 w-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full mt-2 flex-shrink-0"/>
                                            <div>
                                                <p className="font-medium text-slate-900 mb-1">Engagement Trending
                                                    Up</p>
                                                <p className="text-sm text-slate-600">
                                                    Your content resonates well with audiences, showing a 15% increase
                                                    over the past 3 months.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className="h-2 w-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full mt-2 flex-shrink-0"/>
                                            <div>
                                                <p className="font-medium text-slate-900 mb-1">TikTok Growth
                                                    Potential</p>
                                                <p className="text-sm text-slate-600">
                                                    Consider allocating more budget to TikTok campaigns for maximum ROI
                                                    potential.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className="h-2 w-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full mt-2 flex-shrink-0"/>
                                            <div>
                                                <p className="font-medium text-slate-900 mb-1">Optimal Timing</p>
                                                <p className="text-sm text-slate-600">
                                                    Posts between 2-4 PM show 23% higher engagement rates across all
                                                    platforms.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="platforms" className="space-y-8 w-full">
                        <PlatformsPieChart/>
                    </TabsContent>
                    <TabsContent value="creators" className="space-y-8">
                        <TopPerformingCreators data={topCreators as any}/>
                    </TabsContent>
                    <TabsContent value="categories" className="space-y-8">
                        <InsightsCategoryGraph/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
