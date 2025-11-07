"use client"

import React, { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { CreditCard, TrendingUp } from "lucide-react"
import CampaignBrandPayment from "@/app/brand/payments/campaign-brand-payment"
import BrandPaymentTable from "@/app/brand/payments/brand-payment"

export default function BrandPaymentPage() {
    const tabs = [
        {
            value: "brand-payment",
            label: "Brand Payment",
            icon: CreditCard,
            component: <BrandPaymentTable />,
        },
        {
            value: "campaign-brand-payment",
            label: "Campaign Brand Payment",
            icon: TrendingUp,
            component: <CampaignBrandPayment />,
        },
    ]

    const [tabValue, setTabValue] = useState(tabs[0].value)

    return (
        <div className="min-h-screen ">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                        Payment Management
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Track and manage all your brand payments and campaigns
                    </p>
                </div>

                <Tabs value={tabValue} onValueChange={setTabValue} className="space-y-6">
                    <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 p-1 shadow-sm border border-slate-200 dark:border-slate-700">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="inline-flex items-center gap-2 px-6 py-2 rounded-md transition-all data-[state=active]:bg-slate-900 dark:data-[state=active]:bg-slate-700 data-[state=active]:text-white data-[state=active]:shadow-md"
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </TabsTrigger>
                            )
                        })}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent
                            key={tab.value}
                            value={tab.value}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 transition-all duration-300 animate-in fade-in-50"
                        >
                            {tab.component}
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    )
}