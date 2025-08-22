import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"

interface BidData {
    id: number
    campaign_id: number
    detail: string
    bid: string
    bidder: {
        id: number
        nick_name: string
        first_name: string
        middle_name?: string
        last_name: string
        email: string
        image?: string
    }
}

interface BidCardProps {
    bid: BidData
    className?: string
}

export function BidCard({bid, className = ""}: BidCardProps) {
    const getFullName = () => {
        const {first_name, middle_name, last_name} = bid.bidder
        return [first_name, middle_name, last_name].filter(Boolean).join(" ")
    }

    const getInitials = () => {
        const fullName = getFullName()
        return fullName
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    const formatBidAmount = (amount: string) => {
        const num = Number.parseFloat(amount)
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
        }).format(num)
    }

    const hasValidImage =
        bid.bidder.image && bid.bidder.image !== "http://192.168.100.23:8008/assets/img/user-default.png"

    return (
        <Card className={`hover:shadow-md transition-shadow duration-200 ${className}`}>
            <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={hasValidImage ? bid.bidder.image : undefined} alt={getFullName()}/>
                        <AvatarFallback
                            className="bg-blue-100 text-blue-600 font-semibold">{getInitials()}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div>
                                <h3 className="font-semibold text-gray-900 truncate">{getFullName()}</h3>
                                <p className="text-sm text-gray-500">@{bid.bidder.nick_name}</p>
                            </div>
                            <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-800 font-semibold self-start sm:self-center"
                            >
                                {formatBidAmount(bid.bid)}
                            </Badge>
                        </div>

                        {bid.detail && <p className="text-sm text-gray-600 line-clamp-2">{bid.detail}</p>}

                        <div
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-100">
                            <span className="text-xs text-gray-400">Bid ID: #{bid.id}</span>
                            <span className="text-xs text-gray-400">{bid.bidder.email}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export function BidsList({bids}: { bids: BidData[] }) {
    if (!bids || bids.length === 0) {
        return (
            <Card>
                <CardContent className="p-8 text-center">
                    <div className="text-gray-400 mb-2">
                        <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Bids Yet</h3>
                    <p className="text-gray-500">This campaign hasn't received any bids yet.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Bidders ({bids.length})</h2>
            <div className="space-y-3">
                {bids.map((bid) => (
                    <BidCard key={bid.id} bid={bid}/>
                ))}
            </div>
        </div>
    )
}
