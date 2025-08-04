'use client';

import {useEffect, useState} from "react";
import {gigsService} from "@/services/gigs.service";
import {ColumnDef} from "@tanstack/react-table";
import {ReusableDataTable} from "@/components/table/ReusableDataTable";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";

interface Gig {
    id: number;
    title: string;
    user: {
        nick_name: string;
        email: string;
        image: string;
    };
    tags: { id: number; name: string }[];
    pricings: {
        label: string;
        price: string;
        currency: {
            symbol: string;
        };
    }[];
}

export default function LatestGigsTable() {
    const [data, setData] = useState<Gig[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await gigsService.GetAllGigs(1);
                const allGigs = response?.data || [];

                const latestFive = allGigs
                    .sort((a: Gig, b: Gig) => b.id - a.id)
                    .slice(0, 5);

                setData(latestFive);
                console.log(' Latest gigs:', latestFive);
            } catch (error) {
                console.error("Failed to fetch gigs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns: ColumnDef<Gig>[] = [
        {
            header: "S.N.",
            id: "serial",
            cell: ({row}) => row.index + 1,
        },
        {
            header: "Title",
            accessorKey: "title",
            cell: ({row}) => (
                <div className="font-medium max-w-[200px] truncate">{row.original.title}</div>
            ),
            enableSorting: false,
        },
        {
            header: "Influencer",
            accessorKey: "user.nick_name",
            cell: ({row}) => (
                <div className="flex items-center gap-2">
                    <Image
                        width={300}
                        height={300}
                        src={row.original.user.image || "/placeholder.png?w=32&h=32"}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-medium">{row.original.user.nick_name}</div>
                        <div className="text-sm text-muted-foreground">{row.original.user.email}</div>
                    </div>
                </div>
            ),
            enableSorting: false,
        },
        {
            header: "Tags",
            accessorKey: "tags",
            cell: ({row}) => (
                <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {row.original.tags.map((tag) => (
                        <Badge key={tag.id}>
                            {tag.name}
                        </Badge>
                    ))}
                </div>
            ),
            enableSorting: false,
        },
        {
            header: "Pricing",
            accessorKey: "pricings",
            cell: ({row}) => {
                const pricing = row.original.pricings[0];
                return (
                    <div className="text-sm font-semibold">
                        {pricing.currency.symbol}
                        {pricing.price} ({pricing.label})
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    return (
        <div className={cn("p-4 md:p-6 lg:p-8")}>
            <h2 className="text-xl font-semibold mb-4">Latest Gigs (Top 5)</h2>
            <ReusableDataTable
                columns={columns}
                data={data}
                loading={loading}
                pageSize={5}
            />
        </div>
    );
}
