// "use client"
//
// import {useEffect, useState} from "react"
// import {ColumnDef} from "@tanstack/react-table"
// import {format} from "date-fns"
// import {ArrowUpDown, DollarSign, User2} from "lucide-react"
//
// import {Badge} from "@/components/ui/badge"
// import {ReusableDataTable} from "@/components/table/ReusableDataTable"
// import influencerService from "@/services/InfluencerService"
//
// interface InfluencerTransaction {
//     id: number
//     status: string
//     price: string
//     currency: string
//     item_delivery_deadline: string
//     gig: {
//         id: number
//         title: string
//         user: {
//             id: number
//             nick_name: string
//             first_name: string
//             middle_name: string | null
//             last_name: string
//             email: string
//         }
//     }
//     pricing_tier: {
//         id: number
//         name: string
//         label: string
//     }
//     buyer: {
//         id: number
//         first_name: string
//         middle_name: string | null
//         last_name: string | null
//         nick_name: string
//         email: string
//     }
// }
//
// export function InfluencerTransactionTable() {
//     const [data, setData] = useState<InfluencerTransaction[]>([])
//     const [currentPage, setCurrentPage] = useState(1)
//     const [totalItems, setTotalItems] = useState(0)
//     const [pageSize, setPageSize] = useState(10)
//     const [loading, setLoading] = useState(false)
//
//     useEffect(() => {
//         const fetchInfluencerTransactions = async () => {
//             setLoading(true)
//             const params = {
//                 page: currentPage,
//                 per_page: pageSize,
//             }
//             try {
//                 const response = await influencerService.influencerTransactionList(params)
//                 const apiData = response.data?.data || []
//                 setData(apiData)
//                 setTotalItems(response.data?.total || 0)
//             } catch (error) {
//                 console.error("Error fetching influencer transactions:", error)
//             } finally {
//                 setLoading(false)
//             }
//         }
//
//         fetchInfluencerTransactions()
//     }, [currentPage, pageSize])
//
//     const onPageChange = (page: number) => {
//         setCurrentPage(page)
//     }
//
//     const onPageSizeChange = (size: number) => {
//         setPageSize(size)
//         setCurrentPage(1) // Reset to first page
//     }
//
//     const columns: ColumnDef<InfluencerTransaction>[] = [
//         {
//             accessorKey: "id",
//             header: () => <span className="text-sm font-medium">ID</span>,
//             cell: ({row}) => <span className="text-sm">{row.original.id}</span>,
//         },
//         {
//             accessorKey: "gig.title",
//             header: () => <span className="text-sm font-medium">Gig</span>,
//             cell: ({row}) => (
//                 <span className="text-sm font-semibold text-foreground">
//           {row.original.gig.title}
//         </span>
//             ),
//         },
//         {
//             accessorKey: "buyer.nick_name",
//             header: () => <span className="text-sm font-medium">Buyer</span>,
//             cell: ({row}) => (
//                 <span className="flex items-center gap-1 text-sm">
//           <User2 className="w-4 h-4 text-muted-foreground" aria-hidden="true"/>
//                     {row.original.buyer.nick_name}
//         </span>
//             ),
//         },
//         {
//             accessorKey: "status",
//             header: () => <span className="text-sm font-medium">Status</span>,
//             cell: ({row}) => {
//                 const status = row.original.status
//                 const variant =
//                     status === "amount_claimed"
//                         ? "default"
//                         : status === "handovered"
//                             ? "secondary"
//                             : "destructive"
//                 return (
//                     <Badge variant={variant} className="capitalize text-xs px-2 py-0.5">
//                         {status.replace(/_/g, " ")}
//                     </Badge>
//                 )
//             },
//         },
//         {
//             accessorKey: "price",
//             header: ({column}) => (
//                 <button
//                     onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//                     className="flex items-center gap-1 text-sm font-medium"
//                     aria-label="Sort by price"
//                 >
//                     <DollarSign className="w-4 h-4 text-muted-foreground" aria-hidden="true"/>
//                     Price
//                     <ArrowUpDown className="w-3 h-3 text-muted-foreground" aria-hidden="true"/>
//                 </button>
//             ),
//             cell: ({row}) => (
//                 <span className="text-sm font-medium whitespace-nowrap">
//           ${parseFloat(row.original.price).toLocaleString()}{" "}
//                     {row.original.currency.toUpperCase()}
//         </span>
//             ),
//         },
//         {
//             accessorKey: "item_delivery_deadline",
//             header: () => <span className="text-sm font-medium">Deadline</span>,
//             cell: ({row}) => (
//                 <span className="text-sm">
//           {format(new Date(row.original.item_delivery_deadline), "PPP p")}
//         </span>
//             ),
//         },
//         {
//             accessorKey: "pricing_tier.label",
//             header: () => <span className="text-sm font-medium">Tier</span>,
//             cell: ({row}) => (
//                 <span className="text-sm">{row.original.pricing_tier.label}</span>
//             ),
//         },
//     ]
//
//     return (
//         <ReusableDataTable
//             columns={columns}
//             data={data}
//             currentPage={currentPage}
//             totalItems={totalItems}
//             pageSize={pageSize}
//             onPageChangeAction={onPageChange}
//             onPageSizeChange={onPageSizeChange}
//             loading={loading}
//             pageSizeOptions={[5, 10, 20, 50]}
//             noDataText="No influencer transactions found."
//         />
//     )
// }
