"use client"

import { useMemo, useState } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, PaginationState, VisibilityState } from "@tanstack/react-table"
import { format } from "date-fns"
import { ArrowUpDown, DollarSign, User2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import influencerService from "@/services/InfluencerService"
import { useQuery } from "@tanstack/react-query"
import { DataTable } from "@/components/table/data-table"

type StatusType = "amount_claimed" | "Active" | "Pending" | "Inactive"

interface InfluencerTransaction {
    id: number
    status: StatusType
    price: string
    currency: string
    item_delivery_deadline: string
    gig: {
        id: number
        title: string
        user: {
            id: number
            nick_name: string
            first_name: string
            middle_name: string | null
            last_name: string
            email: string
        }
    }
    pricing_tier: {
        id: number
        name: string
        label: string
    }
    buyer: {
        id: number
        first_name: string
        middle_name: string | null
        last_name: string | null
        nick_name: string
        email: string
    }
}

export default function InfluencerPaymentPage() {
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
    const [totalItems, setTotalItems] = useState(0)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([])
    const [error, setError] = useState<string | null>(null)

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["influencer-transaction", pagination.pageIndex, pagination.pageSize],
        queryFn: async () => {
           try {
               const response = await influencerService.influencerTransactionList({
                   page: pagination.pageIndex + 1,
                   per_page: pagination.pageSize,
               })
               console.log(response.data)
               setTotalItems(response.total || 0)
               return response.data?.data || []
           }catch (error:any) {
               console.log("Error fetching payments", error)
               setError(` You need to be TrustApp user to view campaign payments`)
               return []
           }
        },
    })

    const filteredData = useMemo(() => {
        if (selectedStatuses.length === 0) return payments
        return payments.filter((payment:any) => selectedStatuses.includes(payment.status))
    }, [payments, selectedStatuses])

    const handleStatusChange = (checked: boolean, value: StatusType) => {
        setSelectedStatuses(prev => (checked ? [...prev, value] : prev.filter(s => s !== value)))
    }

    const columns: ColumnDef<InfluencerTransaction>[] = [
        {
            accessorKey: "id",
            header: () => <span className="text-sm font-medium">ID</span>,
            cell: ({ row }) => <span className="text-sm">{row.original.id}</span>,
        },
        {
            id: "gigTitle",
            accessorFn: row => row.gig.title,
            header: () => <span className="text-sm font-medium">Gig</span>,
            cell: ({ row }) => <span className="text-sm font-semibold text-foreground">{row.original.gig.title}</span>,
        },
        {
            id: "buyerNickName",
            accessorFn: row => row.buyer.nick_name,
            header: () => <span className="text-sm font-medium">Buyer</span>,
            cell: ({ row }) => (
                <span className="flex items-center gap-1 text-sm">
          <User2 className="w-4 h-4 text-muted-foreground" />
                    {row.original.buyer.nick_name}
        </span>
            ),
        },
        {
            accessorKey: "status",
            header: () => <span className="text-sm font-medium">Status</span>,
            cell: ({ row }) => {
                const status = row.original.status
                let variant: "default" | "secondary" | "destructive" = "destructive"
                if (status === "amount_claimed") variant = "default"
                else if (status === "Active") variant = "secondary"
                return (
                    <Badge variant={variant} className="capitalize text-xs px-2 py-0.5">
                        {status.replace(/_/g, " ")}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-1 text-sm font-medium h-auto p-0 hover:bg-transparent"
                >
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    Price
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground" />
                </Button>
            ),
            cell: ({ row }) => (
                <span className="text-sm font-medium whitespace-nowrap">
          ${Number.parseFloat(row.original.price).toLocaleString()} {row.original.currency.toUpperCase()}
        </span>
            ),
        },
        {
            accessorKey: "item_delivery_deadline",
            header: () => <span className="text-sm font-medium">Deadline</span>,
            cell: ({ row }) => (
                <span className="text-sm">{format(new Date(row.original.item_delivery_deadline), "PPP p")}</span>
            ),
        },
        {
            id: "pricingTierLabel",
            accessorFn: row => row.pricing_tier.label,
            header: () => <span className="text-sm font-medium">Tier</span>,
            cell: ({ row }) => <span className="text-sm">{row.original.pricing_tier.label}</span>,
        },
    ]

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-4">
                {["amount_claimed", "Active", "Pending", "Inactive"].map(status => (
                    <Badge
                        key={status}
                        variant={selectedStatuses.includes(status as StatusType) ? "default" : "secondary"}
                        className="cursor-pointer text-xs px-2 py-1"
                        onClick={() =>
                            handleStatusChange(!selectedStatuses.includes(status as StatusType), status as StatusType)
                        }
                    >
                        {status.replace(/_/g, " ")}
                    </Badge>
                ))}
            </div>
            <DataTable<InfluencerTransaction, unknown>
                data={filteredData}
                columns={columns}
                loading={isLoading}
                totalRows={totalItems}
                totalPagesFromApi={Math.ceil(totalItems / pagination.pageSize)}
                pagination={pagination}
                setPagination={setPagination}
                columnFilters={columnFilters}
                setColumnFilters={setColumnFilters}
                sorting={sorting}
                setSorting={setSorting}
                columnVisibility={columnVisibility}
                setColumnVisibility={setColumnVisibility}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                onDeleteRows={() => {}}
                filterColumnId="gigTitle"
                filterPlaceholder="Filter by gig"
            />
        </div>
    )
}
