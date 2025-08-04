"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {ArrowUpRight, Calendar, Instagram, Twitter, Users, Youtube} from "lucide-react"
import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"

interface Pricing {
    id: number
    label: string
    price: string
    delivery_time: string
    description: string
    requirement: string
    currency: {
        id: number
        name: string
        code: string
        symbol: string
    }
}

interface GigInsightCardProps {
    gigData: {
        gig_name: {
            id: number
            title: string
            category: string
            description: string
            requirements: string
            features: string
            published_at: string
            image: string
            pricings: Pricing[]
            tags: string[]
            user: {
                id: number
                nick_name: string
                first_name: string
                middle_name: string
                last_name: string
                email: string
                about: string
            }
            reviews: Array<{
                review_id: number
                comment: string
                rating: number
                reviewed_at: string
            }>
        }
        total_sold: number
    }
    onApply: (gigId: number) => void
    className?: string
}

export default function GigInsightCard({gigData, onApply, className}: GigInsightCardProps) {
    const gig = gigData.gig_name
    const getBrandName = () => {
        if (gig.user.first_name && gig.user.last_name) {
            return `${gig.user.first_name} ${gig.user.last_name}`.trim()
        }
        return gig.user.nick_name || "Unknown"
    }
    const getBudget = () => {
        if (gig.pricings && gig.pricings.length > 0) {
            const prices = gig.pricings.map((p: Pricing) => Number.parseFloat(p.price))
            const minPrice = Math.min(...prices)
            const maxPrice = Math.max(...prices)
            const currencySymbol = gig.pricings[0].currency.symbol || "$"
            return minPrice === maxPrice
                ? `${currencySymbol}${minPrice.toFixed(2)}`
                : `${currencySymbol}${minPrice.toFixed(2)} - ${currencySymbol}${maxPrice.toFixed(2)}`
        }
        return "Contact for pricing"
    }
    const getDeadline = () => {
        if (gig.pricings && gig.pricings.length > 0) {
            return gig.pricings[0].delivery_time.split(" ")[0]
        }
        return "Flexible"
    }
    const getPlatforms = () => ["Instagram", "YouTube"]
    const getDeliverables = () => {
        if (gig.features && gig.features.length) {
            return gig.features
                .split(",")
                .map((f: string) => f.trim())
                .slice(0, 4) // Reduced to 4 for better fit
        }
        return ["Content Creation", "Social Media Posts", "Brand Promotion", "Analytics"]
    }
    const handleApply = () => {
        onApply(gig.id)
    }
    return (
        <Card
            className={cn(
                "bg-white/80 backdrop-blur-sm border border-white/20 group hover:shadow-xl transition-all duration-300 h-full flex flex-col py-2", // `h-full flex flex-col` ensures card takes full height and is a flex container
                className,
            )}
        >
            <CardContent className="p-4 sm:p-6 flex flex-col h-full">
                {" "}
                {/* `flex flex-col h-full` ensures content fills card and is a flex container */}
                {/* Header Section - Budget moved below title/description */}
                <div className="flex flex-col justify-start space-y-3 mb-4">
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                            <h3 className="text-lg sm:text-xl font-bold text-slate-900 line-clamp-2 leading-tight">{gig.title}</h3>
                            <Badge
                                className="bg-green-100 text-green-800 border-green-200 text-xs shrink-0 w-fit">Active</Badge>
                        </div>
                        <p className="text-slate-600 text-sm mb-1">
                            by <span className="font-medium truncate">{getBrandName()}</span>
                        </p>
                        <p className="text-slate-600 text-sm line-clamp-2">{gig.description}</p>
                        {/* Budget section moved here */}
                        <div className="text-left mt-3">
                            {" "}
                            {/* Adjusted alignment and margin */}
                            <div
                                className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-1">
                                {getBudget()}
                            </div>
                            <div className="text-xs text-slate-500">Budget</div>
                        </div>
                    </div>
                </div>
                {/* Stats Grid */}
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
                            {gig.category}
                        </Badge>
                        <div className="text-xs text-slate-500">Category</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                        <div className="font-medium text-slate-900 text-sm">Flexible</div>
                        <div className="text-xs text-slate-500">Duration</div>
                    </div>
                </div>
                {/* Platforms */}
                <div className="mb-4">
                    <h4 className="font-medium text-slate-900 mb-2 text-sm">Platforms</h4>
                    <div className="flex flex-wrap gap-1">
                        {getPlatforms().map((platform: string) => (
                            <Badge key={platform} variant="outline" className="flex items-center space-x-1 text-xs">
                                {platform === "Instagram" && <Instagram className="w-3 h-3"/>}
                                {platform === "YouTube" && <Youtube className="w-3 h-3"/>}
                                {platform === "TikTok" && <div className="w-3 h-3 bg-black rounded-sm"/>}
                                {platform === "Twitter" && <Twitter className="w-3 h-3"/>}
                                <span>{platform}</span>
                            </Badge>
                        ))}
                    </div>
                </div>
                {/* Deliverables */}
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
                {/* Requirements */}
                <div className="mb-4 flex-1">
                    {" "}
                    {/* `flex-1` allows this section to grow and push the footer down */}
                    <h4 className="font-medium text-slate-900 mb-2 text-sm">Requirements</h4>
                    <p className="text-xs text-slate-600 line-clamp-3">{gig.requirements}</p>
                </div>
                {/* Footer */}
                <div
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto pt-3 border-t border-slate-100">
                    {" "}
                    {/* `mt-auto` pushes this element to the bottom */}
                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                        <span>Posted {new Date(gig.published_at).toLocaleDateString()}</span>
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
