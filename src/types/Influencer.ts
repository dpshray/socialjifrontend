import { ReviewType, StatusType } from '@/types/types'

export interface Currency {
    id: number
    name: string
    code: string
    symbol: string
}

export interface Pricing {
    id: number
    label: string
    price: string
    delivery_time: string
    description: string
    requirement: string
    currency: Currency
}

export interface UserDetails {
    id: number
    nick_name: string
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    about: string
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
    tags: string[]
    user: UserDetails
    reviews: ReviewType[]
}

export interface GigStats {
    total: number
    published: number
    gigs_sold_count: number
    top_selling_gig: TopSellingGig
}

export interface Social {
    name: string
    label: string
}

export interface SocialProfile {
    profile_url: string
    follower_count: number
    following_count: number
    post_count: number
    avg_like_per_post_count: number
    avg_comment_per_post_count: number
    follower_growth_rate_per_week: number
    highest_like: number
    lowest_like: number
    social: Social
}

export interface Influencer {
    id: number
    nick_name: string
    first_name: string
    middle_name?: string
    last_name: string
    email: string
    about: string
    image: string
    roles: string
    influencer_rating: number
    social_profiles: SocialProfile[]
    gig: GigStats
}
