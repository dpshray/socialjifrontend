export interface Currency {
    id: number;
    name: string;
    code: string;
    symbol: string;
}

export interface Pricing {
    id: number;
    label: string;
    price: string;
    delivery_time: string;
    description: string;
    requirement: string;
    currency: Currency;
}

export interface Helpfuls {
    upvote: number;
    downvote: number;
}

export interface Reviewer {
    id: number;
    first_name: string;
    last_name: string | null;
    nick_name: string | null;
    image: string;
}

export interface Reply {
    id: number;
    comment: string;
    created_at: string;
    author: Reviewer;
}

export interface Review {
    review_id: number;
    comment: string;
    rating: number;
    reviewed_at: string;
    helpfuls: Helpfuls;
    reviewer: Reviewer;
    replies?: Reply[];
}

export interface User {
    id: number;
    nick_name: string;
    middle_name: string;
    about: string;
    first_name: string;
    last_name: string;
    image: string;
    influencer_rating: number;
    follower_count: number;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Gig {
    id: number;
    title: string;
    category: string;
    description: string;
    requirements: string;
    features: string;
    published_at: string;
    image: string;
    pricings: Pricing[];
    user: User;
    reviews: Review[];
    status: string;
    created_at: string;
    updated_at: string;
    tags: Tag[];
    follower_count: number;
}
