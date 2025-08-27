'use client';

import React, {useCallback, useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {SearchIcon} from "lucide-react";
import CategoryNav from "@/components/header/category-nav";
import SelectInputField from "@/components/field/SelectField";
import {ProjectCard, ProjectCardSkeleton} from "@/components/card/brand/ProjectCard";
import {brandService} from "@/services/brand.service";
import {useDebounce} from "@/hooks/useDebounce";
import CustomPagination from "@/components/Pagiantion/pagination";
import {Gig} from "@/types/gigs";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import paymentService from "@/services/paymentService";

type SearchOption = {
    value: string;
    label: string;
};

const categoryOptions: SearchOption[] = [
    {value: "title", label: "Title"},
    {value: "tag", label: "Tag"},
    {value: "influencer", label: "Influencer"},
];

const locationOptions: SearchOption[] = [
    {value: "usa", label: "USA"},
    {value: "europe", label: "Europe"},
    {value: "asia", label: "Asia"},
];

const priceOptions: SearchOption[] = [
    {value: "free", label: "Free"},
    {value: "paid", label: "Paid"},
    {value: "premium", label: "Premium"},
];

export default function DiscoverCreators() {
    const [searchTerm, setSearchTerm] = useState("");
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const loadGigs = useCallback(async () => {
        setLoading(true);
        try {
            const params: any = {
                name: debouncedSearchTerm || undefined,
                page: currentPage,
                ...filters,
            };

            const response = await brandService.searchGigs(params);
            console.log('Response from searchGigs:', response.data);
            setGigs(response.data || []);
            setTotalPages(response.last_page || 1);
        } catch (error) {
            console.error("Error fetching gigs:", error);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm, filters, currentPage]);

    useEffect(() => {
        loadGigs();
    }, [loadGigs]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        loadGigs();
    };

    const handleClearFilters = () => {
        setFilters({});
        setSearchTerm("");
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleDetailClick = (id: number) => {
        router.push('/brand/search-gigs/' + id)
    };


    const handleBuyNow = async (
        data: {
            pricing_tier: number
            description: string
        },
        gigId: number,
    ) => {
        try {
            console.log("gigId:", gigId)
            console.log("data:", data)
            const response = await paymentService.createTransaction(gigId, data)
            if (response) {
                console.log('Response from createTransaction:', response.data);
                toast.success("Redirecting to payment page of Trustapp")
                router.push(response.data.trustap_url)
            }

        } catch (error) {
            console.error("Error in handleBuyNow:", error)
            toast.error("Error buying gig")
        }
    }

    return (
        <section className="w-full py-6 space-y-6" aria-labelledby="discover-heading">
            <CategoryNav/>

            <div>
                <h1 id="discover-heading" className="text-3xl font-bold font-inter text-gray-900">
                    Discover Creators
                </h1>
                <p className="text-muted-foreground font-poppins">
                    AI-powered creator discovery with smart matching
                </p>
            </div>

            <form onSubmit={handleSubmit} role="search" aria-label="Search creators form" className="space-y-6">
                <div className="relative">
                    <label htmlFor="search-input" className="sr-only">
                        Search creators
                    </label>
                    <Input
                        id="search-input"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title, tag, or influencer"
                        className="pr-28"
                    />
                    <Button type="submit" className="absolute top-0 right-0 h-full rounded-l-none">
                        <SearchIcon className="w-4 h-4 mr-1"/>
                        Search
                    </Button>
                </div>

                {/* Filters Section (Disabled for now) */}
                <fieldset>
                    <legend className="sr-only">Filter search results</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <SelectInputField
                            options={categoryOptions}
                            placeholder="Category"
                            aria-label="Category filter"
                            onChangeAction={(value) => setFilters((prev) => ({...prev, category: value || undefined}))}
                            disabled
                        />
                        <SelectInputField
                            options={locationOptions}
                            placeholder="Location"
                            aria-label="Location filter"
                            onChangeAction={(value) => setFilters((prev) => ({...prev, location: value || undefined}))}
                            disabled
                        />
                        <SelectInputField
                            options={priceOptions}
                            placeholder="Experience"
                            aria-label="Experience filter"
                            onChangeAction={(value) => setFilters((prev) => ({
                                ...prev,
                                experience: value || undefined
                            }))}
                            disabled
                        />
                    </div>
                </fieldset>
                {
                    searchTerm || Object.keys(filters).length > 0 ? (
                        <div className="flex items-center justify-end gap-2">
                            <Button onClick={handleClearFilters} variant="outline" className="flex items-center gap-2">
                                Clear Filters
                            </Button>
                        </div>
                    ) : null
                }
            </form>

            <div
                className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 min-h-[200px]"
                aria-live="polite"
                aria-busy={loading}
            >
                {loading ? (
                    [...Array(6)].map((_, i) => <ProjectCardSkeleton key={i}/>)
                ) : gigs.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center gap-4 w-full py-12">
                        <p className="text-muted-foreground text-center">
                            No gigs found. Try adjusting your filters or search term.
                        </p>
                        <Button variant="default" onClick={loadGigs}>
                            Try Again
                        </Button>
                    </div>
                ) : (
                    gigs.map((gig, index) => (
                        <ProjectCard
                            key={index}
                            gigId={gig.id}
                            name={`${gig.user.first_name} ${gig.user.last_name}`}
                            image={gig?.user.image}
                            rating={gig.user.influencer_rating}
                            status={gig.status}
                            category={gig.category}
                            title={gig.title}
                            description={gig.description}
                            followers={gig.follower_count}
                            pricings={gig.pricings}
                            user={gig.user as any}
                            tags={gig.tags}
                            onViewDetailsAction={() => {
                                console.log(gig.id)
                                handleDetailClick(gig.id)
                            }}
                            onBuyNowAction={(selectedPricing) => {
                                const buyData = {
                                    pricing_tier: selectedPricing.id,
                                    description: selectedPricing.description,
                                }
                                console.log('buyData:', buyData)
                                if (!gig.id) {
                                    toast.error("Gig ID is missing!")
                                    return
                                }
                                toast.success(`Buying now for $${buyData.pricing_tier}: ${buyData.description}`)
                                handleBuyNow(buyData, gig.id)
                            }}
                        />
                    ))
                )}
            </div>

            {totalPages > 1 && (
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChangeAction={handlePageChange}
                />
            )}
        </section>
    );
}
