"use client"

import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { PaginationState, ColumnDef, SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table"
import { DataTable } from "@/components/table/data-table"
import campaignService from "@/services/campaign.service"

interface PaymentData {
    payment_id: number
    bid_id: number
    price: number
    campaign_name: string
    campaign_brand_name: string
    bidded_at: string
    status: string
}

export default function InfluencerAssignProject() {
    const router = useRouter()
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
    const [totalItems, setTotalItems] = useState(0)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [error, setError] = useState<string>("")

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ["influencer-projects", pagination.pageIndex, pagination.pageSize],
        queryFn: async () => {
            try {
                const params = { page: pagination.pageIndex + 1, per_page: pagination.pageSize }
                const res = await campaignService.getBrandCampaignPaymentsNoTrustapUser(params)
                setTotalItems(res.total)
                return res.data || []
            } catch (err: any) {
                setError(err.message || "Failed to fetch data")
                return []
            }
        }
    })

    const filteredData = useMemo(() => payments, [payments])

    const columns: ColumnDef<PaymentData>[] = useMemo(
        () => [
            { accessorKey: "bid_id", header: "Bid ID" },
            { accessorKey: "campaign_name", header: "Campaign" },
            { accessorKey: "campaign_brand_name", header: "Brand" },
            { accessorKey: "price", header: "Price" },
            { accessorKey: "bidded_at", header: "Date" },
        ],
        []
    )

    return (
        <div className="p-2 sm:p-3 md:p-4 lg:p-6">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-4">Influencer Assign Project</h1>
            <div className="overflow-x-auto -mx-2 sm:-mx-3 md:mx-0">
                <div className="inline-block min-w-full align-middle px-2 sm:px-3 md:px-0">
                    <DataTable<PaymentData, unknown>
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
                        noResultText={error}
                    />
                </div>
            </div>
        </div>
    )
}
