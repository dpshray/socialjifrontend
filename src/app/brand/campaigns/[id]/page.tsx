"use client"

import {useState} from "react"
import {useParams} from "next/navigation"
import {AlertCircle, CalendarDays, CheckCircle, DollarSign, ImageOff, Tag} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"
import {BidsList} from "@/components/campaigns/bid-card"
import campaignService from "@/services/campaign.service"
import Image from "next/image"
import {toast} from "sonner"
import {useQuery, useQueryClient} from "@tanstack/react-query"

interface BrandData {
    id: number
    nick_name: string
    first_name: string
    last_name: string
    email: string
    image: string
    about?: string
}

interface CampaignMedia {
    id: number
    name: string
    mime_type: string
    size: string
    original_url: string
}

interface CampaignData {
    id: number
    title: string
    description: string
    categories: string
    eligibility: string
    requirement: string
    price: string
    brand: BrandData
    tags: { id?: number; name?: string }[]
    image: string
    media?: CampaignMedia[]
    is_assigned: boolean
    created_at: string
    updated_at: string
}

export default function BrandCampaignDetails() {
    const params = useParams()
    const id = Number(params?.id)
    const [showBids, setShowBids] = useState(false)
    const queryClient = useQueryClient()

    const {data: campaign, isLoading: campaignLoading, isError: campaignError} = useQuery({
        queryKey: ["campaign", id],
        queryFn: () => campaignService.getCampaignById(id),
        enabled: !!id,
    })

    const {data: bids, isLoading: bidsLoading, isError: bidsError,refetch} = useQuery({
        queryKey: ["bids", id],
        queryFn: () => campaignService.getBidsForCampaign(id)
            .then((res) => {
                console.log(res)
                return res.data
            }),
        enabled: !!id,
    })

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

    const handleAssignBidAction = async (bidId: number) => {
        try {
            const res = await campaignService.assignCampaignToInfluencer(bidId)
            toast.success(res.message || "Bid assigned successfully")
            refetch()
            setShowBids(true)
        } catch (error) {
            console.error("Error assigning bid:", error)
            toast.error("Failed to assign bid")
        }
    }

    const getBrandInitials = (firstName: string, lastName?: string) =>
        lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : firstName.slice(0, 2).toUpperCase()

    if (campaignLoading) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center space-y-4 px-4">
                <div className="animate-spin rounded-full border-b-2 border-primary h-8 w-8"/>
                <p className="text-muted-foreground text-center">Loading campaign details...</p>
            </main>
        )
    }

    if (campaignError) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center px-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <AlertCircle className="h-12 w-12 text-destructive"/>
                            <h3 className="text-lg font-semibold">Error Loading Campaign</h3>
                            <Button onClick={() => window.location.reload()}>Try Again</Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
        )
    }

    if (!campaign) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center px-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <AlertCircle className="h-12 w-12 text-muted-foreground"/>
                            <h3 className="text-lg font-semibold">Campaign Not Found</h3>
                        </div>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 pb-6 border-b">
                    <div className="space-y-2 flex-1 min-w-0 w-full">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words leading-tight">{campaign.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                                <CalendarDays className="h-4 w-4 flex-shrink-0"/>
                                <span>Created {formatDate(campaign.created_at)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <DollarSign className="h-4 w-4 flex-shrink-0"/>
                                <span>${campaign.price}</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="secondary"
                           className="bg-green-100 border-green-200 text-green-800 flex items-center flex-shrink-0">
                        <CheckCircle className="mr-1 h-3 w-3"/>
                        {campaign.is_assigned ? "Assigned" : "Not Assigned"}
                    </Badge>
                </div>

                <div className="flex flex-col sm:flex-row items-start gap-4 p-4 sm:p-6 bg-muted/50 rounded-lg">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0">
                        {campaign.brand.image ? (
                            <AvatarImage src={campaign.brand.image}
                                         alt={`${campaign.brand.nick_name || campaign.brand.first_name}'s avatar`}/>
                        ) : (
                            <AvatarFallback className="bg-primary/10 text-primary text-lg sm:text-xl">
                                {getBrandInitials(campaign.brand.first_name, campaign.brand.last_name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="flex-1 min-w-0 w-full">
                        <h3 className="text-lg sm:text-xl font-semibold break-words">
                            {campaign.brand.nick_name || `${campaign.brand.first_name} ${campaign.brand.last_name || ""}`.trim()}
                        </h3>
                        <a href={`mailto:${campaign.brand.email}`}
                           className="block text-sm text-muted-foreground underline-offset-2 hover:underline break-all">
                            {campaign.brand.email}
                        </a>
                        {campaign.brand.about &&
                            <p className="mt-2 text-sm text-muted-foreground break-words">{campaign.brand.about}</p>}
                    </div>
                </div>

                <Separator/>

                <div>
                    <h3 className="mb-3 text-lg sm:text-xl font-semibold">Description</h3>
                    <p className="leading-relaxed text-muted-foreground break-words text-sm sm:text-base">{campaign.description}</p>
                </div>

                <Separator/>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
                    <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground">Campaign ID</span>
                        <Badge variant="outline" className="w-fit">#{campaign.id}</Badge>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground">Budget</span>
                        <span className="font-semibold text-lg sm:text-xl">${campaign.price}</span>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-muted-foreground">Categories</span>
                        <Badge variant="secondary" className="w-fit">{campaign.categories}</Badge>
                    </div>
                </div>

                <Separator/>

                <div>
                    <h3 className="mb-4 text-lg sm:text-xl font-semibold">Campaign Media</h3>
                    {campaign.media && campaign.media.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {campaign.media.map((media: any) => (
                                <div key={media.id} className="border rounded-lg overflow-hidden">
                                    <div className="relative aspect-video w-full">
                                        <Image fill src={media.original_url || "/placeholder.svg"} alt={media.name}
                                               className="object-cover w-full h-full"/>
                                    </div>
                                    <div className="p-3">
                                        <p className="truncate text-sm font-medium">{media.name}</p>
                                        <p className="text-xs text-muted-foreground">{media.mime_type} • {Math.round(Number(media.size) / 1024)} KB</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="border border-dashed rounded-lg">
                            <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                                <ImageOff className="h-12 w-12 text-muted-foreground mb-4"/>
                                <h4 className="text-lg font-semibold text-muted-foreground mb-2">No Image Found</h4>
                                <p className="text-sm text-muted-foreground">This campaign doesn&#39;t have any media
                                    files attached.</p>
                            </div>
                        </div>
                    )}
                </div>

                <Separator/>

                <div className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Campaign Requirements</h3>
                    <div>
                        <h4 className="mb-2 flex items-center font-semibold text-muted-foreground">
                            <CheckCircle className="mr-2 h-4 w-4 text-green-600 flex-shrink-0"/>
                            Eligibility Criteria
                        </h4>
                        <p className="pl-6 text-muted-foreground break-words text-sm sm:text-base">{campaign.eligibility}</p>
                    </div>
                    <div>
                        <h4 className="mb-2 flex items-center font-semibold text-muted-foreground">
                            <Tag className="mr-2 h-4 w-4 text-blue-600 flex-shrink-0"/>
                            Requirements
                        </h4>
                        <p className="pl-6 text-muted-foreground break-words text-sm sm:text-base">{campaign.requirement}</p>
                    </div>
                </div>

                <Separator/>

                <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1" onClick={() => setShowBids(!showBids)}>
                        {showBids ? "Hide Bids" : "View Bids"}
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">Contact Brand</Button>
                </div>

                {showBids && (
                    <>
                        <Separator/>
                        <BidsList bids={bids} onAssignBidAction={handleAssignBidAction}/>
                    </>
                )}
            </div>
        </main>
    )
}
