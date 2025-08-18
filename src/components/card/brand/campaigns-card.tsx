"use client"

import Image from "next/image"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import {
    AlertCircle,
    Building2,
    Calendar,
    CheckCircle,
    Clock,
    Edit,
    Eye,
    FileText,
    Shield,
    Tag,
    Trash2,
    Users,
} from "lucide-react"
import {Campaign} from "@/types/campaigns"

type Status = "active" | "draft" | "completed" | "paused" | string

interface CampaignCardProps {
    campaign: Campaign
    onEditAction?: (campaign: Campaign) => void
    onDeleteAction?: (campaignId: number) => void
    onViewAction?: (campaign: Campaign) => void
}

export function CampaignCard({campaign, onEditAction, onDeleteAction, onViewAction}: CampaignCardProps) {
    const getStatusColor = (status: Status) => {
        switch (status) {
            case "active":
                return "bg-green-100 text-green-800 border-green-200"
            case "draft":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "completed":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "paused":
                return "bg-gray-100 text-gray-800 border-gray-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStatusIcon = (status: Status) => {
        switch (status) {
            case "active":
                return <CheckCircle className="w-3 h-3"/>
            case "draft":
                return <Clock className="w-3 h-3"/>
            case "completed":
                return <CheckCircle className="w-3 h-3"/>
            case "paused":
                return <AlertCircle className="w-3 h-3"/>
            default:
                return <Clock className="w-3 h-3"/>
        }
    }

    const categories = campaign.categories ? campaign.categories.split(", ") : []

    return (
        <Card className="glass-card border-0 group hover:shadow-xl transition-all duration-300">
            {campaign.image && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                        src={campaign.image}
                        alt={campaign.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                        <Badge className={getStatusColor(campaign.status)}>
                            {getStatusIcon(campaign.status)}
                            <span className="ml-1 capitalize">{campaign.status}</span>
                        </Badge>
                    </div>
                </div>
            )}

            <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-2xl font-bold text-slate-900">{campaign.title}</h3>
                            {!campaign.image && (
                                <Badge className={getStatusColor(campaign.status)}>
                                    {getStatusIcon(campaign.status)}
                                    <span className="ml-1 capitalize">{campaign.status}</span>
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <Building2 className="w-4 h-4 text-slate-400"/>
                                <span className="text-sm text-slate-600">{campaign.brand_name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="w-4 h-4 text-slate-400"/>
                                <span className="text-sm text-slate-600">Due: {campaign.deadline}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-slate-400"/>
                                <span className="text-sm text-slate-600">{campaign.applications} applications</span>
                            </div>
                        </div>
                        <p className="text-slate-600 mb-4 line-clamp-2">{campaign.description}</p>
                    </div>
                    <div className="text-right ml-6">
                        <div className="text-3xl font-bold gradient-text mb-1">${campaign.price.toLocaleString()}</div>
                        <div className="text-sm text-slate-500">Campaign Budget</div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Tag className="w-4 h-4 text-slate-400"/>
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

                <Separator className="my-6"/>

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span>Created: {new Date(campaign.created_at).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Updated: {new Date(campaign.updated_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-3">
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
                </div>
            </CardContent>
        </Card>
    )
}
