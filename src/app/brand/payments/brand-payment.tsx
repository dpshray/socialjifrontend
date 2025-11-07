"use client"

import {useEffect, useMemo, useState} from "react"
import paymentService from "@/services/paymentService"
import type {ColumnDef, PaginationState, SortingState, ColumnFiltersState, VisibilityState} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import {Badge} from "@/components/ui/badge"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Edit} from "lucide-react"
import {DataTable} from "@/components/table/data-table";


export type StatusType = "amount_claimed" | "amount_paid" | "delivered" | "Active" | "Pending" | "Inactive"

interface ApiPayment {
    id: number
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

interface PaymentItem {
    id: number
    creatorName: string
    creatorEmail: string
    gigTitle: string
    paymentMethod: string
    status: StatusType
    price: number
    complain_allowed: boolean
}

export default function BrandPaymentTable() {
    const [payments, setPayments] = useState<ApiPayment[]>([])
    const [loading, setLoading] = useState(true)
    const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 10})
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})
    const [totalRows, setTotalRows] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [isComplainModalOpen, setIsComplainModalOpen] = useState(false)
    const [selectedPaymentForComplaint, setSelectedPaymentForComplaint] = useState<PaymentItem | null>(null)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setLoading(true)
                const response = await paymentService.brandPaymentList({
                    per_page: pagination.pageSize,
                    page: pagination.pageIndex + 1,
                })
                setPayments(response.data.data)
                setTotalRows(response.data.total)
                setTotalPages(response.data.last_page)
                console.log('Brand',response)
            } finally {
                setLoading(false)
            }
        }
        fetchPayments()
    }, [pagination])

    const transformedData: PaymentItem[] = useMemo(
        () =>
            payments.map(item => ({
                id: item.id,
                creatorName: `${item.gig.user.first_name} ${item.gig.user.last_name}`,
                creatorEmail: item.gig.user.email,
                gigTitle: item.gig.title,
                paymentMethod: item.pricing_tier?.label ?? "Unknown",
                status: item.status,
                price: item.price,
                complain_allowed: item.complain_allowed,
            })),
        [payments],
    )

    const columns: ColumnDef<PaymentItem>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all rows"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={value => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        {header: "Creator", accessorKey: "creatorName"},
        {header: "Email", accessorKey: "creatorEmail"},
        {
            header: "Gig Title",
            accessorKey: "gigTitle",
            cell: ({row}) => (
                <div className="max-w-[200px] truncate" title={row.getValue("gigTitle") as string}>
                    {row.getValue("gigTitle")}
                </div>
            ),
        },
        {header: "Tier", accessorKey: "paymentMethod"},
        {
            header: "Status",
            accessorKey: "status",
            cell: ({row}) => {
                const status = row.getValue("status") as StatusType
                const labelMap: Record<StatusType, string> = {
                    amount_claimed: "Claimed",
                    amount_paid: "Paid",
                    delivered: "Delivered",
                    Active: "Active",
                    Pending: "Pending",
                    Inactive: "Inactive",
                }
                return (
                    <Badge
                        className={cn(
                            "capitalize",
                            (status === "amount_claimed" || status === "amount_paid") && "bg-green-600 text-white",
                            status === "delivered" && "bg-blue-600 text-white",
                            status === "Pending" && "bg-yellow-500 text-white",
                            status === "Inactive" && "bg-muted-foreground/60 text-primary-foreground",
                        )}
                    >
                        {labelMap[status] ?? status}
                    </Badge>
                )
            },
        },
        {
            header: () => <div className="text-right">Amount</div>,
            accessorKey: "price",
            cell: ({row}) => {
                const amount = Number(row.getValue("price"))
                return (
                    <div className="text-right font-medium">
                        {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                        }).format(amount)}
                    </div>
                )
            },
        },
        {
            accessorKey: "complain_allowed",
            header: "Complain Allowed",
            cell: ({row}) => ((row.getValue("complain_allowed") as boolean) ? "Yes" : "No"),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({row}) => {
                const complain_allowed = row.getValue("complain_allowed") as boolean
                const paymentItem = row.original as PaymentItem
                return (
                    <Button
                        variant="outline"
                        disabled={!complain_allowed}
                        onClick={() => {
                            setSelectedPaymentForComplaint(paymentItem)
                            setIsComplainModalOpen(true)
                        }}
                    >
                        <Edit className="w-4 h-4 mr-1" /> Complain
                    </Button>
                )
            },
        },
    ]

    return (
        <div className="p-4">
            <DataTable
                data={transformedData}
                columns={columns}
                loading={loading}
                totalRows={totalRows}
                totalPagesFromApi={totalPages}
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
                filterColumnId="creatorName"
                filterPlaceholder="Filter by creator"
            />
        </div>
    )
}
