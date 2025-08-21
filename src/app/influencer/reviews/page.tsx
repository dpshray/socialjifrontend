'use client'

import {ChevronLeft, ChevronRight, Star} from "lucide-react";
import {useState} from "react";
import {ReviewCard} from "@/components/card/card";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {reviews} from "@/data";
import {Progress} from "@/components/ui/progress";
import {ReviewType} from "@/types/types";


function ProgressBar(props: { percentage: number }) {
    return null;
}

const RatingBar = ({label, percentage}: { label: string; percentage: number }) => (
    <div className="flex items-center gap-2">
        <span className="text-sm w-12">{label} star</span>
        <Progress className={cn('[&>div]:bg-amber-500')} value={percentage}/>

    </div>
);


export default function InfluencerReviews() {


    const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;
    const [showAllReviews, setShowAllReviews] = useState(false);

    const handleNext = () => {
        if ((currentPage + 1) * reviewsPerPage < reviews.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentReviews = showAllReviews ? reviews : reviews.slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage);

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
                    <p className="text-lg font-montserrat font-medium">4.8 out of 5</p>
                </div>
                <p className="text-gray-500 text-sm">27 global ratings</p>
            </div>

            <div className="space-y-3">
                <RatingBar label="5" percentage={80}/>
                <RatingBar label="4" percentage={10}/>
                <RatingBar label="3" percentage={5}/>
                <RatingBar label="2" percentage={5}/>
                <RatingBar label="1" percentage={2}/>
            </div>

            <div className="flex justify-between items-center mt-8 mb-4">
                <h3 className="text-lg font-semibold">What people loved about this freelancer</h3>
                <div className="flex flex-col items-end">
                    <button
                        className="text-purple-600 hover:underline text-sm font-medium my-1"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                        {showAllReviews ? "Hide All Reviews" : "See All Reviews"}
                    </button>
                    {
                        !showAllReviews && (<div className="flex gap-2">
                                <Button
                                    onClick={handlePrev}
                                    size={'icon'}
                                    variant={'outline'}
                                    disabled={currentPage === 0}
                                    className={cn('border-none shadow-none')}
                                >
                                    <ChevronLeft/>
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    size={'icon'}
                                    variant={'outline'}
                                    disabled={(currentPage + 1) * reviewsPerPage >= reviews.length}
                                    className={cn('border-none shadow-none')}
                                >
                                    <ChevronRight/>
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="space-y-4">
                {currentReviews.map((review: ReviewType, index: number) => (
                    <ReviewCard
                        key={index}
                        name={review.name}
                        country={review.country}
                        rating={review.rating}
                        review={review.review}
                        avatar={review.avatar}
                    />
                ))}
            </div>
        </section>
    );
}
