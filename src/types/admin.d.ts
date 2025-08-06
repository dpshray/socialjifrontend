export interface AdminBrandTable {
    id: number
    first_name: string
    middle_name?: string
    last_name: string
    nick_name: string
    email: string
    image: string
    banner: string
    about: string
    social_profiles: SocialProfile[]
}

export interface AdminPaymentTable {
    price: string
    trustap_charge: string
    currency: string
    gig: {
        id: number
        title: string
        category: string
        published_at: string
        image: string
    }
    price_tier: {
        name: string
        label: string
    }
    buyer: {
        id: number
        nick_name: string
        first_name: string
        image: string
    }
    seller: {
        id: number
        nick_name: string
        first_name: string
        middle_name: string
        last_name: string
        image: string
    } | null
    status: string
    transaction_date: string
}


