"use client"
import React from "react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
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
    ListFilterIcon,
    TrashIcon,
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
import CustomPagination from "@/components/Pagiantion/pagination"
import {Skeleton} from "@/components/ui/skeleton"

interface DataTableProps<TData, TValue> {
    data: TData[]
    columns: ColumnDef<TData, TValue>[]
    loading: boolean
    totalRows: number
    totalPagesFromApi: number
    pagination: PaginationState
    setPagination: React.Dispatch<React.SetStateAction<PaginationState>>
    columnFilters: ColumnFiltersState
    setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    sorting: SortingState
    setSorting: React.Dispatch<React.SetStateAction<SortingState>>
    columnVisibility: VisibilityState
    setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
    rowSelection: Record<string, boolean>
    setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
    onDeleteRows: (selectedRowIds: string[]) => void
    filterColumnId?: string
    filterPlaceholder?: string
    paginationEnabled?: boolean
    noResultText?: string
}

export function DataTable<TData, TValue>({
                                             data,
                                             columns,
                                             loading,
                                             totalRows,
                                             totalPagesFromApi,
                                             pagination,
                                             setPagination,
                                             columnFilters,
                                             setColumnFilters,
                                             sorting,
                                             setSorting,
                                             columnVisibility,
                                             setColumnVisibility,
                                             rowSelection,
                                             setRowSelection,
                                             onDeleteRows,
                                             filterColumnId = "title",
                                             filterPlaceholder = "Filter",
                                             paginationEnabled = true,
                                             noResultText = "No results.",
                                         }: DataTableProps<TData, TValue>) {
    const id = React.useId()
    const inputRef = React.useRef<HTMLInputElement>(null)
    const effectiveFilterColumn = filterColumnId

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
        manualPagination: paginationEnabled,
        pageCount: paginationEnabled ? totalPagesFromApi : undefined,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: paginationEnabled ? getPaginationRowModel() : undefined,
        getFacetedUniqueValues: getFacetedUniqueValues(),
    })

    const handleClearFilter = React.useCallback(() => {
        table.getColumn(effectiveFilterColumn)?.setFilterValue("")
        inputRef.current?.focus()
    }, [table, effectiveFilterColumn])

    const selectedRowCount = table.getSelectedRowModel().rows.length
    const pageSize = pagination.pageSize
    const filterValue = (table.getColumn(effectiveFilterColumn)?.getFilterValue() ?? "") as string

    const skeletonRows = React.useMemo(() =>
            Array.from({length: pageSize}, (_, i) => i),
        [pageSize]
    )

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex  xs::flex-col flex-row items-stretch xs:items-center gap-2 sm:gap-3 w-full sm:w-auto sm:flex-auto">
                    <div className="relative w-full sm:min-w-[240px] sm:max-w-md">
                        <Input
                            id={`${id}-filter-input`}
                            ref={inputRef}
                            type="text"
                            aria-label={`Filter by ${effectiveFilterColumn}`}
                            placeholder={filterPlaceholder}
                            className={cn(
                                "peer ps-8 sm:ps-9 text-sm h-9 sm:h-10",
                                Boolean(filterValue) && "pe-8 sm:pe-9",
                            )}
                            value={filterValue}
                            onChange={(e) => table.getColumn(effectiveFilterColumn)?.setFilterValue(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 start-0 flex items-center ps-2.5 sm:ps-3 pointer-events-none text-muted-foreground/80 peer-disabled:opacity-50">
                            <ListFilterIcon size={14} className="sm:w-4 sm:h-4" aria-hidden="true"/>
                        </div>
                        {Boolean(filterValue) && (
                            <button
                                aria-label="Clear filter"
                                className="absolute inset-y-0 end-0 flex h-full w-8 sm:w-9 items-center justify-center rounded-e-md text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={handleClearFilter}
                            >
                                <CircleXIcon size={14} className="sm:w-4 sm:h-4" aria-hidden="true"/>
                            </button>
                        )}
                    </div>
                    <div><DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-1 h-9 sm:h-10 text-sm w-full xs:w-auto">
                                <Columns3Icon className="opacity-60 -ms-1" size={14} aria-hidden="true"/>
                                <span className="xs:inline">View</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[200px]">
                            <DropdownMenuLabel className="text-xs">Toggle columns</DropdownMenuLabel>
                            {table.getAllColumns()
                                .filter(col => col.getCanHide())
                                .map(column => (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        checked={column.getIsVisible()}
                                        onCheckedChange={checked => column.toggleVisibility(checked)}
                                        onSelect={e => e.preventDefault()}
                                        className="capitalize text-xs sm:text-sm"
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu></div>
                </div>

                {selectedRowCount > 0 && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="bg-transparent flex items-center gap-1 h-9 sm:h-10 text-sm w-full xs:w-auto">
                                <TrashIcon size={14} className="opacity-60 -ms-1" aria-hidden="true"/>
                                Delete
                                <span
                                    className="bg-background text-muted-foreground/70 -me-1 inline-flex h-4 sm:h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                                    {selectedRowCount}
                                </span>
                            </Button>
                        </AlertDialogTrigger>

                        <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 max-sm:items-center">
                                <div aria-hidden="true"
                                     className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full border">
                                    <CircleAlertIcon className="opacity-80" size={14}/>
                                </div>
                                <AlertDialogHeader className="text-left">
                                    <AlertDialogTitle className="text-base sm:text-lg">Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-xs sm:text-sm">
                                        This action cannot be undone. This will permanently
                                        delete {selectedRowCount} selected{" "}
                                        {selectedRowCount === 1 ? "row" : "rows"}.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                            </div>

                            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                                <AlertDialogCancel className="w-full sm:w-auto m-0">Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="w-full sm:w-auto"
                                    onClick={() => onDeleteRows(table.getSelectedRowModel().rows.map(r => r.id))}>
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </div>

            <div className="rounded-md border bg-background overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                            {table.getHeaderGroups().map(headerGroup => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <TableHead
                                            key={header.id}
                                            className="h-9 sm:h-11 text-xs sm:text-sm whitespace-nowrap"
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        "flex h-full cursor-pointer items-center justify-between gap-1 sm:gap-2 select-none",
                                                        header.column.getCanSort() && "cursor-pointer",
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={e => {
                                                        if ((e.key === "Enter" || e.key === " ") && header.column.getCanSort()) {
                                                            e.preventDefault()
                                                            header.column.getToggleSortingHandler()?.(e)
                                                        }
                                                    }}
                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                    role={header.column.getCanSort() ? "button" : undefined}
                                                    aria-sort={
                                                        header.column.getIsSorted()
                                                            ? header.column.getIsSorted() === "asc"
                                                                ? "ascending"
                                                                : "descending"
                                                            : "none"
                                                    }
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: <ChevronUpIcon className="opacity-60" size={14}
                                                                            aria-hidden="true"/>,
                                                        desc: <ChevronDownIcon className="opacity-60" size={14}
                                                                               aria-hidden="true"/>,
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                skeletonRows.map((i) => (
                                    <TableRow key={`skeleton-row-${i}`}>
                                        {columns.map((_, idx) => (
                                            <TableCell key={`skeleton-cell-${idx}`} className="py-2 sm:py-3">
                                                <Skeleton className="h-3 sm:h-4 w-full"/>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map(row => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                                        {row.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id} className="py-2 sm:py-3 text-xs sm:text-sm">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-20 sm:h-24 text-center text-xs sm:text-sm">
                                   {noResultText || "No results."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {paginationEnabled && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-4">
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <Label htmlFor={id} className="text-xs sm:text-sm whitespace-nowrap">
                            Rows per page
                        </Label>
                        <Select
                            value={pagination.pageSize.toString()}
                            onValueChange={value =>
                                setPagination(prev => ({...prev, pageSize: Number(value), pageIndex: 0}))
                            }
                        >
                            <SelectTrigger id={id} className="w-[70px] sm:w-fit whitespace-nowrap h-8 sm:h-9 text-xs sm:text-sm">
                                <SelectValue placeholder="Select"/>
                            </SelectTrigger>
                            <SelectContent
                                className="[&_[role=option]]:ps-2 [&_[role=option]]:pe-8 [&_[role=option]>span]:start-auto [&_[role=option]>span]:end-2">
                                {[5, 10, 25, 50].map(pageSizeOption => (
                                    <SelectItem key={pageSizeOption} value={pageSizeOption.toString()} className="text-xs sm:text-sm">
                                        {pageSizeOption}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-muted-foreground flex items-center justify-between sm:justify-end w-full sm:w-auto text-xs sm:text-sm">
                        <p aria-live="polite" className="whitespace-nowrap">
                            <span className="text-foreground">
                                {pagination.pageIndex * pagination.pageSize + 1}-
                                {Math.min(pagination.pageIndex * pagination.pageSize + pagination.pageSize, totalRows)}
                            </span>{" "}
                            of <span className="text-foreground">{totalRows}</span>
                        </p>
                    </div>

                    <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                        <CustomPagination
                            currentPage={pagination.pageIndex + 1}
                            totalPages={totalPagesFromApi}
                            onPageChangeAction={(page) => setPagination(prev => ({...prev, pageIndex: page - 1}))}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}