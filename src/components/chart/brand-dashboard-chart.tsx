"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { brandService } from "@/services/brand.service";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type GigData = {
    month: number;
    gig_sold?: number;
    total?: number;
};

const chartConfig = {
    desktop: {
        label: "This Year",
        color: "hsl(var(--gray-200))",
    },
};

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function mapDataToChart(data: GigData[] = [], key: keyof GigData) {
    return data.map((item) => ({
        month: monthNames[(item.month || 1) - 1] ?? "",
        desktop: item[key] ?? 0,
    }));
}

export default function BrandDashboardChart() {
    const [activeTab, setActiveTab] = useState("tab-1");
    const [gigChartData, setGigChartData] = useState<{ month: string; desktop: number }[]>([]);
    const [campaignChartData, setCampaignChartData] = useState<{ month: string; desktop: number }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await brandService.brandDashboard();
                setGigChartData(mapDataToChart(response?.gig_brought_on_current_year || [], "gig_sold"));
                setCampaignChartData(mapDataToChart(response?.own_campaign_published_on_current_year || [], "total"));
            } catch (err) {
                console.error("Error fetching brand dashboard data", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const tabOptions = [
        { label: "Gigs Sold", value: "tab-1" },
        { label: "Campaigns", value: "tab-2" },
    ];

    return (
        <div className="w-full p-2 sm:p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList
                    className={cn(
                        "flex flex-wrap w-full justify-start sm:justify-between items-center gap-2 sm:gap-4",
                        "bg-transparent"
                    )}
                >
                    <div className="flex flex-wrap gap-2">
                        {tabOptions.map(({ label, value }) => (
                            <TabsTrigger
                                key={value}
                                value={value}
                                className={cn(
                                    "rounded-full px-4 py-1 text-sm sm:text-base font-medium transition-colors",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                )}
                            >
                                {label}
                            </TabsTrigger>
                        ))}
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-xs font-medium">
                        <p className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
                            <span className="h-2 w-2 rounded-full bg-primary" />
                            This Year
                        </p>
                        <p className="flex items-center gap-1 text-gray-400">
                            <span className="h-2 w-2 rounded-full bg-muted" />
                            Last Year
                        </p>
                    </div>
                </TabsList>

                <TabsContent value="tab-1" className="w-full min-h-[240px] sm:min-h-[320px] px-2 py-4 sm:px-6">
                    {loading ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">Loading Gig Data...</p>
                    ) : gigChartData.length > 0 ? (
                        <ChartContainer config={chartConfig} className="h-[240px] sm:h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={gigChartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={12}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                    <Area
                                        dataKey="desktop"
                                        type="natural"
                                        stroke="hsl(var(--primary))"
                                        fill="hsl(var(--primary))"
                                        fillOpacity={0.3}
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">No Gig Data Available</p>
                    )}
                </TabsContent>

                <TabsContent value="tab-2" className="w-full min-h-[240px] sm:min-h-[320px] px-2 py-4 sm:px-6">
                    {loading ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">Loading Campaign Data...</p>
                    ) : campaignChartData.length > 0 ? (
                        <ChartContainer config={chartConfig} className="h-[240px] sm:h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={campaignChartData} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={12}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="desktop" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">No Campaign Data Available</p>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
