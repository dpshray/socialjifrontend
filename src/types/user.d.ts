import {Pricing, Review, SocialProfile, Tag} from '@/types/common'

export interface UserDetails {
    id: number
    nick_name: string
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    about: string
}

export interface User {
    id: number
    nick_name: string
    image: string
    roles: string
    influencer_rating: number
    social_profiles: SocialProfile[]
}

export interface TopSellingGig {
    id: number
    title: string
    category: string
    description: string
    requirements: string
    features: string
    published_at: string
    image: string
    pricings: Pricing[]
    tags: Tag[]
    user: UserDetails
    reviews: Review[]
}
