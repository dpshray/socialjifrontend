"use client"

import {useCallback, useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Filter, Loader2, Search, Sparkles, Target} from "lucide-react"
import {CampaignCard} from "@/components/card/campaigns/campaigns-card"
import type {Campaign} from "@/types/campaigns"
import campaignService from "@/services/campaign.service"
import {CampaignBidFormModal} from "@/components/modal/campaign-bid-form"
import {toast} from "sonner"
import {useRouter} from "next/navigation"
import {CampaignCardSkeleton} from "@/components/Skeleton/campaign-card-skeleton"
import {useDebounce} from "@/hooks/useDebounce"

export default function InfluencerCampaignsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const router = useRouter()

    const fetchCampaigns = useCallback(async () => {
        setIsFetching(true)
        try {
            const params = {
                per_page: 10,
                page: 1,
                search: debouncedSearchTerm || undefined,
            }
            const response = await campaignService.getInfluencerCampaigns(params)
            setCampaigns(response?.data || [])
        } catch {
            toast.error("Failed to load campaigns.")
        } finally {
            setIsFetching(false)
        }
    }, [debouncedSearchTerm])

    useEffect(() => {
        fetchCampaigns()
    }, [fetchCampaigns])

    const handleViewCampaign = (campaign: Campaign) => {
        router.push(`/influencer/campaigns/${campaign.id}`)
    }

    const handleApplyCampaign = (campaign: Campaign) => {
        setSelectedCampaign(campaign)
        setIsModalOpen(true)
    }

    const handleBidSubmit = async (data: { bid: number; detail: string }, campaign: Campaign) => {
        try {
            const response = await campaignService.createBidForCampaign(campaign.id, data)
            if (response) toast.success(response?.message || "Bid submitted successfully")
        } catch (error: any) {
            if (error?.errors) {
                Object.values(error.errors).forEach((message) => {
                    toast.error(typeof message === "string" ? message : JSON.stringify(message))
                })
            } else {
                toast.error("Failed to submit bid.")
            }
        } finally {
            setIsModalOpen(false)
            setSelectedCampaign(null)
        }
    }

    return (
        <main className="min-h-screen bg-transparent">
            <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-0">
                <header className="mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-6 h-6 text-violet-600" aria-hidden="true"/>
                        <Badge className="bg-violet-100 text-violet-700 border-violet-200 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1" aria-hidden="true"/>
                            Campaign Discovery
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Find Campaigns</h1>
                    <p className="text-base md:text-lg text-slate-600">
                        Discover exciting brand partnerships and apply to campaigns that match your niche
                    </p>
                </header>

                <div className="bg-white rounded-lg p-4 md:p-0 mb-8 ">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"
                                aria-hidden="true"
                            />
                            <Input
                                placeholder="Search campaigns, brands, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 pr-10 text-base border-slate-300 focus:border-violet-500 focus:ring-violet-300"
                                aria-label="Search campaigns"
                            />
                            {isFetching && (
                                <Loader2
                                    className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-600 animate-spin"
                                    aria-label="Loading campaigns"
                                />
                            )}
                        </div>
                        <Button
                            className="px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 flex items-center justify-center gap-2"
                            onClick={fetchCampaigns}
                            disabled={isFetching}
                            aria-label="Filter campaigns"
                        >
                            {isFetching ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true"/>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <Search className="w-4 h-4" aria-hidden="true"/>
                                    Search
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {isFetching ? (
                    <div className="space-y-6">
                        {Array.from({length: 5}).map((_, index) => (
                            <CampaignCardSkeleton key={index}/>
                        ))}
                    </div>
                ) : campaigns.length > 0 ? (
                    <div className="flex flex-col gap-4">
                        {campaigns.map((campaign) => (
                            <CampaignCard
                                key={campaign.id}
                                campaign={campaign}
                                onViewAction={() => handleViewCampaign(campaign)}
                                onApplyAction={() => handleApplyCampaign(campaign)}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-slate-500">No campaigns found.</p>
                )}
            </section>

            {selectedCampaign && (
                <CampaignBidFormModal
                    campaign={selectedCampaign}
                    open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedCampaign(null)
                    }}
                    onSubmit={handleBidSubmit}
                />
            )}
        </main>
    )
}
