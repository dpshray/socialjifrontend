"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Reviewer {
    id: number;
    nick_name?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    image?: string;
}

export interface Review {
    review_id: number;
    comment?: string;
    rating: number;
    reviewed_at: string;
    reviewer?: Reviewer;
}

interface ReviewCardProps {
    review: Review;
}

export function ReviewInfluencerCard({ review }: ReviewCardProps) {
    const {
        rating,
        reviewed_at,
        reviewer,
    } = review;

    const nick_name = reviewer?.nick_name ?? "";
    const first_name = reviewer?.first_name ?? "";
    const middle_name = reviewer?.middle_name ?? "";
    const last_name = reviewer?.last_name ?? "";
    const image = reviewer?.image;

    const fullName = [first_name, middle_name, last_name].filter(Boolean).join(" ");

    return (
        <Card className={cn("w-full p-3 gap-2")}>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-6">
                <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        {image ? (
                            <AvatarImage src={image} alt={nick_name || fullName} />
                        ) : (
                            <AvatarFallback>{nick_name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
                        )}
                    </Avatar>
                    <div>
                        <CardTitle className="text-lg font-semibold text-slate-900 leading-tight">
                            {fullName || nick_name}
                        </CardTitle>
                        <p className="text-sm text-slate-500">@{nick_name}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                            <Star
                                key={idx}
                                className={`w-5 h-5 ${
                                    idx < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                    <Badge variant="outline" className="px-3 py-1 text-sm">
                        {reviewed_at}
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>{review.comment && <p className="text-slate-700">{review.comment}</p>}</CardContent>
        </Card>
    );
}
