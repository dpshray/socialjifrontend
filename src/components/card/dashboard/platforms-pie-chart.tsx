"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip} from "recharts";
import {Users} from 'lucide-react';
import {useEffect, useState} from "react";
import dashboardService from "@/services/dashboardService";

interface MonthlyInfluencerGrowth {
    month_number: number;
    total_user: number;
}

const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const PIE_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6B6B", "#6BFF6B", "#6B6BFF"];

export function PlatformsPieChart() {
    const [growthData, setGrowthData] = useState<MonthlyInfluencerGrowth[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await dashboardService.getPlatformPieChart();
                console.log('Response from getPlatformPieChart:', response.data);
                setGrowthData(response.data);
            } catch (err) {
                console.error("Error fetching monthly influencer growth data:", err);
                setError("Failed to load new influencer growth data.");
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
                        <Users className="w-5 h-5 text-blue-600"/>
                        <span>New Influencer Growth</span>
                    </CardTitle>
                    <CardDescription>Number of new influencers joining each month</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64 text-gray-500">
                        Loading new influencer data...
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
                        <Users className="w-5 h-5 text-blue-600"/>
                        <span>New Influencer Growth</span>
                    </CardTitle>
                    <CardDescription>Number of new influencers joining each month</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64 text-red-500">
                        {error}
                    </div>
                </CardContent>
            </Card>
        );
    }

    const formattedData = growthData.map(item => ({
        ...item,
        month_name: monthNames[item.month_number - 1]
    }));

    return (
        <Card className="w-full bg-white/30 backdrop-blur-md shadow-lg rounded-xl border-0">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-slate-900">
                    <Users className="w-5 h-5 text-blue-600"/>
                    <span>New Influencer Growth</span>
                </CardTitle>
                <CardDescription className="text-slate-600">Number of new influencers joining each
                    month</CardDescription>
            </CardHeader>
            <CardContent className={'flex flex-col gap-8'}>
                {/* Pie Chart */}
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Distribution by Month</h3>
                    <ResponsiveContainer width="100%" height={320}>
                        <RechartsPieChart>
                            <Pie
                                data={formattedData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="total_user"
                                label={({month_name}) => month_name}
                                labelLine={false}
                            >
                                {formattedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]}/>
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                                    border: "none",
                                    borderRadius: "12px",
                                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                                }}
                                formatter={(value: number, name: string, props: any) => [`${value} users`, props.payload.month_name]}
                            />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4 text-slate-800">Monthly Trend</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {
                            growthData.length > 0 && growthData.map((item) => (
                                <div key={item.month_number}
                                     className="flex items-center p-2 rounded-md bg-white/60 shadow-sm">
                                    <div className="w-3 h-3 rounded-full mr-2 shrink-0"
                                         style={{backgroundColor: PIE_COLORS[item.month_number - 1]}}/>
                                    <span className="text-sm text-slate-700">{monthNames[item.month_number - 1]}: <span
                                        className="font-medium">{item.total_user} users</span></span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-slate-600">
                    <span className="font-semibold">Note:</span> This chart represents the number of new influencers
                    joining each month.
                </p>
            </CardFooter>
        </Card>
    );
}
