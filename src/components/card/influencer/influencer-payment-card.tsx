import {Card, CardContent} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Avatar, AvatarFallback} from "@/components/ui/avatar"
import {cn} from "@/lib/utils"
import {CreditCard, Tag, User} from "lucide-react"

type StatusType = "amount_claimed" | "Active" | "Pending" | "Inactive"

interface ApiPayment {
    status: StatusType
    price: number
    currency: string
    gig: {
        title: string
        user: {
            first_name: string
            last_name: string
            email: string
        }
    }
    pricing_tier: {
        id: number
        label: string
        name: string
    }
    buyer: {
        first_name: string
        middle_name: string | null
        last_name: string | null
        email: string
    }
}

interface InfluencerPaymentCardProps {
    user: ApiPayment
    className?: string
}

export function InfluencerPaymentCard({user, className}: InfluencerPaymentCardProps) {
    const getStatusConfig = (status: StatusType) => {
        switch (status) {
            case "amount_claimed":
                return {color: "bg-green-100 text-green-800 border-green-200", label: "Amount Claimed"}
            case "Active":
                return {color: "bg-blue-100 text-blue-800 border-blue-200", label: "Active"}
            case "Pending":
                return {color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pending"}
            case "Inactive":
                return {color: "bg-gray-100 text-gray-800 border-gray-200", label: "Inactive"}
            default:
                return {color: "bg-gray-100 text-gray-800 border-gray-200", label: status}
        }
    }

    const statusConfig = getStatusConfig(user.status)
    const buyerFullName = [user.buyer.first_name, user.buyer.middle_name, user.buyer.last_name].filter(Boolean).join(" ")
    const influencerInitials = `${user.gig.user.first_name[0]}${user.gig.user.last_name[0]}`.toUpperCase()

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
        }).format(amount)
    }

    return (
        <Card
            className={cn(
                "w-full max-w-sm overflow-hidden hover:shadow-lg transition-all duration-200 ease-in-out shadow-sm bg-white py-2 border border-gray-200",
                className
            )}
        >
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600">
                            <AvatarFallback
                                className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                {influencerInitials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 truncate">
                                {user.gig.user.first_name} {user.gig.user.last_name}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">{user.gig.user.email}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className={cn("text-xs font-medium border", statusConfig.color)}>
                        {statusConfig.label}
                    </Badge>
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <Tag className="h-4 w-4 text-gray-400"/>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Gig Title</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2" title={user.gig.title}>
                        {user.gig.title}
                    </p>
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <User className="h-4 w-4 text-gray-400"/>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Buyer</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{buyerFullName}</p>
                    <p className="text-xs text-gray-500 truncate">{user.buyer.email}</p>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-gray-100">
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Tier</p>
                        <p className="text-sm font-medium text-gray-900 truncate">{user.pricing_tier.label}</p>
                    </div>
                    <div className="text-right ml-4">
                        <div className="flex items-center gap-1 mb-1">
                            <CreditCard className="h-4 w-4 text-gray-400"/>
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</p>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(user.price, user.currency)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
