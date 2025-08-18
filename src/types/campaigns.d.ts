export interface Campaign {
    id: number
    brand_id: number
    title: string
    description: string
    categories: string
    eligibility: string
    requirement: string
    price: number
    image?: string
    created_at: string
    updated_at: string
    status: "active" | "draft" | "completed" | "paused"
    applications: number
    brand_name: string
    deadline: string
}

export interface CampaignFormData {
    title: string
    description: string
    categories: string
    eligibility: string
    requirement: string
    price: number
    image?: File | string
}

export interface CampaignFilters {
    searchTerm: string
    status: string
}

export interface CampaignStats {
    activeCampaigns: number
    totalApplications: number
    totalBudget: string
    avgConversion: string
}
