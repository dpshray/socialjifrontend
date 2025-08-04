"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { StatusType } from "@/types/types";
import { STATUS } from "@/lib/Constant";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FilterIcon, Columns3Icon } from "lucide-react";
import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";

// Types
interface Item {
    id: string;
    name: string;
    email: string;
    location: string;
    flag: string;
    status: StatusType;
    balance: number;
}

// Static data
const staticData: Item[] = [
    {
        id: "1",
        name: "Alice Johnson",
        email: "alice@example.com",
        location: "PayPal",
        flag: "🇺🇸",
        status: "Active",
        balance: 1200,
    },
    {
        id: "2",
        name: "Bob Smith",
        email: "bob@example.com",
        location: "Stripe",
        flag: "🇬🇧",
        status: "Pending",
        balance: 843.75,
    },
    {
        id: "3",
        name: "Clara Davis",
        email: "clara@example.com",
        location: "Bank Transfer",
        flag: "🇨🇦",
        status: "Inactive",
        balance: 642.5,
    },
    {
        id: "4",
        name: "Daniel Lee",
        email: "daniel@example.com",
        location: "Wise",
        flag: "🇦🇺",
        status: "Active",
        balance: 2139.99,
    },
    {
        id: "5",
        name: "Emily Chen",
        email: "emily@example.com",
        location: "Payoneer",
        flag: "🇸🇬",
        status: "Pending",
        balance: 970.3,
    },
];

export default function PaymentsTable() {
    const [selectedStatuses, setSelectedStatuses] = useState<StatusType[]>([]);

    const filteredData = useMemo(() => {
        if (selectedStatuses.length === 0) return staticData;
        return staticData.filter((item) => selectedStatuses.includes(item.status));
    }, [selectedStatuses]);

    const uniqueStatusValues = useMemo(
        () => Array.from(new Set(staticData.map((d) => d.status))),
        []
    );

    const statusCounts = useMemo(() => {
        const map = new Map<StatusType, number>();
        staticData.forEach((d) => {
            map.set(d.status, (map.get(d.status) || 0) + 1);
        });
        return map;
    }, []);

    const handleStatusChange = (checked: boolean, value: StatusType) => {
        setSelectedStatuses((prev) =>
            checked ? [...prev, value] : prev.filter((s) => s !== value)
        );
    };

    const columns: ColumnDef<Item>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all rows"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        {
            header: "Creator Name",
            accessorKey: "name",
            cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
        },
        {
            header: "Git",
            accessorKey: "email",
        },
        {
            header: "Payment Method",
            accessorKey: "location",
            cell: ({ row }) => (
                <div>
                    <span className="text-lg leading-none">{row.original.flag}</span>{" "}
                    {row.getValue("location")}
                </div>
            ),
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => {
                const status: StatusType = row.getValue("status");
                return (
                    <Badge
                        className={cn(
                            status === "Inactive" && "bg-muted-foreground/60 text-primary-foreground",
                            status === "Active" && "bg-green-500 text-white",
                            status === "Pending" && "bg-yellow-500 text-white"
                        )}
                    >
                        {STATUS[status] || status}
                    </Badge>
                );
            },
        },
        {
            header: () => <div className="text-right">Amount</div>,
            accessorKey: "balance",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("balance"));
                const formatted = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(amount);
                return <div className="text-right">{formatted}</div>;
            },
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <FilterIcon className="me-2 opacity-60" size={16} />
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
                                        onCheckedChange={(checked: boolean) =>
                                            handleStatusChange(checked, value)
                                        }
                                    />
                                    <Label htmlFor={`status-${i}`} className="flex grow justify-between gap-2 font-normal">
                                        {value} <span className="text-muted-foreground text-xs">{statusCounts.get(value)}</span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </PopoverContent>
                </Popover>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Columns3Icon className="me-2 opacity-60" size={16} />
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
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="hover:bg-transparent">
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
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
                <TableFooter className="bg-transparent">
                    <TableRow className="hover:bg-transparent">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(
                                filteredData.reduce((total, item) => total + item.balance, 0)
                            )}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}
