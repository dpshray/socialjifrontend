export interface Helpfuls {
    upvote: number;
    downvote: number;
}

export interface Reviewer {
    id: number;
    nick_name: string | null;
    image: string;
}

export interface ReviewProps {
    review_id: number;
    comment: string;
    rating: number;
    reviewed_at: string;
    helpfuls: Helpfuls;
    reviewer: Reviewer;
}
export type ReviewList = ReviewProps[];
