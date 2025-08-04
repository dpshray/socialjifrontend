import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

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
        label: string
    }
}

interface PaymentCardProps {
    user: ApiPayment
}

export function PaymentCard({ user }: PaymentCardProps) {

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }

    const getStatusColor = (status: StatusType) => {
        switch (status) {
            case "amount_claimed":
                return "bg-green-600 text-white capitalize"
            case "Active":
                return "bg-blue-600 text-white capitalize"
            case "Pending":
                return "bg-yellow-500 text-white capitalize"
            case "Inactive":
                return "bg-muted-foreground/60 text-primary-foreground capitalize"
            default:
                return "bg-gray-500 text-white capitalize"
        }
    }

    return (
        <Card className="w-[350px] overflow-hidden flex-shrink-0 hover:shadow-md transition-shadow">
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={`/placeholder.svg?height=40&width=40&text=${getInitials(user.gig.user.first_name, user.gig.user.last_name)}`}
                            />
                            <AvatarFallback>{getInitials(user.gig.user.first_name, user.gig.user.last_name)}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm truncate">
                                {user.gig.user.first_name} {user.gig.user.last_name}
                            </h3>
                            <p className="text-xs text-muted-foreground truncate">{user.gig.user.email}</p>
                        </div>
                    </div>
                    <Badge className={cn("text-xs", getStatusColor(user.status))}>{user.status}</Badge>
                </div>

                <div className="space-y-2">
                    <div>
                        <p className="text-xs text-muted-foreground">Gig Title</p>
                        <p className="text-sm font-medium truncate" title={user.gig.title}>
                            {user.gig.title}
                        </p>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="min-w-0">
                            <p className="text-xs text-muted-foreground">Tier</p>
                            <p className="text-sm truncate">{user.pricing_tier.label}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground">Amount</p>
                            <p className="text-sm font-bold">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: user.currency || "USD",
                                }).format(user.price)}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
