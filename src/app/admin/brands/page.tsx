"use client"

import React, {useCallback, useEffect, useState} from "react"
import {ListChecksIcon} from "lucide-react"
import {DataTable} from "@/components/table/data-table"
import {ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState,} from "@tanstack/react-table"
import adminService from "@/services/admin.service"
import {Checkbox} from "@/components/ui/checkbox"
import {RowActions} from "@/components/table/row-actions"
import {AdminBrandTable} from "@/types/admin"
import {DashboardCard} from "@/components/card/admin/admin-dashboard-card"
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function AdminBrandPage() {
    const [loading, setLoading] = useState(false)
    const [brands, setBrands] = useState<AdminBrandTable[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const [totalRows, setTotalRows] = useState(0)
    const [totalPagesFromApi, setTotalPagesFromApi] = useState(1)
    const router = useRouter()
    const fetchBrands = useCallback(async () => {
        setLoading(true)
        try {
            const params = {
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            }
            const response = await adminService.getBrandList(params)
            setBrands(response?.data || [])
            setTotalRows(response?.total || 0)
            setTotalPagesFromApi(response?.last_page || 1)
        } catch (error) {
            console.error("Error fetching brands:", error)
        } finally {
            setLoading(false)
        }
    }, [pagination.pageIndex, pagination.pageSize])

    useEffect(() => {
        fetchBrands()
    }, [fetchBrands])

    const columns: ColumnDef<AdminBrandTable>[] = [
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
            size: 36,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Name",
            size: 250,
            cell: ({row}) => (
                <div className="flex items-center gap-2 max-w-[250px] overflow-hidden">
                    <Image
                        src={row.original.image || "/placeholder.svg"}
                        alt={`${row.original.first_name} image`}
                        className="h-8 w-8 flex-shrink-0 rounded object-cover"
                        width={32}
                        height={32}
                        priority
                    />
                    <div className="min-w-0 overflow-hidden">
                        <span
                            className="text-sm font-medium truncate block">{`${row.original.first_name} ${row.original.last_name}`}</span>
                        <span className="text-xs text-muted-foreground truncate block">@{row.original.nick_name}</span>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            size: 250,
            cell: ({row}) => <div className="truncate max-w-[250px]">{row.original.email}</div>,
        },
        {
            accessorKey: "about",
            header: "About",
            size: 300,
            cell: ({row}) => (
                <div className="truncate max-w-[300px]" title={row.original.about}>
                    {row.original.about}
                </div>
            ),
        },
        {
            accessorKey: "social_profiles",
            header: "Social Profiles",
            size: 120,
            cell: ({row}) => (
                <div className="text-sm text-muted-foreground text-center">{row.original.social_profiles.length}</div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            size: 80,
            cell: ({row}) => <RowActions row={row} onViewAction={handleView}/>,
            enableSorting: false,
            enableHiding: false,
        },
    ]
    const handleView = (brand: AdminBrandTable) => {
        router.push(`/admin/brands/${brand.nick_name}`)
    }
    const handleDeleteRows = (selectedRowIds: string[]) => {
        console.log("Deleting rows with IDs:", selectedRowIds)
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Brand List</h1>
                <p className="text-muted-foreground text-sm">
                    Manage your active brands, view details, and perform actions.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <DashboardCard
                    title="Total Brands"
                    value={totalRows}
                    description="Total gigs from all influencers"
                    icon={ListChecksIcon}
                />
            </div>
            <DataTable
                data={brands}
                columns={columns}
                loading={loading}
                totalRows={totalRows}
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
                filterColumnId="name"
                filterPlaceholder="Filter by name, email, or nickname..."
                paginationEnabled={true}
            />
        </div>
    )
}
