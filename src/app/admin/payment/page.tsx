'use client'
import {AdminPaymentTable} from "@/types/admin"
import React, {useCallback, useEffect, useState} from "react"

import {ListChecksIcon} from 'lucide-react'
import {DataTable} from "@/components/table/data-table"
import {ColumnDef, ColumnFiltersState, PaginationState, SortingState, VisibilityState} from "@tanstack/react-table"
import adminService from "@/services/admin.service"
import {Checkbox} from "@/components/ui/checkbox"
import {RowActions} from "@/components/table/row-actions"
import {DashboardCard} from "@/components/card/admin/admin-dashboard-card";

export default function AdminPaymentPage() {
    const [loading, setLoading] = useState(false)
    const [payments, setPayments] = useState<AdminPaymentTable[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const [totalRows, setTotalRows] = useState(0)
    const [totalPagesFromApi, setTotalPagesFromApi] = useState(1)
    const [totalAmount, setTotalAmount] = useState(0)

    const fetchPayments = useCallback(async () => {
        setLoading(true)
        try {
            const params = {
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            }
            const response = await adminService.getPaymentList(params)
            setPayments(response?.data || [])
            setTotalRows(response?.total || 0)
            setTotalPagesFromApi(response?.last_page || 1)
            const sum = (response?.data || []).reduce((acc: number, pay: AdminPaymentTable) => {
                const priceNum = parseFloat(pay.price)
                return acc + (isNaN(priceNum) ? 0 : priceNum)
            }, 0)
            setTotalAmount(sum)
        } catch (error) {
            console.error("Error fetching payments:", error)
        } finally {
            setLoading(false)
        }
    }, [pagination.pageIndex, pagination.pageSize])

    useEffect(() => {
        fetchPayments()
    }, [fetchPayments])

    const columns: ColumnDef<AdminPaymentTable>[] = [
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
            accessorKey: "gig.title",
            header: "Gig Title",
            size: 200,
            cell: ({row}) => <div className="truncate max-w-[200px]">{row.original.gig.title}</div>,
        },
        {
            accessorKey: "buyer.nick_name",
            header: "Buyer Nickname",
            size: 150,
            cell: ({row}) => <div>{row.original.buyer.nick_name}</div>,
        },
        {
            accessorKey: "seller?.nick_name",
            header: "Seller Nickname",
            size: 150,
            cell: ({row}) => <div>{row.original.seller?.nick_name || "-"}</div>,
        },
        {
            accessorKey: "price",
            header: "Price",
            size: 100,
            cell: ({row}) => (
                <div>
                    {row.original.price} {row.original.currency}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            size: 120,
            cell: ({row}) => <div>{row.original.status}</div>,
        },
        {
            accessorKey: "transaction_date",
            header: "Transaction Date",
            size: 160,
            cell: ({row}) => <div>{new Date(row.original.transaction_date).toLocaleDateString()}</div>,
        },
        {
            id: "actions",
            header: "Actions",
            size: 80,
            cell: ({row}) => <RowActions row={row as any}/>,
            enableSorting: false,
            enableHiding: false,
        },
    ]

    const handleDeleteRows = (selectedRowIds: string[]) => {
        console.log("Deleting rows with IDs:", selectedRowIds)
    }

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Payment List</h1>
                <p className="text-muted-foreground text-sm">
                    Manage payments, view details, and perform actions.
                </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <DashboardCard
                    title="Total Payments"
                    value={totalRows}
                    description="Total number of payments"
                    icon={ListChecksIcon}
                />
                <DashboardCard
                    title="Total Amount"
                    value={`$${totalAmount.toFixed(2)}`}
                    description="Sum of all payments"
                    icon={ListChecksIcon}
                />
            </div>
            <DataTable
                data={payments}
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
                filterColumnId="buyer.nick_name"
                filterPlaceholder="Filter by buyer nickname, gig title, or status..."
                paginationEnabled={true}
            />
        </div>
    )
}
