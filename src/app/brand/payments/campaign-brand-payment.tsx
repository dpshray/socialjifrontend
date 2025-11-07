"use client"

import React from "react"
import {useQuery} from "@tanstack/react-query"
import {ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState} from "@tanstack/react-table"
import {DataTable} from "@/components/table/data-table"
import campaignService from "@/services/campaign.service"
import {Button} from "@/components/ui/button"
import campaignsPaymentService from "@/services/campaigns-payment.service"
import {useRouter} from "next/navigation"

export interface PaymentTable {
    payment_id: number | null
    bid_id: number
    price: number
    campaign_name: string
    bidder_name: string
    bidded_at: string
    status: "amount_claimed" | "pending" | "paid" | "failed" | null
    complaint_allowed: boolean | null
}

export default function CampaignBrandPayment() {
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})
    const [loadingTransactions, setLoadingTransactions] = React.useState<Record<number, boolean>>({})
    const router = useRouter()

    const {data, isLoading, refetch} = useQuery<any>({
        queryKey: ["brand-campaign-payments", pagination.pageIndex, pagination.pageSize],
        queryFn: async () => {
            const params = {
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            }
            const response = await campaignService.getBrandCampaignPayments(params)
            console.log(response.data)
            return response.data
        },
    })

    const handleCreateTransaction = React.useCallback(async (id: number) => {
        setLoadingTransactions(prev => ({...prev, [id]: true}))
        try {
            console.log('Creating transaction for bid id:', id)
            const res = await campaignsPaymentService.createTransactionCampaignBrand(id, {
                description: "Brand Campaign Payment",
            })
            console.log('Transaction created successfully', res.data.trustap_url)
            router.push(res.data.trustap_url)
            await refetch()
        } catch (err) {
            console.error('Failed to create transaction:', err)
        } finally {
            setLoadingTransactions(prev => ({...prev, [id]: false}))
        }
    }, [router, refetch])

    const columns: ColumnDef<PaymentTable>[] = React.useMemo(() => [
        {
            accessorKey: "payment_id",
            header: () => <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Payment ID</span>,
            cell: ({getValue}) => (
                <span className="text-xs sm:text-sm whitespace-nowrap">
                    {getValue() === null ? "-" : getValue() as number}
                </span>
            ),
        },
        {
            accessorKey: "bid_id",
            header: () => <span className="text-xs sm:text-sm font-medium whitespace-nowrap">Bid ID</span>,
            cell: ({getValue}) => (
                <span className="text-xs sm:text-sm whitespace-nowrap">{getValue() as number}</span>
            ),
        },
        {
            accessorKey: "campaign_name",
            header: () => <span className="text-xs sm:text-sm font-medium">Campaign</span>,
            cell: ({getValue}) => (
                <span className="text-xs sm:text-sm block max-w-[120px] sm:max-w-[200px] md:max-w-xs truncate">
                    {getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "bidder_name",
            header: () => <span className="text-xs sm:text-sm font-medium">Bidder</span>,
            cell: ({getValue}) => (
                <span className="text-xs sm:text-sm block max-w-[100px] sm:max-w-[150px] md:max-w-xs truncate">
                    {getValue() as string}
                </span>
            ),
        },
        {
            accessorKey: "price",
            header: () => <span className="text-xs sm:text-sm font-medium">Price</span>,
            cell: ({getValue}) => (
                <span className="text-xs sm:text-sm font-medium text-slate-800 whitespace-nowrap">
                    NPR {Number(getValue()).toLocaleString()}
                </span>
            ),
        },
        {
            accessorKey: "bidded_at",
            header: () => <span className="text-xs sm:text-sm font-medium">Date</span>,
            cell: ({getValue}) => {
                const date = new Date(getValue() as string)
                return (
                    <span className="text-slate-600 whitespace-nowrap text-xs sm:text-sm">
                        {date.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })}
                    </span>
                )
            },
        },
        {
            accessorKey: "status",
            header: () => <span className="text-xs sm:text-sm font-medium">Status</span>,
            cell: ({getValue}) => {
                const status = getValue() as PaymentTable["status"]

                if (status === null) {
                    return (
                        <span className="px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full capitalize whitespace-nowrap bg-gray-100 text-gray-700">
                            Not Created
                        </span>
                    )
                }

                const statusColor = {
                    amount_claimed: "bg-blue-100 text-blue-700",
                    pending: "bg-yellow-100 text-yellow-700",
                    paid: "bg-green-100 text-green-700",
                    failed: "bg-red-100 text-red-700",
                }[status]

                return (
                    <span
                        className={`px-2 py-1 text-[10px] sm:text-xs font-semibold rounded-full capitalize whitespace-nowrap ${statusColor}`}
                    >
                        {status.replace("_", " ")}
                    </span>
                )
            },
        },
        {
            accessorKey: "actions",
            header: () => <span className="text-xs sm:text-sm font-medium">Actions</span>,
            cell: ({row}) => {
                const isTransactionCreated = row.original.payment_id !== null && row.original.status !== null
                const isLoading = loadingTransactions[row.original.bid_id]

                if (isTransactionCreated) {
                    return (
                        <span className="text-xs text-muted-foreground">
                            Transaction created
                        </span>
                    )
                }

                return (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 sm:h-8 px-2 sm:px-3 text-xs whitespace-nowrap"
                        onClick={() => handleCreateTransaction(row.original.bid_id)}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Transaction"}
                    </Button>
                )
            },
        }
    ], [loadingTransactions, handleCreateTransaction])

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-slate-800">
                Brand Campaign Payments
            </h1>
            <div className="overflow-x-auto -mx-2 sm:-mx-3 md:mx-0">
                <div className="inline-block min-w-full align-middle px-2 sm:px-3 md:px-0">
                    <DataTable
                        data={data || []}
                        columns={columns}
                        loading={isLoading}
                        totalRows={data?.total || 0}
                        totalPagesFromApi={data?.last_page || 1}
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
                        filterPlaceholder="Filter campaigns..."
                    />
                </div>
            </div>
        </div>
    )
}