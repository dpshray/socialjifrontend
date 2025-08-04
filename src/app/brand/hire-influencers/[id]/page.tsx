'use client'

import {use, useEffect, useState} from "react"
import {
    Clock,
    DollarSign,
    ExternalLink,
    Heart,
    Mail,
    MessageCircle,
    Package,
    Star,
    TrendingUp,
    Users
} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"
import {Progress} from "@/components/ui/progress"
import {Influencer, SocialProfile} from "@/types/Influencer"
import {brandService} from "@/app/brand/brand.service";
import {Tabs} from "@/components/ui/tabs";
import {TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface DiscoverCreators {
    params: Promise<{ id: number }>
}

export default function DiscoverCreatorsDetailsPage({params}: DiscoverCreators) {
    const unwrappedParams = use(params)
    const id = unwrappedParams.id
    const [influencer, setInfluencer] = useState<Influencer | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInfluencerProfile = async () => {
            try {

                const response = await brandService.getInfluencerById(id)
                setInfluencer(response)
            } catch {
                setInfluencer(null)
            } finally {
                setLoading(false)
            }
        }

        fetchInfluencerProfile()
    }, [id])

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
        if (num >= 1000) return (num / 1000).toFixed(1) + "K"
        return num.toString()
    }

    const formatPrice = (price: string) => {
        const num = Number.parseFloat(price)
        return num.toLocaleString()
    }

    const getSocialIcon = (platform: string) => {
        const icons: { [key: string]: string } = {
            facebook: "📘",
            instagram: "📷",
            tiktok: "🎵",
            twitter: "🐦",
            youtube: "📺",
        }
        return icons[platform] || "🌐"
    }

    const getSocialColor = (platform: string) => {
        const colors: { [key: string]: string } = {
            facebook: "bg-blue-500",
            instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
            tiktok: "bg-black",
            twitter: "bg-blue-400",
            youtube: "bg-red-500",
        }
        return colors[platform] || "bg-gray-500"
    }

    const calculateEngagementRate = (profile: SocialProfile) => {
        const totalEngagement = profile.avg_like_per_post_count + profile.avg_comment_per_post_count
        return ((totalEngagement / profile.follower_count) * 100).toFixed(2)
    }

    const getTotalFollowers = () => {
        if (!influencer) return 0
        return influencer.social_profiles.reduce((total, profile) => total + profile.follower_count, 0)
    }

    const getAverageEngagement = () => {
        if (!influencer) return 0
        const totalEngagement = influencer.social_profiles.reduce(
            (total, profile) => total + Number.parseFloat(calculateEngagementRate(profile)),
            0,
        )
        return (totalEngagement / influencer.social_profiles.length).toFixed(2)
    }

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-48 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (!influencer) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Influencer not found</h1>
                    <p className="text-gray-600 mt-2">The influencer you&#39;re looking for does not exist.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-shrink-0">
                            <Avatar className="w-32 h-32">
                                <AvatarImage src={influencer.image || "/placeholder.svg"} alt={influencer.first_name}/>
                                <AvatarFallback className="text-2xl">
                                    {influencer.first_name.charAt(0)}
                                    {influencer.last_name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {influencer.first_name} {influencer.middle_name} {influencer.last_name}
                                    </h1>
                                    <p className="text-lg text-gray-600 mb-2">@{influencer.nick_name}</p>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Badge variant="secondary" className="px-3 py-1">
                                            {influencer.roles}
                                        </Badge>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${
                                                        i < influencer.influencer_rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                            <span
                                                className="text-sm text-gray-600 ml-1">({influencer.influencer_rating}/5)</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed max-w-2xl">{influencer.about}</p>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Mail className="w-4 h-4 mr-2"/>
                                        Contact Creator
                                    </Button>
                                    <Button variant="outline">
                                        <Heart className="w-4 h-4 mr-2"/>
                                        Save to Favorites
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Followers</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatNumber(getTotalFollowers())}</p>
                                </div>
                                <Users className="w-8 h-8 text-blue-500"/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Avg Engagement</p>
                                    <p className="text-2xl font-bold text-gray-900">{getAverageEngagement() || 0}%</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-green-500"/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Services Sold</p>
                                    <p className="text-2xl font-bold text-gray-900">{formatNumber(influencer.gig.gigs_sold_count)}</p>
                                </div>
                                <Package className="w-8 h-8 text-purple-500"/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Active Gigs</p>
                                    <p className="text-2xl font-bold text-gray-900">{influencer.gig.published}</p>
                                </div>
                                <MessageCircle className="w-8 h-8 text-orange-500"/>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="analytics" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="analytics">Social Media Analytics</TabsTrigger>
                        <TabsTrigger value="services">Services & Pricing</TabsTrigger>
                    </TabsList>

                    <TabsContent value="analytics" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {influencer.social_profiles.map((profile, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`w-10 h-10 rounded-lg ${getSocialColor(profile.social.name)} flex items-center justify-center text-white text-lg`}
                                                >
                                                    {getSocialIcon(profile.social.name)}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{profile.social.label}</CardTitle>
                                                    <p className="text-sm text-gray-600">@{influencer.nick_name}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <a href={profile.profile_url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4"/>
                                                </a>
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <p className="text-2xl font-bold text-gray-900">{formatNumber(profile.follower_count)}</p>
                                                <p className="text-sm text-gray-600">Followers</p>
                                            </div>
                                            <div className="text-center p-3 bg-gray-50 rounded-lg">
                                                <p className="text-2xl font-bold text-gray-900">{calculateEngagementRate(profile)}%</p>
                                                <p className="text-sm text-gray-600">Engagement</p>
                                            </div>
                                        </div>
                                        <Separator/>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Posts</span>
                                                <span className="font-medium">{formatNumber(profile.post_count)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Following</span>
                                                <span
                                                    className="font-medium">{formatNumber(profile.following_count)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Avg Likes/Post</span>
                                                <span
                                                    className="font-medium">{formatNumber(profile.avg_like_per_post_count)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Avg Comments/Post</span>
                                                <span
                                                    className="font-medium">{formatNumber(profile.avg_comment_per_post_count)}</span>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Growth Rate/Week</span>
                                                    <span
                                                        className="font-medium text-green-600">+{profile.follower_growth_rate_per_week}%</span>
                                                </div>
                                                <Progress value={profile.follower_growth_rate_per_week}
                                                          className="h-2"/>
                                            </div>
                                            <Separator/>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Highest Like</span>
                                                    <span
                                                        className="font-medium text-green-600">{formatNumber(profile.highest_like)}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-gray-600">Lowest Like</span>
                                                    <span
                                                        className="font-medium text-red-600">{formatNumber(profile.lowest_like)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="services" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="w-5 h-5"/>
                                    Service Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-3xl font-bold text-blue-600">{influencer.gig.total}</p>
                                        <p className="text-sm text-gray-600">Total Services</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-3xl font-bold text-green-600">{influencer.gig.published}</p>
                                        <p className="text-sm text-gray-600">Published</p>
                                    </div>
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <p className="text-3xl font-bold text-purple-600">{formatNumber(influencer.gig.gigs_sold_count)}</p>
                                        <p className="text-sm text-gray-600">Orders Completed</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle
                                            className="text-xl">{influencer.gig.top_selling_gig.title}</CardTitle>
                                        <p className="text-gray-600 mt-1">Category: {influencer.gig.top_selling_gig.category}</p>
                                        <Badge variant="outline" className="mt-2">
                                            Top Seller
                                        </Badge>
                                    </div>
                                    <Image
                                        width={300}
                                        height={300}
                                        src={influencer.gig.top_selling_gig.image || "/placeholder.svg"}
                                        alt={influencer.gig.top_selling_gig.title}
                                        className="w-24 h-16 object-cover rounded-lg"
                                    />
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h4 className="font-semibold mb-2">Description</h4>
                                    <p className="text-gray-700">{influencer.gig.top_selling_gig.description}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold mb-2">Requirements</h4>
                                        <p className="text-gray-700 text-sm">{influencer.gig.top_selling_gig.requirements}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-2">Features</h4>
                                        <p className="text-gray-700 text-sm">{influencer.gig.top_selling_gig.features}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4">Pricing Packages</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {influencer.gig.top_selling_gig.pricings.map((pricing, index) => (
                                            <Card key={pricing.id}
                                                  className={`relative ${index === 1 ? "border-blue-500 border-2" : ""}`}>
                                                {index === 1 && (
                                                    <div
                                                        className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                                        <Badge className="bg-blue-500">Most Popular</Badge>
                                                    </div>
                                                )}
                                                <CardHeader className="text-center pb-4">
                                                    <CardTitle className="text-lg">{pricing.label}</CardTitle>
                                                    <div className="flex items-center justify-center gap-1">
                            <span className="text-3xl font-bold">
                              {pricing.currency.symbol}
                                {formatPrice(pricing.price)}
                            </span>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Clock className="w-4 h-4"/>
                                                        <span>7 days delivery</span>
                                                    </div>
                                                    <p className="text-sm text-gray-700">{pricing.description}</p>
                                                    <Separator/>
                                                    <div>
                                                        <h5 className="font-medium text-sm mb-2">What&#39;s included:</h5>
                                                        <p className="text-xs text-gray-600">{pricing.requirement}</p>
                                                    </div>
                                                    <Button
                                                        className={`w-full ${index === 1 ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                                                        variant={index === 1 ? "default" : "outline"}
                                                    >
                                                        <DollarSign className="w-4 h-4 mr-2"/>
                                                        Select {pricing.label}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Ready to Collaborate?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div>
                                <p className="text-gray-600 mb-2">
                                    Get in touch with {influencer.first_name} to discuss partnership opportunities.
                                </p>
                                <p className="text-sm text-gray-500">Email: {influencer.email}</p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline">
                                    <Mail className="w-4 h-4 mr-2"/>
                                    Contact Seller
                                </Button>
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <Package className="w-4 h-4 mr-2"/>
                                    View All Services
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
