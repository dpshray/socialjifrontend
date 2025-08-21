"use client"

import {Card, CardContent} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils"

export function CampaignCardSkeleton() {
    return (
        <Card
            className={cn(
                "bg-white/80 backdrop-blur-sm border shadow-lg animate-pulse py-0"
            )}
        >
            {/* Image placeholder */}
            <div className="relative h-48 overflow-hidden rounded-t-xl bg-slate-200">
                <Skeleton className="absolute inset-0 w-full h-full"/>
            </div>

            <CardContent className="p-8">
                {/* Title and price */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4 rounded-md"/>
                        <Skeleton className="h-4 w-full rounded-md"/>
                    </div>
                    <div className="text-right ml-6 space-y-2">
                        <Skeleton className="h-6 w-20 rounded-md"/>
                        <Skeleton className="h-3 w-16 rounded-md"/>
                    </div>
                </div>

                {/* Categories, Eligibility, Requirements */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16 rounded-md"/>
                        <Skeleton className="h-6 w-full rounded-md"/>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 rounded-md"/>
                        <Skeleton className="h-6 w-full rounded-md"/>
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24 rounded-md"/>
                        <Skeleton className="h-6 w-full rounded-md"/>
                    </div>
                </div>

                {/* Tags */}
                <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-12 rounded-md"/>
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-12 rounded-full"/>
                        <Skeleton className="h-6 w-16 rounded-full"/>
                        <Skeleton className="h-6 w-10 rounded-full"/>
                    </div>
                </div>

                <Separator className="my-6"/>

                {/* Buttons */}
                <div className="flex items-center justify-end space-x-3">
                    <Skeleton className="h-8 w-20 rounded-md"/>
                    <Skeleton className="h-8 w-24 rounded-md"/>
                    <Skeleton className="h-8 w-16 rounded-md"/>
                    <Skeleton className="h-8 w-20 rounded-md"/>
                </div>
            </CardContent>
        </Card>
    )
}
