"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, Calendar, Instagram, Twitter, Users, Youtube } from 'lucide-react'
import { cn } from "@/lib/utils"

export type GigInsight = {
    total_sold: number
    gig_name: {
        id: number
        title: string
        category: string
        published_at: string
        image: string
        user: {
            id: number
            nick_name: string
            first_name: string
            middle_name?: string
            last_name: string
            image: string
        }
        total_reviews: number
        item_sold: number
        pricings: Pricing[]
        description: string
        features: string
        requirements: string
    }
}

export interface Pricing {
    id: number
    label: string
    price: string
    delivery_time: string
    description: string
    requirement: string
    currency: Currency
}

export interface Currency {
    symbol: string
    code: string
    name: string
}

export type GigInsightCardProps = {
    gigData: GigInsight
    onApplyAction: (gigId: number) => void
    className?: string
}

export default function GigInsightCard({ gigData, onApplyAction, className }: GigInsightCardProps) {
    const getBrandName = () => {
        if (gigData.gig_name.user?.first_name && gigData.gig_name.user?.last_name) {
            return `${gigData.gig_name.user.first_name} ${gigData.gig_name.user.last_name}`.trim()
        }
        return gigData.gig_name.user?.nick_name || "Unknown"
    }

    const getBudget = () => {
        if (gigData.gig_name.pricings && gigData.gig_name.pricings.length > 0) {
            const prices = gigData.gig_name.pricings.map((p: Pricing) => Number.parseFloat(p.price)).filter((p) => !isNaN(p))
            if (prices.length === 0) return "Contact for pricing"
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            const currencySymbol = gigData.gig_name.pricings[0].currency?.symbol || "$"
            return minPrice === maxPrice
                ? `${currencySymbol}${minPrice.toFixed(2)}`
                : `${currencySymbol}${minPrice.toFixed(2)} - ${currencySymbol}${maxPrice.toFixed(2)}`
        }
        return "Contact for pricing"
    }

    const getDeadline = () => {
        if (gigData.gig_name.pricings && gigData.gig_name.pricings.length > 0) {
            const deliveryTime = gigData.gig_name.pricings[0].delivery_time || ""
            return deliveryTime.split(" ")[0] || "Flexible"
        }
        return "Flexible"
    }

    const getPlatforms = () => {
        const features = gigData.gig_name.features || ""
        const platformsFromFeatures = features
            .split(",")
            .map((f) => f.trim())
            .filter((f) => ["Instagram", "YouTube", "TikTok", "Twitter"].includes(f))
        return platformsFromFeatures.length > 0 ? platformsFromFeatures : ["Instagram", "YouTube"]
    }

    const getDeliverables = () => {
        const features = gigData.gig_name.features || ""
        if (features.length) {
            return features
                .split(",")
                .map((f) => f.trim())
                .slice(0, 4)
        }
        return ["Content Creation", "Social Media Posts", "Brand Promotion", "Analytics"]
    }

    const handleApply = () => {
        onApplyAction(gigData.gig_name.id)
    }

    return (
        <Card
            className={cn(
                "bg-white/80 backdrop-blur-sm border border-white/20 group hover:shadow-xl transition-all duration-300 h-full flex flex-col py-2",
                className,
            )}
        >
            <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                <div className="flex flex-col justify-start space-y-3 mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 leading-tight">
                                {gigData.gig_name.title}
                            </h3>
                            <Badge
                                className="bg-green-100 text-green-800 border-green-200 text-xs shrink-0 w-fit">Active</Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-1">
                            by <span className="font-medium truncate">{getBrandName()}</span>
                        </p>
                        <p className="text-slate-600 text-sm line-clamp-2">{gigData.gig_name.description}</p>
                        <div className="text-left mt-3">
                            <div
                                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-1">
                                {getBudget()}
                            </div>
                            <div className="text-xs text-slate-500">Budget</div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-slate-400 mx-auto mb-1"/>
                        <div className="font-medium text-slate-900 text-sm truncate">{getDeadline()}</div>
                        <div className="text-xs text-slate-500">Deadline</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Users className="w-4 h-4 text-slate-400 mx-auto mb-1"/>
                        <div className="font-medium text-slate-900 text-sm">{gigData.total_sold || 0}</div>
                        <div className="text-xs text-slate-500">Sold</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <Badge variant="outline" className="mb-1 text-xs">
                            {gigData.gig_name.category}
                        </Badge>
                        <div className="text-xs text-slate-500">Category</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="font-medium text-slate-900 text-sm">Flexible</div>
                        <div className="text-xs text-slate-500">Duration</div>
                    </div>
                </div>
                {/*<div className="mb-4">*/}
                {/*    <h4 className="font-medium text-slate-900 mb-2 text-sm">Platforms</h4>*/}
                {/*    <div className="flex flex-wrap gap-1">*/}
                {/*        {getPlatforms().map((platform: string) => (*/}
                {/*            <Badge key={platform} variant="outline" className="flex items-center space-x-1 text-xs">*/}
                {/*                {platform === "Instagram" && <Instagram className="w-3 h-3"/>}*/}
                {/*                {platform === "YouTube" && <Youtube className="w-3 h-3"/>}*/}
                {/*                {platform === "TikTok" && <div className="w-3 h-3 bg-black rounded-sm"/>}*/}
                {/*                {platform === "Twitter" && <Twitter className="w-3 h-3"/>}*/}
                {/*                <span>{platform}</span>*/}
                {/*            </Badge>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="mb-4">
                    <h4 className="font-medium text-slate-900 mb-2 text-sm">Deliverables</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {getDeliverables().map((deliverable: string, index: number) => (
                            <div key={index} className="flex items-center space-x-2 text-xs text-slate-600">
                                <div className="w-1.5 h-1.5 bg-violet-500 rounded-full shrink-0"/>
                                <span className="truncate">{deliverable}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4 flex-1">
                    <h4 className="font-medium text-slate-900 mb-2 text-sm">Requirements</h4>
                    <p className="text-xs text-slate-600 line-clamp-3">{gigData.gig_name.requirements}</p>
                </div>
                <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto pt-3 border-t border-slate-100">
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <span>Posted {new Date(gigData.gig_name.published_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{gigData.total_sold || 0} sold</span>
                    </div>
                    <Button
                        onClick={handleApply}
                        size="sm"
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 w-full sm:w-auto"
                    >
                        Apply Now
                        <ArrowUpRight className="w-3 h-3 ml-1"/>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

