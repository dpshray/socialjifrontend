"use client"

import Image from "next/image"
import {ArrowUpRight, Star} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

export interface SocialProfile {
    id: number
    social: {
        id: number
        name: string
        label: string
        icon: string
    }
    profile_url: string
    follower_count: number | string
}

export interface Brand {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string | null
    nick_name: string
    email: string
    image: string
    banner: string
    about: string | null
    category_name: {
        id: number
        name: string
        slug: string
    } | null
    rating: number
    social_profiles: SocialProfile[]
}

export interface BrandInsightsCardProps {
    brand: Brand
    onViewCampaigns?: () => void
    className?: string
}

const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
    return num.toString()
}

export default function BrandInsightsCard({brand, onViewCampaigns, className}: BrandInsightsCardProps) {
    const name = [brand.first_name, brand.middle_name, brand.last_name].filter(Boolean).join(" ")
    const socialProfiles = brand.social_profiles || [] // Ensure socialProfiles is an array

    const totalFollowers = socialProfiles.reduce((total, profile) => {
        const count =
            typeof profile.follower_count === "string"
                ? Number.parseInt(profile.follower_count.replace(/,/g, ""), 10) || 0
                : profile.follower_count || 0
        return total + count
    }, 0)

    return (
        <Card
            className={cn(
                "bg-white/80 backdrop-blur-sm border-0 overflow-hidden group hover:shadow-xl transition-all duration-300",
                "flex flex-col h-full py-0",
                className,
            )}
        >
            <div className="relative h-32 overflow-hidden">
                <Image
                    src={brand.banner || "/placeholder.svg?height=128&width=400&query=brand cover image"}
                    alt={`${name} cover`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
            </div>
            <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                    <Image
                        src={brand.image || "/placeholder.svg?height=60&width=60&query=brand logo"}
                        alt={`${name} logo`}
                        width={60}
                        height={60}
                        className="rounded-2xl border-2 border-white shadow-lg bg-white p-1 sm:p-2 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                            <div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">{name}</h3>
                                <p className="text-xs sm:text-sm text-slate-500 truncate">
                                    {/* Access category_name.name */}
                                    {brand.category_name?.name || "Uncategorized"}
                                </p>
                            </div>
                            <div className="flex items-center space-x-1 shrink-0">
                                <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current"/>
                                <span className="text-xs sm:text-sm font-medium text-slate-700">{brand.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 line-clamp-3">
                    {brand.about || "No description available"}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-xl">
                        <div className="text-base sm:text-lg font-bold text-slate-900">{socialProfiles.length}</div>
                        <div className="text-xs text-slate-500">Social Platforms</div>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-xl">
                        <div
                            className="text-base sm:text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                            {formatNumber(totalFollowers)}
                        </div>
                        <div className="text-xs text-slate-500">Total Followers</div>
                    </div>
                </div>
                {socialProfiles.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-700 mb-2">Social Platforms</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                            {socialProfiles.slice(0, 3).map((profile, index) => (
                                <div key={index}
                                     className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600 truncate">
                                    {profile.social.label}
                                </div>
                            ))}
                            {socialProfiles.length > 3 && (
                                <div className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
                                    +{socialProfiles.length - 3} more
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {
                    onViewCampaigns && (
                        <div className="mt-auto pt-3 sm:pt-4 border-t border-slate-100">
                            <Button
                                onClick={onViewCampaigns}
                                size="sm"
                                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                            >
                                View Campaigns
                                <ArrowUpRight className="w-3 h-3 ml-1"/>
                            </Button>
                        </div>
                    )
                }
            </CardContent>
        </Card>
    )
}
