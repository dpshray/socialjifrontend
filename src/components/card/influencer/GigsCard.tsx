"use client"

import Image from "next/image"
import {Badge} from "@/components/ui/badge"
import {useMemo} from "react"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Star} from "lucide-react"
import {cn} from "@/lib/utils"
import {Skeleton} from "@/components/ui/skeleton"
import {useRouter} from "next/navigation"
import {ActionButtons} from "@/components/card/action-buttons"

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
                "py-0 gap-2",
                "w-[300px] h-[380px] flex flex-col bg-transparent shadow-none rounded-md overflow-hidden border-black/10",
                "transition-all duration-200 ease-in-out cursor-pointer",
                "group hover:shadow-lg hover:rounded-md hover:border-input hover:bg-white",
            )}
            role="article"
            aria-label={`Gig card for ${title}`}
            onClick={() => handleViewGig(id)}
        >
            <div
                className="relative h-[160px] w-full overflow-hidden rounded-t-md group-hover:rounded-none flex-shrink-0">
                <Image
                    src={image || "/placeholder.svg"}
                    alt={`${title} - Influencer Gig`}
                    fill
                    className={cn("object-cover", "group-hover:scale-105 transition-all duration-200 ease-in-out")}
                    priority
                />
            </div>

            <CardContent className="px-3  flex flex-col flex-1 min-h-0">
                <div className="flex flex-wrap gap-1 justify-end mb-2">
                    {pricingTierLabels.slice(0, 2).map((label, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className={cn("text-[10px] px-2 py-0.5 font-medium", getBadgeStyles(label))}
                        >
                            {label}
                        </Badge>
                    ))}
                </div>

                <h2 className="text-black text-base font-semibold line-clamp-1 font-poppins capitalize mb-2">{title}</h2>

                <p className="text-sm text-gray-600 font-sans line-clamp-2 mb-2 flex-shrink-0"
                   aria-label="Gig description">
                    {description}
                </p>

                <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-1 mb-2 line-clamp-1">
                    {tags && tags.length > 0 ? (
                        tags.slice(0, 3).map((tag, index) => (
                            <span key={tag.id ?? index} className="flex items-center gap-1">
                <span className="capitalize font-semibold text-black">{tag.name}</span>
                                {index < Math.min(tags.length - 1, 2) && <span className="text-gray-400">|</span>}
              </span>
                        ))
                    ) : (
                        <span className="capitalize font-semibold text-black">No tags</span>
                    )}
                </div>

                <div
                    className="text-sm flex items-center justify-between text-gray-700 font-medium mt-auto"
                    aria-label="Price range and rating"
                >
                    <span className="font-semibold text-green-600 text-xs">{pricingRange}</span>
            {/*        <div className="flex items-center gap-1">*/}
            {/*            {Array.from({length: 5}).map((_, index) => (*/}
            {/*                <Star key={index} className="text-yellow-400" size={12} fill="currentColor"*/}
            {/*                      aria-hidden="true"/>*/}
            {/*            ))}*/}
            {/*            <span className="text-xs text-gray-500 font-sans ml-1" aria-label="Rating score">*/}
            {/*  4.5*/}
            {/*</span>*/}
            {/*        </div>*/}
                </div>
            </CardContent>

            <CardFooter className="px-3 pb-2 pt-0 flex-shrink-0">
                <ActionButtons id={id} onView={handleViewGig} onEdit={onEditAction} onDelete={onDeleteAction}/>
            </CardFooter>
        </Card>
    )
}

export function GigsCardSkeleton() {
    return (
        <Card
            className=" py-0    w-[300px] h-[450px] flex flex-col bg-transparent rounded-md shadow-none overflow-hidden border-black/10"
            role="article"
            aria-label="Loading gig card"
        >
            <div className="relative h-[160px] w-full overflow-hidden rounded-t-md flex-shrink-0">
                <Skeleton className="absolute inset-0 w-full h-full"/>
            </div>

            <CardContent className="px-3 py-2 flex flex-col flex-1 min-h-0">
                <div className="flex justify-end gap-2 mb-2">
                    <Skeleton className="h-5 w-12 rounded-full"/>
                    <Skeleton className="h-5 w-16 rounded-full"/>
                </div>

                <Skeleton className="h-5 w-3/4 rounded-md mb-2"/>

                <div className="space-y-2 mb-2">
                    <Skeleton className="h-4 w-full rounded"/>
                    <Skeleton className="h-4 w-5/6 rounded"/>
                </div>

                <div className="flex gap-2 mb-2">
                    <Skeleton className="h-3 w-12 rounded"/>
                    <Skeleton className="h-3 w-16 rounded"/>
                    <Skeleton className="h-3 w-10 rounded"/>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <Skeleton className="h-4 w-16 rounded-md"/>
                    <div className="flex items-center gap-1">
                        <Skeleton className="h-3 w-12 rounded-md"/>
                        <Skeleton className="h-3 w-6 rounded-md"/>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="px-3 pb-2 pt-0 flex-shrink-0">
                <div className="flex gap-1">
                    <Skeleton className="h-8 w-8 rounded-md"/>
                    <Skeleton className="h-8 w-8 rounded-md"/>
                    <Skeleton className="h-8 w-8 rounded-md"/>
                </div>
            </CardFooter>
        </Card>
    )
}
