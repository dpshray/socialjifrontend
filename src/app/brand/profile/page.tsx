"use client"

import React, {useState} from "react"
import Image from "next/image"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {BarChart3, ExternalLink, Eye, MessageSquare, Settings, TrendingUp, Users,} from "lucide-react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {SocialProfileCard} from "@/components/card/SocialMediaCard"
import useAuth from "@/hooks/useAuth"
import {Separator} from "@/components/ui/separator"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {formatCompactNumber} from "@/lib/utils"
import {BrandProfileChart} from "@/components/chart/brand-profile-chart"
import {ProfileForm} from "@/components/form/brand-profile-form"
import globalService from "@/services/GlobalService";
import {toast} from "sonner";

export default function ProfilePage() {
    const {user} = useAuth()
    const [selectedTab, setSelectedTab] = useState("overview")



    const handleCancel = () => {
        console.log("Cancel")
    }

    const tabs = [
        {value: "overview", label: "Overview"},
        {value: "social-media", label: "Social Media"},
        {value: "edit-profile", label: "Edit Profile"},
    ]
    const handleSubmit = async (data: any) => {
        try {
            const response = await globalService.profileUpdate(data);
            console.log('updated profile', response);
            if (response) {
                toast.success(response?.message || "Profile updated successfully");
            }
        } catch {
            toast.error("Failed to update profile");
        }
    };

    return (
        <div className="min-h-screen">
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div
                                className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-white"/>
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-slate-900">Profile Dashboard</h1>
                                <p className="text-sm text-slate-600">Manage your brand profile and social media
                                    presence</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-slate-600 bg-transparent"
                                onClick={() => setSelectedTab("social-media")}
                            >
                                <BarChart3 className="w-4 h-4 mr-2"/>
                                Social Media
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-slate-600 bg-transparent"
                                onClick={() => setSelectedTab("edit-profile")}
                            >
                                <Settings className="w-4 h-4 mr-2"/>
                                Edit Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-6">
                <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <TabsList className="flex justify-center w-full">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="overview">
                        <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-12 lg:col-span-4 xl:col-span-3 space-y-6">
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
                                                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"/>
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
                                            <div className="mt-6 flex space-x-2">

                                                <Button variant="outline" size="sm"
                                                        onClick={() => setSelectedTab("edit-profile")}
                                                        className="flex-1 bg-transparent">
                                                    <Settings className="w-4 h-4 mr-2"/>
                                                    Edit
                                                </Button>

                                                <Button variant="outline" size="sm"
                                                        onClick={() => setSelectedTab("social-media")}
                                                        className="flex-1 bg-transparent">
                                                    <BarChart3 className="w-4 h-4 mr-2"/>
                                                    Social
                                                </Button>

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
                                                            className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100">
                                                            {user.roles}
                                                        </Badge>
                                                    )}
                                                    {["Content Creator", "Influencer", "Brand Partner"].map((tag, index) => (
                                                        <Badge
                                                            key={index}
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
                                                    {user?.social_profiles?.map((profile: any, index: number) => (
                                                        <div key={index}
                                                             className="flex items-center justify-between py-2">
                                                            <div className="flex items-center space-x-3">
                                                                <Avatar className="w-4 h-4">
                                                                    <AvatarImage
                                                                        src={profile.profile_url || "/placeholder.svg"}
                                                                        alt={profile.social.label}
                                                                    />
                                                                    <AvatarFallback
                                                                        className="bg-slate-100 text-slate-900">
                                                                        {profile.social.label[0]}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span
                                                                    className="text-sm text-slate-900">{profile.social.name}</span>
                                                                <span
                                                                    className="text-sm text-slate-500">{profile.social.label}</span>
                                                            </div>
                                                            <span className="text-xs text-slate-500 font-medium">
                                {formatCompactNumber(profile.follower_count)}
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
                            ? formatCompactNumber(
                                user.social_profiles.reduce((sum: number, p: any) => sum + p.follower_count, 0)
                            )
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
                            ? formatCompactNumber(
                                Math.round(
                                    user.social_profiles.reduce((sum: number, p: any) => sum + p.avg_like_per_post_count, 0) /
                                    user.social_profiles.length
                                )
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
                            <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-8">
                                <div>
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold text-slate-900">Performance Metrics</h2>
                                        <p className="text-slate-600 mt-1">Track your social media performance across
                                            all platforms</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"></div>
                                </div>
                                <Card className="border-0 shadow-sm bg-white">
                                    <CardHeader className="border-b border-slate-100">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-lg font-semibold text-slate-900">Engagement
                                                    Analytics</CardTitle>
                                                <p className="text-sm text-slate-600 mt-1">Daily engagement metrics over
                                                    the past month</p>
                                            </div>
                                            <Button variant="outline" size="sm"
                                                    className="text-slate-600 bg-transparent">
                                                <Eye className="w-4 h-4 mr-2"/>
                                                View Details
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <BrandProfileChart/>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="social-media">
                        <Card className="border-0 shadow-sm bg-white">
                            <CardHeader className="border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-semibold text-slate-900">Platform
                                            Performance</CardTitle>
                                        <p className="text-sm text-slate-600 mt-1">
                                            Detailed metrics for each social media platform
                                        </p>
                                    </div>
                                    <Button variant="outline" size="sm" className="text-slate-600 bg-transparent">
                                        <ExternalLink className="w-4 h-4 mr-2"/>
                                        Export Data
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {user?.social_profiles?.map((profile: any, index: number) => (
                                        <SocialProfileCard
                                            key={index}
                                            title={profile.social.label}
                                            link={profile.profile_url || "#"}
                                            followerCount={profile.follower_count}
                                            followingCount={profile.following_count}
                                            postCount={profile.post_count}
                                            avgLikePerPost={profile.avg_like_per_post_count}
                                            avgCommentPerPost={profile.avg_comment_per_post_count}
                                            followerGrowthRate={profile.follower_growth_rate_per_week}
                                            highestLike={profile.highest_like}
                                            lowestLike={profile.lowest_like}
                                            platform={profile.social.name}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="edit-profile">
                        <ProfileForm editingProfile={user as any} onSubmitAction={handleSubmit}
                                     onCancelAction={handleCancel}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
