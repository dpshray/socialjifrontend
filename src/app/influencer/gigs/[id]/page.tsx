'use client';

import React, {useEffect, useState} from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {FaSearch, FaStar} from 'react-icons/fa';
import SelectInputField from '@/components/field/SelectField';
import GigPricingTab, {GigPricingTabSkeleton} from '@/components/Tab/GigPricingTab';
import {useParams} from 'next/navigation';
import {gigsService} from '@/services/gigs.service';
import Image from 'next/image';
import {Card, CardContent} from '@/components/ui/card';
import {ChevronDown, ChevronUp, Flag, MessageCircle, Send, Star, ThumbsDown, ThumbsUp} from 'lucide-react';
import {Separator} from '@/components/ui/separator';
import {Input} from '@/components/ui/input';
import {Badge} from '@/components/ui/badge';
import {Textarea} from '@/components/ui/textarea';
import {Gig, } from '@/types/gigs';
import {Review} from "@/types/common";

const options = [
    {label: 'Most relevant', value: 'relevant'},
    {label: 'Newest', value: 'newest'},
];


export default function GigPage() {
    const {id} = useParams() as { id: string };
    const numericId = Number(id);

    const [gig, setGig] = useState<Gig | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState(options[0].value);
    const [helpfulVotes, setHelpfulVotes] = useState<Record<
        number,
        { upvoted: boolean; downvoted: boolean }
    >>({});
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyText, setReplyText] = useState('');
    const [expandedReplies, setExpandedReplies] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (!isNaN(numericId)) {
            fetchGigDetails(numericId);
        }
    }, [numericId]);

    const fetchGigDetails = async (id: number) => {
        setLoading(true);
        try {
            const response = await gigsService.GetGigById(id);
            setGig(response?.data);
            setReviews(response?.data?.reviews ?? []);
            console.log('Gig details:', response?.data);
        } catch {
            setError('Failed to fetch gig details');
        } finally {
            setLoading(false);
        }
    };

    const handleHelpfulVote = (reviewId: number, type: 'up' | 'down') => {
        setHelpfulVotes((prev) => {
            const current = prev[reviewId] || {upvoted: false, downvoted: false};
            if (type === 'up') {
                return {
                    ...prev,
                    [reviewId]: {
                        upvoted: !current.upvoted,
                        downvoted: current.downvoted && !current.upvoted ? false : current.downvoted,
                    },
                };
            } else {
                return {
                    ...prev,
                    [reviewId]: {
                        upvoted: current.upvoted && !current.downvoted ? false : current.upvoted,
                        downvoted: !current.downvoted,
                    },
                };
            }
        });
    };

    const handleReplySubmit = (reviewId: number) => {
        if (!replyText.trim()) return;
        // Here you would call your service to submit the reply
        // For demo, just clear the reply box and close it
        setReplyText('');
        setReplyingTo(null);
    };

    const toggleReplies = (reviewId: number) => {
        setExpandedReplies((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(reviewId)) {
                newSet.delete(reviewId);
            } else {
                newSet.add(reviewId);
            }
            return newSet;
        });
    };

    const filteredReviews = reviews
        .filter((review) =>
            review.comment.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOption === 'newest') {
                return new Date(b.reviewed_at).getTime() - new Date(a.reviewed_at).getTime();
            }
            // Default to 'relevant' (no sorting or custom logic)
            return 0;
        });

    return (
        <div className="w-full bg-white font-inter py-6 px-4">
            <header className="max-w-7xl mx-auto mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/gigs">Gigs</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator/>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{gig?.title ?? 'Gig Details'}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-2xl font-semibold mt-4">{gig?.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="Seller profile"/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Airbnb Seller</span>
                    </div>

                    <Separator orientation="vertical" className="h-5"/>

                    <div className="flex items-center gap-1 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-amber-400"/>
                        ))}
                        <span className="text-amber-500 ml-2 font-semibold">(5.0)</span>
                    </div>

                    <span className="text-gray-500 text-sm">{reviews.length} reviews</span>
                </div>
            </header>

            <main className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="rounded-md overflow-hidden mb-6">
                            <Image
                                width={800}
                                height={500}
                                src={gig?.image || '/images/brand.jpg'}
                                alt={gig?.title || 'Gig preview'}
                                className="w-full h-auto object-cover aspect-video"
                            />
                        </div>

                        <section className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">About This Gig</h2>
                            <p className="text-gray-700">{gig?.description}</p>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Tags</h2>
                            <div className="flex flex-wrap gap-2">
                                {gig?.tags.map((tag) => (
                                    <Badge key={tag.id} variant="secondary" className="capitalize">
                                        {tag.name}
                                    </Badge>
                                ))}
                            </div>
                        </section>

                        <section className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Reviews</h2>

                            <div className="relative mt-4">
                                <Input
                                    type="text"
                                    placeholder="Search reviews"
                                    className="w-full pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            </div>

                            <div className="mt-4 flex items-center gap-2">
                                <span className="text-sm">Sort by:</span>
                                <SelectInputField
                                    options={options}
                                    defaultValue={options[0].value}
                                    className="border-none shadow-none"
                                    placeholder=""
                                    onChangeAction={(val) => setSortOption(String(val))}
                                />
                            </div>

                            <div className="space-y-6 mt-4">
                                {filteredReviews.length === 0 && (
                                    <p className="text-sm text-gray-500">No reviews found.</p>
                                )}
                                {filteredReviews.map((review) => (
                                    <Card key={review.review_id} className="border-0 shadow-sm">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-3">
                                                <Avatar className="mt-1">
                                                    <AvatarImage
                                                        src={review.reviewer.image || '/placeholder.svg'}
                                                        alt="User avatar"
                                                    />
                                                    <AvatarFallback>
                                                        {review.reviewer.nick_name?.charAt(0).toUpperCase() || 'U'}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div>
                                                            <p className="font-medium text-sm capitalize">
                                                                {review.reviewer.first_name ?? 'Anonymous'}
                                                            </p>
                                                            <div
                                                                className="flex items-center gap-2 text-xs text-gray-500">
                                                                <span>🇺🇸 USA</span>
                                                                <span>•</span>
                                                                <span>{review.reviewed_at}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(review.rating)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="w-3 h-3 fill-amber-400 text-amber-400"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 text-sm mb-3">{review.comment}</p>

                                                    <div className="flex items-center gap-4 text-xs">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className={`h-8 px-2 ${
                                                                    helpfulVotes[review.review_id]?.upvoted
                                                                        ? 'text-green-600'
                                                                        : 'text-gray-500'
                                                                }`}
                                                                onClick={() => handleHelpfulVote(review.review_id, 'up')}
                                                            >
                                                                <ThumbsUp className="w-3 h-3 mr-1"/>
                                                                Helpful (
                                                                {review.helpfuls.upvote +
                                                                    (helpfulVotes[review.review_id]?.upvoted ? 1 : 0)}
                                                                )
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className={`h-8 px-2 ${
                                                                    helpfulVotes[review.review_id]?.downvoted
                                                                        ? 'text-red-600'
                                                                        : 'text-gray-500'
                                                                }`}
                                                                onClick={() => handleHelpfulVote(review.review_id, 'down')}
                                                            >
                                                                <ThumbsDown className="w-3 h-3 mr-1"/>
                                                                (
                                                                {review.helpfuls.downvote +
                                                                    (helpfulVotes[review.review_id]?.downvoted ? 1 : 0)}
                                                                )
                                                            </Button>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 px-2 text-gray-500"
                                                            onClick={() =>
                                                                setReplyingTo(
                                                                    replyingTo === review.review_id ? null : review.review_id
                                                                )
                                                            }
                                                        >
                                                            <MessageCircle className="w-3 h-3 mr-1"/>
                                                            Reply
                                                        </Button>
                                                        <Button variant="ghost" size="sm"
                                                                className="h-8 px-2 text-gray-500">
                                                            <Flag className="w-3 h-3 mr-1"/>
                                                            Report
                                                        </Button>
                                                    </div>

                                                    {replyingTo === review.review_id && (
                                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                                                            <Textarea
                                                                placeholder="Write your reply..."
                                                                value={replyText}
                                                                onChange={(e) => setReplyText(e.target.value)}
                                                                className="mb-2 min-h-[80px]"
                                                            />
                                                            <div className="flex justify-end gap-2">
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        setReplyingTo(null);
                                                                        setReplyText('');
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    size="sm"
                                                                    onClick={() => handleReplySubmit(review.review_id)}
                                                                    disabled={!replyText.trim()}
                                                                >
                                                                    <Send className="w-3 h-3 mr-1"/>
                                                                    Reply
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {review.replies && review.replies.length > 0 && (
                                                        <div className="mt-4">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-8 px-2 text-blue-600 mb-2"
                                                                onClick={() => toggleReplies(review.review_id)}
                                                            >
                                                                {expandedReplies.has(review.review_id) ? (
                                                                    <>
                                                                        <ChevronUp className="w-3 h-3 mr-1"/>
                                                                        Hide replies ({review.replies.length})
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <ChevronDown className="w-3 h-3 mr-1"/>
                                                                        Show replies ({review.replies.length})
                                                                    </>
                                                                )}
                                                            </Button>

                                                            {expandedReplies.has(review.review_id) && (
                                                                <div
                                                                    className="space-y-3 pl-4 border-l-2 border-gray-200">
                                                                    {review.replies.map((reply) => (
                                                                        <div key={reply.id}
                                                                             className="flex items-start gap-2">
                                                                            <Avatar className="w-6 h-6">
                                                                                <AvatarImage
                                                                                    src={reply.author.image || '/placeholder.svg'}
                                                                                    alt="Reply author"
                                                                                />
                                                                                <AvatarFallback className="text-xs">
                                                                                    {reply.author.nick_name?.charAt(0).toUpperCase() || 'U'}
                                                                                </AvatarFallback>
                                                                            </Avatar>
                                                                            <div className="flex-1">
                                                                                <div
                                                                                    className="flex items-center gap-2 mb-1">
                                          <span className="text-xs font-medium">
                                            {reply.author.nick_name}
                                          </span>
                                                                                    <span
                                                                                        className="text-xs text-gray-500">
                                            {new Date(reply.created_at).toLocaleDateString()}
                                          </span>
                                                                                </div>
                                                                                <p className="text-xs text-gray-700">{reply.comment}</p>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="md:col-span-1">
                        {loading ? <GigPricingTabSkeleton/> : <GigPricingTab pricing={gig?.pricings}/>}
                    </aside>
                </div>
            </main>
        </div>
    );
}
