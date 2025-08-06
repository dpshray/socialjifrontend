import { SocialProfile } from '@/types/common'

export interface GigStats {
    total: number
    published: number
    gigs_sold_count: number
    top_selling_gig: {
        id: number
        title: string
        category: string
        description: string
        requirements: string
        features: string
        published_at: string
        image: string
        pricings: {
            id: number
            label: string
            price: string
            delivery_time: string
            description: string
            requirement: string
            currency: {
                id: number
                name: string
                code: string
                symbol: string
            }
        }[]
        tags: {
            id: number
            name: string
        }[]
        user: {
            id: number
            nick_name: string
            first_name: string
            middle_name?: string
            last_name: string
            email: string
            about: string
        }
        reviews: {
            review_id: number
            comment: string
            rating: number
            reviewed_at: string
            helpfuls: {
                upvote: number
                downvote: number
            }
            reviewer: {
                id: number
                first_name: string
                last_name: string | null
                nick_name: string | null
                image: string
            }
            replies?: {
                id: number
                comment: string
                created_at: string
                author: {
                    id: number
                    first_name: string
                    last_name: string | null
                    nick_name: string | null
                    image: string
                }
            }[]
        }[]
    }
}

export interface Influencers {
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


export type InfluencerTable = {
    id: number
    first_name: string
    middle_name?: string
    last_name: string
    nick_name: string
    email: string
    total_gigs: number
    image: string
    rating: number
    social_profiles: SocialProfile[]
    highest_price_gig: string
    lowest_price_gig: string
}
