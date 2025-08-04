"use client"

import Image from "next/image"
import {Badge} from "@/components/ui/badge"
import {useMemo} from "react"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Star} from "lucide-react"
import {cn} from "@/lib/utils"
import {Skeleton} from "@/components/ui/skeleton"
import {useRouter} from "next/navigation"
import {ActionButtons} from "@/components/card/action-buttons";


interface Currency {
    id: number
    name: string
    code: string
    symbol: string
}

interface PricingTier {
    id: number
    label: string
    price: string
    delivery_time: string
    description: string
    requirement: string
    currency: Currency
}

type Tag = {
    id: number
    name: string
}

interface GigsCardProps {
    id: number
    title: string
    description: string
    features?: string | string[]
    status: string
    image: string
    pricing: PricingTier[]
    onDeleteAction?: () => void
    onEditAction?: () => void
    tags: Tag[]
}

export const GigsCard = ({
                             id,
                             title,
                             description,
                             image,
                             tags,
                             pricing,
                             onDeleteAction,
                             onEditAction,
                         }: GigsCardProps) => {
    const router = useRouter()

    const {pricingTierLabels, pricingRange} = useMemo(() => {
        if (!pricing || pricing.length === 0) {
            return {
                pricingTierLabels: [],
                pricingRange: "No pricing info",
            }
        }

        const prices = pricing.map((p) => Number.parseFloat(p.price)).sort((a, b) => a - b)
        const currencySymbol = pricing[0]?.currency?.symbol || "$"
        const min = prices[0].toFixed(0)
        const max = prices[prices.length - 1].toFixed(0)

        const pricingRange = min === max ? `${currencySymbol}${min}` : `${currencySymbol}${min} - ${currencySymbol}${max}`

        const pricingTierLabels = pricing.map((p) => p.label)

        return {
            pricingTierLabels,
            pricingRange,
        }
    }, [pricing])

    const handleViewGig = (id: number) => {
        router.push(`/influencer/gigs/${id}`)
    }

    const getBadgeStyles = (label: string) => {
        switch (label) {
            case "Basic":
                return "bg-green-100 text-green-800 border-green-200"
            case "Premium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "Standard":
                return "bg-blue-100 text-blue-800 border-blue-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <Card
            className={cn(
                "w-[300px] h-[360px] !py-0 gap-2 bg-transparent  shadow-none rounded-md overflow-hidden border-black/10",
                "transition-all duration-200 ease-in-out cursor-pointer",
                "group hover:shadow-lg  hover:rounded-md hover:border-input hover:bg-white",
            )}
            role="article"
            aria-label={`Gig card for ${title}`}
            onClick={() => handleViewGig(id)}
        >
            {/* Gig Image */}
            <div className="relative h-50 w-full overflow-hidden rounded-t-md group-hover:rounded-none">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} - Influencer Gig`}
                    width={300}
                    height={160}
                    className={cn("w-full h-full object-cover", "group-hover:scale-105 transition-all duration-200 ease-in-out")}
                    priority
                />
            </div>

            {/* Card Content */}
            <CardContent className="px-2 flex flex-col  flex-grow">
                {/* Pricing Tier Badges */}
                <div className="flex flex-wrap gap-1 justify-end mb-2">
                    {pricingTierLabels.map((label, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className={cn("text-[10px] px-2 py-0.5 font-medium", getBadgeStyles(label))}
                        >
                            {label}
                        </Badge>
                    ))}
                </div>

                {/* Title */}
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-black text-lg font-semibold truncate font-poppins capitalize">{title}</h2>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 font-sans line-clamp-2 mb-2" aria-label="Gig description">
                    {description}
                </p>

                {/* Tags */}
                <div
                    className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-1 gap-y-1 py-1 line-clamp-1 mb-2">
                    {tags && tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <span key={tag.id ?? index} className="flex items-center gap-1">
                <span className="capitalize font-semibold text-black">{tag.name}</span>
                                {index < tags.length - 1 && <span className="text-gray-400">|</span>}
              </span>
                        ))
                    ) : (
                        <span className="flex items-center gap-1">
              <span className="capitalize font-semibold text-black">No tags</span>
            </span>
                    )}
                </div>

                {/* Pricing & Ratings */}
                <div
                    className="text-sm flex items-center justify-between text-gray-700 font-medium mt-auto"
                    aria-label="Price range and rating"
                >
                    <span className="font-semibold text-green-600">{pricingRange}</span>
                    <div className="flex items-center gap-1">
                        {Array.from({length: 5}).map((_, index) => (
                            <Star key={index} className="text-yellow-400" size={16} fill="currentColor"
                                  aria-hidden="true"/>
                        ))}
                        <span className="text-sm text-gray-500 font-sans ml-1" aria-label="Rating score">
              4.5
            </span>
                    </div>
                </div>
            </CardContent>

            {/* Action Buttons Footer */}
            <CardFooter className={cn("px-2 pb-2 pt-0")}>
                <ActionButtons id={id} onView={handleViewGig} onEdit={onEditAction} onDelete={onDeleteAction}/>
            </CardFooter>
        </Card>
    )
}

export function GigsCardSkeleton() {
    return (
        <Card
            className="w-[300px] h-[360px] !py-0 gap-2 bg-transparent rounded-none shadow-none rounded-t-md overflow-hidden !border-none"
            role="article"
            aria-label="Loading gig card"
        >
            {/* Image placeholder */}
            <div className="relative h-40 w-full overflow-hidden rounded-t-md">
                <Skeleton className="absolute inset-0 w-full h-full"/>
            </div>

            {/* Content */}
            <CardContent className="p-2 flex flex-col gap-3 pt-2">
                {/* Badges */}
                <div className="flex justify-end gap-2">
                    <Skeleton className="h-5 w-12 rounded-full"/>
                    <Skeleton className="h-5 w-16 rounded-full"/>
                </div>

                {/* Title */}
                <Skeleton className="h-6 w-3/4 rounded-md"/>

                {/* Description */}
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full rounded"/>
                    <Skeleton className="h-4 w-5/6 rounded"/>
                </div>

                {/* Tags */}
                <div className="flex gap-2">
                    <Skeleton className="h-3 w-12 rounded"/>
                    <Skeleton className="h-3 w-16 rounded"/>
                    <Skeleton className="h-3 w-10 rounded"/>
                </div>

                {/* Rating and Price */}
                <div className="flex items-center justify-between mt-auto">
                    <Skeleton className="h-4 w-20 rounded-md"/>
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-4 w-16 rounded-md"/>
                        <Skeleton className="h-4 w-8 rounded-md"/>
                    </div>
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="px-2 pb-2 pt-0">
                <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-md"/>
                    <Skeleton className="h-8 w-8 rounded-md"/>
                    <Skeleton className="h-8 w-8 rounded-md"/>
                </div>
            </CardFooter>
        </Card>
    )
}
