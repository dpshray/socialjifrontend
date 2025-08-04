"use client"

import {useEffect, useMemo, useState} from "react"
import {Button} from "@/components/ui/button"
import {Columns3Icon, DownloadCloud, Edit, FilterIcon} from "lucide-react"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import {type ColumnDef, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table"
import {Checkbox} from "@/components/ui/checkbox"
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Badge} from "@/components/ui/badge"
import {Label} from "@/components/ui/label"
import {cn} from "@/lib/utils"
import CustomPagination from "@/components/Pagiantion/pagination"
import {PaymentCard} from "@/components/card/brand/PaymentCard"
import ComplainModal from "@/components/modal/complain-modal"
import paymentService from "@/services/paymentService"

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

export default function BrandPaymentPage() {
    const [payments, setPayments] = useState<ApiPayment[]>([])
    const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isComplainModalOpen, setIsComplainModalOpen] = useState(false)
    const [selectedPaymentForComplaint, setSelectedPaymentForComplaint] = useState<PaymentItem | null>(null)


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await paymentService.brandPaymentList({per_page: 10, page: currentPage})
                console.log(' Response from brandPaymentList:', response.data);
                setPayments(response.data.data)
                setTotalPages(response.data.last_page)
            } catch (error) {
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [currentPage])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

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

    const filteredData = useMemo(() => {
        return selectedStatuses.length === 0
            ? transformedData
            : transformedData.filter(item => selectedStatuses.includes(item.status))
    }, [selectedStatuses, transformedData])

    const uniqueStatusValues = useMemo(() => Array.from(new Set(transformedData.map(d => d.status))), [transformedData])

    const statusCounts = useMemo(() => {
        const map = new Map<StatusType, number>()
        transformedData.forEach(d => {
            map.set(d.status, (map.get(d.status) || 0) + 1)
        })
        return map
    }, [transformedData])

    const handleStatusChange = (checked: boolean, value: StatusType) => {
        setSelectedStatuses(prev => (checked ? [...prev, value] : prev.filter(s => s !== value)))
    }

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
            cell: ({row}) => <div className="max-w-[200px] truncate"
                                  title={row.getValue("gigTitle")}>{row.getValue("gigTitle")}</div>,
        },
        {header: "Tier", accessorKey: "paymentMethod"},
        {
            header: "Status",
            accessorKey: "status",
            cell: ({row}) => {
                const status = row.getValue("status") as StatusType

                const labelMap: Record<StatusType, string> = {
                    amount_claimed: "Claimed",
                    amount_paid: "Claimed",
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
                            status === "Inactive" && "bg-muted-foreground/60 text-primary-foreground"
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
            enableHiding: true,
            cell: ({row}) => {
                const complainAllowed = row.getValue("complain_allowed") as boolean
                return complainAllowed ? "Yes" : "No"
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({row}) => {
                const complain_allowed = row.getValue("complain_allowed") as boolean
                const paymentItem = row.original as PaymentItem
                return (
                    <Button
                        variant="secondary"
                        className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100"
                        disabled={!complain_allowed}
                        onClick={() => {
                            setSelectedPaymentForComplaint(paymentItem)
                            setIsComplainModalOpen(true)
                        }}
                    >
                        <Edit className="w-4 h-4"/>
                        Complain
                    </Button>
                )
            },
        },
    ]

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    if (loading) {
        return (
            <section className="my-4 px-4 md:px-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#BE50C8]"/>
                </div>
            </section>
        )
    }

    return (
        <section className="my-4 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="mb-4 rounded-md border border-gray-200 bg-muted p-4 text-sm text-muted-foreground">
                Once the delivery is completed, your payment will be securely held in
                your <strong>Trustap</strong> account. <br/>
                If there are any issues, you can raise a complaint <strong>24 hours after delivery</strong>.
            </div>

            <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 mt-8 md:mt-12">
                <h1 className="text-2xl md:text-4xl font-bold leading-snug text-black/80">Payments Overview</h1>
                <div className="flex items-center gap-2">
                    <Button variant="secondary"
                            className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100">
                        <DownloadCloud className="w-4 h-4 mr-2"/>
                        Export
                    </Button>
                    <Button variant="default" className="bg-[#BE50C8] hover:bg-[#A640B4] text-white">Create Payment
                        Request</Button>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 via-emerald-500 to-pink-500 bg-clip-text text-transparent">
                    Recent Payments
                </h2>
                <ScrollArea className="whitespace-nowrap rounded-md">
                    <div className="flex w-max gap-3 pb-4">
                        {payments.map(user => (
                            <PaymentCard key={user.id} user={user as any}/>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal"/>
                </ScrollArea>
            </div>

            <div className="my-6 md:my-10 bg-white border-b-none">
                <div className="rounded-md p-4 border border-gray-200 overflow-x-auto">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline">
                                    <FilterIcon className="me-2 opacity-60" size={16}/>
                                    Status
                                    {selectedStatuses.length > 0 && (
                                        <span
                                            className="ms-2 inline-flex items-center rounded border px-1 text-xs">{selectedStatuses.length}</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-52 p-3" align="start">
                                <div className="space-y-3">
                                    <div className="text-xs font-medium text-muted-foreground">Filters</div>
                                    {uniqueStatusValues.map((value, i) => (
                                        <div key={value} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`status-${i}`}
                                                checked={selectedStatuses.includes(value)}
                                                onCheckedChange={(checked: boolean) => handleStatusChange(checked, value)}
                                            />
                                            <Label htmlFor={`status-${i}`}
                                                   className="flex grow justify-between gap-2 font-normal cursor-pointer">
                                                {value}
                                                <span
                                                    className="text-muted-foreground text-xs">{statusCounts.get(value)}</span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Columns3Icon className="me-2 opacity-60" size={16}/>
                                    View
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                                {table
                                    .getAllColumns()
                                    .filter(column => column.getCanHide())
                                    .map(column => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={value => column.toggleVisibility(!!value)}
                                        >
                                            {column.id.replace(/([A-Z])/g, " $1").trim()}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map(header => (
                                        <TableHead key={header.id} className="text-center">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}
                                              className="text-center">
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell
                                                key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter className="bg-transparent">
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={6} className="font-medium">
                                    Total ({filteredData.length} payments)
                                </TableCell>
                                <TableCell className="text-right font-bold">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                    }).format(filteredData.reduce((total, item) => total + (Number(item.price) || 0), 0))}
                                </TableCell>

                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>

                <div className="flex justify-end items-center my-4">
                    <CustomPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChangeAction={handlePageChange}
                        className="border-none shadow-none"
                    />
                </div>
            </div>

            <ComplainModal
                isOpen={isComplainModalOpen}
                onCloseAction={() => {
                    setIsComplainModalOpen(false)
                    setSelectedPaymentForComplaint(null)
                }}
                paymentId={selectedPaymentForComplaint?.id}
                gigTitle={selectedPaymentForComplaint?.gigTitle}
            />
        </section>
    )
}
