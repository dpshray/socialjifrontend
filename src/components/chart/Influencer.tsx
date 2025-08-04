"use client"

import type React from "react"
import { BoxIcon, HomeIcon as HouseIcon, PanelsTopLeftIcon } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

type Tab = {
    value: string
    label: string
    icon: React.ComponentType<{ size?: number; className?: string }>
}

const tabsData: Tab[] = [
    { value: "tab-1", label: "Performance", icon: PanelsTopLeftIcon },
    { value: "tab-2", label: "Campaigns", icon: HouseIcon },
    { value: "tab-3", label: "Content Planner", icon: BoxIcon },
]

// Data for Performance tab (Area Chart)
const performanceData = [
    { date: "2025-01-01", mobile: 200, desktop: 400 },
    { date: "2025-02-01", mobile: 180, desktop: 300 },
    { date: "2025-03-01", mobile: 220, desktop: 500 },
    { date: "2025-04-01", mobile: 200, desktop: 400 },
    { date: "2025-05-01", mobile: 250, desktop: 450 },
    { date: "2025-06-01", mobile: 280, desktop: 520 },
]

// Data for Campaigns tab (Bar Chart)
const campaignData = [
    { month: "January", impressions: 186, clicks: 80, conversions: 12 },
    { month: "February", impressions: 305, clicks: 120, conversions: 18 },
    { month: "March", impressions: 237, clicks: 95, conversions: 15 },
    { month: "April", impressions: 173, clicks: 70, conversions: 10 },
    { month: "May", impressions: 209, clicks: 85, conversions: 14 },
    { month: "June", impressions: 214, clicks: 90, conversions: 16 },
]

// Data for Content Planner tab (Line Chart)
const contentData = [
    { month: "January", posts: 25, engagement: 1200, reach: 5400 },
    { month: "February", posts: 30, engagement: 1500, reach: 6200 },
    { month: "March", posts: 28, engagement: 1350, reach: 5800 },
    { month: "April", posts: 32, engagement: 1600, reach: 6800 },
    { month: "May", posts: 35, engagement: 1750, reach: 7200 },
    { month: "June", posts: 33, engagement: 1650, reach: 6900 },
]

// Chart configurations
const performanceConfig = {
    mobile: {
        label: "Mobile",
        color: "#BE50C8",
    },
    desktop: {
        label: "Desktop",
        color: "#6C5DD3",
    },
}

const campaignConfig = {
    impressions: {
        label: "Impressions",
        color: "#6C5DD3",
    },
    clicks: {
        label: "Clicks",
        color: "#BE50C8",
    },
    conversions: {
        label: "Conversions",
        color: "#10B981",
    },
}

const contentConfig = {
    posts: {
        label: "Posts",
        color: "#6C5DD3",
    },
    engagement: {
        label: "Engagement",
        color: "#BE50C8",
    },
    reach: {
        label: "Reach",
        color: "#F59E0B",
    },
}

const InfluencerChart: React.FC = () => {
    return (
        <section className="w-full rounded-xl bg-transparent shadow-none" aria-label="Influencer Analytics">
            <Tabs defaultValue="tab-1" className="w-full px-4 pt-4">
                <ScrollArea className="w-full">
                    <TabsList
                        className={cn("mb-4 flex w-fit items-center gap-2 rounded-lg border border-[#BE50C8] bg-background p-1")}
                    >
                        {tabsData.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={cn(
                                    "group flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                    "hover:bg-muted/80 data-[state=active]:bg-[#BE50C8] data-[state=active]:text-white",
                                    "data-[state=active]:shadow-sm data-[state=active]:border-none",
                                    "cursor-pointer",
                                )}
                                aria-label={tab.label}
                            >
                                <tab.icon
                                    size={16}
                                    className="opacity-70 group-hover:opacity-100 data-[state=active]:opacity-100"
                                    aria-hidden="true"
                                />
                                <span>{tab.label}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <ScrollBar orientation="horizontal" className="h-1.5" />
                </ScrollArea>

                {/* Performance Tab - Area Chart */}
                <TabsContent value="tab-1" className="focus:outline-none shadow-none">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Performance Analytics</h3>
                        <p className="text-sm text-muted-foreground">Mobile vs Desktop traffic over time</p>
                    </div>
                    <ChartContainer
                        config={performanceConfig}
                        className="aspect-auto h-[300px] bg-transparent shadow-none w-full"
                    >
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6C5DD3" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6C5DD3" stopOpacity={0.1} />
                                </linearGradient>
                                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#BE50C8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#BE50C8" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value: string) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        labelFormatter={(value) =>
                                            new Date(value as string).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                            })
                                        }
                                        indicator="dot"
                                    />
                                }
                            />
                            <Area
                                dataKey="mobile"
                                type="monotone"
                                fill="url(#fillMobile)"
                                stroke="#BE50C8"
                                strokeWidth={1}
                                stackId="a"
                            />
                            <Area
                                dataKey="desktop"
                                type="monotone"
                                fill="url(#fillDesktop)"
                                stroke="#6C5DD3"
                                strokeWidth={1}
                                stackId="a"
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </AreaChart>
                    </ChartContainer>
                </TabsContent>

                {/* Campaigns Tab - Bar Chart */}
                <TabsContent value="tab-2" className="focus:outline-none shadow-none">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Campaign Performance</h3>
                        <p className="text-sm text-muted-foreground">Monthly campaign metrics</p>
                    </div>
                    <ChartContainer config={campaignConfig} className="aspect-auto h-[300px] bg-transparent shadow-none w-full">
                        <BarChart data={campaignData}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                            <Bar dataKey="impressions" fill="var(--color-impressions)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="clicks" fill="var(--color-clicks)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="conversions" fill="var(--color-conversions)" radius={[4, 4, 0, 0]} />
                            <ChartLegend content={<ChartLegendContent />} />
                        </BarChart>
                    </ChartContainer>
                </TabsContent>

                {/* Content Planner Tab - Line Chart */}
                <TabsContent value="tab-3" className="focus:outline-none shadow-none">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Content Planning</h3>
                        <p className="text-sm text-muted-foreground">Content performance and reach metrics</p>
                    </div>
                    <ChartContainer config={contentConfig} className="aspect-auto h-[300px] bg-transparent shadow-none w-full">
                        <LineChart
                            data={contentData}
                            margin={{
                                left: 12,
                                right: 12,
                                top: 12,
                                bottom: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Line
                                dataKey="posts"
                                type="monotone"
                                stroke="var(--color-posts)"
                                strokeWidth={1}
                                dot={{ fill: "var(--color-posts)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                dataKey="engagement"
                                type="monotone"
                                stroke="var(--color-engagement)"
                                strokeWidth={1}
                                dot={{ fill: "var(--color-engagement)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                dataKey="reach"
                                type="monotone"
                                stroke="var(--color-reach)"
                                strokeWidth={1}
                                dot={{ fill: "var(--color-reach)", strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                        </LineChart>
                    </ChartContainer>
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default InfluencerChart
