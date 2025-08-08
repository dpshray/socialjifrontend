'use client';

import React, { use } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
    CalendarCheck,
    CheckCheck,
    DollarSign,
    Heart,
    Mail,
    ShoppingCart,
    Star,
    User,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProfileStatsCard } from '@/components/card/profile-stats-card';
import { SocialProfileCard } from '@/components/card/SocialMediaCard';
import { format } from 'date-fns';
import adminService from '@/services/admin.service';

interface AdminBrandDetailsProps {
    params: Promise<{ slug: string }>;
}

export default function BrandDetailsPage({ params }: AdminBrandDetailsProps) {
    const { slug } = use(params);
    const [brand, setBrand] = React.useState<any>(null);

    React.useEffect(() => {
        (async () => {
            try {
                const data = await adminService.getBrandDetailsBySlug(slug);
                setBrand(data);
            } catch {
                setBrand(null);
            }
        })();
    }, [slug]);

    if (!brand) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <span className="text-gray-500 text-lg font-medium">Loading...</span>
            </div>
        );
    }

    const followerCount = brand.social_profiles.reduce(
        (acc: number, p: any) => acc + p.follower_count,
        0
    );
    const postCount = brand.social_profiles.reduce(
        (acc: number, p: any) => acc + p.post_count,
        0
    );
    const engagementCount = brand.social_profiles.reduce(
        (acc: number, p: any) =>
            acc + p.avg_like_per_post_count + p.avg_comment_per_post_count,
        0
    );
    const joinedDate = brand.joined_date
        ? format(new Date(brand.joined_date), 'PPP')
        : 'N/A';

    const profileStats = [
        {
            title: 'Followers',
            value: followerCount,
            description: 'Followers',
            icon: <User className="w-5 h-5 text-slate-700" />,
            colorClass: 'bg-slate-100 text-slate-700 border-slate-300',
        },
        {
            title: 'Posts',
            value: postCount,
            description: 'Posts',
            icon: <Heart className="w-5 h-5 text-rose-600" />,
            colorClass: 'bg-rose-50 text-rose-600 border-rose-200',
        },
        {
            title: 'Engagement',
            value: engagementCount,
            description: 'Engagement',
            icon: <Star className="w-5 h-5 text-amber-600" />,
            colorClass: 'bg-amber-50 text-amber-600 border-amber-200',
        },
        {
            title: 'Joined',
            value: joinedDate,
            description: 'Date Joined',
            icon: <CalendarCheck className="w-5 h-5 text-slate-700" />,
            colorClass: 'bg-slate-100 text-slate-700 border-slate-300',
        },
    ];

    return (
        <main className="min-h-screen bg-gray-50 py-10 px-6 md:px-12">
            <section className="max-w-7xl mx-auto space-y-10">
                <Card className="shadow-lg rounded-lg overflow-hidden bg-white text-slate-900">
                    <CardContent className="flex flex-col md:flex-row items-center gap-8 p-10 relative z-10">
                        <Avatar className="w-28 h-28 border-2 border-slate-300 shadow-md">
                            <AvatarImage
                                src={brand.image ?? '/assets/img/user-default.png'}
                                alt={brand.nick_name ?? 'profile'}
                            />
                            <AvatarFallback className="text-3xl font-extrabold bg-slate-200 text-slate-700">
                                {(brand.first_name?.charAt(0) ?? '') +
                                    (brand.last_name?.charAt(0) ?? '')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3 max-w-3xl">
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
                                {[brand.first_name, brand.middle_name, brand.last_name]
                                    .filter(Boolean)
                                    .join(' ')}
                            </h1>
                            <p className="text-xl text-slate-600 font-medium">
                                @{brand.nick_name ?? 'N/A'}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Badge
                                    variant="secondary"
                                    className="bg-slate-200 text-slate-800 border-slate-300"
                                >
                                    {brand.roles ?? 'User'}
                                </Badge>
                                {brand.is_full_user ? (
                                    <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-800 border-green-300"
                                    >
                                        Verified
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="secondary"
                                        className="bg-yellow-100 text-yellow-800 border-yellow-300"
                                    >
                                        Basic Account
                                    </Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-6 mt-3 text-slate-700 text-sm font-light">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{brand.email ?? 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4" />
                                    <span>Rating: {brand.brand_rating ?? 0}/5</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarCheck className="w-4 h-4" />
                                    <span>Joined: {joinedDate}</span>
                                </div>
                            </div>
                            <p className="mt-4 text-slate-600 text-base leading-relaxed max-w-xl">
                                {brand.about ?? 'No bio available.'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <Button
                                disabled
                                variant="outline"
                                className="border-slate-300 text-slate-700 bg-slate-100 hover:bg-slate-200"
                            >
                                Contact {brand.nick_name ?? 'User'}
                            </Button>
                            <Button disabled variant="secondary" className="text-slate-800">
                                View Portfolio
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {profileStats.map((stat, i) => (
                        <ProfileStatsCard
                            key={i}
                            title={stat.title}
                            value={stat.value}
                            description={stat.description}
                            icon={stat.icon}
                            colorClass={stat.colorClass}
                            isLoading={false}
                        />
                    ))}
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ProfileStatsCard
                        title="Total Gigs"
                        value={brand.total_gigs_count ?? 0}
                        description="Published by Influencer"
                        icon={<CheckCheck className="w-6 h-6 text-slate-700" />}
                        isLoading={false}
                        colorClass="bg-slate-100 text-slate-700 border-slate-300"
                    />
                    <ProfileStatsCard
                        title="Gigs Sold"
                        value={brand.total_gigs_sold ?? 0}
                        description="Sales completed"
                        icon={<ShoppingCart className="w-6 h-6 text-slate-700" />}
                        isLoading={false}
                        colorClass="bg-slate-100 text-slate-700 border-slate-300"
                    />
                    <ProfileStatsCard
                        title="Total Revenue"
                        value={brand.total_transaction_amount ?? 0}
                        description="From Transactions"
                        icon={<DollarSign className="w-6 h-6 text-slate-700" />}
                        isLoading={false}
                        colorClass="bg-slate-100 text-slate-700 border-slate-300"
                    />
                </section>

                <section>
                    <header className="flex justify-between items-center mb-6 border-b border-slate-300 pb-2">
                        <h2 className="text-2xl font-bold text-slate-900">
                            Social Media Presence
                        </h2>
                        <Badge
                            variant="outline"
                            className="text-lg px-3 py-1 text-slate-700 border-slate-400"
                        >
                            {brand.social_profiles.length} Platforms
                        </Badge>
                    </header>

                    {brand.social_profiles.length === 0 ? (
                        <p className="text-center text-slate-500">
                            No social profiles available.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {brand.social_profiles.map((profile: any, idx: number) => (
                                <SocialProfileCard
                                    key={idx}
                                    platform={profile.social_site?.name ?? 'Unknown'}
                                    title={profile.social_site?.label ?? 'Unknown'}
                                    link={profile.profile_url ?? '#'}
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
                </section>
            </section>
        </main>
    );
}
