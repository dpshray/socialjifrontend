import { Pricing, Review, Tag } from '@/types/common'


export interface GigUser {
    id: number
    nick_name: string
    middle_name: string
    about: string
    first_name: string
    last_name: string
    image: string
    influencer_rating: number
    follower_count: number
}

export interface Gig {
    id: number
    title: string
    category: string
    description: string
    requirements: string
    features: string
    published_at: string
    image: string
    pricings: Pricing[]
    user: GigUser
    reviews: Review[]
    status: string
    created_at: string
    updated_at: string
    tags: Tag[]
    follower_count: number
}

export type GigInsight = {
    id: number
    title: string
    category: string
    published_at: string
    image: string
    user: {
        id: number
        nick_name: string
        first_name: string
        middle_name?: string
        last_name: string
        image: string
    }
    total_reviews: number
    item_sold: number
    pricings: Pricing[]
}
