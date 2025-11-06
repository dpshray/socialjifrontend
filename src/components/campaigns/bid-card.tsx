'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { memo, useCallback, useMemo } from "react"
import { cn } from "@/lib/utils"

export interface BidData {
    id: number
    campaign_id: number
    detail: string
    bid: string
    is_assigned: boolean
    bidder?: {
        id: number
        nick_name: string
        first_name: string
        last_name: string
        email: string
        image: string
    }
}

interface BidCardProps {
    bid: BidData
    className?: string
    onAssignBidAction?: (bidId: number) => void
}

const BidCard = memo(({ bid, className = "", onAssignBidAction }: BidCardProps) => {
    const bidder = useMemo(() => bid.bidder || {
        id: 0,
        nick_name: "Unknown",
        first_name: "Unknown",
        last_name: "",
        email: "N/A",
        image: "",
    }, [bid.bidder])

    const getFullName = useMemo(() => {
        const { first_name, last_name } = bidder
        return [first_name, last_name].filter(Boolean).join(" ") || "Anonymous User"
    }, [bidder])

    const initials = useMemo(() => {
        return getFullName
            .split(" ")
            .map((n) => n.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }, [getFullName])

    const formattedBid = useMemo(() => {
        const num = parseFloat(bid.bid)
        if (isNaN(num)) return "$0.00"
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(num)
    }, [bid.bid])

    const hasValidImage = useMemo(() => {
        return !!bidder.image &&
            bidder.image !== "http://192.168.100.23:8008/assets/img/user-default.png" &&
            !bidder.image.includes("user-default.png")
    }, [bidder.image])

    const handleAssign = useCallback(() => {
        if (!bid.is_assigned && onAssignBidAction) {
            onAssignBidAction(bid.id)
        }
    }, [bid.is_assigned, bid.id, onAssignBidAction])

    return (
        <article
            className={cn(
                "group relative bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden",
                "transition-all duration-300 ease-out",
                "hover:shadow-xl hover:-translate-y-1 hover:border-blue-300",
                bid.is_assigned && "bg-gradient-to-br from-gray-50 to-gray-100 opacity-95",
                className
            )}
        >
            {bid.is_assigned && (
                <div className="absolute top-0 right-0 bg-gradient-to-bl from-green-500 to-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg shadow-md">
                    ✓ Assigned
                </div>
            )}

            <div className="p-5 sm:p-7">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                    <Avatar className="h-16 w-16 sm:h-20 sm:w-20 flex-shrink-0 ring-4 ring-blue-50 ring-offset-2 transition-transform duration-300 group-hover:scale-105 group-hover:ring-blue-100">
                        <AvatarImage
                            src={hasValidImage ? bidder.image : undefined}
                            alt={`${getFullName}'s avatar`}
                            loading="lazy"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white font-bold text-xl">
                            {initials}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0 space-y-4 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-1">
                                <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                                    {getFullName}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium truncate">@{bidder.nick_name}</p>
                            </div>
                            <Badge
                                variant="secondary"
                                className={'w-fit'}
                            >
                                {formattedBid}
                            </Badge>
                        </div>

                        {bid.detail && (
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">
                                    {bid.detail}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                    </svg>
                                    {bid.id}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="truncate max-w-[200px]">{bidder.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-5 sm:px-7 pb-5 sm:pb-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
                <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">Campaign #{bid.campaign_id}</span>
                    </div>
                    <Button
                        variant={bid.is_assigned ? "secondary" : "default"}
                        size="lg"
                        className={cn(
                            "w-full sm:w-auto font-bold transition-all duration-300 min-w-[140px]",
                            bid.is_assigned
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300"
                                : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                        )}
                        onClick={handleAssign}
                        disabled={bid.is_assigned}
                    >
                        {bid.is_assigned ? (
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Assigned
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Assign Bid
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </article>
    )
})

BidCard.displayName = "BidCard"

export { BidCard }

export function BidsList({ bids, onAssignBidAction }: { bids: BidData[]; onAssignBidAction?: (bidId: number) => void }) {
    if (!bids || bids.length === 0) {
        return (
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl border-2 border-dashed border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="p-10 sm:p-16 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full p-6 shadow-inner">
                            <svg
                                className="h-14 w-14 sm:h-20 sm:w-20 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">No Bids Yet</h3>
                        <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
                            This campaign hasn&#39;t received any bids yet. Check back later or share your campaign to attract bidders.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <section className="space-y-5 sm:space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b-2 border-gray-200">
                <div className="flex items-center gap-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900">Bidders</h2>
                    <Badge
                        variant="secondary"
                    >
                        {bids.length} {bids.length === 1 ? 'Bid' : 'Bids'}
                    </Badge>
                </div>
                <p className="text-sm text-gray-500">Review and assign bids to your campaign</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6">
                {bids.map((bid) => (
                    <BidCard key={bid.id} bid={bid} onAssignBidAction={onAssignBidAction} />
                ))}
            </div>
        </section>
    )
}
