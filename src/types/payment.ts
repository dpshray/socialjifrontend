export type StatusType = "amount_claimed" | "Active" | "Pending" | "Inactive"

export interface ApiPayment {
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
    complain_allowed: boolean
}
