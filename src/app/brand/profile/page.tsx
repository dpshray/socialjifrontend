"use client"
import Image from "next/image"
import {StatsCard} from "@/components/card/card"
import {BarChart} from "@/components/chart/chart"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import useAuth from "@/hooks/useAuth"
import {Calendar, ExternalLink, Eye, MessageSquare, Settings, TrendingUp, Users} from "lucide-react"
import {useEffect} from "react";

export default function BrandProfile() {
    const {user} = useAuth()


    const calculateStats = () => {
        if (!user?.social_profiles) return []

        const totalFollowers = user.social_profiles.reduce((sum, profile) => sum + profile.follower_count, 0)
        const totalPosts = user.social_profiles.reduce((sum, profile) => sum + profile.post_count, 0)
        const avgEngagement =
            user.social_profiles.reduce(
                (sum, profile) => sum + (profile.avg_like_per_post_count + profile.avg_comment_per_post_count),
                0,
            ) / user.social_profiles.length

        return [
            {
                title: "Total Followers",
                value: totalFollowers > 1000 ? `${(totalFollowers / 1000).toFixed(1)}k` : totalFollowers.toString(),
                icon: "/followers.svg",
                change: "+12%",
                increasing: true,
            },
            {
                title: "Total Posts",
                value: totalPosts > 1000 ? `${(totalPosts / 1000).toFixed(1)}k` : totalPosts.toString(),
                icon: "/posts.svg",
                change: "+8%",
                increasing: true,
            },
            {
                title: "Avg Engagement",
                value: Math.round(avgEngagement).toString(),
                icon: "/engagement.svg",
                change: "+15%",
                increasing: true,
            },
        ]
    }

    const statsData = calculateStats()

    const getTopSocialPlatforms = () => {
        if (!user?.social_profiles) return []
        return user.social_profiles.sort((a, b) => b.follower_count - a.follower_count).slice(0, 4)
    }

    const topPlatforms = getTopSocialPlatforms()

    const getPlatformIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case "instagram":
                return "📸"
            case "facebook":
                return "👥"
            case "twitter":
                return "🐦"
            case "tiktok":
                return "🎵"
            case "youtube":
                return "📺"
            default:
                return "🌐"
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">B</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">Brand Analytics</h1>
                                <p className="text-sm text-slate-600">Social Media Performance Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm" className="text-slate-600 bg-transparent">
                                <Calendar className="w-4 h-4 mr-2"/>
                                Last 30 days
                            </Button>
                            <Button variant="outline" size="sm" className="text-slate-600 bg-transparent">
                                <Settings className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Profile Sidebar */}
                    <div className="col-span-12 lg:col-span-4 xl:col-span-3">
                        <div className="space-y-6">
                            {/* Profile Card */}
                            <Card className="border-0 shadow-sm bg-white">
                                <CardContent className="p-8">
                                    <div className="text-center">
                                        <div className="relative inline-block">
                                            <Image
                                                src={(user?.image as string) || "/placeholder.svg?height=120&width=120"}
                                                alt="Profile"
                                                width={120}
                                                height={120}
                                                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
                                                priority
                                            />
                                            <div
                                                className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
                                        </div>

                                        <div className="mt-6 space-y-2">
                                            <h2 className="text-xl font-semibold text-slate-900 capitalize">
                                                {`${user?.first_name} ${user?.last_name || ""}`}
                                            </h2>
                                            <p className="text-sm text-slate-600">{user?.email}</p>
                                            {user?.influencer_rating && (
                                                <div
                                                    className="inline-flex items-center px-3 py-1 rounded-full bg-amber-50 border border-amber-200">
                          <span className="text-amber-600 text-sm font-medium">
                            ⭐ {user.influencer_rating}/5.0 Rating
                          </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <Separator className="my-6"/>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="text-sm font-medium text-slate-900 mb-3">Role &
                                                Expertise</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {user?.roles && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                                                    >
                                                        {user.roles}
                                                    </Badge>
                                                )}
                                                {["Content Creator", "Influencer", "Brand Partner"].map((tag, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-medium text-slate-900 mb-3">Active
                                                Platforms</h3>
                                            <div className="space-y-2">
                                                {user?.social_profiles?.slice(0, 3).map((profile, index) => (
                                                    <div key={index} className="flex items-center justify-between py-2">
                                                        <div className="flex items-center space-x-3">
                                                            <span
                                                                className="text-lg">{getPlatformIcon(profile.social.name)}</span>
                                                            <span
                                                                className="text-sm font-medium text-slate-700">{profile.social.label}</span>
                                                        </div>
                                                        <span className="text-xs text-slate-500 font-medium">
                              {profile.follower_count > 1000
                                  ? `${(profile.follower_count / 1000).toFixed(1)}k`
                                  : profile.follower_count}
                            </span>
                                                    </div>
                                                ))}
                                                {user?.social_profiles && user.social_profiles.length > 3 && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-full text-xs text-slate-600 hover:text-slate-900"
                                                    >
                                                        View all {user.social_profiles.length} platforms
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-base font-semibold text-slate-900">Quick
                                        Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Users className="w-4 h-4 text-blue-600"/>
                                            <span className="text-sm text-slate-600">Total Reach</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">
                      {user?.social_profiles
                          ? `${(user.social_profiles.reduce((sum, p) => sum + p.follower_count, 0) / 1000).toFixed(0)}k`
                          : "0"}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <MessageSquare className="w-4 h-4 text-green-600"/>
                                            <span className="text-sm text-slate-600">Avg Engagement</span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">
                      {user?.social_profiles
                          ? Math.round(
                              user.social_profiles.reduce((sum, p) => sum + p.avg_like_per_post_count, 0) /
                              user.social_profiles.length,
                          )
                          : "0"}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="w-4 h-4 text-purple-600"/>
                                            <span className="text-sm text-slate-600">Growth Rate</span>
                                        </div>
                                        <span className="text-sm font-semibold text-green-600">+12.5%</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-12 lg:col-span-8 xl:col-span-9">
                        <div className="space-y-8">
                            {/* Key Metrics */}
                            <div>
                                <div className="mb-6">
                                    <h2 className="text-2xl font-semibold text-slate-900">Performance Metrics</h2>
                                    <p className="text-slate-600 mt-1">Track your social media performance across all
                                        platforms</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {statsData.map((item, index) => (
                                        <StatsCard key={index} {...item} className="border-0 shadow-sm"/>
                                    ))}
                                </div>
                            </div>

                            {/* Analytics Chart */}
                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader className="border-b border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-semibold text-slate-900">Engagement
                                                Analytics</CardTitle>
                                            <p className="text-sm text-slate-600 mt-1">Daily engagement metrics over the
                                                past month</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="text-slate-600 bg-transparent">
                                            <Eye className="w-4 h-4 mr-2"/>
                                            View Details
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <BarChart/>
                                </CardContent>
                            </Card>

                            {/* Platform Performance */}
                            <Card className="border-0 shadow-sm bg-white">
                                <CardHeader className="border-b border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle className="text-lg font-semibold text-slate-900">Platform
                                                Performance</CardTitle>
                                            <p className="text-sm text-slate-600 mt-1">Detailed metrics for each social
                                                media platform</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="text-slate-600 bg-transparent">
                                            <ExternalLink className="w-4 h-4 mr-2"/>
                                            Export Data
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {topPlatforms.map((profile, index) => (
                                            <Card key={index}
                                                  className="border border-slate-200 hover:border-slate-300 transition-colors">
                                                <CardContent className="p-6">
                                                    <div className="flex items-start justify-between mb-6">
                                                        <div className="flex items-center space-x-3">
                                                            <div
                                                                className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-xl">
                                                                {getPlatformIcon(profile.social.name)}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-semibold text-slate-900 capitalize">{profile.social.label}</h3>
                                                                <p className="text-sm text-slate-600">
                                                                    {profile.follower_count > 1000
                                                                        ? `${(profile.follower_count / 1000).toFixed(1)}k followers`
                                                                        : `${profile.follower_count} followers`}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge variant="outline"
                                                               className="bg-green-50 text-green-700 border-green-200">
                                                            +{profile.follower_growth_rate_per_week}%
                                                        </Badge>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                                        <div className="bg-slate-50 rounded-lg p-4 text-center">
                                                            <p className="text-2xl font-bold text-slate-900">{profile.post_count.toLocaleString()}</p>
                                                            <p className="text-xs text-slate-600 mt-1">Total Posts</p>
                                                        </div>
                                                        <div className="bg-slate-50 rounded-lg p-4 text-center">
                                                            <p className="text-2xl font-bold text-slate-900">
                                                                {profile.following_count.toLocaleString()}
                                                            </p>
                                                            <p className="text-xs text-slate-600 mt-1">Following</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex justify-between items-center">
                                                            <span
                                                                className="text-sm text-slate-600">Avg. Likes per Post</span>
                                                            <span className="text-sm font-semibold text-slate-900">
                                {profile.avg_like_per_post_count}
                              </span>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-sm text-slate-600">Avg. Comments per Post</span>
                                                            <span className="text-sm font-semibold text-slate-900">
                                {profile.avg_comment_per_post_count}
                              </span>
                                                        </div>
                                                        <Separator/>
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="text-slate-500">Best Performance</span>
                                                            <span className="font-medium text-slate-700">
                                {profile.highest_like.toLocaleString()} likes
                              </span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
