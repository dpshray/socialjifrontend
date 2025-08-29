"use client"

import {useEffect, useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Search, Sparkles} from "lucide-react"
import InfluencerInsightsCard, {type InfluencerInsight} from "@/components/card/influencer/influencer-card"
import BrandInsightsCard from "@/components/card/brand/brand-insight-card"
import GigInsightCard from "@/components/card/gig-insight-card"
import dashboardService from "@/services/dashboardService"
import HeroSection from "@/components/header/HeroSection";

export default function ExplorePage() {
    const [contactedInfluencer, setContactedInfluencer] = useState<string | null>(null)
    const [viewedBrand, setViewedBrand] = useState<string | null>(null)
    const [influencers, setInfluencers] = useState<InfluencerInsight[]>([])
    const [brands, setBrands] = useState<any[]>([])
    const [gigs, setGigs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const params = {per_page: 6, page: 1}
            try {
                setLoading(true)
                const [influencerRes, brandRes, gigRes] = await Promise.all([
                    dashboardService.explorerInfluencer(params),
                    dashboardService.explorerBrand(params),
                    dashboardService.explorerTopSales(params),
                ])

                console.log("Influencers:", influencerRes.data)
                console.log("Brands:", brandRes.data)
                console.log("Gigs ab:", gigRes.data)

                setInfluencers(influencerRes.data)
                setBrands(brandRes.data)
                setGigs(gigRes.data)
            } catch (err) {
                console.error("Error fetching data:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])



    if (loading) {
        return (
            <div
                className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading explore data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">

            <HeroSection
                imageSrc="/hero1.png"
                title="Explore"
                description="Discover top influencers, leading brands, and active gigs across all platforms"
                badgeContent={
                    <>
                        <Sparkles className="w-3 h-3 mr-1"/>
                        <span className="text-white">Real-time Discovery</span>
                    </>
                }
                icon={<Search className="w-6 h-6 text-white"/>}
            />


            <div className=" container mx-auto px-4 py-8">
                {contactedInfluencer && (
                    <div
                        className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                        Contact request sent to {contactedInfluencer}! They&#39;ll get back to you soon.
                    </div>
                )}

                {viewedBrand && (
                    <div className="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg text-center">
                        Viewing campaigns for {viewedBrand}. Redirecting to campaigns page...
                    </div>
                )}

                <Tabs defaultValue="influencers" className="space-y-8">
                    <TabsList className="bg-white/80 backdrop-blur-sm p-1 h-12 border border-white/20 rounded-xl">
                        <TabsTrigger
                            value="influencers"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            Influencers ({influencers.length})
                        </TabsTrigger>
                        <TabsTrigger
                            value="brands"
                            className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                        >
                            Brands ({brands.length})
                        </TabsTrigger>
                        <TabsTrigger value="gigs"
                                     className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:shadow-sm">
                            Active Gigs ({gigs.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="influencers">
                        {influencers.length === 0 ? (
                            <div className="text-center py-12">
                                <Search className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No influencers found</h3>
                                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-3 gap-6">
                                {influencers.map((influencer, index) => (
                                    <InfluencerInsightsCard
                                        key={influencer.id || index}
                                        {...influencer}

                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="brands">
                        {brands.length === 0 ? (
                            <div className="text-center py-12">
                                <Search className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No brands found</h3>
                                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {brands.map((brand) => (
                                    <BrandInsightsCard
                                        key={brand.id}
                                        brand={brand}

                                    />
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="gigs">
                        {gigs.length === 0 ? (
                            <div className="text-center py-12">
                                <Search className="w-12 h-12 text-slate-400 mx-auto mb-4"/>
                                <h3 className="text-lg font-medium text-slate-900 mb-2">No gigs found</h3>
                                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                                {gigs.map((gig, index) => (
                                    <GigInsightCard key={index} gigData={gig} />
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
