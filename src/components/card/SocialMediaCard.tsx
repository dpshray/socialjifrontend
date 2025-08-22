import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ExternalLink, Heart, MessageSquare, TrendingUp} from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import {formatCompactNumber} from "@/lib/utils";

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

export function SocialProfileCard({
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
    const platformColor = "bg-gray-600";
    const platformIcon = "📱";

    return (
        <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {image ? (
                            <Image
                                src={image || "/placeholder.svg"}
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
                            <CardTitle className="text-base sm:text-lg text-foreground font-semibold">
                                {title}
                            </CardTitle>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${title} profile on ${platform}`}
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                                View Profile <ExternalLink className="w-3 h-3"/>
                            </a>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-muted-foreground">
                    <div>
                        <div className="text-lg font-bold text-gray-900">{formatCompactNumber(followerCount)}</div>
                        <div className="text-xs text-gray-500">Followers</div>
                    </div>
                    <div>
                        <div className="text-lg font-bold text-gray-900">{formatCompactNumber(followingCount)}</div>
                        <div className="text-xs text-gray-500">Following</div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="text-lg font-bold text-gray-900">{formatCompactNumber(postCount)}</div>
                        <div className="text-xs text-gray-500">Posts</div>
                    </div>
                </div>
                <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                            <Heart className="w-3 h-3"/> Avg Likes
                        </span>
                        <span className="font-medium">{formatCompactNumber(avgLikePerPost)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                            <MessageSquare className="w-3 h-3"/> Avg Comments
                        </span>
                        <span className="font-medium">{formatCompactNumber(avgCommentPerPost)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3"/> Growth/Week
                        </span>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                            +{formatCompactNumber(followerGrowthRate)}
                        </Badge>
                    </div>
                </div>
                <div className="pt-2 border-t">
                    <div className="text-xs text-gray-500 mb-1">Like Range</div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Low: {formatCompactNumber(lowestLike)}</span>
                        <span className="text-gray-600">High: {formatCompactNumber(highestLike)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
