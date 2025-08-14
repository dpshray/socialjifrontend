'use client';

import { useEffect, useState } from "react";
import { gigsService } from "@/services/gigs.service";
import { ColumnDef } from "@tanstack/react-table";
import { ReusableDataTable } from "@/components/table/ReusableDataTable";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface Gig {
    id: number;
    title: string;
    user: {
        nick_name: string;
        email: string;
        image: string;
    };
    tags?: { id: number; name: string }[];
    pricings?: {
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
                const latestFive = allGigs.sort((a: Gig, b: Gig) => b.id - a.id).slice(0, 5);
                setData(latestFive);
                console.log("Latest Gigs Data:", latestFive);
            } catch {
                setData([]);
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
            cell: ({ row }) => row.index + 1,
        },
        {
            header: "Title",
            accessorKey: "title",
            cell: ({ row }) => (
                <div className="font-medium max-w-[200px] truncate">{row.original.title || "No Title"}</div>
            ),
            enableSorting: false,
        },
        {
            header: "Influencer",
            accessorKey: "user.nick_name",
            cell: ({ row }) => {
                const user = row.original.user || {};
                const imageSrc = user.image || "/placeholder.png";
                return (
                    <div className="flex items-center gap-2">
                        <Image width={32} height={32} src={imageSrc} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                        <div>
                            <div className="font-medium">{user.nick_name || "No Name"}</div>
                            <div className="text-sm text-muted-foreground">{user.email || "No Email"}</div>
                        </div>
                    </div>
                );
            },
            enableSorting: false,
        },
        {
            header: "Tags",
            accessorKey: "tags",
            cell: ({ row }) => {
                const tags = row.original.tags;
                if (!Array.isArray(tags) || tags.length === 0) {
                    return <Badge className="bg-blue-100 text-blue-800">No tags</Badge>;
                }
                return (
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {tags.map((tag) => (
                            <Badge key={tag.id} className="bg-blue-100 text-blue-800">{tag.name}</Badge>
                        ))}
                    </div>
                );
            },
            enableSorting: false,
        },
        {
            header: "Pricing",
            accessorKey: "pricings",
            cell: ({ row }) => {
                const pricings = row.original.pricings;
                if (!Array.isArray(pricings) || pricings.length === 0) {
                    return <div className="text-sm font-semibold">0</div>;
                }
                const pricing = pricings[0];
                return (
                    <div className="text-sm font-semibold">
                        {pricing.currency?.symbol || ""}
                        {pricing.price || "0"} ({pricing.label || "No label"})
                    </div>
                );
            },
            enableSorting: false,
        },
    ];

    return (
        <div className={cn("p-4 md:p-6 lg:p-8")}>
            <h2 className="text-xl font-semibold mb-4">Latest Gigs (Top 5)</h2>
            {data.length === 0 && !loading ? (
                <div className="text-center text-muted-foreground">No gigs available</div>
            ) : (
                <ReusableDataTable columns={columns} data={data} loading={loading} pageSize={5} />
            )}
        </div>
    );
}
