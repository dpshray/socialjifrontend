"use client"

import {useMemo, useState} from "react"
import {ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState} from "@tanstack/react-table"
import {format} from "date-fns"
import {ArrowUpDown, DollarSign, User2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {useQuery} from "@tanstack/react-query"
import {DataTable} from "@/components/table/data-table"
import campaignService from "@/services/campaign.service"
import campaignsPaymentService from "@/services/campaigns-payment.service"
import {PAYMENT_STATUS} from "@/lib/enum"

type StatusType = PAYMENT_STATUS

interface InfluencerCampaignPayment {
    payment_id: number
    bid_id: number
    price: number
    campaign_name: string
    campaign_brand_name: string
    bidded_at: string
    status: StatusType
}

export default function CampaignTable() {
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const [totalItems, setTotalItems] = useState(0)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([])
    const [loadingActions, setLoadingActions] = useState<Record<number, boolean>>({})

    const {data: campaigns = [], isLoading, refetch} = useQuery({
        queryKey: ["campaigns", pagination.pageIndex, pagination.pageSize],
        queryFn: async () => {
            const response = await campaignService.getInfluencerCampaignPayments({
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            })
            setTotalItems(response.data?.total || 0)
            console.log('Response from', response.data)
            return response.data || []
        },
    })

    const filteredData = useMemo(() => {
        if (selectedStatuses.length === 0) return campaigns
        return campaigns.filter((campaign: InfluencerCampaignPayment) => selectedStatuses.includes(campaign.status))
    }, [campaigns, selectedStatuses])

    const handleStatusChange = (checked: boolean, value: StatusType) => {
        setSelectedStatuses(prev => (checked ? [...prev, value] : prev.filter(s => s !== value)))
    }

    const handleAcceptDeposit = async (paymentId: number) => {
        setLoadingActions(prev => ({...prev, [paymentId]: true}))
        try {
            const res = await campaignsPaymentService.bidderAcceptDepositInfluencer(paymentId)
            console.log('Deposit accepted:', res)
            await refetch()
        } catch (err) {
            console.error('Failed to accept deposit:', err)
        } finally {
            setLoadingActions(prev => ({...prev, [paymentId]: false}))
        }
    }



    const handleDeliverCampaign = async (paymentId: number) => {
        setLoadingActions(prev => ({...prev, [paymentId]: true}))
        try {
            const res = await campaignsPaymentService.deliverCampaignInfluencer(paymentId)
            console.log('Campaign delivered:', res)
            await refetch()
        } catch (err) {
            console.error('Failed to deliver campaign:', err)
        } finally {
            setLoadingActions(prev => ({...prev, [paymentId]: false}))
        }
    }

    const columns: ColumnDef<InfluencerCampaignPayment>[] = useMemo(() => [
        {
            accessorKey: "payment_id",
            header: () => <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Payment ID</span>,
            cell: ({row}) => <span className="text-xs sm:text-sm whitespace-nowrap">{row.original.payment_id}</span>,
        },
        {
            accessorKey: "bid_id",
            header: () => <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Bid ID</span>,
            cell: ({row}) => <span className="text-xs sm:text-sm whitespace-nowrap">{row.original.bid_id}</span>,
        },
        {
            accessorKey: "campaign_name",
            header: () => <span className="text-xs sm:text-sm font-medium">Campaign</span>,
            cell: ({row}) => (
                <span className="text-xs sm:text-sm font-semibold text-foreground block max-w-[120px] sm:max-w-[200px] md:max-w-xs truncate">
                    {row.original.campaign_name}
                </span>
            ),
        },
        {
            accessorKey: "campaign_brand_name",
            header: () => <span className="text-xs sm:text-sm font-medium">Brand</span>,
            cell: ({row}) => (
                <div className="flex items-center gap-1">
                    <User2 className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0"/>
                    <span className="text-xs sm:text-sm block max-w-[100px] sm:max-w-[150px] md:max-w-xs truncate">
                        {row.original.campaign_brand_name}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: () => <span className="text-xs sm:text-sm font-medium">Status</span>,
            cell: ({row}) => {
                const status = row.original.status
                let variant: "default" | "secondary" | "destructive" | "outline" = "outline"

                if (status === PAYMENT_STATUS.AMOUNT_CLAIMED || status === PAYMENT_STATUS.AMOUNT_PAID) {
                    variant = "default"
                } else if (status === PAYMENT_STATUS.DEPOSIT_ACCEPTED || status === PAYMENT_STATUS.DELIVERED) {
                    variant = "secondary"
                } else if (status === PAYMENT_STATUS.COMPLAINED) {
                    variant = "destructive"
                }

                return (
                    <Badge variant={variant} className="capitalize text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 whitespace-nowrap">
                        {status.replace(/_/g, " ")}
                    </Badge>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({column}) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm font-medium h-auto p-0 hover:bg-transparent"
                >
                    <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground"/>
                    <span className="hidden xs:inline">Price</span>
                    <ArrowUpDown className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-muted-foreground"/>
                </Button>
            ),
            cell: ({row}) => (
                <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    NPR {Number(row.original.price).toLocaleString()}
                </span>
            ),
        },
        {
            accessorKey: "bidded_at",
            header: () => <span className="text-xs sm:text-sm font-medium">Date</span>,
            cell: ({row}) => (
                <span className="text-xs sm:text-sm whitespace-nowrap">
                    {format(new Date(row.original.bidded_at), "PP")}
                </span>
            ),
        },
        {
            accessorKey: "actions",
            header: () => <span className="text-xs sm:text-sm font-medium">Actions</span>,
            cell: ({row}) => {
                const status = row.original.status
                const isLoading = loadingActions[row.original.payment_id]

                if (status === PAYMENT_STATUS.AMOUNT_PAID) {
                    return (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 sm:h-8 px-2 sm:px-3 text-xs whitespace-nowrap"
                            onClick={() => handleAcceptDeposit(row.original.payment_id)}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Accept Deposit"}
                        </Button>
                    )
                }

                if (status === PAYMENT_STATUS.DEPOSIT_ACCEPTED) {
                    return (
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 sm:h-8 px-2 sm:px-3 text-xs whitespace-nowrap"
                            onClick={() => handleDeliverCampaign(row.original.payment_id)}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Deliver Campaign"}
                        </Button>
                    )
                }

                return (
                    <span className="text-xs text-muted-foreground">
                        No action available
                    </span>
                )
            },
        }
    ], [loadingActions])

    const statusFilters = [
        PAYMENT_STATUS.AMOUNT_PAID,
        PAYMENT_STATUS.DEPOSIT_ACCEPTED,
        PAYMENT_STATUS.DELIVERED,
        PAYMENT_STATUS.HANDOVERED,
        PAYMENT_STATUS.AMOUNT_CLAIMED,
        PAYMENT_STATUS.COMPLAINED,
    ]

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-slate-800">
                Campaign Payments
            </h1>

            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {statusFilters.map(status => (
                    <Badge
                        key={status}
                        variant={selectedStatuses.includes(status) ? "default" : "secondary"}
                        className="cursor-pointer text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 capitalize"
                        onClick={() => handleStatusChange(!selectedStatuses.includes(status), status)}
                    >
                        {status.replace(/_/g, " ")}
                    </Badge>
                ))}
            </div>

            <div className="overflow-x-auto -mx-2 sm:-mx-3 md:mx-0">
                <div className="inline-block min-w-full align-middle px-2 sm:px-3 md:px-0">
                    <DataTable<InfluencerCampaignPayment, unknown>
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
                        filterColumnId="campaign_name"
                        filterPlaceholder="Filter by campaign"
                    />
                </div>
            </div>
        </div>
    )
}