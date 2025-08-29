"use client"

import React, {FC, useEffect, useState} from "react"
import {Home, PanelsTopLeft} from "lucide-react"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import influencerService from "@/services/InfluencerService"

export type DataPoint = {
    month: number
    gigs?: number
    campaigns?: number
}

type InfluencerChartProps = {
    className?: string
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const formatMonth = (monthNum: number) => monthNames[monthNum - 1] || ""

const formatNumber = (value: number): string => {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${Math.round(value / 1_000)}k`
    return value.toString()
}

const generateTicks = (maxValue: number, step: number): number[] => {
    if (maxValue <= 0) return [0, 1, 5, 10, 15]
    const ticks = [0]
    for (let i = step; i <= maxValue; i += step) {
        ticks.push(i)
    }
    return ticks
}

const CustomTooltip: FC<any> = ({active, payload, label}) => {
    if (!active || !payload?.length) return null
    return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
            <p className="font-medium">{formatMonth(label)}</p>
            {payload.map((entry: any, i: number) => (
                <p key={i} style={{color: entry.color}}>
                    {entry.name}: {formatNumber(entry.value ?? 0)}
                </p>
            ))}
        </div>
    )
}

const InfluencerChart: FC<InfluencerChartProps> = ({className = ""}) => {
    const [gigChartData, setGigChartData] = useState<DataPoint[]>([])
    const [campaignChartData, setCampaignChartData] = useState<DataPoint[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchInfluencerData = async () => {
            try {
                const response = await influencerService.influencerDashboard()
                const gigs = (response?.no_of_gigs_published_on_current_year || []).map((item: any) => ({
                    month: item.month,
                    gigs: item.total,
                }))
                const campaigns = (response?.campaign_published_on_current_year || []).map((item: any) => ({
                    month: item.month,
                    campaigns: item.total,
                }))

                setGigChartData(gigs)
                setCampaignChartData(campaigns)
            } finally {
                setLoading(false)
            }
        }
        fetchInfluencerData()
    }, [])

    const purpleColor = "#6C5DD3"
    const purpleFill = "#BE50C8"

    const maxGigs = Math.max(...gigChartData.map(d => d.gigs ?? 0), 0)
    const maxCampaigns = Math.max(...campaignChartData.map(d => d.campaigns ?? 0), 0)
    const maxValue = Math.max(maxGigs, maxCampaigns)

    const step = 5
    const yTicks = generateTicks(maxValue + step, step)

    if (loading) return null

    return (
        <section className={`w-full mx-auto rounded-xl bg-white shadow-lg p-6 ${className}`}>
            <Tabs defaultValue="gigs" className="w-full">
                <TabsList
                    className="mb-6 flex w-full sm:w-fit flex-wrap justify-start sm:justify-center rounded-lg border-2 border-purple-700 bg-gray-50 p-1">
                    <TabsTrigger
                        value="gigs"
                        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                        <PanelsTopLeft size={16}/>
                        <span>Gigs</span>
                    </TabsTrigger>
                    <TabsTrigger
                        value="campaigns"
                        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-purple-700 data-[state=active]:text-white data-[state=active]:shadow-sm"
                    >
                        <Home size={16}/>
                        <span>Campaigns</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="gigs" className="w-full">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Gigs Published</h3>
                        <p className="text-sm text-gray-600 mt-1">Monthly gigs published this year</p>
                    </div>
                    <div className="w-full h-72 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={gigChartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false}/>
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={formatMonth}
                                    stroke="#666"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    ticks={yTicks}
                                    tickFormatter={formatNumber}
                                    stroke="#666"
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Line
                                    dataKey="gigs"
                                    type="monotone"
                                    stroke={purpleColor}
                                    strokeWidth={3}
                                    dot={{fill: purpleColor, strokeWidth: 2, r: 4}}
                                    activeDot={{r: 6, fill: purpleColor, strokeWidth: 2}}
                                    name="Gigs Published"
                                />
                                <Legend
                                    content={({payload}) => (
                                        <div className="flex justify-center mt-4 flex-wrap gap-3">
                                            {payload?.map((entry: any, i: number) => (
                                                <span key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <div className="w-3 h-3 rounded-full"
                                                         style={{backgroundColor: entry.color}}/>
                                                    {entry.value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </TabsContent>

                <TabsContent value="campaigns" className="w-full">
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900">Campaigns Published</h3>
                        <p className="text-sm text-gray-600 mt-1">Monthly campaigns published this year</p>
                    </div>
                    <div className="w-full h-72 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={campaignChartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false}/>
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={formatMonth}
                                    stroke="#666"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    ticks={yTicks}
                                    tickFormatter={formatNumber}
                                    stroke="#666"
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                                <Bar
                                    dataKey="campaigns"
                                    fill={purpleFill}
                                    radius={[4, 4, 0, 0]}
                                    name="Campaigns Published"
                                />
                                <Legend
                                    content={({payload}) => (
                                        <div className="flex justify-center mt-4 flex-wrap gap-3">
                                            {payload?.map((entry: any, i: number) => (
                                                <span key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                    <div className="w-3 h-3 rounded-full"
                                                         style={{backgroundColor: entry.color}}/>
                                                    {entry.value}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default InfluencerChart
