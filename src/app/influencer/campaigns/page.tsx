"use client"

import {useCallback, useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Filter, Search, Sparkles, Target} from "lucide-react"
import SelectInputField from "@/components/field/SelectField"
import {CampaignCard} from "@/components/card/brand/campaigns-card"
import type {Campaign} from "@/types/campaigns"
import campaignService from "@/services/campaign.service"
import {CampaignBidFormModal} from "@/components/modal/campaign-bid-form"
import {toast} from "sonner";

const categoryOptions = [
    {value: "all", label: "All Categories"},
    {value: "fashion", label: "Fashion"},
    {value: "technology", label: "Technology"},
    {value: "fitness", label: "Fitness"},
    {value: "beauty", label: "Beauty"},
    {value: "travel", label: "Travel"},
    {value: "gaming", label: "Gaming"},
]

export default function InfluencerCampaignsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
    const [isFetching, setIsFetching] = useState(false)

    const fetchCampaigns = useCallback(async () => {
        setIsFetching(true)
        try {
            const params = {
                per_page: 10,
                page: 1,
                category: selectedCategory !== "all" ? selectedCategory : undefined,
                search: searchTerm || undefined,
            }
            const response = await campaignService.getInfluencerCampaigns(params)
            console.log(' Response from getInfluencerCampaigns:', response.data)
            setCampaigns(response?.data || [])
        } catch (error) {
            console.error("Error fetching campaigns:", error)

        } finally {
            setIsFetching(false)
        }
    }, [selectedCategory, searchTerm])

    useEffect(() => {
        fetchCampaigns()
    }, [fetchCampaigns])

    const handleViewCampaign = (campaign: Campaign) => {
        console.log("Viewing campaign:", campaign.title)
    }

    const handleApplyCampaign = (campaign: Campaign) => {
        setSelectedCampaign(campaign)
        setIsModalOpen(true)
    }

    const handleBidSubmit = async (
        data: { bid: number; detail: string },
        campaign: Campaign
    ) => {
        try {
            const response = await campaignService.createBidForCampaign(campaign.id, data)
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

    return (
        <div className="min-h-screen">
            <div className="container-width section-padding py-8">
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-6 h-6 text-violet-600"/>
                        <Badge className="bg-violet-100 text-violet-700 border-violet-200 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1"/>
                            Campaign Discovery
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Find Campaigns</h1>
                    <p className="text-lg text-slate-600">
                        Discover exciting brand partnerships and apply to campaigns that match your niche
                    </p>
                </div>

                <div className="glass-card p-6 border-0 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"
                                aria-hidden="true"
                            />
                            <Input
                                placeholder="Search campaigns, brands, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 text-base border-slate-200 focus:border-violet-300 focus:ring-violet-200"
                                aria-label="Search campaigns"
                            />
                        </div>
                        <SelectInputField
                            placeholder="Select Category"
                            options={categoryOptions}
                            value={selectedCategory}
                            onChangeAction={(value) => setSelectedCategory(String(value))}
                            className="w-full lg:w-48"
                        />
                        <Button
                            className="px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                            onClick={fetchCampaigns}
                            disabled={isFetching}
                            aria-label="Filter campaigns"
                        >
                            <Filter className="w-4 h-4 mr-2"/>
                            Filter
                        </Button>
                    </div>
                </div>

                <div>
                    <div className="space-y-6">
                        {campaigns.length > 0 ? (
                            campaigns.map((campaign) => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                    onViewAction={() => handleViewCampaign(campaign)}
                                    onApplyAction={() => handleApplyCampaign(campaign)}
                                />
                            ))
                        ) : (
                            <p className="text-center text-slate-500">No campaigns found.</p>
                        )}
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
                    onSubmit={handleBidSubmit}
                />
            )}
        </div>
    )
}
