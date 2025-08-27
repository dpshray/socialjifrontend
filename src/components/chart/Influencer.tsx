"use client"

import type React from "react"
import {HomeIcon as HouseIcon, PanelsTopLeftIcon} from "lucide-react"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {cn} from "@/lib/utils"

type Tab = {
    value: string
    label: string
    icon: React.ComponentType<{ size?: number; className?: string }>
}

const tabsData: Tab[] = [
    {value: "gigs", label: "Gigs", icon: PanelsTopLeftIcon},
    {value: "campaigns", label: "Campaigns", icon: HouseIcon},
]

const gigsConfig = {
    gigs: {label: "Gigs Published", color: "#6C5DD3"},
}

const campaignConfig = {
    campaigns: {label: "Campaigns Published", color: "#BE50C8"},
}

interface InfluencerChartProps {
    gigsData: {month: string; gigs: number}[]
    campaignData: {month: string; campaigns: number}[]
    className?: string
}

const InfluencerChart: React.FC<InfluencerChartProps> = ({gigsData, campaignData, className}) => {
    return (
        <section className={cn("w-full rounded-xl bg-transparent shadow-none", className)} aria-label="Influencers Analytics">
            <Tabs defaultValue="gigs" className="w-full px-4 pt-4">
                <ScrollArea className="w-full">
                    <TabsList
                        className={cn(
                            "mb-4 flex w-fit items-center gap-2 rounded-lg border border-[#BE50C8] bg-background p-1"
                        )}
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
                                    "cursor-pointer"
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
                    <ScrollBar orientation="horizontal" className="h-1.5"/>
                </ScrollArea>

                <TabsContent value="gigs" className="focus:outline-none shadow-none">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Gigs Published</h3>
                        <p className="text-sm text-muted-foreground">Monthly gigs published this year</p>
                    </div>
                    <ChartContainer config={gigsConfig}
                                    className="aspect-auto h-[300px] w-full bg-transparent shadow-none">
                        <LineChart data={gigsData}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}/>
                            <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line"/>}/>
                            <Line
                                dataKey="gigs"
                                type="monotone"
                                stroke="var(--color-gigs)"
                                strokeWidth={2}
                                dot={{fill: "var(--color-gigs)", r: 4}}
                                activeDot={{r: 6}}
                            />
                            <ChartLegend content={<ChartLegendContent/>}/>
                        </LineChart>
                    </ChartContainer>
                </TabsContent>

                <TabsContent value="campaigns" className="focus:outline-none shadow-none">
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold">Campaigns Published</h3>
                        <p className="text-sm text-muted-foreground">Monthly campaigns published this year</p>
                    </div>
                    <ChartContainer config={campaignConfig}
                                    className="aspect-auto h-[300px] w-full bg-transparent shadow-none">
                        <BarChart data={campaignData}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8}/>
                            <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed"/>}/>
                            <Bar dataKey="campaigns" fill="var(--color-campaigns)" radius={[4, 4, 0, 0]}/>
                            <ChartLegend content={<ChartLegendContent/>}/>
                        </BarChart>
                    </ChartContainer>
                </TabsContent>
            </Tabs>
        </section>
    )
}

export default InfluencerChart
