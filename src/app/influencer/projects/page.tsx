'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InfluencerPaymentPage from "@/app/influencer/projects/payment-page"
import InfluencerCampaignTable from "@/app/influencer/projects/campagin-table"

export default function PaymentPage() {
    const projectTabs = [
        { label: "Payments", value: "payments" },
        { label: "Campaigns", value: "campaigns" },
    ]

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Payment Page</h1>
            <Tabs defaultValue="payments" className="w-full">
                <TabsList>
                    {projectTabs.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="payments">
                    <InfluencerPaymentPage />
                </TabsContent>
                <TabsContent value="campaigns">
                    <InfluencerCampaignTable />
                </TabsContent>
            </Tabs>
        </div>
    )
}
