'use client';

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

export default function SkeletonInfluencerProfile() {
    return (
        <div className="p-4 sm:p-8 space-y-8 bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-full animate-pulse">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <Skeleton className="w-24 h-24 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-48" />
                            <div className="flex gap-2">
                                <Skeleton className="h-5 w-20 rounded-full" />
                                <Skeleton className="h-5 w-24 rounded-full" />
                            </div>
                            <div className="flex gap-4">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-10 w-28 rounded-lg" />
                        <Skeleton className="h-10 w-36 rounded-lg" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="border-0 shadow-lg">
                        <CardContent className="p-6 space-y-3">
                            <Skeleton className="w-12 h-12 rounded-xl" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-3 w-28" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-5 bg-slate-50 rounded-xl p-1">
                        {["overview", "analytics", "campaigns", "audience", "reviews"].map((tab) => (
                            <TabsTrigger key={tab} value={tab} disabled>
                                <Skeleton className="h-8 w-full" />
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="border-0 shadow-none bg-white">
                                <CardHeader className="pb-4">
                                    <Skeleton className="h-5 w-40" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-4 w-48" />
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-4 w-36" />
                                    <Separator />
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-2 w-full rounded-lg bg-slate-200" />
                                    <Skeleton className="h-3 w-48" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Skeleton className="h-16 rounded-xl" />
                                        <Skeleton className="h-16 rounded-xl" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="lg:col-span-2 border-0 shadow-none bg-white">
                                <CardHeader className="pb-4">
                                    <Skeleton className="h-5 w-48" />
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton key={i} className="h-40 w-full rounded-xl" />
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
