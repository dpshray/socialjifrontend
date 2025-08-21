'use client'

import {useEffect, useState} from "react"
import campaignService from "@/services/campaign.service"
import {useParams} from "next/navigation"
import type {Campaign} from "@/types/campaigns"

export default function BrandCampaignDetails() {
    const params = useParams()
    const id = Number(params?.id)
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!id || isNaN(id)) return

        const fetchDetails = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await campaignService.getCampaignById(id)
                setCampaign(response)
            } catch (err) {
                setError("Failed to fetch campaign details.")
                console.error("Failed to fetch campaign details", err)
            } finally {
                setLoading(false)
            }
        }
        fetchDetails()
    }, [id])

    if (loading) return <div>Loading campaign details...</div>
    if (error) return <div className="text-red-600">{error}</div>
    if (!campaign) return <div>No campaign found.</div>

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
            <p>{campaign.description}</p>
            {/* Render more campaign details as needed */}
        </div>
    )
}
