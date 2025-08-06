"use client"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {CheckCircle} from "lucide-react"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Skeleton} from "@/components/ui/skeleton"

import Image from "next/image"
import {cn} from "@/lib/utils"

import {useState} from "react"
import {StarRating} from "../StarRating"
import {Pricing, Tag} from "@/types/common";
import {User} from "@/types/user";

interface ProjectCardProps {
    gigId?: number
    name: string
    image: string
    rating: number
    status: string
    category: string
    title: string
    tags?: Tag[]
    description: string
    followers?: number
    pricings: Pricing[]
    user: User
    onViewDetailsAction?: () => void
    // onBuyNowAction?: (price: number) => void
    onBuyNowAction?: (pricing: Pricing, gigId?: number) => void
}

export function ProjectCard({
                                gigId,
                                name,
                                image,
                                rating,
                                status,
                                title,
                                tags,
                                description,
                                pricings = [],
                                onViewDetailsAction,
                                onBuyNowAction,
                            }: ProjectCardProps) {
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((word) => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const lowestPrice = pricings.length > 0 ? Math.min(...pricings.map((p) => Number.parseFloat(p.price))) : 0
    const [selectedPricingIndex, setSelectedPricingIndex] = useState(0)

    return (
        <Card
            className={cn(
                "w-full max-w-sm h-full mx-auto border border-purple-200 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md hover:scale-[1.01] bg-white flex flex-col justify-between overflow-hidden",
                "py-0 gap-2",
            )}
        >
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 gap-4">
                <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 ring-2 ring-purple-100">
                        <AvatarImage src={image || "/placeholder.svg"} alt={`Profile picture of ${name}`}
                                     loading="lazy"/>
                        <AvatarFallback
                            className="bg-purple-100 text-purple-700 font-semibold">{getInitials(name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0">
                        <h2 className="text-sm sm:text-base font-semibold text-gray-900 font-sans truncate">{name}</h2>
                        <StarRating rating={rating} max={5} size="sm"/>
                    </div>
                </div>
                <Badge
                    variant="default"
                    className="bg-green-700 hover:bg-green-800 text-white text-xs flex items-center gap-1.5 px-2 py-1"
                >
                    <CheckCircle className="w-3.5 h-3.5"/>
                    {status}
                </Badge>
            </header>
            <section className="px-4" aria-labelledby="skills-heading">
                <div className="flex flex-wrap gap-2">
                    {pricings.map((skill, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="bg-purple-50 hover:bg-purple-100 text-purple-800 font-medium text-xs px-2 py-1"
                        >
                            {skill.label}
                        </Badge>
                    ))}
                </div>
            </section>
            <CardContent className="px-4 pt-4 flex-1 flex flex-col gap-3">
                <div className="relative w-full h-[180px] rounded-xl overflow-hidden">
                    <Image
                        src={image || "/placeholder.svg"}
                        alt="Project preview"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover"
                    />
                </div>
                <h3 className="font-bold text-base sm:text-lg font-sans line-clamp-2 text-gray-900 leading-snug">{title}</h3>
                {tags && tags.length > 0 && (
                    <div className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-2" aria-label="tags">
                        {tags.map((tag, index) => (
                            <span key={index}>
                {tag.name}
                                {index < tags.length - 1 && <span className="mx-1 text-gray-400">|</span>}
              </span>
                        ))}
                    </div>
                )}
                <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">{description}</p>
                {pricings.map((pricing, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex items-center justify-between text-sm text-gray-900 p-2 rounded-md cursor-pointer transition-colors duration-200",
                            selectedPricingIndex === index ? "bg-purple-100 border border-purple-400" : "hover:bg-gray-50",
                        )}
                        onClick={() => setSelectedPricingIndex(index)}
                    >
                        <span className="font-semibold">${pricing.price}</span>
                        <span className="text-xs text-gray-500">{pricing.label}</span>
                    </div>
                ))}
            </CardContent>
            <CardFooter className="px-4 pt-2 pb-4 flex flex-col gap-2 sm:flex-row">
                <Button
                    className="w-full sm:w-1/2 bg-navyBlue"
                    onClick={() => onBuyNowAction?.(pricings[selectedPricingIndex], gigId!)}
                >
                    Buy Now
                </Button>
                <Button
                    variant="outline"
                    className="w-full sm:w-1/2 border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                    onClick={onViewDetailsAction}
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    )
}

export function ProjectCardSkeleton() {
    return (
        <Card
            className="w-full max-w-sm h-full mx-auto border border-purple-200 rounded-2xl shadow-sm flex flex-col justify-between">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-full"/>
                    <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-28"/>
                        <Skeleton className="h-3 w-20"/>
                    </div>
                </div>
                <Skeleton className="h-6 w-20 rounded-md"/>
            </header>
            <section className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                    {Array.from({length: 3}).map((_, index) => (
                        <Skeleton key={index} className="h-5 w-16 rounded-full"/>
                    ))}
                </div>
            </section>
            <CardContent className="px-4 flex-1 flex flex-col gap-3">
                <Skeleton className="w-full h-[180px] rounded-xl"/>
                <Skeleton className="h-5 w-3/4"/>
                <div className="flex flex-wrap items-center gap-1">
                    {Array.from({length: 2}).map((_, index) => (
                        <Skeleton key={index} className="h-4 w-14"/>
                    ))}
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-3 w-full"/>
                    <Skeleton className="h-3 w-[90%]"/>
                    <Skeleton className="h-3 w-[80%]"/>
                </div>
                <div className="space-y-1">
                    <Skeleton className="h-4 w-24"/>
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-16"/>
                        <Skeleton className="h-6 w-20"/>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="px-4 pt-2 pb-4 flex flex-col gap-2 sm:flex-row">
                <Skeleton className="h-10 w-full sm:w-1/2 rounded-md"/>
                <Skeleton className="h-10 w-full sm:w-1/2 rounded-md"/>
            </CardFooter>
        </Card>
    )
}
