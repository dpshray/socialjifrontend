"use client"

import {useMemo, useState} from "react"
import {ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState} from "@tanstack/react-table"
import {format} from "date-fns"
import {ArrowUpDown, DollarSign, User2} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import influencerService from "@/services/InfluencerService"
import {useQuery} from "@tanstack/react-query"
import {DataTable} from "@/components/table/data-table"

type StatusType = "amount_claimed" | "Active" | "Pending" | "Inactive"

interface CampaignData {
    id: number
    title: string
    price: string
    currency: string
    status: StatusType
    deadline: string
    buyer: {
        id: number
        first_name: string
        middle_name: string | null
        last_name: string | null
        nick_name: string
        email: string
    }
}

export default function CampaignTable() {
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const [totalItems, setTotalItems] = useState(0)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([])

    const {data: campaigns = [], isLoading} = useQuery({
        queryKey: ["campaigns", pagination.pageIndex, pagination.pageSize],
        queryFn: async () => {
            const response = await influencerService.campaignList({
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            })
            setTotalItems(response.data?.total || 0)
            return response.data?.data || []
        },
    })

    const filteredData = useMemo(() => {
        if (selectedStatuses.length === 0) return campaigns
        return campaigns.filter((campaign:any) => selectedStatuses.includes(campaign.status))
    }, [campaigns, selectedStatuses])

    const handleStatusChange = (checked: boolean, value: StatusType) => {
        setSelectedStatuses(prev => (checked ? [...prev, value] : prev.filter(s => s !== value)))
    }

    const columns: ColumnDef<CampaignData>[] = [
        {
            accessorKey: "id",
            header: () => <span className="text-sm font-medium">ID</span>,
            cell: ({row}) => <span className="text-sm">{row.original.id}</span>,
        },
        {
            accessorKey: "title",
            header: () => <span className="text-sm font-medium">Campaign</span>,
            cell: ({row}) => <span className="text-sm font-semibold text-foreground">{row.original.title}</span>,
        },
        {
            accessorKey: "buyer.nick_name",
            header: () => <span className="text-sm font-medium">Buyer</span>,
            cell: ({row}) => (
                <span className="flex items-center gap-1 text-sm">
          <User2 className="w-4 h-4 text-muted-foreground"/>
                    {row.original.buyer.nick_name}
        </span>
            ),
        },
        {
            accessorKey: "status",
            header: () => <span className="text-sm font-medium">Status</span>,
            cell: ({row}) => {
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
            header: ({column}) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-1 text-sm font-medium h-auto p-0 hover:bg-transparent"
                >
                    <DollarSign className="w-4 h-4 text-muted-foreground"/>
                    Price
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground"/>
                </Button>
            ),
            cell: ({row}) => (
                <span className="text-sm font-medium whitespace-nowrap">
          ${Number.parseFloat(row.original.price).toLocaleString()} {row.original.currency?.toUpperCase()}
        </span>
            ),
        },
        {
            accessorKey: "deadline",
            header: () => <span className="text-sm font-medium">Deadline</span>,
            cell: ({row}) => <span className="text-sm">{format(new Date(row.original.deadline), "PPP p")}</span>,
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

            <DataTable<CampaignData, unknown>
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
                onDeleteRows={() => {
                }}
                filterColumnId="title"
                filterPlaceholder="Filter by campaign"
            />
        </div>
    )
}
