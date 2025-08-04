import {useQuery} from "@tanstack/react-query";
import profileService from "@/services/profileService";


export default function useProfile() {
    const {
        data: profile,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["profile"],
        queryFn: profileService.getProfile,
        staleTime: 1000 * 60 * 5,
    });

    return {
        profile,
        isLoading,
        isError,
        error,
        refetch,
    };
}
