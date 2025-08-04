'use client';

import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
}

interface PricingItem {
    id: number;
    label: string;
    price: string;
    delivery_time: string;
    description: string;
    requirement: string;
    currency: Currency;
}

interface GigPricingTabProps {
    pricing: PricingItem[] | any
}

export default function GigPricingTab({ pricing }: GigPricingTabProps) {
    const [activeTab, setActiveTab] = React.useState(
        pricing?.[0]?.label.toLowerCase() || "basic"
    );

    if (!pricing || pricing.length === 0) return null;

    return (
        <div className="sticky top-6 w-full">
            <Card className="overflow-hidden mb-6 py-0 rounded-none">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                        {pricing.map((tier:any) => (
                            <TabsTrigger
                                key={tier.id}
                                value={tier.label.toLowerCase()}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                {tier.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {pricing.map((tier:any) => (
                        <TabsContent key={tier.id} value={tier.label.toLowerCase()} className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium uppercase">{tier.label} PACKAGE</h3>
                                <span className="font-semibold text-xl">
                                {tier.currency.symbol}
                                    {parseFloat(tier.price).toLocaleString()}
                             </span>
                            </div>

                            <p className="text-sm font-montserrat capitalize text-gray-600 mb-4">{tier.description}</p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center">
                                    <i className="far fa-clock text-gray-500 " />
                                    <i className="far fa-clock text-gray-500 " />
                                    <span className="text-sm">
                    {format(new Date(tier.delivery_time), "PPPp")}
                  </span>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-sync-alt text-gray-500 " />
                                    <i className="fas fa-sync-alt text-gray-500 " />
                                    <span className="text-sm">Unlimited revisions</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                {[
                                    "Commercial use",
                                    "High-res files",
                                    "Content distribution",
                                    "Professional editing",
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center">
                                        <i className="fas fa-check text-green-500 " />
                                        <i className="fas fa-check text-green-500 " />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white !rounded-button whitespace-nowrap cursor-pointer">
                                Continue <i className="fas fa-arrow-right ml-2" />
                            </Button>
                        </TabsContent>
                    ))}
                </Tabs>
            </Card>

            <div className="p-3 bg-gray-100">
                <Button
                    variant="outline"
                    className="w-full border-gray-300 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
                >
                    Contact Seller
                </Button>
            </div>
        </div>
    );
}




 export function GigPricingTabSkeleton() {
     const tabLabels = ["Basic", "Standard", "Premium"];
    return (
        <div className="sticky top-6 w-full">
            <Card className="overflow-hidden mb-6 py-0 rounded-none">
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-none border-b">
                        {tabLabels.map((label, index) => (
                            <TabsTrigger
                                key={index}
                                value={label.toLowerCase()}
                                className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                                <div className="h-4 w-16 bg-muted rounded-md animate-pulse" />
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabLabels.map((label, index) => (
                        <TabsContent key={index} value={label.toLowerCase()} className="p-4 space-y-5">
                            {/* Title + Price */}
                            <div className="flex justify-between items-center">
                                <div className="h-5 w-32 bg-muted rounded animate-pulse" />
                                <div className="h-6 w-14 bg-muted rounded animate-pulse" />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                                <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                            </div>

                            {/* Delivery + Revision */}
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                                    <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                                    <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                                </div>
                            </div>

                            {/* Features */}
                            <div className="space-y-2">
                                {Array(4)
                                    .fill(0)
                                    .map((_, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="h-4 w-4 bg-muted rounded-full animate-pulse" />
                                            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
                                        </div>
                                    ))}
                            </div>

                            {/* Continue Button Skeleton */}
                            <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                        </TabsContent>
                    ))}
                </Tabs>
            </Card>

            {/* Contact Seller Button Skeleton */}
            <div className="p-3 bg-gray-100">
                <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            </div>
        </div>
    );
}