"use client";

import React from "react";
import {Card} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Skeleton} from "@/components/ui/skeleton";

const GigFormSkeleton: React.FC = () => {
    return (
        <form className="space-y-6 w-full animate-pulse" aria-busy="true" aria-label="Loading gig form">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 p-6 border-b border-gray-200 flex items-center justify-between">
                    <div className="space-y-2 max-w-lg w-full">
                        <Skeleton className="h-8 w-56 rounded-lg"/>
                        <Skeleton className="h-4 w-40 rounded-lg"/>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-full">
                        <Skeleton className="h-4 w-4 rounded-full"/>
                        <Skeleton className="h-4 w-20 rounded"/>
                    </div>
                </div>

                {/* Body */}
                <div className="p-8 space-y-8">
                    {/* Basic Information */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full"/>
                            <Skeleton className="h-6 w-40 rounded-md"/>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton className="h-10 rounded-md"/>
                            <Skeleton className="h-10 rounded-md"/>
                        </div>

                        <Skeleton className="h-32 rounded-md"/>
                    </div>

                    <Separator/>

                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full"/>
                            <Skeleton className="h-6 w-40 rounded-md"/>
                        </div>
                        <Skeleton className="h-6 max-w-lg rounded-md"/>
                        <Skeleton className="h-12 w-[70%] rounded-md"/>
                        <div className="flex items-center space-x-2">
                            <Skeleton className="w-16 h-16 rounded-md"/>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full"/>
                            <Skeleton className="h-6 w-40 rounded-md"/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Skeleton className="h-10 rounded-md"/>
                            <Skeleton className="h-10 rounded-md"/>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full"/>
                            <Skeleton className="h-6 w-40 rounded-md"/>
                        </div>
                        <Skeleton className="h-10 rounded-md w-full max-w-md"/>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-6 w-20 rounded-full"/>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Tiers */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-full"/>
                            <Skeleton className="h-6 w-40 rounded-md"/>
                        </div>
                        <Skeleton className="h-5 max-w-lg rounded-md"/>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-24 rounded-md"/>
                            ))}
                        </div>
                        <Tabs value="1" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 gap-2 mb-4">
                                {[1, 2, 3].map((i) => (
                                    <TabsTrigger key={i} value={String(i)}>
                                        <Skeleton className="h-8 w-full rounded-md"/>
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            {[1, 2, 3].map((i) => (
                                <TabsContent key={i} value={String(i)} className="mt-4">
                                    <div className="space-y-4 p-4 rounded-xl bg-muted/50 border border-muted">
                                        <Skeleton className="h-6 w-48 rounded-md"/>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Skeleton className="h-10 rounded-md"/>
                                            <Skeleton className="h-10 rounded-md"/>
                                        </div>
                                        <Skeleton className="h-20 rounded-md"/>
                                        <Skeleton className="h-10 rounded-md"/>
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <Skeleton className="h-12 w-32 rounded-md"/>
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default GigFormSkeleton;
