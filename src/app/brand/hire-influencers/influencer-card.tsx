"use client"

export interface SocialPlatform {
    name: string;
    label: string;
}

export interface SocialProfile {
    profile_url: string;
    follower_count: number | string;
    following_count: number | string;
    post_count: number;
    avg_like_per_post_count: number;
    avg_comment_per_post_count: number;
    follower_growth_rate_per_week: number;
    highest_like: number;
    lowest_like: number;
    social: SocialPlatform;
}

export interface User {
    id: number;
    nick_name: string;
    image: string;
    roles: string;
    influencer_rating: number;
    social_profiles: SocialProfile[];
}


import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {ExternalLink, Facebook, Heart, Instagram, MessageCircle, Music, TrendingUp, Users} from "lucide-react"
import {cn} from "@/lib/utils"
import {Skeleton} from "@/components/ui/skeleton"


interface InfluencerData {
    id: number
    nick_name: string
    image: string
    about: string
    social_profiles: SocialProfile[]
}

interface InfluencerCardProps {
    influencer: InfluencerData
    onViewProfileAction?: (id: number) => void
    onContact?: (id: number) => void
}

const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
}

const getSocialIcon = (socialName: string) => {
    switch (socialName.toLowerCase()) {
        case "instagram":
            return <Instagram className="w-4 h-4"/>
        case "facebook":
            return <Facebook className="w-4 h-4"/>
        case "tiktok":
            return <Music className="w-4 h-4"/>
        default:
            return <Users className="w-4 h-4"/>
    }
}

const getSocialColor = (socialName: string) => {
    switch (socialName.toLowerCase()) {
        case "instagram":
            return "bg-gradient-to-r from-purple-500 to-pink-500"
        case "facebook":
            return "bg-blue-600"
        case "tiktok":
            return "bg-black"
        default:
            return "bg-gray-500"
    }
}

export const InfluencerProfileCard = ({influencer, onViewProfileAction, onContact}: InfluencerCardProps) => {
    const hasProfiles = influencer.social_profiles.length > 0

    const totalFollowers = hasProfiles
        ? influencer.social_profiles.reduce((sum, profile) => sum + Number(profile.follower_count), 0)
        : 0

    const avgEngagementRate = hasProfiles
        ? influencer.social_profiles.reduce((sum, profile) => {
        const engagementRate =
            ((profile.avg_like_per_post_count + profile.avg_comment_per_post_count) / Number(profile.follower_count)) * 100
        return sum + engagementRate
    }, 0) / influencer.social_profiles.length
        : 0

    const avgGrowthRate = hasProfiles
        ? influencer.social_profiles.reduce((sum, profile) => sum + profile.follower_growth_rate_per_week, 0) /
        influencer.social_profiles.length
        : 0

    const totalPlatforms = hasProfiles ? influencer.social_profiles.length : 0

    return (
        <Card
            className={cn(
                "w-full max-w-md mx-auto bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200",
                "gap-2"
            )}
        >
            <CardHeader className="pb-2">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16 border-2 border-gray-200">
                        <AvatarImage src={influencer.image} alt={influencer.nick_name}/>
                        <AvatarFallback
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold">
                            {influencer.nick_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 truncate">@{influencer.nick_name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                            <div className="flex items-center text-sm text-gray-600">
                                <Users className="w-4 h-4 mr-1"/>
                                {formatNumber(totalFollowers)} total
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">About</h4>
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{influencer.about}</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{avgEngagementRate.toFixed(1)}%</div>
                        <div className="text-xs text-gray-600 flex items-center justify-center mt-1">
                            <Heart className="w-3 h-3 mr-1"/>
                            Engagement
                        </div>
                    </div>

                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">+{avgGrowthRate.toFixed(0)}</div>
                        <div className="text-xs text-gray-600 flex items-center justify-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1"/>
                            Weekly Growth
                        </div>
                    </div>

                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-bold text-gray-900">{totalPlatforms}</div>
                        <div className="text-xs text-gray-600">Platforms</div>
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Social Platforms</h4>
                    {!hasProfiles ? (
                        <p className="text-sm text-gray-500 italic">0</p>
                    ) : (
                        <div className="space-y-3">
                            {influencer.social_profiles.map((profile, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center text-white",
                                                getSocialColor(profile.social.name)
                                            )}
                                        >
                                            {getSocialIcon(profile.social.name)}
                                        </div>

                                        <div>
                                            <div
                                                className="font-medium text-gray-900 text-sm">{profile.social.label}</div>
                                            <div
                                                className="text-xs text-gray-600">{formatNumber(Number(profile.follower_count))} followers
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div
                                            className="text-sm font-medium text-gray-900">{profile.avg_like_per_post_count} avg
                                            likes
                                        </div>
                                        <div className="text-xs text-gray-600 flex items-center">
                                            <MessageCircle className="w-3 h-3 mr-1"/>
                                            {profile.avg_comment_per_post_count} comments
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-2 p-1 h-8 w-8"
                                        onClick={() => window.open(profile.profile_url, "_blank")}
                                    >
                                        <ExternalLink className="w-4 h-4"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <Button variant="outline" className="flex-1 bg-transparent"
                            onClick={() => onViewProfileAction?.(influencer.id)}>
                        View Profile
                    </Button>
                    <Button
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => onContact?.(influencer.id)}
                    >
                        Contact
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export function InfluencerProfileCardSkeleton() {
    return (
        <Card className="w-full max-w-md mx-auto bg-white shadow-lg border border-gray-200">
            <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                    <Skeleton className="w-16 h-16 rounded-full"/>

                    <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-6 w-32"/>
                        <Skeleton className="h-4 w-24"/>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <Skeleton className="h-4 w-16 mb-2"/>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-3/4"/>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {Array.from({length: 3}).map((_, index) => (
                        <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                            <Skeleton className="h-6 w-12 mx-auto mb-2"/>
                            <Skeleton className="h-3 w-16 mx-auto"/>
                        </div>
                    ))}
                </div>

                <div>
                    <Skeleton className="h-4 w-24 mb-3"/>
                    <div className="space-y-3">
                        {Array.from({length: 3}).map((_, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-3">
                                    <Skeleton className="w-8 h-8 rounded-full"/>

                                    <div className="space-y-1">
                                        <Skeleton className="h-4 w-20"/>
                                        <Skeleton className="h-3 w-16"/>
                                    </div>
                                </div>

                                <div className="text-right space-y-1">
                                    <Skeleton className="h-4 w-16"/>
                                    <Skeleton className="h-3 w-20"/>
                                </div>

                                <Skeleton className="w-8 h-8 ml-2"/>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <Skeleton className="h-10 flex-1"/>
                    <Skeleton className="h-10 flex-1"/>
                </div>
            </CardContent>
        </Card>
    )
}
