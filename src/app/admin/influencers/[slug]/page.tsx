'use client';
import React, {use} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {CalendarCheck, CheckCheck, DollarSign, Heart, Mail, ShoppingCart, Star, User} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {ProfileStatsCard} from "@/components/card/profile-stats-card";
import {SocialProfileCard} from "@/components/card/SocialMediaCard";
import {format} from "date-fns";
import adminService from "@/services/admin.service";

interface AdminInfluencerDetailsProps {
    params: Promise<{ slug: string }>;
}

export default function AdminInfluencerDetails({params}: AdminInfluencerDetailsProps) {
    const {slug} = use(params);
    const [influencer, setInfluencer] = React.useState<any>(null);

    React.useEffect(() => {
        const fetchInfluencerDetails = async () => {
            try {
                const response = await adminService.getInfluencerDetailsBySlug(slug);
                console.log(' Influencer details:', response);
                setInfluencer(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInfluencerDetails();
    }, [slug]);

    if (!influencer) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const followerCount = influencer.social_profiles.reduce((acc: number, p: any) => acc + p.follower_count, 0);
    const postCount = influencer.social_profiles.reduce((acc: number, p: any) => acc + p.post_count, 0);
    const engagementCount = influencer.social_profiles.reduce(
        (acc: number, p: any) => acc + p.avg_like_per_post_count + p.avg_comment_per_post_count,
        0
    );

    const joinedDate = influencer.joined_date ? format(new Date(influencer.joined_date), 'PPP') : 'N/A';

    const profileStats = [
        {
            title: 'Followers',
            value: followerCount,
            description: 'Followers',
            icon: <User className="w-6 h-6"/>,
            colorClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        },
        {
            title: 'Posts',
            value: postCount,
            description: 'Posts',
            icon: <Heart className="w-6 h-6"/>,
            colorClass: 'bg-pink-100 text-pink-800 border-pink-200',
        },
        {
            title: 'Engagement',
            value: engagementCount,
            description: 'Engagement',
            icon: <Star className="w-6 h-6"/>,
            colorClass: 'bg-amber-100 text-amber-800 border-amber-200',
        },
        {
            title: 'Joined Date',
            value: joinedDate,
            description: 'Joined Date',
            icon: <CalendarCheck className="w-6 h-6"/>,
            colorClass: 'bg-green-100 text-green-800 border-green-200',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="relative">
                    <Card className="relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"/>
                        <CardContent className="relative p-8 text-white">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                <Avatar className="w-24 h-24 border-4 border-white/20">
                                    <AvatarImage src={influencer.image ?? "/assets/img/user-default.png"}
                                                 alt={influencer.nick_name ?? "profile"}/>
                                    <AvatarFallback className="text-2xl font-bold bg-white/20">
                                        {(influencer.first_name?.charAt(0) ?? '') + (influencer.last_name?.charAt(0) ?? '')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-2">
                                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                                        <div>
                                            <h1 className="text-3xl font-bold">
                                                {[influencer.first_name, influencer.middle_name, influencer.last_name].filter(Boolean).join(' ')}
                                            </h1>
                                            <p className="text-xl text-white/80">@{influencer.nick_name ?? "N/A"}</p>
                                        </div>
                                        <div className="flex gap-2 flex-wrap">
                                            <Badge variant="secondary"
                                                   className="bg-white/20 text-white border-white/30">
                                                {influencer.roles ?? "User"}
                                            </Badge>
                                            {influencer.is_full_user ? (
                                                <Badge variant="secondary"
                                                       className="bg-green-500/20 text-white border-green-400/30">
                                                    Verified
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary"
                                                       className="bg-yellow-500/20 text-white border-yellow-400/30">
                                                    Basic Account
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-white/80">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4"/>
                                            <span>{influencer.email ?? "N/A"}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4"/>
                                            <span>Rating: {influencer.influencer_rating ?? 0}/5</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CalendarCheck className="w-4 h-4"/>
                                            <span>Joined: {joinedDate}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-white/80 max-w-3xl">{influencer.about ?? "No bio available."}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Button variant="outline"
                                            disabled
                                            className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                                        Contact {influencer.nick_name ?? "User"}
                                    </Button>
                                    <Button disabled variant="secondary">View Portfolio</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {profileStats.map((stat, index) => (
                        <ProfileStatsCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            description={stat.description}
                            icon={stat.icon}
                            colorClass={stat.colorClass}
                            isLoading={false}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <ProfileStatsCard
                        title="Total Gigs"
                        value={influencer.total_gigs_count ?? 0}
                        description="Published by Influencer"
                        icon={<CheckCheck className="w-6 h-6"/>}
                        colorClass=""
                        isLoading={false}
                    />
                    <ProfileStatsCard
                        title="Gigs Sold"
                        value={influencer.total_gigs_sold ?? 0}
                        description="Sales completed"
                        icon={<ShoppingCart className="w-6 h-6"/>}
                        colorClass=""
                        isLoading={false}
                    />
                    <ProfileStatsCard
                        title="Total Revenue"
                        value={influencer.total_transaction_amount ?? 0}
                        description="From Transactions"
                        icon={<DollarSign className="w-6 h-6"/>}
                        colorClass=""
                        isLoading={false}
                    />
                    <ProfileStatsCard title={'Total Reviews'} value={influencer.total_reviews_from_influencer_count}
                                      description={'From Influencer'}
                                      icon={<Star className="w-6 h-6"/>} colorClass={' '} isLoading={false}/>
                </div>
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">Social Media Presence</h2>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                            {influencer.social_profiles.length} Platforms
                        </Badge>
                    </div>
                    {influencer.social_profiles.length === 0 ? (
                        <p className="text-center text-gray-600">No social profiles available.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {influencer.social_profiles.map((profile: any, index: number) => (
                                <SocialProfileCard
                                    key={index}
                                    platform={profile.social_site?.name ?? "Unknown"}
                                    title={profile.social_site?.label ?? "Unknown"}
                                    link={profile.profile_url ?? "#"}
                                    followerCount={profile.follower_count ?? 0}
                                    followingCount={profile.following_count ?? 0}
                                    postCount={profile.post_count ?? 0}
                                    avgLikePerPost={profile.avg_like_per_post_count ?? 0}
                                    avgCommentPerPost={profile.avg_comment_per_post_count ?? 0}
                                    followerGrowthRate={profile.follower_growth_rate_per_week ?? 0}
                                    highestLike={profile.highest_like ?? 0}
                                    lowestLike={profile.lowest_like ?? 0}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
        ;
}
