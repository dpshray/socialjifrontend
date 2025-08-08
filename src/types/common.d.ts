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

export interface SocialPlatform {
    name: string
    label: string
}

// export interface SocialProfile {
//     id: number
//     userId: number
//     socialSiteId: number
//     profile_url: string
//     follower_count: number | string
//     following_count: number | string
//     post_count: number
//     avg_like_per_post_count: number
//     avg_comment_per_post_count: number
//     follower_growth_rate_per_week: number
//     highest_like: number
//     lowest_like: number
//     social: SocialPlatform
// }
export interface SocialProfile {
    id: number;
    user_id: number;
    social_site_id: number;
    profile_url: string;
    follower_count: number;
    following_count: number;
    post_count: number;
    avg_like_per_post_count: number;
    avg_comment_per_post_count: number;
    follower_growth_rate_per_week: number;
    highest_like: number;
    lowest_like: number;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
}

export interface Helpfuls {
    upvote: number
    downvote: number
}

export interface Reviewer {
    id: number
    first_name: string
    last_name: string | null
    nick_name: string | null
    image: string
}

export interface Reply {
    id: number
    comment: string
    created_at: string
    author: Reviewer
}

export interface Review {
    review_id: number
    comment: string
    rating: number
    reviewed_at: string
    helpfuls: Helpfuls
    reviewer: Reviewer
    replies?: Reply[]
}

export interface Tag {
    id: number
    name: string
}

export type ReviewType = 'positive' | 'negative' | 'neutral' | 'pending'
export type StatusType = 'active' | 'inactive' | 'pending' | 'rejected' | 'draft' | 'published'
