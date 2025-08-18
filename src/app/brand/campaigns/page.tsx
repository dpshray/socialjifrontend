"use client"

import {useState} from "react"
import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Input} from "@/components/ui/input"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

import type {Campaign, CampaignFormData} from "@/types/campaigns"
import {CheckCircle, DollarSign, Eye, Filter, Plus, Search, Sparkles, Target, Users} from "lucide-react"
import SelectInputField from "@/components/field/SelectField";
import {CampaignCard} from "@/components/card/brand/campaigns-card";
import {CampaignForm} from "@/components/form/campaign-form";

const mockCampaigns: Campaign[] = [
    {
        id: 1,
        brand_id: 1,
        title: "Summer Fashion Collection 2024",
        description:
            "Showcase our latest summer collection with authentic styling content that resonates with young fashion enthusiasts. Focus on versatile pieces that can be styled for different occasions.",
        categories: "Fashion, Lifestyle, Style",
        eligibility: "Fashion influencers with 100K+ followers, aged 18-35, primarily female audience",
        requirement: "3 Instagram posts, 5 Instagram stories, 2 TikTok videos showcasing different outfits",
        price: 15000.0,
        image: "/placeholder.svg?height=300&width=600",
        created_at: "2024-01-15T10:30:00Z",
        updated_at: "2024-01-20T14:45:00Z",
        status: "active",
        applications: 23,
        brand_name: "Zara",
        deadline: "2024-08-15",
    },
    {
        id: 2,
        brand_id: 2,
        title: "Tech Product Review Series",
        description:
            "In-depth review of our latest smartphone featuring camera capabilities, performance benchmarks, and real-world usage scenarios.",
        categories: "Technology, Reviews, Electronics",
        eligibility: "Tech reviewers with authentic engagement, 500K+ subscribers on YouTube",
        requirement: "1 comprehensive review video (10+ minutes), 1 unboxing video, 1 comparison video with competitors",
        price: 25000.0,
        image: "/placeholder.svg?height=300&width=600",
        created_at: "2024-01-10T09:15:00Z",
        updated_at: "2024-01-18T16:20:00Z",
        status: "active",
        applications: 18,
        brand_name: "Samsung",
        deadline: "2024-08-20",
    },
    {
        id: 3,
        brand_id: 3,
        title: "30-Day Fitness Transformation",
        description:
            "Document your fitness journey using our new athletic wear line. Show real progress, challenges, and victories throughout the month.",
        categories: "Fitness, Health, Lifestyle",
        eligibility: "Fitness influencers of all sizes, must be willing to commit to 30-day program",
        requirement: "Daily workout posts, weekly progress videos, final transformation post, honest product reviews",
        price: 35000.0,
        image: "/placeholder.svg?height=300&width=600",
        created_at: "2024-01-05T11:00:00Z",
        updated_at: "2024-01-22T13:30:00Z",
        status: "draft",
        applications: 0,
        brand_name: "Adidas",
        deadline: "2024-09-01",
    },
]

export default function CampaignsPage() {
    const [activeTab, setActiveTab] = useState<string>("overview")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
    const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)

    const statusOptions = [
        {value: "all", label: "All Status"},
        {value: "active", label: "Active"},
        {value: "draft", label: "Draft"},
        {value: "completed", label: "Completed"},
        {value: "paused", label: "Paused"},
    ]

    const handleFormSubmit = async (data: CampaignFormData) => {
        try {
            if (editingCampaign) {
                const updatedCampaign: Campaign = {
                    ...editingCampaign,
                    title: data.title,
                    description: data.description,
                    categories: data.categories,
                    eligibility: data.eligibility,
                    requirement: data.requirement,
                    price: data.price,
                    image: data.image as string,
                    updated_at: new Date().toISOString(),
                }
                setCampaigns((prev) => prev.map((c) => (c.id === editingCampaign.id ? updatedCampaign : c)))
                setEditingCampaign(null)
            } else {
                const newCampaign: Campaign = {
                    id: Date.now(),
                    brand_id: 1,
                    title: data.title,
                    description: data.description,
                    categories: data.categories,
                    eligibility: data.eligibility,
                    requirement: data.requirement,
                    price: data.price,
                    image: data.image as string,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    status: "draft",
                    applications: 0,
                    brand_name: "Your Brand",
                    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
                }
                setCampaigns((prev) => [newCampaign, ...prev])
            }

            setActiveTab("overview")
        } catch (error) {
            console.error("Error saving campaign:", error)
        }
    }

    const handleEditCampaign = (campaign: Campaign) => {
        setEditingCampaign(campaign)
        setActiveTab("create")
    }

    const handleDeleteCampaign = async (campaignId: number) => {
        if (window.confirm("Are you sure you want to delete this campaign?")) {
            try {
                setCampaigns((prev) => prev.filter((c) => c.id !== campaignId))
            } catch (error) {
                console.error("Error deleting campaign:", error)
            }
        }
    }

    const handleViewCampaign = (campaign: Campaign) => {
        console.log("Viewing campaign:", campaign)
    }

    const handleCancel = () => {
        setEditingCampaign(null)
        setActiveTab("overview")
    }

    const filteredCampaigns = campaigns.filter((campaign) => {
        const matchesSearch =
            campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = selectedStatus === "all" || campaign.status === selectedStatus
        return matchesSearch && matchesStatus
    })

    return (
        <div className="min-h-screen ">

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
                        <p className="text-lg text-slate-600">Create, manage, and track your influencer marketing
                            campaigns</p>
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

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-white"/>
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            {campaigns.filter((c) => c.status === "active").length}
                        </div>
                        <div className="text-sm text-slate-500">Active Campaigns</div>
                    </Card>
                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                <Users className="h-6 w-6 text-white"/>
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            {campaigns.reduce((sum, c) => sum + c.applications, 0)}
                        </div>
                        <div className="text-sm text-slate-500">Total Applications</div>
                    </Card>
                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-white"/>
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            ${Math.round(campaigns.reduce((sum, c) => sum + c.price, 0) / 1000)}K
                        </div>
                        <div className="text-sm text-slate-500">Total Budget</div>
                    </Card>
                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                <Target className="h-6 w-6 text-white"/>
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">8.5%</div>
                        <div className="text-sm text-slate-500">Avg Conversion</div>
                    </Card>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="glass-card p-1 h-12 border-0">
                        <TabsTrigger
                            value="overview"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <Eye className="w-4 h-4 mr-2"/>
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="create"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <Plus className="w-4 h-4 mr-2"/>
                            {editingCampaign ? "Edit Campaign" : "Create Campaign"}
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="glass-card p-6 border-0">
                            <div className="flex flex-col lg:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400"/>
                                    <Input
                                        placeholder="Search campaigns..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-12 text-base border-slate-200 focus:border-violet-300 focus:ring-violet-200"
                                    />
                                </div>
                                <SelectInputField
                                    placeholder="Select Status"
                                    options={statusOptions}
                                    value={selectedStatus}
                                    onChangeAction={(value) => setSelectedStatus(String(value))}
                                    className="w-full lg:w-48"
                                />
                                <Button
                                    className="px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                                    <Filter className="w-4 h-4 mr-2"/>
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {filteredCampaigns.map((campaign) => (
                                <CampaignCard
                                    key={campaign.id}
                                    campaign={campaign}
                                    onEditAction={handleEditCampaign}
                                    onDeleteAction={handleDeleteCampaign}
                                    onViewAction={handleViewCampaign}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="create" className="space-y-6">
                        <CampaignForm editingCampaign={editingCampaign} onSubmit={handleFormSubmit}
                                      onCancel={handleCancel}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
