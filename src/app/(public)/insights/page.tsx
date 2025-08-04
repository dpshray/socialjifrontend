"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Progress} from "@/components/ui/progress"
import {
    Activity,
    ArrowUpRight,
    BarChart3,
    Brain,
    DollarSign,
    Eye,
    Heart,
    PieChart,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Zap,
} from "lucide-react"
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {useEffect} from "react";
import dashboardService from "@/services/dashboardService";

const performanceData = [
    {month: "Jan", engagement: 4.2, reach: 2.5, conversions: 3.1, roi: 380},
    {month: "Feb", engagement: 4.8, reach: 2.8, conversions: 3.5, roi: 420},
    {month: "Mar", engagement: 5.1, reach: 3.2, conversions: 4.2, roi: 450},
    {month: "Apr", engagement: 4.9, reach: 3.0, conversions: 3.8, roi: 410},
    {month: "May", engagement: 5.5, reach: 3.8, conversions: 4.8, roi: 480},
    {month: "Jun", engagement: 6.2, reach: 4.2, conversions: 5.2, roi: 520},
]

const platformData = [
    {name: "Instagram", value: 35, color: "#E1306C", campaigns: 45, avgROI: 420},
    {name: "TikTok", value: 28, color: "#000000", campaigns: 38, avgROI: 480},
    {name: "YouTube", value: 22, color: "#FF0000", campaigns: 28, avgROI: 380},
    {name: "X (Twitter)", value: 15, color: "#1DA1F2", campaigns: 18, avgROI: 350},
]

const topCreators = [
    {
        name: "Sarah Johnson",
        platform: "Instagram",
        engagement: "8.5%",
        roi: "520%",
        campaigns: 12,
        revenue: "$156K",
        growth: "+23%",
    },
    {
        name: "Tech Mike",
        platform: "YouTube",
        engagement: "6.1%",
        roi: "480%",
        campaigns: 8,
        revenue: "$128K",
        growth: "+18%",
    },
    {
        name: "Fitness Emma",
        platform: "TikTok",
        engagement: "9.2%",
        roi: "550%",
        campaigns: 15,
        revenue: "$189K",
        growth: "+31%",
    },
    {
        name: "Food Explorer",
        platform: "Instagram",
        engagement: "7.8%",
        roi: "450%",
        campaigns: 10,
        revenue: "$98K",
        growth: "+15%",
    },
]

const campaignMetrics = [
    {
        name: "Summer Fashion",
        reach: 2.5,
        engagement: 5.2,
        conversions: 3.8,
        roi: 420,
        budget: "$45K",
        revenue: "$189K",
    },
    {
        name: "Tech Reviews",
        reach: 1.8,
        engagement: 6.1,
        conversions: 4.2,
        roi: 380,
        budget: "$32K",
        revenue: "$122K",
    },
    {
        name: "Fitness Challenge",
        reach: 3.2,
        engagement: 8.5,
        conversions: 5.1,
        roi: 520,
        budget: "$28K",
        revenue: "$146K",
    },
    {
        name: "Food Discovery",
        reach: 1.2,
        engagement: 7.8,
        conversions: 4.5,
        roi: 450,
        budget: "$18K",
        revenue: "$81K",
    },
]

export default function InsightsPage() {

    return (
        <div className="min-h-screen container mx-auto bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
            <div className="container-width section-padding py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                        <Brain className="w-6 h-6 text-violet-600"/>
                        <Badge className="bg-violet-100 text-violet-700 border-violet-200">
                            <Sparkles className="w-3 h-3 mr-1"/>
                            AI-Powered Analytics
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Insights Dashboard</h1>
                    <p className="text-lg text-slate-600">
                        Smart analytics powered by AI to track performance and optimize your strategy
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                <Eye className="h-6 w-6 text-white"/>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                <TrendingUp className="w-3 h-3 mr-1"/>
                                +12.5%
                            </Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">4.2M</div>
                        <div className="text-sm text-slate-500">Total Reach</div>
                        <div className="text-xs text-slate-400 mt-2">vs last month</div>
                    </Card>

                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                                <Heart className="h-6 w-6 text-white"/>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                <TrendingUp className="w-3 h-3 mr-1"/>
                                +0.8%
                            </Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">6.2%</div>
                        <div className="text-sm text-slate-500">Avg Engagement Rate</div>
                        <div className="text-xs text-slate-400 mt-2">vs last month</div>
                    </Card>

                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <Target className="h-6 w-6 text-white"/>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                <TrendingUp className="w-3 h-3 mr-1"/>
                                +1.2%
                            </Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">5.2%</div>
                        <div className="text-sm text-slate-500">Conversion Rate</div>
                        <div className="text-xs text-slate-400 mt-2">vs last month</div>
                    </Card>

                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-white"/>
                            </div>
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                                <TrendingUp className="w-3 h-3 mr-1"/>
                                +28%
                            </Badge>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">442%</div>
                        <div className="text-sm text-slate-500">Average ROI</div>
                        <div className="text-xs text-slate-400 mt-2">vs last month</div>
                    </Card>
                </div>

                {/* Charts and Analytics */}
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
                            value="campaigns"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <BarChart3 className="w-4 h-4 mr-2"/>
                            Campaigns
                        </TabsTrigger>
                    </TabsList>

                    {/* Performance Tab */}
                    <TabsContent value="performance" className="space-y-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="glass-card border-0">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center space-x-2">
                                        <TrendingUp className="w-5 h-5 text-violet-600"/>
                                        <span>Engagement Trends</span>
                                    </CardTitle>
                                    <CardDescription>Monthly engagement rate performance over time</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <LineChart data={performanceData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                            <XAxis dataKey="month" stroke="#64748b" fontSize={12}/>
                                            <YAxis stroke="#64748b" fontSize={12}/>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                                    border: "none",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="engagement"
                                                stroke="url(#gradient1)"
                                                strokeWidth={3}
                                                dot={{fill: "#8b5cf6", strokeWidth: 2, r: 6}}
                                                activeDot={{r: 8, fill: "#8b5cf6"}}
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
                                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                                    border: "none",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
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

                        {/* AI Insights */}
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
                                                className="h-2 w-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
                                                className="h-2 w-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
                                                className="h-2 w-2 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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

                    {/* Platforms Tab */}
                    <TabsContent value="platforms" className="space-y-8">
                        <div className="grid lg:grid-cols-2 gap-8">
                            <Card className="glass-card border-0">
                                <CardHeader>
                                    <CardTitle>Platform Distribution</CardTitle>
                                    <CardDescription>Campaign distribution across social platforms</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={320}>
                                        <RechartsPieChart>
                                            <Pie
                                                data={platformData}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                fill="#8884d8"
                                                dataKey="value"
                                                label={({name, value}) => `${name}: ${value}%`}
                                                labelLine={false}
                                            >
                                                {platformData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color}/>
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                                    border: "none",
                                                    borderRadius: "12px",
                                                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                                                }}
                                            />
                                        </RechartsPieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="glass-card border-0">
                                <CardHeader>
                                    <CardTitle>Platform Performance</CardTitle>
                                    <CardDescription>ROI and campaign metrics by platform</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {platformData.map((platform) => (
                                            <div key={platform.name} className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-4 h-4 rounded-full"
                                                             style={{backgroundColor: platform.color}}></div>
                                                        <span
                                                            className="font-medium text-slate-900">{platform.name}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <div
                                                            className="text-sm font-bold text-slate-900">{platform.avgROI}%
                                                            ROI
                                                        </div>
                                                        <div
                                                            className="text-xs text-slate-500">{platform.campaigns} campaigns
                                                        </div>
                                                    </div>
                                                </div>
                                                <Progress value={platform.value * 2.5} className="h-2"/>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Top Creators Tab */}
                    <TabsContent value="creators" className="space-y-8">
                        <Card className="glass-card border-0">
                            <CardHeader>
                                <CardTitle>Top Performing Creators</CardTitle>
                                <CardDescription>Creators with highest engagement and ROI performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topCreators.map((creator, index) => (
                                        <div
                                            key={creator.name}
                                            className="flex items-center justify-between p-6 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-colors"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div
                                                    className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-xl font-bold text-lg">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <div
                                                        className="font-bold text-slate-900 text-lg">{creator.name}</div>
                                                    <div className="text-sm text-slate-500">{creator.platform}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-8">
                                                <div className="text-center">
                                                    <div
                                                        className="font-bold text-green-600 text-lg">{creator.engagement}</div>
                                                    <div className="text-xs text-slate-500">Engagement</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-blue-600 text-lg">{creator.roi}</div>
                                                    <div className="text-xs text-slate-500">ROI</div>
                                                </div>
                                                <div className="text-center">
                                                    <div
                                                        className="font-bold text-slate-900 text-lg">{creator.revenue}</div>
                                                    <div className="text-xs text-slate-500">Revenue</div>
                                                </div>
                                                <div className="text-center">
                                                    <div
                                                        className="font-bold text-slate-900 text-lg">{creator.campaigns}</div>
                                                    <div className="text-xs text-slate-500">Campaigns</div>
                                                </div>
                                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                                    <TrendingUp className="w-3 h-3 mr-1"/>
                                                    {creator.growth}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Campaigns Tab */}
                    <TabsContent value="campaigns" className="space-y-8">
                        <Card className="glass-card border-0">
                            <CardHeader>
                                <CardTitle>Campaign Performance Overview</CardTitle>
                                <CardDescription>Detailed metrics for recent campaign performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={campaignMetrics} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={12}/>
                                        <YAxis stroke="#64748b" fontSize={12}/>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "rgba(255, 255, 255, 0.95)",
                                                border: "none",
                                                borderRadius: "12px",
                                                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                                            }}
                                        />
                                        <Bar dataKey="reach" fill="#3b82f6" name="Reach (M)" radius={[4, 4, 0, 0]}/>
                                        <Bar dataKey="engagement" fill="#8b5cf6" name="Engagement %"
                                             radius={[4, 4, 0, 0]}/>
                                        <Bar dataKey="conversions" fill="#10b981" name="Conversions %"
                                             radius={[4, 4, 0, 0]}/>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <div className="grid md:grid-cols-2 gap-6">
                            {campaignMetrics.map((campaign) => (
                                <Card
                                    key={campaign.name}
                                    className="glass-card border-0 group hover:shadow-xl transition-all duration-300"
                                >
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">{campaign.name}</CardTitle>
                                            <ArrowUpRight
                                                className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors"/>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                                <div
                                                    className="text-2xl font-bold text-blue-600 mb-1">{campaign.reach}M
                                                </div>
                                                <div className="text-sm text-slate-500">Reach</div>
                                            </div>
                                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                                <div
                                                    className="text-2xl font-bold text-purple-600 mb-1">{campaign.engagement}%
                                                </div>
                                                <div className="text-sm text-slate-500">Engagement</div>
                                            </div>
                                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                                <div
                                                    className="text-2xl font-bold text-green-600 mb-1">{campaign.conversions}%
                                                </div>
                                                <div className="text-sm text-slate-500">Conversions</div>
                                            </div>
                                            <div className="text-center p-4 bg-slate-50 rounded-xl">
                                                <div
                                                    className="text-2xl font-bold text-orange-600 mb-1">{campaign.roi}%
                                                </div>
                                                <div className="text-sm text-slate-500">ROI</div>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <div>
                                                <div className="text-sm text-slate-500">Budget</div>
                                                <div className="font-bold text-slate-900">{campaign.budget}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm text-slate-500">Revenue</div>
                                                <div className="font-bold gradient-text">{campaign.revenue}</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
