interface Tag {
    id: number
    name: string
}


interface Campaign {
    id: number
    title: string
    description: string
    categories: string
    eligibility: string
    requirement: string
    price: string
    tags: Tag[]
    image: string
}

export interface CampaignFormData {
    title: string
    description: string
    categories: string
    eligibility: string
    requirement: string
    price: string | number
    tags?: Tag[]
    image?: any
}