"use client"

import {useCallback, useEffect, useState} from "react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import type {Campaign, CampaignFormData} from "@/types/campaigns"
import {Eye, Loader2, Plus, Search, Sparkles, Target} from "lucide-react"
import {CampaignForm} from "@/components/form/campaign-form"
import campaignService from "@/services/campaign.service"
import {CampaignCard} from "@/components/card/campaigns/campaigns-card"
import {toast} from "sonner"
import CustomPagination from "@/components/Pagiantion/pagination"
import {DeleteModal} from "@/components/modal/delete-modal"
import {CampaignCardSkeleton} from "@/components/Skeleton/campaign-card-skeleton"
import {useRouter} from "next/navigation"

export default function BrandCampaignsPage() {
    const [activeTab, setActiveTab] = useState<string>("overview")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [campaigns, setCampaigns] = useState<Campaign[]>([])
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null)
    const [isFetching, setIsFetching] = useState(false)
    const router = useRouter()

    const fetchCampaigns = useCallback(async () => {
        setLoading(true)
        setIsFetching(true)
        try {
            const params = {per_page: 10, page: currentPage}
            const response = await campaignService.getCampaigns(params)
            setCampaigns(response?.data || [])
            setCurrentPage(response?.current_page || 1)
            setTotalPages(response?.last_page || 1)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            setIsFetching(false)
        }
    }, [currentPage])

    useEffect(() => {
        fetchCampaigns()
    }, [fetchCampaigns])

    const handlePageChange = (page: number) => setCurrentPage(page)
    const handleEditCampaign = (campaign: Campaign) => {
        setEditingCampaign(campaign)
        setActiveTab("create")
    }
    const openDeleteModal = (campaignId: number) => {
        setSelectedCampaignId(campaignId)
        setIsModalOpen(true)
    }
    const handleDeleteConfirmed = async () => {
        if (!selectedCampaignId) return
        setLoading(true)
        try {
            const response = await campaignService.deleteCampaign(selectedCampaignId)
            if (response) toast.success(response?.message || "Successfully deleted campaign")
            await fetchCampaigns()
        } catch (error) {
            console.error(error)
        } finally {
            setIsModalOpen(false)
            setSelectedCampaignId(null)
            setLoading(false)
        }
    }
    const handleViewCampaign = (campaign: Campaign) => {
        router.push(`/brand/campaigns/${campaign.id}`)
    }
    const handleCancel = () => {
        setEditingCampaign(null)
        setActiveTab("overview")
    }

    const handleFormSubmit = async (data: CampaignFormData) => {
        setLoading(true)
        try {
            const payload = {
                ...data,
                image: data.image instanceof File ? data.image : null,
            }
            if (editingCampaign) {
                await campaignService.updateCampaign(editingCampaign.id, payload)
                toast.success("Successfully updated campaign")
            } else {
                await campaignService.createCampaign(payload)
                toast.success("Successfully created campaign")
            }
            setEditingCampaign(null)
            setActiveTab("overview")
            await fetchCampaigns()
        } catch (error) {
            console.error(error)
            toast.error("Failed to save campaign")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen">
            <div className="container-width section-padding py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Target className="w-6 h-6 text-violet-600"/>
                            <Badge className="bg-violet-100 text-violet-700 border-violet-200">
                                <Sparkles className="w-3 h-3 mr-1"/>
                                Campaign Management
                            </Badge>
                        </div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-2">Campaigns</h1>
                        <p className="text-lg text-slate-600">
                            Create, manage, and track your influencer marketing campaigns
                        </p>
                    </div>
                    <Button
                        onClick={() => {
                            setEditingCampaign(null)
                            setActiveTab("create")
                        }}
                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                    >
                        <Plus className="w-4 h-4 mr-2"/>
                        Create Campaign
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="glass-card p-1 h-12 border-0">
                        <TabsTrigger value="overview"
                                     className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Eye className="w-4 h-4 mr-2"/>
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="create"
                                     className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            <Plus className="w-4 h-4 mr-2"/>
                            {editingCampaign ? "Edit Campaign" : "Create Campaign"}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="bg-white rounded-lg p-4 md:p-0 mb-8">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search
                                        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none"/>
                                    <Input
                                        placeholder="Search campaigns, brands, or keywords..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 pr-10 text-base border-slate-300 focus:border-violet-500 focus:ring-violet-300"
                                        aria-label="Search campaigns"
                                    />
                                    {isFetching && <Loader2
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-violet-600 animate-spin"/>}
                                </div>
                                <Button
                                    className="px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 flex items-center justify-center gap-2"
                                    onClick={fetchCampaigns}
                                    disabled={isFetching}
                                >
                                    {isFetching ? <Loader2 className="w-4 h-4 animate-spin"/> :
                                        <Search className="w-4 h-4"/>}
                                    {isFetching ? "Loading..." : "Search"}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-6 glass-card border-0 gap-6">
                            {loading
                                ? Array.from({length: 3}).map((_, i) => <CampaignCardSkeleton key={i}/>)
                                : campaigns.map((c) => (
                                    <CampaignCard
                                        key={c.id}
                                        campaign={c}
                                        onEditAction={handleEditCampaign}
                                        onDeleteAction={openDeleteModal}
                                        onViewAction={handleViewCampaign}
                                    />
                                ))}
                        </div>

                        <div className="flex justify-center">
                            <CustomPagination currentPage={currentPage} totalPages={totalPages}
                                              onPageChangeAction={handlePageChange}/>
                        </div>
                    </TabsContent>

                    <TabsContent value="create" className="space-y-6">
                        <CampaignForm editingCampaign={editingCampaign} onSubmit={handleFormSubmit}
                                      onCancel={handleCancel}/>
                    </TabsContent>
                </Tabs>
            </div>

            {isModalOpen && (
                <DeleteModal open={isModalOpen} onCloseAction={() => setIsModalOpen(false)}
                             onConfirmAction={handleDeleteConfirmed} loading={loading}/>
            )}
        </div>
    )
}
