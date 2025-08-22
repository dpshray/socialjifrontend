'use client';

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {SearchIcon} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import SelectInputField from '@/components/field/SelectField';
import {brandService} from '@/services/brand.service';
import {useDebounce} from '@/hooks/useDebounce';
import CustomPagination from '@/components/Pagiantion/pagination';
import {InfluencerProfileCard, InfluencerProfileCardSkeleton,} from '@/app/brand/hire-influencers/influencer-card';

import {useRouter} from "next/navigation";
import {SocialProfile} from "@/types/common";

interface InfluencerData {
    id: number;
    image: string;
    nick_name: string;
    about: string;
    social_profiles: SocialProfile[];
}

export default function GigSearchPage() {
    const [influencers, setInfluencers] = useState<InfluencerData[]>([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const debouncedSearchTerm = useDebounce(query, 500);
    const router = useRouter();
    const categoryOptions = useMemo(
        () => [
            {label: 'All', value: '1'},
            {label: 'Design', value: '2'},
            {label: 'Development', value: '3'},
            {label: 'Marketing', value: '4'},
            {label: 'Writing', value: '5'},
        ],
        []
    );

    const fetchGigs = useCallback(async () => {
        try {
            setLoading(true);
            const params = {
                name: debouncedSearchTerm || undefined,
                page: currentPage,
                ...filters,
            };
            const response = await brandService.searchCreators(params);
            setInfluencers(response.data || []);
            setTotalPages(response.last_page || 1);
        } catch {
            setInfluencers([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    }, [debouncedSearchTerm, currentPage, filters]);

    useEffect(() => {
        fetchGigs();
    }, [fetchGigs]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
        await fetchGigs();
    };

    const handleClearFilters = () => {
        setFilters({});
        setQuery('');
        setCurrentPage(1);
    };

    const handleFilterChange = (value: string | number) => {
        setCurrentPage(1);
        setFilters((prev) => ({...prev, category: value}));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleViewProfile = (id: number) => {
        router.push(`/brand/hire-influencers/${id}`);
    }
    return (
        <main className="w-full min-h-screen p-4 md:p-6 max-w-7xl mx-auto" role="main">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6" tabIndex={-1}>
                Search Gigs
            </h1>

            <form onSubmit={handleSubmit} role="search" aria-label="Search gigs form" className="space-y-6">
                <div className="relative">
                    <label htmlFor="search-input" className="sr-only">
                        Search gigs
                    </label>
                    <Input
                        id="search-input"
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by title, tag, or influencer"
                        className="pr-28"
                        aria-describedby="search-button"
                    />
                    <Button
                        type="submit"
                        id="search-button"
                        className="absolute top-0 right-0 h-full rounded-l-none"
                        aria-label="Submit search"
                    >
                        <SearchIcon className="w-4 h-4 mr-1" aria-hidden="true"/>
                        Search
                    </Button>
                </div>

                <fieldset>
                    <legend className="sr-only">Filter search results</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        <SelectInputField
                            options={categoryOptions}
                            placeholder="Category"
                            aria-label="Category filter"
                            value={filters.category || ''}
                            onChangeAction={handleFilterChange}
                        />
                    </div>
                </fieldset>

                {
                    query || Object.keys(filters).length > 0 ? (
                        <div className="flex items-center justify-end gap-2">
                            <Button onClick={handleClearFilters} variant="outline" className="flex items-center gap-2">
                                Clear Filters
                            </Button>
                        </div>
                    ) : null
                }
            </form>

            <section aria-live="polite" aria-busy={loading} className="mt-10 space-y-4">
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6" role="status">
                        {Array.from({length: 8}).map((_, index) => (
                            <InfluencerProfileCardSkeleton key={index}/>
                        ))}
                    </div>
                )}

                {!loading && influencers.length === 0 && (
                    <div className="min-h-[50vh] flex flex-col justify-center items-center space-y-4">
                        <p className="text-gray-500">No Creators found. Try adjusting your search.</p>
                        <Button onClick={fetchGigs} aria-label="Try fetching gigs again">
                            Try Again
                        </Button>
                    </div>
                )}

                {!loading && influencers.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {influencers.map((influencer) => (
                            <InfluencerProfileCard key={influencer.id} influencer={influencer as any}
                                                   onViewProfileAction={() => handleViewProfile(influencer.id)}/>
                        ))}
                    </div>
                )}
            </section>

            <nav aria-label="Pagination" className="mt-6 flex justify-center">
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChangeAction={handlePageChange}
                />
            </nav>
        </main>
    );
}
