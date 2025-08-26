'use client';

import React, {useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {LineChart} from '@/components/chart/chart';
import {Card, CardContent} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {DashboardUserCard, VertCard} from '@/components/card/card';
import {UsersImages} from '@/data';
import {brandService} from '@/services/brand.service';
import {InfluencerStatsCard} from '@/components/card/influencer/influencer-dashboard';
import {Briefcase, Star, ThumbsUp, Users} from 'lucide-react';
import SocialMediaConnect from '@/app/influencer/dashboard/social-medai-connect';
import {toast} from 'sonner';

interface BrandCardProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    iconSrc?: string;
    buttonText?: React.ReactNode;
    onButtonClick?: () => void;
    className?: string;
    buttonProps?: Omit<React.ComponentProps<typeof Button>, 'children' | 'onClick'>;
}

const BrandCard: React.FC<BrandCardProps> = ({
                                                 title = 'Find Creators',
                                                 subtitle = 'Discover and connect',
                                                 iconSrc = '/mail.svg',
                                                 buttonText = 'Coming Soon',
                                                 onButtonClick,
                                                 className = '',
                                                 buttonProps = {},
                                             }) => (
    <article
        role="region"
        aria-labelledby="brandcard-title"
        tabIndex={0}
        className={cn(
            'max-w-xs w-full mx-auto flex flex-col rounded-lg p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transition-colors',
            className
        )}
    >
        <header className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
                <h3 id="brandcard-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {title}
                </h3>
                <p className="text-xs font-light text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
            <div
                aria-hidden="true"
                className="flex items-center justify-center rounded-2xl w-14 h-14 bg-indigo-500/20 dark:bg-indigo-400/30"
            >
                <Image src={iconSrc} width={28} height={28} alt="" className="rounded-full" priority={false}/>
            </div>
        </header>
        <Button onClick={onButtonClick} className="bg-navyBlue" type="button" {...buttonProps} disabled>
            {buttonText}
        </Button>
    </article>
);

export default function BrandDashboard() {
    const [activeTab, setActiveTab] = useState<string>('tab-1');
    const [dashboardData, setDashboardData] = useState<any>(null);

    const profileData = useMemo(
        () => [
            {
                image: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
                name: 'Vercel',
                email: 'laboanovskiy@gmail.com',
            },
            {
                image: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
                name: 'Vercel',
                email: 'laboanovskiy@gmail.com',
            },
            {
                image: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
                name: 'Anton Tkachevet',
                email: 'laboanovskiy@gmail.com',
            },
        ],
        []
    );

    useEffect(() => {
        (async () => {
            try {
                const response = await brandService.brandDashboard();
                setDashboardData(response);
            } catch {
                setDashboardData(null);
            }
        })();
    }, []);

    const statsCards = [
        {
            title: 'Total Campaigns',
            value: dashboardData?.total_campaigns_added_count ?? 0,
            icon: Briefcase,
            className: 'bg-blue-100 text-blue-600',
        },
        {
            title: 'Total Reviews',
            value: dashboardData?.total_reviews_given_count ?? 0,
            icon: Star,
            className: 'bg-yellow-100 text-yellow-600',
        },
        {
            title: 'Total Bidders',
            value: dashboardData?.total_bidders_on_campaign_count ?? 0,
            icon: Users,
            className: 'bg-purple-100 text-purple-600',
        },
        {
            title: 'Ratings Received',
            value: dashboardData?.total_user_rated_my_brand ?? 0,
            icon: ThumbsUp,
            className: 'bg-green-100 text-green-600',
        },
    ];

    const socialMediaIcons = [
        {
            image: '/instagram.png',
            title: 'Instagram',
            description: 'Connect your Instagram account',
            type: 'instagram',
        },
        {
            image: '/facebook1.png',
            title: 'Facebook',
            description: 'Connect your Facebook page',
            type: 'facebook',
        },
        {
            image: '/twitter.png',
            title: 'Twitter',
            description: 'Connect your Twitter account',
            type: 'twitter',
        },
        {
            image: '/youtube.png',
            title: 'YouTube',
            description: 'Connect your YouTube channel',
            type: 'youtube',
        },
    ];

    const handleSocialConnect = (type: string) => {
        if (type === 'facebook') {
            const token = localStorage.getItem('_at');
            if (!token) {
                alert('User token not found. Please log in.');
                return;
            }
            window.location.href = `https://socialapi.stage.dworklabs.com/api/v1/social-data-fetcher/fb?token=${encodeURIComponent(
                token
            )}`;
        } else {
            toast.error('This feature is not available yet.');
        }
    };

    const isConnected = (platformType: string) =>
        dashboardData?.social_followers?.some(
            (follower: any) => follower.social_site.name.toLowerCase() === platformType.toLowerCase()
        ) ?? false;

    const getFollowerData = (platformType: string) =>
        dashboardData?.social_followers?.find(
            (follower: any) => follower.social_site.name.toLowerCase() === platformType.toLowerCase()
        );

    return (
        <section className="my-4 px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3 flex flex-col space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {statsCards.map(({title, value, icon, className}, idx) => (
                            <InfluencerStatsCard key={idx} title={title} value={value} icon={icon}
                                                 className={className}/>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, idx) => (
                            <BrandCard key={idx}/>
                        ))}
                    </div>

                    <section className="my-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="flex flex-wrap gap-4 bg-white dark:bg-gray-800 rounded-md p-2">
                                {['Total Influencer', 'Top Project', 'Operating Status'].map((tab, idx) => (
                                    <TabsTrigger
                                        key={idx}
                                        value={`tab-${idx + 1}`}
                                        className={cn(
                                            'bg-transparent text-gray-500 dark:text-gray-400 px-3 py-1 cursor-pointer relative',
                                            'data-[state=active]:text-black data-[state=active]:font-semibold dark:data-[state=active]:text-white',
                                            'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:after:bg-primary'
                                        )}
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                                <span className="mx-4 hidden sm:inline-block">|</span>
                                <div className="hidden sm:flex items-center font-inter gap-4 text-sm">
                                    <p className="text-black dark:text-white flex items-center gap-1">
                                        <span className="h-2 w-2 bg-black dark:bg-white rounded-full"/>
                                        This Year
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-400 flex items-center gap-1">
                                        <span className="h-2 w-2 bg-[#AEC7ED] rounded-full"/>
                                        Last Year
                                    </p>
                                </div>
                            </TabsList>
                            {[...Array(3)].map((_, idx) => (
                                <TabsContent key={idx} value={`tab-${idx + 1}`}
                                             className="w-full min-h-[300px] px-2 py-4 sm:px-4">
                                    <LineChart/>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </section>
                </div>

                <aside className="lg:col-span-1 flex flex-col space-y-6">
                    <section className="h-[280px] overflow-y-auto bg-white dark:bg-gray-900 rounded-lg shadow-sm p-4">
                        <h3 className="text-lg font-semibold font-inter text-black dark:text-gray-100 mb-6">Social Media
                            Accounts</h3>
                        <SocialMediaConnect
                            icons={socialMediaIcons}
                            isConnected={isConnected}
                            getFollowerData={getFollowerData}
                            connectButtonText={{default: 'Connect', loading: 'Connecting...'}}
                            manageButtonText="Manage"
                            loadingType={null}
                            onConnect={handleSocialConnect}
                        />
                    </section>

                    <section className="bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Influencers</h2>
                        <div className="space-y-4">
                            {dashboardData?.top_brand_with_max_followers?.slice(0, 3).map((influencer: any) => (
                                <DashboardUserCard
                                    key={influencer.id}
                                    image={influencer.image}
                                    name={`${influencer.first_name} ${influencer.last_name}`}
                                    username={influencer.nick_name}
                                    followers={influencer.social_profiles_sum_follower}
                                    growthRate={Math.round(influencer.avg_follower_growth_rate_per_week)}
                                />
                            ))}
                        </div>
                    </section>

                    <VertCard users={UsersImages}/>
                </aside>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="w-full md:max-w-lg mx-auto border border-[#BE50C8] dark:border-purple-600">
                    <CardContent className="p-4 bg-white dark:bg-gray-900 rounded-lg">
                        <div className="flex items-center justify-between pb-4">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Latest
                                Influencers</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-gray-700 dark:text-gray-300">
                                <thead>
                                <tr className="bg-gray-100 dark:bg-gray-800">
                                    <th className="px-2 py-3 text-left">#</th>
                                    <th className="px-2 py-3 text-left">Name</th>
                                    <th className="px-2 py-3 text-left">Role</th>
                                    <th className="px-2 py-3 text-left">Date</th>
                                    <th className="px-2 py-3 text-left">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                {profileData.map((profile, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                                    >
                                        <td className="px-2 py-3">{idx + 1}</td>
                                        <td className="px-2 py-3">
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src={profile.image}
                                                    width={32}
                                                    height={32}
                                                    alt={`Avatar of ${profile.name}`}
                                                />
                                                <span>{profile.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-2 py-3">Role</td>
                                        <td className="px-2 py-3 text-xs">Sep 28, 2022</td>
                                        <td className="px-2 py-3">
                        <span className="bg-green-200 text-green-900 text-xs font-semibold px-2 py-1 rounded-full">
                          Active
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
