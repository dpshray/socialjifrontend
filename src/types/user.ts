export interface SocialPlatform {
    name: string;
    label: string;
}

export interface SocialProfile {
    profile_url: string;
    follower_count: number | string;
    following_count: number | string;
    post_count: number;
    avg_like_per_post_count: number;
    avg_comment_per_post_count: number;
    follower_growth_rate_per_week: number;
    highest_like: number;
    lowest_like: number;
    social: SocialPlatform;
}

export interface User {
    id: number;
    nick_name: string;
    image: string;
    roles: string;
    influencer_rating: number;
    social_profiles: SocialProfile[];
}
