"use client";

import {ChevronLeft, ChevronRight, Star} from "lucide-react";
import {useEffect, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Progress} from "@/components/ui/progress";
import {reviewsService} from "@/services/reviewsService";
import {Review, ReviewInfluencerCard} from "@/app/influencer/reviews/review-card";

interface RatingCount {
    no_of_user_count: number;
    rating: number;
}

const RatingBar = ({label, percentage}: { label: string; percentage: number }) => (
    <div className="flex items-center gap-2">
        <span className="text-sm w-12">{label} star</span>
        <Progress className={cn("[&>div]:bg-amber-500")} value={percentage}/>
    </div>
);

export default function InfluencerReviews() {
    const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [ratingCounts, setRatingCounts] = useState<RatingCount[]>([]);

    const handleNext = () => {
        if ((currentPage + 1) * reviewsPerPage < reviews.length) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const getAllReviews = async () => {
            const response = await reviewsService.getAllReview();
            if (response) {
                const reviewData = response.review_list?.data || [];
                const ratingData = response.user_rating_count || [];
                setReviews(reviewData);
                setRatingCounts(ratingData);
                console.log(' Re')
            }
        };
        getAllReviews();
    }, []);

    const totalRatings = useMemo(() => ratingCounts.reduce((acc, r) => acc + r.no_of_user_count, 0), [ratingCounts]);

    const averageRating = useMemo(() => {
        if (totalRatings === 0) return 0;
        const totalScore = ratingCounts.reduce((acc, r) => acc + r.rating * r.no_of_user_count, 0);
        return Number((totalScore / totalRatings).toFixed(1));
    }, [ratingCounts, totalRatings]);

    const currentReviews = useMemo(() => {
        if (showAllReviews) return reviews;
        const start = currentPage * reviewsPerPage;
        return reviews.slice(start, start + reviewsPerPage);
    }, [reviews, currentPage, showAllReviews]);

    return (
        <section className="px-6 container mx-auto">
            <div className="mb-3">
                <h2 className="text-2xl font-semibold">Reviews</h2>
            </div>

            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold">Total reviews</h2>
                <div className="flex justify-center items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-[#FFB400] fill-yellow-500"/>
                    ))}
                    <p className="text-lg font-montserrat font-medium">{averageRating} out of 5</p>
                </div>
                <p className="text-gray-500 text-sm">{totalRatings} global ratings</p>
            </div>

            <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingCounts.find((r) => r.rating === star)?.no_of_user_count || 0;
                    const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                    return <RatingBar key={star} label={star.toString()} percentage={percentage}/>;
                })}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-8 mb-4 gap-3">
                <h3 className="text-lg font-semibold">What people loved about this freelancer</h3>
                <div className="flex flex-col items-end">
                    <button
                        className="text-purple-600 hover:underline text-sm font-medium my-1"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                        {showAllReviews ? "Hide All Reviews" : "See All Reviews"}
                    </button>
                    {!showAllReviews && (
                        <div className="flex gap-2">
                            <Button
                                onClick={handlePrev}
                                size="icon"
                                variant="outline"
                                disabled={currentPage === 0}
                                className={cn("border-none shadow-none")}
                            >
                                <ChevronLeft/>
                            </Button>
                            <Button
                                onClick={handleNext}
                                size="icon"
                                variant="outline"
                                disabled={(currentPage + 1) * reviewsPerPage >= reviews.length}
                                className={cn("border-none shadow-none")}
                            >
                                <ChevronRight/>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-4">
                {currentReviews.map((review, index) => (
                    <ReviewInfluencerCard review={review as any} key={index}/>
                ))}
            </div>
        </section>
    );
}
