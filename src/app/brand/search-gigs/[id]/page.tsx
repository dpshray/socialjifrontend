"use client"

import React, {use, useEffect, useState} from "react"
import {Calendar, Clock, Star, ThumbsDown, ThumbsUp, UserIcon} from "lucide-react"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Separator} from "@/components/ui/separator"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {gigsService} from "@/services/gigs.service"
import Image from "next/image"
import {Gig, Review} from "@/types/gigs"
import {reviewsService} from "@/services/reviewsService";
import {useForm} from "react-hook-form"
import {Label} from "@/components/ui/label"
import {toast} from "sonner";
import TextInputField from "@/components/field/TextInputField";
import paymentService from "@/services/paymentService";
import {useRouter} from "next/navigation";

interface SearchGigProps {
    params: Promise<{ id: number }>
}

interface ReviewFormData {
    comment: string
    rating: number
}

export default function SearchGigDetailsPage({params}: SearchGigProps) {
    const unwrappedParams = use(params)
    const id = unwrappedParams.id

    const [gig, setGig] = useState<Gig | null>(null)
    const [selectedPricing, setSelectedPricing] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [isSubmittingReview, setIsSubmittingReview] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<ReviewFormData>()


    const fetchGigDetails = async () => {
        try {
            const response = await gigsService.GetGigById(id)
            console.log("Gig details:", response.data)
            setGig(response.data)
        } catch (error) {
            console.error("Error fetching gig details:", error)
        }
    }

    useEffect(() => {
        fetchGigDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const handleBuyNow = async (gigId: number, data: any) => {
        try {
            const payload = {
                pricing_tier: data.id,
                description: data.description
            }

            const response = await paymentService.createTransaction(gigId, payload)
            if (response) {
                router.push(response.data.trustap_url)
            }
            toast.success("Gig bought successfully")
        } catch (error) {
            toast.error("Error buying gig")
        }
    }


    const handlePostReview = async (data: ReviewFormData) => {
        if (rating === 0) {
            toast.error("Please select a rating before submitting the review.")
            return
        }

        setIsSubmittingReview(true)
        try {
            const reviewData = {...data, rating}
            const response = await reviewsService.saveReview(reviewData, id)
            console.log("Review created:", response.data)
            reset()
            setRating(0)
            await fetchGigDetails()
        } catch (error) {
            console.error("Error creating review:", error)
        } finally {
            setIsSubmittingReview(false)
        }
    }

    const renderStars = (rating: number) =>
        Array.from({length: 5}, (_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}/>
        ))

    const renderInteractiveStars = (currentRating: number, onRatingChange: (rating: number) => void) =>
        Array.from({length: 5}, (_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 cursor-pointer transition-colors ${
                    i < currentRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-200"
                }`}
                onClick={() => onRatingChange(i + 1)}
            />
        ))

    const calculateAverageRating = (reviews: Review[]) => {
        if (reviews.length === 0) return 0
        const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
        return (sum / reviews.length).toFixed(1)
    }

    if (!gig) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-64 bg-gray-200 rounded mb-6"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{gig.category}</Badge>
                    <div className="flex items-center gap-1">
                        {renderStars(Math.round(Number(calculateAverageRating(gig.reviews))))}
                        <span className="text-sm text-muted-foreground ml-1">
              {calculateAverageRating(gig.reviews)} ({gig.reviews.length} reviews)
            </span>
                    </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{gig.title}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4"/>
                        Published {new Date(gig.published_at).toLocaleDateString()}
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <Image
                            width={800}
                            height={450}
                            src={gig.image || "/placeholder.svg?height=450&width=800"}
                            alt={gig.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="requirements">Requirements</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews ({gig.reviews.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>About This Gig</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">{gig.description}</p>
                                    {gig.features && (
                                        <div>
                                            <h4 className="font-semibold mb-2">Features</h4>
                                            <p className="text-muted-foreground">{gig.features}</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="requirements" className="mt-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Requirements</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">{gig.requirements}</p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-6">
                            <div className="space-y-6">
                                {/* Add review form */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Write a Review</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit(handlePostReview)} className="space-y-4">
                                            <div>
                                                <TextInputField
                                                    id="comment"
                                                    textarea={true}
                                                    label="Review Comment"
                                                    placeholder="Write your review here..."
                                                    error={errors.comment?.message}
                                                    {...register("comment", {required: "Review comment is required"})}
                                                />

                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium">Rating</Label>
                                                <div
                                                    className="flex items-center gap-1 mt-1">{renderInteractiveStars(rating, setRating)}</div>
                                                {rating === 0 &&
                                                    <p className="text-sm text-muted-foreground mt-1">Click on stars to
                                                        rate</p>}
                                            </div>

                                            <Button type="submit" disabled={isSubmittingReview}>
                                                {isSubmittingReview ? "Submitting..." : "Submit Review"}
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>

                                {/* Existing reviews */}
                                {gig.reviews.map((review) => (
                                    <Card key={review.review_id} className={'py-2'}>
                                        <CardContent className="pt-6">
                                            <div className="flex items-start gap-4">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={review.reviewer.image || "/placeholder.svg?height=40&width=40"}/>
                                                    <AvatarFallback
                                                        className={'capitalize'}>{review.reviewer.first_name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className="font-semibold">{review.reviewer.first_name}</span>
                                                        <div
                                                            className="flex items-center gap-1">{renderStars(review.rating)}</div>
                                                        <span
                                                            className="text-sm text-muted-foreground">{review.reviewed_at}</span>
                                                    </div>
                                                    <p className="text-muted-foreground mb-3 leading-relaxed">{review.comment}</p>
                                                    <div className="flex items-center gap-4">
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <ThumbsUp className="w-3 h-3 mr-1"/>
                                                            {review.helpfuls.upvote}
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="h-8 px-2">
                                                            <ThumbsDown className="w-3 h-3 mr-1"/>
                                                            {review.helpfuls.downvote}
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-semibold">Choose a Package</h3>
                        {gig.pricings.map((pricing, index) => (
                            <Card
                                key={pricing.id}
                                className={`cursor-pointer transition-all ${
                                    selectedPricing === index ? "ring-2 ring-primary border-primary" : "hover:shadow-md"
                                }`}
                                onClick={() => setSelectedPricing(index)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">{pricing.label}</CardTitle>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">
                                                {pricing.currency.symbol}
                                                {pricing.price}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-sm text-muted-foreground">{pricing.description}</p>
                                    <div className="flex items-center gap-1 text-sm">
                                        <Clock className="w-4 h-4"/>
                                        Delivery: {new Date(pricing.delivery_time).toLocaleDateString()}
                                    </div>
                                    <Separator/>
                                    <div>
                                        <h5 className="font-medium text-sm mb-1">Requirements:</h5>
                                        <p className="text-xs text-muted-foreground">{pricing.requirement}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Button
                            className="w-full"
                            size="lg"
                            onClick={() =>
                                handleBuyNow(gig.id, {
                                    ...gig.pricings[selectedPricing],
                                    pricing_tier: selectedPricing,
                                })
                            }
                        >
                            Continue ({gig.pricings[selectedPricing].currency.symbol}
                            {gig.pricings[selectedPricing].price})
                        </Button>


                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserIcon className="w-5 h-5"/>
                                About the Seller
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Avatar className="w-12 h-12">
                                    <AvatarFallback>
                                        {gig.user.first_name.charAt(0)}
                                        {gig.user.last_name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">
                                        {gig.user.first_name} {gig.user.middle_name} {gig.user.last_name}
                                    </div>
                                    <div className="text-sm text-muted-foreground">@{gig.user.nick_name}</div>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{gig.user.about}</p>
                            <Button variant="outline" className="w-full bg-transparent">
                                Contact Seller
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

