"use client"

import React from "react"
import {useQuery} from "@tanstack/react-query"
import campaignService from "@/services/campaign.service"

import {ColumnDef, PaginationState, SortingState, ColumnFiltersState, VisibilityState} from "@tanstack/react-table"
import {DataTable} from "@/components/table/data-table";

export interface BidTable {
    bid_id: number
    price: number
    campaign_name: string
    bidder_name: string
    bidded_at: string
    status: "pending" | "accepted" | "rejected" | "amount_paid" | string
}

export default function CampaignBrandPayment() {
    const [pagination, setPagination] = React.useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({})

    const {data, isLoading} = useQuery({
        queryKey: ["campaigns", pagination.pageIndex, pagination.pageSize],
        queryFn: async () => {
            const params = {
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            }
            const response = await campaignService.getBrandCampaignPayments(params)
            console.log('Response from getBrandCampaignPayments:', response.data)
            return response.data
        },
    })

    const columns: ColumnDef<BidTable>[] = [
        {accessorKey: "bid_id", header: "Bid ID"},
        {accessorKey: "campaign_name", header: "Campaign"},
        {accessorKey: "bidder_name", header: "Bidder"},
        {accessorKey: "price", header: "Price"},
        {accessorKey: "bidded_at", header: "Date"},
        {accessorKey: "status", header: "Status"},
    ]

    return (
        <div className="p-4">
            <DataTable
                data={data?.data || []}
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
                filterPlaceholder="Filter campaigns"
            />
        </div>
    )
}
