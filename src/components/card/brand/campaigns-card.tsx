"use client"

import Image from "next/image"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {Edit, Eye, FileText, Shield, Trash2} from "lucide-react"
import {cn} from "@/lib/utils"

interface Tag {
    id: number
    name: string
}

interface Campaign {
    id: number
    title: string
    description: string
    categories: string
    eligibility: string
    requirement: string
    price: string
    tags: Tag[]
    image: string
}

interface CampaignCardProps {
    campaign: Campaign
    onEditAction?: (campaign: Campaign) => void
    onDeleteAction?: (campaignId: number) => void
    onViewAction?: (campaign: Campaign) => void
    onApplyAction?: (campaign: Campaign) => void
}

export function CampaignCard({
                                 campaign,
                                 onEditAction,
                                 onDeleteAction,
                                 onViewAction,
                                 onApplyAction,
                             }: CampaignCardProps) {
    const categories = campaign.categories ? campaign.categories.split(",").map((cat) => cat.trim()) : []
    const tags = campaign.tags || []

    return (
        <Card
            className={cn("bg-white/80 backdrop-blur-sm border shadow-lg group hover:shadow-xl transition-all duration-300 py-0")}>
            {campaign.image && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"

                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
                </div>
            )}
            <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{campaign.title}</h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">{campaign.description}</p>
                    </div>
                    <div className="text-right ml-6">
                        <div
                            className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-1">
                            ${Number(campaign.price).toLocaleString()}
                        </div>
                        <div className="text-sm text-slate-500">Campaign Budget</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-4 h-4 text-slate-400"/>
                            <span className="text-sm font-medium text-slate-700">Categories</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {categories.length > 0 ? (
                                categories.map((category, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                        {category}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-slate-500 text-xs">No categories</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-4 h-4 text-slate-400"/>
                            <span className="text-sm font-medium text-slate-700">Eligibility</span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">{campaign.eligibility || "Not specified"}</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <FileText className="w-4 h-4 text-slate-400"/>
                            <span className="text-sm font-medium text-slate-700">Requirements</span>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">{campaign.requirement || "Not specified"}</p>
                    </div>
                </div>

                <div>
                    <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-4 h-4 text-slate-400"/>
                        <span className="text-sm font-medium text-slate-700">Tags</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {tags.length > 0 ? (
                            tags.map((tag) => (
                                <Badge key={tag.id} variant="outline" className="text-xs">
                                    {tag.name}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-slate-500 text-xs">No tags</span>
                        )}
                    </div>
                </div>

                <Separator className="my-6"/>

                <div className="flex items-center justify-end space-x-3">
                    {onEditAction && (
                        <Button variant="outline" size="sm" onClick={() => onEditAction(campaign)}>
                            <Edit className="w-4 h-4 mr-2"/>
                            Edit
                        </Button>
                    )}
                    {onViewAction && (
                        <Button variant="outline" size="sm" onClick={() => onViewAction(campaign)}>
                            <Eye className="w-4 h-4 mr-2"/>
                            View Details
                        </Button>
                    )}
                    {onApplyAction && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() => onApplyAction(campaign)}
                        >
                            Apply
                        </Button>
                    )}
                    {onDeleteAction && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            onClick={() => onDeleteAction(campaign.id)}
                        >
                            <Trash2 className="w-4 h-4 mr-2"/>
                            Delete
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
