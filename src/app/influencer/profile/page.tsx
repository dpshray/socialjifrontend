'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import useAuth from "@/hooks/useAuth"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator"
import {
    Award,
    BarChart3,
    Clock,
    Download,
    Globe,
    Mail,
    MessageSquare,
    MoreHorizontal,
    Plus,
    Settings,
    Share2,
    Star,
    User,
    Users,
} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Progress} from "@/components/ui/progress"
import {SocialMediaCard} from "@/components/card/SocialMediaCard"
import {Skeleton} from "@/components/ui/skeleton"

export interface SocialPlatform {
    name: string
    label: string
}

export interface SocialProfile {
    profile_url: string
    follower_count: number
    following_count: number
    post_count: number
    avg_like_per_post_count: number
    avg_comment_per_post_count: number
    follower_growth_rate_per_week: number
    highest_like: number
    lowest_like: number
    social: SocialPlatform
}

export interface User {
    id: number
    nick_name: string
    image: string
    roles: string
    influencer_rating: number
    social_profiles: SocialProfile[]
    first_name?: string
    last_name?: string
    email?: string
    about?: string
}

interface Campaign {
    name: string
    brand: string
    date: string
    reach: string
    engagement: string
    earnings: string
    status: "Active" | "Completed" | "Pending"
    performance: "excellent" | "good" | "average"
}

interface Review {
    name: string
    country: string
    rating: number
    review: string
    avatar: string
    company: string
    campaign: string
}

interface AudienceInsight {
    demographic: string
    percentage: number
    color: string
}

const campaignHistory: Campaign[] = []
const reviews: Review[] = []
const audienceInsights: AudienceInsight[] = []

export default function InfluencerProfile() {
    const {user} = useAuth()
    const isLoading = !user || !user.social_profiles
    const totalFollowers = user?.social_profiles.reduce((sum, profile) => sum + +profile.follower_count, 0)

    return (
        <div className="p-4 sm:p-8 space-y-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-full container mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            {isLoading ? (
                                <Skeleton className="w-24 h-24 rounded-full"/>
                            ) : (
                                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                                    <AvatarImage src={user?.image || "/placeholder.svg"}/>
                                    <AvatarFallback
                                        className="text-2xl font-semibold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                                        {user?.nick_name?.charAt(0).toUpperCase() || "A"}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            {!isLoading && (
                                <div
                                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"/>
                                </div>
                            )}
                        </div>
                        <div>
                            {isLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48"/>
                                    <Skeleton className="h-4 w-32"/>
                                    <Skeleton className="h-4 w-40"/>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                                        {user?.first_name} {user?.last_name}
                                    </h1>
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <p className="text-slate-600 text-lg">@{user?.nick_name}</p>
                                        <Badge
                                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                                            {user?.roles}
                                        </Badge>
                                        <Badge variant="outline"
                                               className="border-green-200 text-green-700 bg-green-50">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"/>
                                            Verified
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current"/>
                                            <span className="font-medium">{user?.influencer_rating}</span>
                                            <span>(24 reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Globe className="w-4 h-4"/>
                                            <span>Global Reach</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Award className="w-4 h-4"/>
                                            <span>Top Performer</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" aria-label="More actions">
                                    <MoreHorizontal className="w-4 h-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>
                                    <Download className="w-4 h-4 mr-2"/>
                                    Export Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Share2 className="w-4 h-4 mr-2"/>
                                    Share Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2"/>
                                    Settings
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" className="border-slate-300 bg-transparent" aria-label="Message">
                            <MessageSquare className="w-4 h-4 mr-2"/>
                            Message
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                            aria-label="Create Campaign">
                            <Plus className="w-4 h-4 mr-2"/>
                            Create Campaign
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({length: 4}).map((_, i) => (
                    <Card key={i} className="border-0 shadow-lg">
                        <CardContent className="p-6 space-y-4">
                            {isLoading ? (
                                <>
                                    <Skeleton className="w-12 h-12 rounded-xl"/>
                                    <Skeleton className="h-4 w-24"/>
                                    <Skeleton className="h-6 w-32"/>
                                    <Skeleton className="h-4 w-20"/>
                                </>
                            ) : i === 0 ? (
                                <>
                                    <div
                                        className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Users className="w-6 h-6 text-white"/>
                                    </div>
                                    <p className="text-sm font-medium text-blue-700 mb-1">Total Followers</p>
                                    <p className="text-3xl font-bold text-blue-900">{totalFollowers}</p>
                                    <p className="text-xs text-blue-600 mt-1">Across all platforms</p>
                                </>
                            ) : null}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="overview" className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
                    <TabsList className="grid w-full grid-cols-5 bg-slate-50 rounded-xl p-1">
                        {["overview", "analytics", "campaigns", "audience", "reviews"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="rounded capitalize cursor-pointer data-[state=active]:bg-navyBlue/60 data-[state=active]:text-white data-[state=active]:shadow-sm"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="border-0 bg-white shadow-none">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <User className="w-5 h-5 text-slate-600"/>
                                    Profile Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {isLoading ? (
                                    <Skeleton className="h-48 w-full rounded-xl"/>
                                ) : (
                                    <>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Mail className="w-4 h-4 text-slate-500"/>
                                                <span className="text-slate-700">{user?.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Globe className="w-4 h-4 text-slate-500"/>
                                                <span className="text-slate-700">Global • English, Spanish</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Clock className="w-4 h-4 text-slate-500"/>
                                                <span className="text-slate-700">Joined December 2022</span>
                                            </div>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 mb-3">About</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{user?.about}</p>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-semibold text-slate-900">Profile Completion</h4>
                                                <span className="text-sm font-medium text-slate-700">92%</span>
                                            </div>
                                            <Progress value={92}
                                                      className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-blue-600"/>
                                            <p className="text-xs text-slate-500 mt-2">Excellent profile
                                                completeness</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 border-0 bg-white shadow-none">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <BarChart3 className="w-5 h-5 text-slate-600"/>
                                    Social Media Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {isLoading
                                        ? Array.from({length: 3}).map((_, i) => (
                                            <Skeleton key={i} className="h-40 w-full rounded-xl"/>
                                        ))
                                        : user?.social_profiles.map((profile, index) => (
                                            <SocialMediaCard
                                                key={index}
                                                image={profile.profile_url}
                                                title={profile.social.label}
                                                link={profile.profile_url}
                                                followerCount={profile.follower_count}
                                                followingCount={profile.following_count}
                                                postCount={profile.post_count}
                                                avgLikePerPost={profile.avg_like_per_post_count}
                                                avgCommentPerPost={profile.avg_comment_per_post_count}
                                                followerGrowthRate={profile.follower_growth_rate_per_week}
                                                highestLike={profile.highest_like}
                                                lowestLike={profile.lowest_like}
                                                platform=""
                                            />
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
