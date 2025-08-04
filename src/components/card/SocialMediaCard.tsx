import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface SocialMediaCardProps {
    platform: string;
    title: string;
    link: string;
    followerCount: number;
    followingCount: number;
    postCount: number;
    avgLikePerPost: number;
    avgCommentPerPost: number;
    followerGrowthRate: number;
    highestLike: number;
    lowestLike: number;
    image?: string;
}

const platformColors: Record<string, string> = {
    instagram: "bg-gradient-to-r from-purple-500 to-pink-500",
    facebook: "bg-blue-600",
    tiktok: "bg-black",
    twitter: "bg-blue-400",
    youtube: "bg-red-600",
};

const platformIcons: Record<string, string> = {
    instagram: "📷",
    facebook: "👥",
    tiktok: "🎵",
    twitter: "🐦",
    youtube: "📺",
};

const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toLocaleString();
};

export function SocialMediaCard({
                                    platform,
                                    title,
                                    link,
                                    followerCount,
                                    followingCount,
                                    postCount,
                                    avgLikePerPost,
                                    avgCommentPerPost,
                                    followerGrowthRate,
                                    highestLike,
                                    lowestLike,
                                    image,
                                }: SocialMediaCardProps) {
    const platformColor = platformColors[platform] || "bg-gray-600";
    const platformIcon = platformIcons[platform] || "📱";

    return (
        <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {image ? (
                            <Image
                                src={image}
                                alt={`${title} profile`}
                                width={40}
                                height={40}
                                className="rounded-lg object-cover w-10 h-10"
                            />
                        ) : (
                            <div
                                className={`w-10 h-10 rounded-lg ${platformColor} flex items-center justify-center text-white text-lg`}
                                aria-hidden="true"
                            >
                                {platformIcon}
                            </div>
                        )}
                        <div>
                            <CardTitle className="text-base sm:text-lg text-muted-foreground font-semibold">
                                {title}
                            </CardTitle>
                            <Link
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${title} profile on ${platform}`}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                                View Profile <ExternalLink className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-muted-foreground">
                    <div>
                        <div className="text-lg font-bold text-gray-900">{formatNumber(followerCount)}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-gray-900">{formatNumber(followingCount)}</div>
                        <div className="text-xs text-gray-500">Following</div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-lg font-bold text-gray-900">{formatNumber(postCount)}</div>
                        <div className="text-xs text-gray-500">Posts</div>
                    </div>
                </div>

                <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Heart className="w-3 h-3" /> Avg Likes
            </span>
                        <span className="font-medium">{formatNumber(avgLikePerPost)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Avg Comments
            </span>
                        <span className="font-medium">{formatNumber(avgCommentPerPost)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> Growth/Week
            </span>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                            +{formatNumber(followerGrowthRate)}
                        </Badge>
                    </div>
                </div>

                <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500 mb-1">Like Range</div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Low: {formatNumber(lowestLike)}</span>
                        <span className="text-gray-600">High: {formatNumber(highestLike)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
