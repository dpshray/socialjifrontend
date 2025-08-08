"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Tag } from 'lucide-react'
import { useEffect, useState } from "react"
import dashboardService from "@/services/dashboardService"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface BrandCategory {
    id: number;
    name: string;
    slug: string;
    brand_count: number;
}

export function InsightsCategoryGraph() {
    const [brandCategories, setBrandCategories] = useState<BrandCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const params = {
                    per_page: 10,
                    page: 1,
                };
                const response = await dashboardService.getTopCategories(params);
                setBrandCategories(response.data);
            } catch (err) {
                setError("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <Card className="glass-card border-0">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                        <Tag className="w-5 h-5 text-purple-600" />
                        <span>Brand Categories</span>
                    </CardTitle>
                    <CardDescription>Distribution of brands across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64">
                        Loading categories...
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="glass-card border-0">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2">
                        <Tag className="w-5 h-5 text-purple-600" />
                        <span>Brand Categories</span>
                    </CardTitle>
                    <CardDescription>Distribution of brands across different categories</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64 text-red-500">
                        {error}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="glass-card border-0">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                    <Tag className="w-5 h-5 text-purple-600" />
                    <span>Brand Categories</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Distribution of brands across different categories</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={{
                        brand_count: {
                            label: "Brand Count",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="h-[320px]"
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            accessibilityLayer
                            data={brandCategories}
                            layout="vertical"
                            margin={{ left: 10, right: 16 }}
                        >
                            <CartesianGrid horizontal={false} stroke="#f1f5f9" />
                            <YAxis
                                dataKey="name"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                className="text-slate-700"
                                fontSize={12}
                                width={120}
                            />
                            <XAxis dataKey="brand_count" type="number" hide />
                            <Tooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="brand_count" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                                <LabelList
                                    dataKey="name"
                                    position="insideLeft"
                                    offset={8}
                                    className="fill-white font-medium"
                                    fontSize={12}
                                />
                                <LabelList
                                    dataKey="brand_count"
                                    position="right"
                                    offset={8}
                                    className="fill-slate-900 font-medium"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
