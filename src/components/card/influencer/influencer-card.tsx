'use client'

import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import Image from 'next/image'
import {cn, formatCompactNumber} from '@/lib/utils'
import {Verified} from 'lucide-react'
import {SocialProfile} from '@/types/Influencer'

type SocialPlatform = 'facebook' | 'instagram' | 'tiktok' | 'twitter' | 'youtube'

export interface InfluencerInsight {
    id: number
    first_name: string
    middle_name: string
    last_name: string
    nick_name: string
    email: string
    total_gigs: number
    image: string
    rating: number
    highest_price_gig: string
    lowest_price_gig: string
    social_profiles: SocialProfile[]
}

interface InfluencerInsightsCardProps extends InfluencerInsight {
    location?: string
    onContactAction?: () => void
    className?: string
}

export default function InfluencerInsightsCard({
                                                   id,
                                                   first_name,
                                                   last_name,
                                                   nick_name,
                                                   image,
                                                   rating,
                                                   total_gigs,
                                                   highest_price_gig,
                                                   lowest_price_gig,
                                                   social_profiles,
                                                   location = 'Unknown',
                                                   onContactAction,
                                                   className,
                                               }: InfluencerInsightsCardProps) {
    const fullName = `${first_name} ${last_name}`
    const totalFollowers = social_profiles.reduce((acc, p) => acc + p.follower_count, 0)

    return (
        <Card
            className={cn('bg-white shadow-sm hover:shadow-md transition-shadow h-full py-2 flex flex-col', className)}>
            <CardContent className="p-4 flex flex-col flex-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                        <Avatar>
                            <AvatarImage src={image} alt={fullName}/>
                            <AvatarFallback>{first_name[0]}{last_name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-1">
                                <h3 className="font-bold text-gray-900 truncate">{fullName}</h3>
                                <Verified className="w-4 h-4 text-blue-500"/>
                            </div>
                            <p className="text-gray-500 text-sm truncate">@{nick_name}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="text-yellow-400">★</span>
                        <span className="font-semibold text-gray-900 text-sm">{rating}</span>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400">📍</span>
                    <span className="text-gray-600 text-sm">{location}</span>
                </div>

                {/* Social Icons */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                    {social_profiles.map((platform, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <Image
                                src={platform.profile_url}
                                alt={platform.social.label}
                                width={24}
                                height={24}
                                className="w-6 h-6"
                            />
                            <span className="text-xs text-gray-600">{platform.social.label}</span>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div>
                        <div className="text-sm font-bold text-gray-900">
                            {formatCompactNumber(totalFollowers)}
                        </div>
                        <div className="text-xs text-gray-600">Followers</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-green-500">
                            ${formatCompactNumber(parseFloat(highest_price_gig))}
                        </div>
                        <div className="text-xs text-gray-600">Highest Gig Price</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-blue-500">
                            ${formatCompactNumber(parseFloat(lowest_price_gig))}
                        </div>
                        <div className="text-xs text-gray-600">Lowest Gig Price</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                        <div className="text-sm font-bold text-gray-900">
                            ${formatCompactNumber(parseFloat(highest_price_gig))}
                        </div>
                        <div className="text-xs text-gray-600">Highest Campaign</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-900">{total_gigs}</div>
                        <div className="text-xs text-gray-600">Completed Campaigns</div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-auto pt-2">
                    <Button
                        onClick={onContactAction}
                        className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 hover:from-blue-700 hover:via-purple-700 hover:to-purple-800 text-white text-sm py-2"
                    >
                        Contact Influencer
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
