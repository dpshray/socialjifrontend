"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {TrendingUp} from "lucide-react"
import {formatCompactNumber} from "@/lib/utils"

export interface TopInfluencer {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string
    nick_name: string
    image: string
    brand: {
        id: number
        name: string
        slug: string
    }
    avg_follower_growth_rate_per_week: number
    highest_like: number
    social_profiles_sum_follower: number
    influencer_rating: number
}

interface TopPerformingCreatorsListProps {
    data: TopInfluencer[]
}

export function TopPerformingCreators({data}: TopPerformingCreatorsListProps) {
    return (
        <Card className="w-full  bg-white/30 backdrop-blur-md shadow-lg rounded-xl border-0">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-slate-900">Top Performing Creators</CardTitle>
                <CardDescription className="text-slate-600">
                    Creators with highest engagement and ROI performance
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((creator, index) => (
                        <div
                            key={creator.id}
                            className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 bg-white/50 rounded-2xl hover:bg-white/70 transition-colors shadow-sm"
                        >
                            <div className="flex items-center space-x-4 w-full md:w-auto mb-4 md:mb-0">
                                <div
                                    className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-xl font-bold text-lg shrink-0">
                                    {index + 1}
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={creator.image || "/placeholder.svg"} alt={creator.nick_name}/>
                                        <AvatarFallback className="capitalize">{creator.nick_name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-slate-900 capitalize text-lg">
                                            {creator.first_name} {creator.last_name}
                                        </p>
                                        <span className="text-sm text-slate-500">@ {creator.nick_name}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:flex md:items-center md:space-x-8 w-full md:w-auto">
                                <div className="text-center">
                                    <div className="font-bold text-green-600 text-lg">
                                        {formatCompactNumber(creator.social_profiles_sum_follower)}
                                    </div>
                                    <div className="text-xs text-slate-500">Total Followers</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-blue-600 text-lg">
                                        {creator.influencer_rating}
                                    </div>
                                    <div className="text-xs text-slate-500">Influencer Rating</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-slate-900 text-lg">
                                        {creator.avg_follower_growth_rate_per_week}%
                                    </div>
                                    <div className="text-xs text-slate-500">Avg Growth Rate/Week</div>
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-slate-900 text-lg">
                                        {formatCompactNumber(creator.highest_like)}
                                    </div>
                                    <div className="text-xs text-slate-500">Total Highest Likes</div>
                                </div>
                                <Badge
                                    className="bg-green-100 text-green-700 border-green-200 flex items-center justify-center py-1 px-2 text-sm">
                                    <TrendingUp className="w-3 h-3 mr-1"/>
                                    {creator.avg_follower_growth_rate_per_week}%
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
