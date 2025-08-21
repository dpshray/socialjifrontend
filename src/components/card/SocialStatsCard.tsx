"use client";

import React from "react";
import {Heart, MessageSquare, Users} from "lucide-react";
import {formatCompactNumber} from "@/lib/utils";

interface SocialProfile {
    follower_count: number;
    post_count: number;
    avg_like_per_post_count: number;
    avg_comment_per_post_count: number;
}

interface StatItem {
    title: string;
    value: number;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
    isLoading: boolean;
}

interface SocialStatsCardProps {
    socialProfiles: SocialProfile[] | undefined;
    loading: boolean;
}


export function SocialStatsCard({socialProfiles, loading}: SocialStatsCardProps) {
    const calculateStats = React.useMemo<StatItem[]>(() => {
        if (!socialProfiles || socialProfiles.length === 0) return [];

        const totalFollowers = socialProfiles.reduce((sum, p) => sum + Number(p.follower_count), 0);
        const totalPosts = socialProfiles.reduce((sum, p) => sum + p.post_count, 0);
        const avgEngagement =
            socialProfiles.reduce(
                (sum, p) => sum + (p.avg_like_per_post_count + p.avg_comment_per_post_count),
                0,
            ) / socialProfiles.length;

        return [
            {
                title: "Total Followers",
                value: totalFollowers,
                description: "Across all platforms",
                icon: <Users className="w-6 h-6 text-white"/>,
                colorClass: "bg-blue-500",
                isLoading: loading,
            },
            {
                title: "Total Posts",
                value: totalPosts,
                description: "Across all platforms",
                icon: <MessageSquare className="w-6 h-6 text-white"/>,
                colorClass: "bg-purple-500",
                isLoading: loading,
            },
            {
                title: "Avg Engagement",
                value: Math.round(avgEngagement),
                description: "Per post",
                icon: <Heart className="w-6 h-6 text-white"/>,
                colorClass: "bg-red-500",
                isLoading: loading,
            },
        ];
    }, [socialProfiles, loading]);

    if (calculateStats.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {calculateStats.map((stat) => (
                <div
                    key={stat.title}
                    className={`${stat.colorClass} rounded-lg p-6 flex items-center space-x-4 shadow-lg`}
                >
                    <div className="p-3 rounded-full bg-white/30">{stat.icon}</div>
                    <div>
                        <p className="text-white font-semibold text-lg">{stat.title}</p>
                        <p className="text-white text-2xl font-bold">
                            {stat.isLoading ? "..." : formatCompactNumber(stat.value)}
                        </p>
                        <p className="text-white/80 text-sm">{stat.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
