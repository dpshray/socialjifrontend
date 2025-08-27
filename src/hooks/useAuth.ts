"use client"

import {useCallback, useEffect, useState} from "react"
import {authService} from "@/app/(auth)/auth.service"

interface SocialProfile {
    profile_url: string;
    follower_count: number;
    following_count: number;
    post_count: number;
    avg_like_per_post_count: number;
    avg_comment_per_post_count: number;
    follower_growth_rate_per_week: number;
    highest_like: number;
    lowest_like: number;
    social: {
        name: string;
        label: string;
    };
}

interface User {
    id: number;
    first_name: string | null;
    middle_name: string | null;
    last_name: string | null;
    nick_name: string | null;
    email: string;
    roles: string;
    image: string;
    influencer_rating: number;
    social_profiles: SocialProfile[];
    about: string;
}


interface ApiResponse {
    message: string
    data: User | null
    success: boolean
}

interface UseAuthReturn {
    user: User | null
    loading: boolean
    error: string | null
    refetch: () => Promise<void>
    logout: () => Promise<void>
    isAuthenticated: boolean
}

const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchLoggedInUser = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            const response = await authService.getLoggedInUser()
            console.log("Response from useAuth:", response)

            if (response) {
                setUser(response)
            } else {
                setUser(null)
            }
        } catch (error) {
            console.error("Error fetching user data:", error)
            setError(error instanceof Error ? error.message : "Failed to fetch user data")
            setUser(null)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchLoggedInUser()
    }, [fetchLoggedInUser])

    const logout = useCallback(async () => {
        try {
            await authService.logout()
            setUser(null)
        } catch (error) {
            console.error("Error during logout:", error)
        }
    }, [])

    return {
        user,
        loading,
        error,
        refetch: fetchLoggedInUser,
        logout,
        isAuthenticated: !!user
    }
}

export default useAuth
