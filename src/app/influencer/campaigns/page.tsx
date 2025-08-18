"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import type { Campaign } from "@/types/campaigns"
import {
    Search,
    Filter,
    Calendar,
    Users,
    Building2,
    Tag,
    FileText,
    Shield,
    DollarSign,
    Clock,
    CheckCircle,
    AlertCircle,
    ArrowUpRight,
    Sparkles,
    Target,
    TrendingUp,
    Star,
} from "lucide-react"
import SelectInputField from "@/components/field/SelectField";

const availableCampaigns: Campaign[] = [
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
        status: "active",
        applications: 41,
        brand_name: "Adidas",
        deadline: "2024-09-01",
    },
    {
        id: 4,
        brand_id: 4,
        title: "Beauty Product Launch Campaign",
        description:
            "Help us launch our new skincare line with authentic reviews and tutorials. Show real results and honest opinions about our products.",
        categories: "Beauty, Skincare, Lifestyle",
        eligibility: "Beauty influencers with 50K+ followers, focus on skincare content",
        requirement: "2 Instagram posts, 3 Instagram stories, 1 detailed review video",
        price: 8000.0,
        image: "/placeholder.svg?height=300&width=600",
        created_at: "2024-01-12T08:20:00Z",
        updated_at: "2024-01-25T11:15:00Z",
        status: "active",
        applications: 67,
        brand_name: "Glossier",
        deadline: "2024-08-30",
    },
    {
        id: 5,
        brand_id: 5,
        title: "Travel Destination Showcase",
        description:
            "Capture the beauty and culture of our resort destination. Create inspiring content that showcases the unique experiences we offer.",
        categories: "Travel, Lifestyle, Photography",
        eligibility: "Travel influencers with high-quality photography skills, 75K+ followers",
        requirement: "5 Instagram posts, 10 Instagram stories, 2 TikTok videos, 1 blog post",
        price: 20000.0,
        image: "/placeholder.svg?height=300&width=600",
        created_at: "2024-01-08T14:30:00Z",
        updated_at: "2024-01-28T09:45:00Z",
        status: "active",
        applications: 29,
        brand_name: "Marriott",
        deadline: "2024-09-15",
    },
    {
        id: 6,
        brand_id: 6,
        title: "Gaming Hardware Review",
        description:
            "Test and review our latest gaming peripherals. Show real gameplay and provide honest feedback about performance and features.",
        categories: "Gaming, Technology, Reviews",
        eligibility: "Gaming content creators with 200K+ followers, focus on hardware reviews",
        requirement: "1 unboxing video, 1 detailed review, 3 gameplay videos featuring the products",
        price: 12000.0,
        image: "/placeholder.svg?height=300&width=600",
        created_at: "2024-01-18T16:10:00Z",
        updated_at: "2024-01-30T13:20:00Z",
        status: "active",
        applications: 15,
        brand_name: "Razer",
        deadline: "2024-08-25",
    },
]

export default function InfluencerCampaignsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedBudget, setSelectedBudget] = useState("all")
    const [activeTab, setActiveTab] = useState("all")
    const [appliedCampaigns, setAppliedCampaigns] = useState<number[]>([])

    const categoryOptions = [
        { value: "all", label: "All Categories" },
        { value: "fashion", label: "Fashion" },
        { value: "technology", label: "Technology" },
        { value: "fitness", label: "Fitness" },
        { value: "beauty", label: "Beauty" },
        { value: "travel", label: "Travel" },
        { value: "gaming", label: "Gaming" },
    ]

    const budgetOptions = [
        { value: "all", label: "All Budgets" },
        { value: "0-10000", label: "$0 - $10K" },
        { value: "10000-20000", label: "$10K - $20K" },
        { value: "20000-50000", label: "$20K - $50K" },
        { value: "50000+", label: "$50K+" },
    ]

    const getStatusColor = (status: string) => {
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

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "active":
                return <CheckCircle className="w-3 h-3" />
            case "draft":
                return <Clock className="w-3 h-3" />
            case "completed":
                return <CheckCircle className="w-3 h-3" />
            case "paused":
                return <AlertCircle className="w-3 h-3" />
            default:
                return <Clock className="w-3 h-3" />
        }
    }

    const handleApply = (campaignId: number) => {
        setAppliedCampaigns((prev) => [...prev, campaignId])
    }

    const filteredCampaigns = availableCampaigns.filter((campaign) => {
        const matchesSearch =
            campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            campaign.brand_name.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory =
            selectedCategory === "all" || campaign.categories.toLowerCase().includes(selectedCategory.toLowerCase())

        const matchesBudget = () => {
            if (selectedBudget === "all") return true
            if (selectedBudget === "0-10000") return campaign.price <= 10000
            if (selectedBudget === "10000-20000") return campaign.price > 10000 && campaign.price <= 20000
            if (selectedBudget === "20000-50000") return campaign.price > 20000 && campaign.price <= 50000
            if (selectedBudget === "50000+") return campaign.price > 50000
            return true
        }

        const matchesTab = () => {
            if (activeTab === "all") return true
            if (activeTab === "applied") return appliedCampaigns.includes(campaign.id)
            if (activeTab === "recommended") return campaign.price >= 15000
            return true
        }

        return matchesSearch && matchesCategory && matchesBudget() && matchesTab()
    })

    return (
        <div className="min-h-screen ">


            <div className="container-width section-padding py-8">
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-6 h-6 text-violet-600" />
                        <Badge className="bg-violet-100 text-violet-700 border-violet-200">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Campaign Discovery
                        </Badge>
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Find Campaigns</h1>
                    <p className="text-lg text-slate-600">
                        Discover exciting brand partnerships and apply to campaigns that match your niche
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{availableCampaigns.length}</div>
                        <div className="text-sm text-slate-500">Active Campaigns</div>
                    </Card>

                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                                <Users className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">{appliedCampaigns.length}</div>
                        <div className="text-sm text-slate-500">Applications Sent</div>
                    </Card>

                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <DollarSign className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            ${(availableCampaigns.reduce((sum, c) => sum + c.price, 0) / 1000).toFixed(0)}K
                        </div>
                        <div className="text-sm text-slate-500">Total Value</div>
                    </Card>

                    <Card className="glass-card border-0 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-slate-900 mb-1">
                            ${Math.round(availableCampaigns.reduce((sum, c) => sum + c.price, 0) / availableCampaigns.length / 1000)}K
                        </div>
                        <div className="text-sm text-slate-500">Avg Budget</div>
                    </Card>
                </div>

                <div className="glass-card p-6 border-0 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <Input
                                placeholder="Search campaigns, brands, or keywords..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 text-base border-slate-200 focus:border-violet-300 focus:ring-violet-200"
                            />
                        </div>
                        <SelectInputField
                            placeholder="Select Category"
                            options={categoryOptions}
                            value={selectedCategory}
                            onChangeAction={(value) => setSelectedCategory(String(value))}
                            className="w-full lg:w-48"
                        />
                        <SelectInputField
                            placeholder="Select Budget"
                            options={budgetOptions}
                            value={selectedBudget}
                            onChangeAction={(value) => setSelectedBudget(String(value))}
                            className="w-full lg:w-48"
                        />
                        <Button className="px-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                    <TabsList className="glass-card p-1 h-12 border-0">
                        <TabsTrigger value="all" className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            All Campaigns ({availableCampaigns.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="recommended"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            <Star className="w-4 h-4 mr-2" />
                            Recommended
                        </TabsTrigger>
                        <TabsTrigger
                            value="applied"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            Applied ({appliedCampaigns.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-6">
                        <div className="grid gap-6">
                            {filteredCampaigns.map((campaign) => (
                                <Card
                                    key={campaign.id}
                                    className="glass-card border-0 group hover:shadow-xl transition-all duration-300"
                                >
                                    {campaign.image && (
                                        <div className="relative h-48 overflow-hidden rounded-t-xl">
                                            <Image
                                                src={campaign.image || "/placeholder.svg"}
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
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-white/90 text-slate-900 border-0">
                                                    <Building2 className="w-3 h-3 mr-1" />
                                                    {campaign.brand_name}
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
                                                    {!campaign.image && (
                                                        <div className="flex items-center space-x-2">
                                                            <Building2 className="w-4 h-4 text-slate-400" />
                                                            <span className="text-sm text-slate-600">{campaign.brand_name}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center space-x-2">
                                                        <Calendar className="w-4 h-4 text-slate-400" />
                                                        <span className="text-sm text-slate-600">Due: {campaign.deadline}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Users className="w-4 h-4 text-slate-400" />
                                                        <span className="text-sm text-slate-600">{campaign.applications} applicants</span>
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
                                                    <Tag className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-700">Categories</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {campaign.categories.split(", ").map((category, index) => (
                                                        <Badge key={index} variant="outline" className="text-xs">
                                                            {category}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <Shield className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-700">Eligibility</span>
                                                </div>
                                                <p className="text-sm text-slate-600 line-clamp-2">{campaign.eligibility}</p>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <FileText className="w-4 h-4 text-slate-400" />
                                                    <span className="text-sm font-medium text-slate-700">Requirements</span>
                                                </div>
                                                <p className="text-sm text-slate-600 line-clamp-2">{campaign.requirement}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                                                <span>Posted {Math.floor(Math.random() * 7) + 1} days ago</span>
                                                <span>•</span>
                                                <span>{campaign.applications} applications</span>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <Button variant="outline" size="sm">
                                                    View Details
                                                </Button>
                                                {appliedCampaigns.includes(campaign.id) ? (
                                                    <Button disabled size="sm" className="bg-green-100 text-green-800 hover:bg-green-100">
                                                        <CheckCircle className="w-4 h-4 mr-2" />
                                                        Applied
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => handleApply(campaign.id)}
                                                        size="sm"
                                                        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                                                    >
                                                        Apply Now
                                                        <ArrowUpRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {filteredCampaigns.length === 0 && (
                            <div className="text-center py-12">
                                <div className="h-16 w-16 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-slate-400" />
                                </div>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No campaigns found</h3>
                                <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters</p>
                                <Button
                                    onClick={() => {
                                        setSearchTerm("")
                                        setSelectedCategory("all")
                                        setSelectedBudget("all")
                                    }}
                                    variant="outline"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
