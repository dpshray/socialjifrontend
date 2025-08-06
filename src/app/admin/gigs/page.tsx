"use client"
import {useCallback, useEffect, useId, useRef, useState} from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    type PaginationState,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from "@tanstack/react-table"
import {
    ChevronDownIcon,
    ChevronUpIcon,
    CircleAlertIcon,
    CircleXIcon,
    Columns3Icon,
    ListChecksIcon,
    ListFilterIcon,
    TrashIcon,
    TrendingUpIcon,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {multiColumnFilterFn} from "@/lib/table-utils"
import type {GigInsight} from "@/types/gigs"
import adminService from "@/services/admin.service"
import {RowActions} from "@/components/table/row-actions"
import CustomPagination from "@/components/Pagiantion/pagination"
import {Skeleton} from "@/components/ui/skeleton"
import {DashboardCard} from "@/components/card/admin/admin-dashboard-card"

export default function GigsPage() {
    const id = useId()
    const inputRef = useRef<HTMLInputElement>(null)

    const [gigs, setGigs] = useState<GigInsight[]>([])
    const [loading, setLoading] = useState(false)
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const [totalRows, setTotalRows] = useState(0)
    const [totalPagesFromApi, setTotalPagesFromApi] = useState(1)
    const [gigsPublishedThisMonth, setGigsPublishedThisMonth] = useState(0)
    const [totalGigsPublished, setTotalGigsPublished] = useState(0)
    const [gigsPublishedLastTwoMonths, setGigsPublishedLastTwoMonths] = useState(0)

    const fetchGigs = useCallback(async () => {
        setLoading(true)
        try {
            const params = {
                page: pagination.pageIndex + 1,
                per_page: pagination.pageSize,
            }
            const response = await adminService.getGigsList(params)
            setGigs(response?.data)
            setTotalRows(response?.total || 0)
            setTotalPagesFromApi(response?.last_page || 1)
        } finally {
            setLoading(false)
        }
    }, [pagination.pageIndex, pagination.pageSize])

    useEffect(() => {
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth()
        const lastTwoMonths = [currentMonth, (currentMonth + 11) % 12, (currentMonth + 10) % 12] // includes current and last 2 months, handle wrapping year

        const countThisMonth = gigs.filter(gig => {
            const pubDate = new Date(gig.published_at)
            return pubDate.getFullYear() === currentYear && pubDate.getMonth() === currentMonth
        }).length

        const countLastTwoMonths = gigs.filter(gig => {
            const pubDate = new Date(gig.published_at)
            return pubDate.getFullYear() === currentYear && lastTwoMonths.includes(pubDate.getMonth())
                || (pubDate.getFullYear() === currentYear - 1 && pubDate.getMonth() > currentMonth) // edge case for last year months fallback
        }).length

        setGigsPublishedThisMonth(countThisMonth)
        setGigsPublishedLastTwoMonths(countLastTwoMonths)
        setTotalGigsPublished(gigs.length)
    }, [gigs])

    useEffect(() => {
        fetchGigs()
    }, [fetchGigs])

    const columns: ColumnDef<GigInsight>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
            header: "Gig Title",
            accessorKey: "title",
            cell: ({row}) => <div className="font-medium">{row.original.title}</div>,
            size: 250,
            filterFn: multiColumnFilterFn,
            enableHiding: false,
        },
        {
            header: "Category",
            accessorKey: "category",
            size: 180,
        },
        {
            header: "Influencer",
            accessorFn: (row) => `${row.user.first_name} ${row.user.last_name}`.trim() || row.user.nick_name || "N/A",
            id: "influencer",
            size: 180,
        },
        {
            header: "Published At",
            accessorKey: "published_at",
            cell: ({row}) => {
                const date = new Date(row.original.published_at)
                return date.toLocaleDateString()
            },
            size: 120,
        },
        {
            header: "Reviews",
            accessorKey: "total_reviews",
            size: 80,
        },
        {
            header: "Sold",
            accessorKey: "item_sold",
            size: 80,
        },
        {
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({row}) => <RowActions row={row}/>,
            size: 60,
            enableHiding: false,
        },
    ]

    const table = useReactTable({
        data: gigs,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        manualPagination: true,
        rowCount: totalRows,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    const handleDeleteRows = () => {
        const selectedRowIds = Object.keys(table.getState().rowSelection)
        console.log("Deleting rows with IDs:", selectedRowIds)
        table.toggleAllRowsSelected(false)
    }

    const handlePageChange = (page: number) => {
        table.setPageIndex(page - 1)
    }

    const effectivePageSize = pagination.pageSize

    return (
        <div className="container mx-auto py-10">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Active Gigs</h1>
                <p className="text-muted-foreground text-sm">Manage your active gigs, view details, and perform
                    actions.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <DashboardCard
                    title="Total Gigs"
                    value={totalRows}
                    description="Total gigs in your system"
                    icon={ListChecksIcon}
                />
                <DashboardCard
                    title="Gigs Published This Month"
                    value={gigsPublishedThisMonth}
                    description="New gigs added recently"
                    icon={TrendingUpIcon}
                />
                <DashboardCard
                    title="Total Gigs Published"
                    value={totalGigsPublished}
                    description="Total gigs fetched"
                    icon={TrendingUpIcon}
                />
                <DashboardCard
                    title="Gigs Published Last 2 Months"
                    value={gigsPublishedLastTwoMonths}
                    description="New gigs published in the last two months"
                    icon={TrendingUpIcon}
                />
            </div>
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Input
                                id={`${id}-input`}
                                ref={inputRef}
                                className={cn(
                                    "peer min-w-60 ps-9",
                                    Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9"
                                )}
                                value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
                                onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
                                placeholder="Filter by title or category..."
                                type="text"
                                aria-label="Filter by title or category"
                            />
                            <div
                                className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                                <ListFilterIcon size={16} aria-hidden="true"/>
                            </div>
                            {Boolean(table.getColumn("title")?.getFilterValue()) && (
                                <button
                                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Clear filter"
                                    onClick={() => {
                                        table.getColumn("title")?.setFilterValue("")
                                        if (inputRef.current) {
                                            inputRef.current.focus()
                                        }
                                    }}
                                >
                                    <CircleXIcon size={16} aria-hidden="true"/>
                                </button>
                            )}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">
                                    <Columns3Icon className="-ms-1 opacity-60" size={16} aria-hidden="true"/>
                                    View
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) => column.toggleVisibility(!!value)}
                                            onSelect={(event) => event.preventDefault()}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="flex items-center gap-3">
                        {table.getSelectedRowModel().rows.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="ml-auto bg-transparent" variant="outline">
                                        <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true"/>
                                        Delete
                                        <span
                                            className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                            {table.getSelectedRowModel().rows.length}
                                        </span>
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                                        <div
                                            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                                            aria-hidden="true">
                                            <CircleAlertIcon className="opacity-80" size={16}/>
                                        </div>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete{" "}
                                                {table.getSelectedRowModel().rows.length} selected{" "}
                                                {table.getSelectedRowModel().rows.length === 1 ? "row" : "rows"}.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDeleteRows}>Delete</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </div>
                <div className="bg-background overflow-hidden rounded-md border">
                    <Table className="table-fixed">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id} style={{width: `${header.getSize()}px`}}
                                                   className="h-11">
                                            {header.isPlaceholder
                                                ? null
                                                : header.column.getCanSort()
                                                    ? (
                                                        <div
                                                            className={cn(
                                                                header.column.getCanSort() &&
                                                                "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                                                            )}
                                                            onClick={header.column.getToggleSortingHandler()}
                                                            onKeyDown={(e) => {
                                                                if (header.column.getCanSort() && (e.key === "Enter" || e.key === " ")) {
                                                                    e.preventDefault()
                                                                    header.column.getToggleSortingHandler()?.(e)
                                                                }
                                                            }}
                                                            tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                        >
                                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                                            {{
                                                                asc: <ChevronUpIcon className="shrink-0 opacity-60"
                                                                                    size={16} aria-hidden="true"/>,
                                                                desc: <ChevronDownIcon className="shrink-0 opacity-60"
                                                                                       size={16} aria-hidden="true"/>
                                                            }[header.column.getIsSorted() as string] ?? null}
                                                        </div>
                                                    )
                                                    : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [...Array(effectivePageSize)].map((_, i) => (
                                    <TableRow key={`skeleton-${i}`}>
                                        {columns.map((_, j) => (
                                            <TableCell key={`skeleton-cell-${j}`}>
                                                <Skeleton className="h-4 w-full"/>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="last:py-0">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-between gap-8">
                    <div className="flex items-center gap-3">
                        <Label htmlFor={id} className="max-sm:sr-only">
                            Rows per page
                        </Label>
                        <Select
                            value={table.getState().pagination.pageSize.toString()}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                                <SelectValue placeholder="Select number of results"/>
                            </SelectTrigger>
                            <SelectContent
                                className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                                {[5, 10, 25, 50].map(pageSize => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                        <p className="text-muted-foreground text-sm whitespace-nowrap" aria-live="polite">
              <span className="text-foreground">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
                  {Math.min(
                      Math.max(
                          table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                          table.getState().pagination.pageSize,
                          0,
                      ),
                      table.getRowCount(),
                  )}
              </span>{" "}
                            of <span className="text-foreground">{table.getRowCount().toString()}</span>
                        </p>
                    </div>
                    <div>
                        <CustomPagination
                            currentPage={table.getState().pagination.pageIndex + 1}
                            totalPages={totalPagesFromApi}
                            onPageChangeAction={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
