'use client'

import {useEffect, useState} from "react"
import {usePathname, useRouter} from "next/navigation"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Calendar, DollarSign, Users} from "lucide-react"
import InfluencerCampaignTable from "@/app/influencer/projects/campagin-table"
import InfluencerAssignProject from "@/app/influencer/projects/influencer-project"
import InfluencerPaymentPage from "@/app/influencer/projects/payment-page";

export default function ProjectPaymentPage() {
    const router = useRouter()
    const pathname = usePathname()
    const [activeTab, setActiveTab] = useState("payments")

    const projectTabs = [
        {
            icon: DollarSign,
            label: "Payments",
            value: "campaigns",
            href: "/influencer/projects",
            component: <InfluencerPaymentPage/>
        },
        {
            icon: Calendar,
            label: "Campaigns",
            value: "campaigns-page",
            component: <InfluencerCampaignTable/>
        },
        {
            icon: Users,
            label: "Assign Project",
            value: "assign-project",
            component: <InfluencerAssignProject/>
        }
    ]

    useEffect(() => {
        if (pathname === "/influencer/projects") {
            setActiveTab("campaigns")
        } else {
            const matchedTab = projectTabs.find(tab => tab.href === pathname)
            if (matchedTab) setActiveTab(matchedTab.value)
        }
    }, [pathname])

    const handleTabChange = (value: string) => {
        setActiveTab(value)
        const tab = projectTabs.find(t => t.value === value)
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                Project Payment Page
            </h1>

            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="bg-muted rounded-lg p-1 mb-4">
                    {projectTabs.map(tab => (
                        <TabsTrigger
                            key={tab.value}
                            value={tab.value}
                            className="flex items-center gap-2 text-sm md:text-base font-medium rounded-md hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white transition-colors duration-200"
                        >
                            <tab.icon className="w-4 h-4"/>
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {projectTabs.map(tab => (
                    <TabsContent
                        key={tab.value}
                        value={tab.value}
                        className="bg-card rounded-lg p-4 shadow-inner"
                    >
                        {tab.component}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
