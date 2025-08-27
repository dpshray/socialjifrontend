'use client';

import React, {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {SearchIcon} from "lucide-react";

import {GigsCard, GigsCardSkeleton} from "@/components/card/influencer/GigsCard";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import SelectInputField from "@/components/field/SelectField";
import CustomPagination from "@/components/Pagiantion/pagination";
import {DeleteModal} from "@/components/modal/delete-modal";
import {gigsService} from "@/services/gigs.service";
import globalService from "@/services/GlobalService";
import {TagModal} from "@/components/modal/TagModal";
import {toast} from "sonner";

const FILTERS = [
    {label: "All", value: "1"},
    {label: "Design", value: "2"},
    {label: "Development", value: "3"},
    {label: "Marketing", value: "4"},
    {label: "Writing", value: "5"},
];


export default function GigsPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [gigs, setGigs] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGigId, setSelectedGigId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searching, setSearching] = useState(false);

    const fetchGigs = useCallback(async () => {
        setLoading(true);
        try {
            const response = await globalService.searchGigs({
                name: searchTerm,
                page: currentPage,
            });
            setGigs(response.data || []);
            console.log("Response from searchGigs:", response);
            setTotalPages(response?.last_page || 1);
        } catch (error) {
            console.error("Error fetching gigs:", error);
        } finally {
            setLoading(false);
        }
    }, [searchTerm, currentPage]);

    useEffect(() => {
        fetchGigs();
    }, [fetchGigs]);

    const handleSearch = async () => {
        setCurrentPage(1);
        setSearching(true);
        await fetchGigs();
        setSearching(false);
    };

    const handleDeleteClick = (gigId: number) => {
        setSelectedGigId(gigId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedGigId) return;
        setIsDeleting(true);
        try {
            console.log('selectedGigId:', selectedGigId);
            const response = await gigsService.DeleteGig(selectedGigId);

            if (response) {
                toast.success(response?.message || "Successfully deleted gig");
                console.log('Response from DeleteGig:', response);
                await fetchGigs();
            }
            setShowDeleteModal(false);
            setSelectedGigId(null);
        } catch (error) {
            console.error("Failed to delete gig:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <section className="w-full min-h-screen border-t border-border bg-background py-6 space-y-6 container mx-auto">
            <div className="flex justify-end">
                <div className="relative flex-1 max-w-xl h-10">
                    <Input
                        type="text"
                        placeholder="Search for gigs"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSearch();
                            }
                        }}
                        className="h-full pr-24 bg-white/80 dark:bg-zinc-900/60 backdrop-blur border rounded-md shadow-sm"
                    />
                    <Button
                        type="button"
                        onClick={handleSearch}
                        disabled={searching}
                        className="absolute right-0 top-0 h-full rounded-l-none text-white font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400"
                    >
                        {searching ? (
                            <>
                                <svg
                                    className="animate-spin h-4 w-4 mr-1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                    />
                                </svg>
                                Searching...
                            </>
                        ) : (
                            <>
                                <SearchIcon className="h-4 w-4 mr-1"/>
                                Search
                            </>
                        )}
                    </Button>
                </div>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading
                    ? Array.from({length: 8}).map((_, i) => <GigsCardSkeleton key={i}/>)
                    : gigs.map((gig) => (
                        <GigsCard
                            key={gig.id}
                            id={gig.id}
                            title={gig.title}
                            description={gig.description}
                            status={gig.status}
                            image={gig.image}
                            tags={gig.tags}
                            pricing={gig.pricings}
                            onDeleteAction={() => handleDeleteClick(gig.id)}
                            onEditAction={() => router.push(`/influencer/gigs/edit-gigs/${gig.id}`)}
                        />
                    ))}
            </div>

            <div className="flex justify-center pt-4">
                <CustomPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChangeAction={setCurrentPage}
                />
            </div>

            <DeleteModal
                loading={isDeleting}
                open={showDeleteModal}
                onCloseAction={() => setShowDeleteModal(false)}
                onConfirmAction={handleConfirmDelete}
                title="Delete this gig?"
                description="Are you sure you want to delete this gig? This action cannot be undone."
            />
        </section>
    );
}
