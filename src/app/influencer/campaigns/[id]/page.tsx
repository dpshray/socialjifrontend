"use client"

import {useEffect, useState} from "react"
import {useParams, useRouter} from "next/navigation"
import {AlertCircle, CalendarDays, CheckCircle, DollarSign, ImageOff, Tag} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"
import campaignService from "@/services/campaign.service"
import Image from "next/image"
import {formatDate, getBrandInitials} from "@/lib/utils";
import {CampaignBidFormModal} from "@/components/modal/campaign-bid-form";
import {toast} from "sonner";


export default function InfluencerCampaignDetails() {
    const params = useParams()
    const id = Number(params?.id)
    const [campaign, setCampaign] = useState<any | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null)

    useEffect(() => {
        if (!id || Number.isNaN(id)) return
        const fetchCampaign = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await campaignService.getCampaignById(id)
                setCampaign(data)
                console.log(' Response getCampaignById ', data)
            } catch {
                setError("Failed to fetch campaign details.")
            } finally {
                setLoading(false)
            }
        }
        fetchCampaign()
    }, [id])
    const handleApplyCampaign = (id: number) => {
        setSelectedCampaign(campaign)
        setIsModalOpen(true)
    }
    const handleBidForm = async (
        data: { bid: number; detail: string },
    ) => {
        try {
            const response = await campaignService.createBidForCampaign(id, data)
            console.log("Bid submitted successfully:", response)
            if (response) {
                toast.success(response?.message || "Bid submitted successfully")
            }
        } catch (error: any) {
            console.error("Error submitting bid:", error?.errors)
            Object.entries(error?.errors).forEach(([_, message]) => {
                toast.error(typeof message === 'string' ? message : JSON.stringify(message))
            })
        } finally {
            setIsModalOpen(false)
            setSelectedCampaign(null)
        }
    }
    if (loading) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center space-y-4 px-4">
                <div className="animate-spin rounded-full border-b-2 border-primary h-8 w-8"/>
                <p className="text-muted-foreground text-center">Loading campaign details...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="flex min-h-[400px] flex-col items-center justify-center px-4">
                <Card className="max-w-md w-full">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <AlertCircle className="h-12 w-12 text-destructive"/>
                            <h3 className="text-lg font-semibold">Error Loading Campaign</h3>
                            <p className="text-sm text-muted-foreground">{error}</p>
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
                            <p className="text-sm text-muted-foreground">
                                The campaign you&#39;re looking for doesn&#39;t exist or has been removed.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </main>
        )
    }

    return (
        <main className="container mx-auto max-w-7xl px-4 py-6 ">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className={'shadow-xs border-none'}>
                        <CardHeader>
                            <div
                                className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                                <div className="space-y-2 flex-1 min-w-0">
                                    <CardTitle
                                        className="text-2xl sm:text-3xl break-words leading-tight capitalize">{campaign.title}</CardTitle>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 border-green-200 text-green-800 flex items-center flex-shrink-0"
                                >
                                    <CheckCircle className="mr-1 h-3 w-3"/>
                                    Active
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="mb-2 text-lg font-semibold">Description</h3>
                                <p className="leading-relaxed text-muted-foreground break-words">{campaign.description}</p>
                            </div>
                            <div>
                                <h3 className="mb-4 text-lg font-semibold">Campaign Media</h3>
                                {campaign.media && campaign.media.length > 0 ? (
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {campaign.media.map((media: any) => (
                                            <Card key={media.id} className="overflow-hidden">
                                                <div className="relative aspect-video w-full">
                                                    <Image
                                                        fill
                                                        sizes="100vw"
                                                        src={media.original_url || "/placeholder.svg"}
                                                        alt={media.name}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <CardContent className="p-3">
                                                    <p className="truncate text-sm font-medium">{media.name}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {media.mime_type} • {Math.round(Number(media.size) / 1024)} KB
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card className="border-dashed">
                                        <CardContent
                                            className="flex flex-col items-center justify-center py-12 text-center">
                                            <ImageOff className="h-12 w-12 text-muted-foreground mb-4"/>
                                            <h4 className="text-lg font-semibold text-muted-foreground mb-2">No Image
                                                Found</h4>
                                            <p className="text-sm text-muted-foreground">
                                                This campaign doesn&#39;t have any media files attached.
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Requirements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="mb-2 flex items-center font-semibold text-muted-foreground">
                                    <CheckCircle className="mr-2 h-4 w-4 text-green-600 flex-shrink-0"/>
                                    Eligibility Criteria
                                </h4>
                                <p className="pl-6 text-muted-foreground break-words">{campaign.eligibility}</p>
                            </div>
                            <Separator/>
                            <div>
                                <h4 className="mb-2 flex items-center font-semibold text-muted-foreground">
                                    <Tag className="mr-2 h-4 w-4 text-blue-600 flex-shrink-0"/>
                                    Requirements
                                </h4>
                                <p className="pl-6 text-muted-foreground break-words">{campaign.requirement}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-start space-x-4">
                                <Avatar className="h-16 w-16 flex-shrink-0">
                                    {campaign.brand.image ? (
                                        <AvatarImage
                                            src={campaign.brand.image || "/placeholder.svg"}
                                            alt={`${campaign.brand.nick_name || campaign.brand.first_name}'s avatar`}
                                        />
                                    ) : (
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            {getBrandInitials(campaign.brand.first_name, campaign.brand.last_name)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg font-semibold break-words">
                                        {campaign.brand.nick_name ||
                                            `${campaign.brand.first_name} ${campaign.brand.last_name || ""}`.trim()}
                                    </h3>
                                    <a
                                        href={`mailto:${campaign.brand.email}`}
                                        className="block text-sm text-muted-foreground underline-offset-2 hover:underline break-all"
                                    >
                                        {campaign.brand.email}
                                    </a>
                                    {campaign.brand.about && (
                                        <p className="mt-2 text-sm text-muted-foreground break-words">{campaign.brand.about}</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Campaign ID</span>
                                <Badge variant="outline">#{campaign.id}</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Budget</span>
                                <span className="font-semibold text-lg">${campaign.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Categories</span>
                                <Badge variant="secondary">{campaign.categories}</Badge>
                            </div>
                            <Separator/>
                            <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                    <span className="text-muted-foreground">Created</span>
                                    <span className="text-right">{formatDate(campaign.created_at)}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                    <span className="text-muted-foreground">Last Updated</span>
                                    <span className="text-right">{formatDate(campaign.updated_at)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className={' flex  flex-col w-full gap-2'}>

                        <Button
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50 bg-transparent"
                            onClick={() => handleApplyCampaign(id)}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="default"
                            onClick={() => router.back()}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
            {selectedCampaign && (
                <CampaignBidFormModal
                    campaign={selectedCampaign}
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedCampaign(null)
                    }}
                    onSubmit={handleBidForm}
                />
            )}
        </main>
    )
}
