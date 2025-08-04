import {useCallback, useEffect, useState} from "react";
import {gigsService} from "@/services/gigs.service";

interface Gig {
    id: number;
    title: string;
}

export const useGigs = () => {
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchGigs = useCallback(async (page = currentPage) => {
        try {
            setLoading(true);
            setError(null);
            const response = await gigsService.GetAllGigs(page);
            setGigs(response?.data || []);
            setTotalPages(response?.meta?.last_page || 1);
            console.log("Fetching gigs from API:", response?.data || []);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to fetch gigs");
            setGigs([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchGigs();
    }, [fetchGigs]);

    const goToPage = (page: number) => setCurrentPage(page);

    return {
        gigs,
        loading,
        error,
        currentPage,
        totalPages,
        goToPage,
        refetch: () => fetchGigs(currentPage),
    };
};
