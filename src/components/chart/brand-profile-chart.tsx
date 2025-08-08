"use client";

import { Bar, BarChart as RechartsBarChart, CartesianGrid, LabelList, XAxis, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface ChartDataItem {
    month: string;
    visits: number;
}

interface ChartConfig {
    visits: {
        label: string;
        color: string;
    };
}

export function BrandProfileChart() {
    const chartData: ChartDataItem[] = [
        { month: "January", visits: 186 },
        { month: "February", visits: 305 },
        { month: "March", visits: 237 },
        { month: "April", visits: 73 },
        { month: "May", visits: 209 },
        { month: "June", visits: 214 },
    ];

    const barColors: string[] = [
        "hsl(210 40% 96.1%)",
        "hsl(142.1 76.2% 36.3%)",
        "hsl(24.6 95% 53.1%)",
        "hsl(0 84.2% 60.2%)",
        "hsl(262.1 83.3% 57.8%)",
        "hsl(47.9 95.8% 53.1%)",
    ];

    const chartConfig: ChartConfig = {
        visits: {
            label: "Visits",
            color: "hsl(var(--primary))",
        },
    };

    return (
        <Card className="border-0 shadow-none">
            <CardContent className="p-6">
                <ChartContainer config={chartConfig as any}>
                    <RechartsBarChart data={chartData} margin={{ top: 20 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={6}
                            axisLine={false}
                            tickFormatter={(value: string) => value.slice(0, 3)}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="visits" radius={8}>
                            {chartData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                            ))}
                            <LabelList position="top" offset={8} className="fill-foreground" fontSize={12} />
                        </Bar>
                    </RechartsBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    );
}
