'use client'

import {useEffect, useState} from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import {format} from "date-fns"
import {ArrowUpDown, Columns3Icon, DollarSign, DownloadCloud, FilterIcon, User2} from "lucide-react"

import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Checkbox} from "@/components/ui/checkbox"
import {Label} from "@/components/ui/label"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow} from "@/components/ui/table"

import {cn} from "@/lib/utils"
import CustomPagination from "@/components/Pagiantion/pagination"
import {InfluencerPaymentCard} from "@/components/card/influencer/influencer-payment-card"
import influencerService from "@/services/InfluencerService"

type StatusType = "amount_claimed" | "Active" | "Pending" | "Inactive"

interface InfluencerTransaction {
    id: number
    status: StatusType
    price: string
    currency: string
    item_delivery_deadline: string
    gig: {
        id: number
        title: string
        user: {
            id: number
            nick_name: string
            first_name: string
            middle_name: string | null
            last_name: string
            email: string
        }
    }
    pricing_tier: {
        id: number
        name: string
        label: string
    }
    buyer: {
        id: number
        first_name: string
        middle_name: string | null
        last_name: string | null
        nick_name: string
        email: string
    }
}

export default function PaymentPage() {
    const [payments, setPayments] = useState<InfluencerTransaction[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [loading, setLoading] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

    useEffect(() => {
        const fetchInfluencerTransactions = async () => {
            setLoading(true)
            const params = {page: currentPage, per_page: pageSize}
            try {
                const response = await influencerService.influencerTransactionList(params)
                const apiData = response.data?.data || []
                setPayments(apiData)
                setTotalItems(response.data?.total || 0)
            } catch (error) {
                console.error("Error fetching influencer transactions:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchInfluencerTransactions()
    }, [currentPage, pageSize])

    const uniqueStatusValues = Array.from(new Set(payments.map(p => p.status)))
    const statusCounts = new Map(uniqueStatusValues.map(status => [status, payments.filter(p => p.status === status).length]))
    const filteredData = selectedStatuses.length > 0 ? payments.filter(payment => selectedStatuses.includes(payment.status)) : payments

    const handleStatusChange = (checked: boolean, value: string) => {
        if (checked) setSelectedStatuses(prev => [...prev, value])
        else setSelectedStatuses(prev => prev.filter(status => status !== value))
    }

    const columns: ColumnDef<InfluencerTransaction>[] = [
        {
            accessorKey: "id",
            header: () => <span className="text-sm font-medium">ID</span>,
            cell: ({row}) => <span className="text-sm">{row.original.id}</span>
        },
        {
            accessorKey: "gig.title",
            header: () => <span className="text-sm font-medium">Gig</span>,
            cell: ({row}) => <span className="text-sm font-semibold text-foreground">{row.original.gig.title}</span>
        },
        {
            accessorKey: "buyer.nick_name",
            header: () => <span className="text-sm font-medium">Buyer</span>,
            cell: ({row}) => (
                <span className="flex items-center gap-1 text-sm">
                    <User2 className="w-4 h-4 text-muted-foreground"/>
                    {row.original.buyer.nick_name}
                </span>
            )
        },
        {
            accessorKey: "status",
            header: () => <span className="text-sm font-medium">Status</span>,
            cell: ({row}: { row: { original: { status: string } } }) => {
                const status = row.original.status as string

                let variant: "default" | "secondary" | "destructive" = "destructive"

                if (status === "amount_claimed") variant = "default"
                else if (status === "Active") variant = "secondary"
                else variant = "destructive"

                return (
                    <Badge variant={variant} className="capitalize text-xs px-2 py-0.5">
                        {status.replace(/_/g, " ")}
                    </Badge>
                )
            }

        },
        {
            accessorKey: "price",
            header: ({column}) => (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex items-center gap-1 text-sm font-medium"
                >
                    <DollarSign className="w-4 h-4 text-muted-foreground"/>
                    Price
                    <ArrowUpDown className="w-3 h-3 text-muted-foreground"/>
                </button>
            ),
            cell: ({row}) => (
                <span className="text-sm font-medium whitespace-nowrap">
                    ${Number.parseFloat(row.original.price).toLocaleString()} {row.original.currency.toUpperCase()}
                </span>
            )
        },
        {
            accessorKey: "item_delivery_deadline",
            header: () => <span className="text-sm font-medium">Deadline</span>,
            cell: ({row}) => (
                <span className="text-sm">{format(new Date(row.original.item_delivery_deadline), "PPP p")}</span>
            )
        },
        {
            accessorKey: "pricing_tier.label",
            header: () => <span className="text-sm font-medium">Tier</span>,
            cell: ({row}) => <span className="text-sm">{row.original.pricing_tier.label}</span>
        }
    ]

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        state: {sorting, columnFilters}
    })

    const totalPages = Math.ceil(totalItems / pageSize)

    return (
        <section className="my-4 px-4 md:px-8 max-w-7xl mx-auto">
            <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 mt-8 md:mt-12">
                <h1 className="font-inter text-2xl md:text-4xl leading-snug text-black/80 font-bold">Payments
                    Overview</h1>
                <div className="flex items-center gap-2">
                    <Button variant="secondary"
                            className="bg-white border border-gray-300 text-gray-800 hover:bg-gray-100">
                        <DownloadCloud className="w-4 h-4 mr-2"/>
                        Export
                    </Button>
                    <Button variant="default" className="bg-[#BE50C8] text-white hover:bg-[#A640B8]">
                        Create Payment Request
                    </Button>
                </div>
            </div>

            <div>
                <h2 className="font-inter text-lg font-semibold mb-2 bg-gradient-to-r from-purple-600 via-emerald-500 to-pink-500 bg-clip-text text-transparent">
                    Recent Payments
                </h2>
                <ScrollArea className="max-w-7xl whitespace-nowrap scrollbar-none rounded-md bg-transparent">
                    <div className="flex w-max gap-3">
                        {payments.map((user, index) => (
                            <InfluencerPaymentCard key={index} user={user as any}/>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal"
                               className={cn("not-active: hidden data-[orientation=horizontal]:", "data-[orientation=vertical]:")}/>
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
                                        <span className="ms-2 inline-flex items-center rounded border px-1 text-xs">
                                            {selectedStatuses.length}
                                        </span>
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
                                                {value.replace(/_/g, " ")}
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
                                {table.getAllColumns().filter(column => column.getCanHide()).map(column => (
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        Loading...
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}
                                              className="text-center">
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
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
                                        currency: "USD"
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
                        onPageChangeAction={setCurrentPage}
                        className="border-none shadow-none"
                    />
                </div>
            </div>
        </section>
    )
}
