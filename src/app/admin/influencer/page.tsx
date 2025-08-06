"use client"
import {useCallback, useEffect, useState} from "react"
import type {
    ColumnDef,
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import adminService from "@/services/admin.service"
import {RowActions} from "@/components/table/row-actions"
import {DataTable} from "@/components/table/data-table"
import {createMultiColumnFilterFn} from "@/lib/table-utils"
import {DashboardCard} from "@/components/card/admin/admin-dashboard-card"
import {ListChecksIcon, StarIcon, Users2Icon} from "lucide-react"

type SocialProfile = { social: { label: string } }

export type InfluencerTable = {
    id: number
    first_name: string
    middle_name?: string
    last_name: string
    nick_name: string
    email: string
    total_gigs: number
    image: string
    rating: number
    social_profiles: SocialProfile[]
    highest_price_gig: string
    lowest_price_gig: string
}

export default function AdminInfluencerPage() {
    const [influencers, setInfluencers] = useState<InfluencerTable[]>([])
    const [loading, setLoading] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })

    const [totalInfluencers, setTotalInfluencers] = useState(0)
    const [totalPagesFromApi, setTotalPagesFromApi] = useState(1)
    const [totalGigs, setTotalGigs] = useState(0)
    const [totalReviews, setTotalReviews] = useState(0)
    const [averageRating, setAverageRating] = useState(0)

    const fetchInfluencers = useCallback(async () => {
        setLoading(true)
        try {
            const params = {
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            }
            const response = await adminService.getInfluencerList(params)
            const influencersData = response?.data ?? []
            setInfluencers(influencersData)
            setTotalInfluencers(response?.total ?? 0)
            setTotalPagesFromApi(response?.last_page ?? 1)
            const gigs = influencersData.reduce((sum: any, item:any) => sum + (item.total_gigs || 0), 0)
            const reviews = influencersData.reduce((sum:any, item:any) => sum + (item.rating ? 1 : 0), 0)
            const ratings = influencersData.map((item:any) => item.rating).filter(Boolean)
            const avgRating =
                ratings.length > 0
                    ? parseFloat((ratings.reduce((sum: any, r:any) => sum + r, 0) / ratings.length).toFixed(2))
                    : 0
            setTotalGigs(gigs)
            setTotalReviews(reviews)
            setAverageRating(avgRating)
        } catch (error) {
            console.error("Error fetching influencers:", error)
        } finally {
            setLoading(false)
        }
    }, [pagination.pageIndex, pagination.pageSize])

    useEffect(() => {
        fetchInfluencers()
    }, [fetchInfluencers])

    const influencerMultiColumnFilter = createMultiColumnFilterFn<InfluencerTable>([
        "first_name",
        "last_name",
        "nick_name",
        "email",
    ])

    const columns: ColumnDef<InfluencerTable>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            size: 28,
            enableSorting: false,
            enableHiding: false,
        },
        {
            header: "First Name",
            accessorKey: "first_name",
            cell: ({row}) => <div className="font-medium">{row.original.first_name}</div>,
            size: 150,
            filterFn: influencerMultiColumnFilter,
            enableHiding: false,
        },
        {
            header: "Last Name",
            accessorKey: "last_name",
            cell: ({row}) => <div className="font-medium">{row.original.last_name}</div>,
            size: 150,
            filterFn: influencerMultiColumnFilter,
        },
        {
            header: "Nickname",
            accessorKey: "nick_name",
            size: 150,
            filterFn: influencerMultiColumnFilter,
        },
        {
            header: "Email",
            accessorKey: "email",
            size: 200,
            filterFn: influencerMultiColumnFilter,
        },
        {
            header: "Total Gigs",
            accessorKey: "total_gigs",
            size: 100,
        },
        {
            header: "Rating",
            accessorKey: "rating",
            size: 80,
        },
        {
            header: "Social Profiles",
            accessorFn: (row) => row.social_profiles.length,
            id: "social_profiles_summary",
            cell: ({row}) => <div className="text-sm text-muted-foreground">{row.original.social_profiles.length}</div>,
            size: 150,
            enableSorting: false,
            filterFn: influencerMultiColumnFilter,
        },
        {
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({row}) => (
                <RowActions
                    row={row}
                    onViewAction={(influencer) => console.log("Viewing:", influencer)}
                    onEditAction={(influencer) => console.log("Editing:", influencer)}
                    onDeleteAction={(influencer) => console.log("Deleting:", influencer)}
                />
            ),
            size: 60,
            enableHiding: false,
        },
    ]

    const handleDeleteRows = (selectedRowIds: string[]) => {
        console.log("Deleting influencer rows with IDs:", selectedRowIds)
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Influencers</h1>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Influencer List</h1>
                <p className="text-muted-foreground text-sm">
                    Manage your active gigs, view details, and perform actions.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <DashboardCard title="Total Gigs" value={totalGigs} description="Gigs from this page"
                               icon={ListChecksIcon}/>
                <DashboardCard
                    title="Total Influencers"
                    value={totalInfluencers}
                    description="Influencers in the system"
                    icon={Users2Icon}
                />
                <DashboardCard
                    title="Total Reviews"
                    value={totalReviews}
                    description="Influencers with a rating"
                    icon={StarIcon}
                />
                <DashboardCard
                    title="Average Rating"
                    value={averageRating}
                    description="Avg rating from this page"
                    icon={StarIcon}
                />
            </div>
            <DataTable
                data={influencers}
                columns={columns}
                loading={loading}
                totalRows={totalInfluencers}
                totalPagesFromApi={totalPagesFromApi}
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
                onDeleteRows={handleDeleteRows}
                filterColumnId="first_name"
                filterPlaceholder="Filter by name, email, or nickname..."
            />
        </div>
    )
}
