"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {Progress} from "@/components/ui/progress";
import {Button} from "@/components/ui/button";
import {SocialProfileCard} from "@/components/card/SocialMediaCard";
import {SocialStatsCard} from "@/components/card/SocialStatsCard";
import {Skeleton} from "@/components/ui/skeleton";
import {AiFillProject} from "react-icons/ai";
import useAuth from "@/hooks/useAuth";
import {Award, BarChart3, Clock, Globe, Mail, Plus, Star, User} from "lucide-react";
import {SocialProfileCardSkeleton} from "@/components/Skeleton/SocialProfileCardSkeleton";
import {ProfileForm} from "@/components/form/brand-profile-form";

export interface SocialPlatform {
    name: string;
    label: string;
}

export interface SocialProfile {
    profile_url: string;
    follower_count: number;
    following_count: number;
    post_count: number;
    avg_like_per_post_count: number;
    avg_comment_per_post_count: number;
    follower_growth_rate_per_week: number;
    highest_like: number;
    lowest_like: number;
    social: SocialPlatform;
}

export interface User {
    id: number;
    nick_name: string;
    image: string;
    roles: string;
    influencer_rating: number;
    social_profiles: SocialProfile[];
    first_name?: string;
    last_name?: string;
    email?: string;
    about?: string;
}

export default function InfluencerProfile() {
    const {user, loading} = useAuth();
    const router = useRouter();
    const isLoading = loading || !user || !user.social_profiles;

    const tabs = [
        {label: "Overview", value: "overview"},
        {label: "Social Profiles", value: "social-profiles"},
        {label: "Reviews", value: "reviews"},
        {label: "Edit Profile", value: "edit-profile"}
    ];

    const handleSubmit = (data: any) => {
        console.log("Submit", data);
    };

    const handleCancel = () => {
        console.log("Cancel");
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 container mx-auto p-4 sm:p-8 space-y-8">
            <Card className="p-4 sm:p-8 rounded-2xl shadow-sm border border-slate-200 bg-white">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            {isLoading ? (
                                <Skeleton className="w-24 h-24 rounded-full"/>
                            ) : (
                                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-white shadow-lg">
                                    <AvatarImage src={user?.image || "/placeholder.svg"}/>
                                    <AvatarFallback
                                        className="text-2xl font-semibold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                                        {user?.nick_name?.charAt(0).toUpperCase() || "A"}
                                    </AvatarFallback>
                                </Avatar>
                            )}
                            {!isLoading && (
                                <div
                                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full"/>
                                </div>
                            )}
                        </div>
                        <div>
                            {isLoading ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-48"/>
                                    <Skeleton className="h-4 w-32"/>
                                    <Skeleton className="h-4 w-40"/>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                                        {user?.first_name} {user?.last_name}
                                    </h1>
                                    <div className="flex items-center gap-3 mb-3 flex-wrap">
                                        <p className="text-slate-600 text-lg">@{user?.nick_name}</p>
                                        <Badge
                                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1">
                                            {user?.roles}
                                        </Badge>
                                        <Badge variant="outline"
                                               className="border-green-200 text-green-700 bg-green-50 flex items-center gap-1">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"/>
                                            Verified
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-600 flex-wrap">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current"/>
                                            <span className="font-medium">{user?.influencer_rating}</span>
                                            <span>(24 reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Globe className="w-4 h-4"/>
                                            <span>Global Reach</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Award className="w-4 h-4"/>
                                            <span>Top Performer</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <Button variant="outline" className="border-slate-300 bg-transparent"
                                onClick={() => router.push("/influencer/campaign")}>
                            <AiFillProject className="w-4 h-4 mr-2"/>
                            Projects
                        </Button>
                        <Button
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                            onClick={() => router.push("/influencer/campaign")}>
                            <Plus className="w-4 h-4 mr-2"/>
                            Create Campaign
                        </Button>
                    </div>
                </div>
            </Card>

            <SocialStatsCard socialProfiles={user?.social_profiles} loading={isLoading}/>

            <Tabs defaultValue="overview" className="space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
                    <TabsList className="grid w-full grid-cols-5 bg-slate-50 rounded-xl p-1">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value}
                                         className="rounded capitalize cursor-pointer data-[state=active]:bg-navyBlue/60 data-[state=active]:text-white data-[state=active]:shadow-sm">
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="border-0 bg-white shadow-none">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <User className="w-5 h-5 text-slate-600"/>
                                    Profile Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {isLoading ? (
                                    <Skeleton className="h-48 w-full rounded-xl"/>
                                ) : (
                                    <>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Mail className="w-4 h-4 text-slate-500"/>
                                                <span className="text-slate-700">{user?.email}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Globe className="w-4 h-4 text-slate-500"/>
                                                <span className="text-slate-700">Global • English, Spanish</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <Clock className="w-4 h-4 text-slate-500"/>
                                                <span className="text-slate-700">Joined December 2022</span>
                                            </div>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 mb-3">About</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{user?.about}</p>
                                        </div>
                                        <Separator/>
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="font-semibold text-slate-900">Profile Completion</h4>
                                                <span className="text-sm font-medium text-slate-700">92%</span>
                                            </div>
                                            <Progress value={92}
                                                      className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-600 [&>div]:to-blue-600"/>
                                            <p className="text-xs text-slate-500 mt-2">Excellent profile
                                                completeness</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 border-0 bg-white shadow-none">
                            <CardHeader className="pb-4">
                                <CardTitle className="flex items-center gap-2 text-slate-900">
                                    <BarChart3 className="w-5 h-5 text-slate-600"/>
                                    Social Media Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {isLoading
                                        ? Array.from({length: 3}).map((_, i) => <SocialProfileCardSkeleton key={i}/>)
                                        : user?.social_profiles.map((profile, index) => (
                                            <SocialProfileCard
                                                key={index}
                                                title={profile.social.label}
                                                link={profile.profile_url}
                                                followerCount={profile.follower_count}
                                                followingCount={profile.following_count}
                                                postCount={profile.post_count}
                                                avgLikePerPost={profile.avg_like_per_post_count}
                                                avgCommentPerPost={profile.avg_comment_per_post_count}
                                                followerGrowthRate={profile.follower_growth_rate_per_week}
                                                highestLike={profile.highest_like}
                                                lowestLike={profile.lowest_like}
                                                platform={profile.social.name}
                                            />
                                        ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="social-profiles" className="space-y-6">
                    <Card className="border-0 bg-white shadow-none">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-slate-900">
                                <AiFillProject className="w-5 h-5 text-slate-600"/>
                                Projects
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {isLoading
                                    ? Array.from({length: 3}).map((_, i) => <SocialProfileCardSkeleton key={i}/>)
                                    : user?.social_profiles.map((profile, index) => (
                                        <SocialProfileCard
                                            key={index}
                                            title={profile.social.label}
                                            link={profile.profile_url}
                                            followerCount={profile.follower_count}
                                            followingCount={profile.following_count}
                                            postCount={profile.post_count}
                                            avgLikePerPost={profile.avg_like_per_post_count}
                                            avgCommentPerPost={profile.avg_comment_per_post_count}
                                            followerGrowthRate={profile.follower_growth_rate_per_week}
                                            highestLike={profile.highest_like}
                                            lowestLike={profile.lowest_like}
                                            platform={profile.social.name}
                                        />
                                    ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="edit-profile">
                    <ProfileForm editingProfile={user} onSubmit={handleSubmit} onCancel={handleCancel}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}
