'use client';

import React, {useState} from 'react';
import {BriefcaseIcon, DollarSign, Plus, TrendingUp} from 'lucide-react';
import Image from 'next/image';

import InfluencerChart from '@/components/chart/Influencer';
import LatestGigsTable from '@/components/table/userTable';
import {Button} from "@/components/ui/button";
import {ComingStatsCard, InfluencerStatsCard} from "@/components/card/influencer/influencer-dashboard";
import {Card} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import influencerService from "@/services/InfluencerService";

interface UserCardProps {
    image: string;
    name: string;
    username: string;
}

function UserCard({image, name, username}: UserCardProps) {
    return (
        <Card className="p-3">
            <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                    <Avatar>
                        <AvatarImage src={image}/>
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                    <p className="text-sm text-gray-500 truncate">{username}</p>
                </div>
                <div className="flex-shrink-0">
                    <Button variant="secondary">View</Button>
                </div>
            </div>
        </Card>
    );
}

interface SocialMediaIcon {
    image: string;
    title: string;
    description: string;
    link: string;
    type: string;
}

export default function InfluencerDashboard() {
    const [loadingType, setLoadingType] = useState<string | null>(null);

    const statsData = [
        {title: 'Revenue', value: '$2,500', description: 'Monthly revenue from sales', icon: TrendingUp, trend: 'up'},
        {title: 'Orders', value: '1,320', description: 'Total orders processed', icon: TrendingUp, trend: 'down'},
        {title: 'Customers', value: '2,500', description: 'Number of customers', icon: DollarSign, trend: 'up'},
        {title: 'Sales', value: '2,500', description: 'Monthly sales from sales', icon: BriefcaseIcon, trend: 'up'},
    ];

    const socialMediaIcons: SocialMediaIcon[] = [
        {
            image: '/Thread.png',
            title: 'X',
            description: '950K Followers',
            link: 'https://twitter.com/Twitter',
            type: 'x'
        },
        {
            image: '/youtube.png',
            title: 'YouTube',
            description: '3.2M Subscribers',
            link: 'https://www.youtube.com/user/YouTube',
            type: 'youtube'
        },
        {
            image: '/facebook1.png',
            title: 'Facebook',
            description: '5.6M Followers',
            link: '/api/social-data-fetcher/fb',
            type: 'facebook'
        },
    ];

    const getFacebookFollowers = async () => {
        try {
            const res = await influencerService.getFacebookFollowers();
            console.log('Facebook data:', res);
        } catch (error) {
            console.error('Error in getFacebookFollowers:', error);
            alert('Error fetching Facebook data');
        }
    };

    const handleConnect = async (type: string, link: string) => {
        setLoadingType(type);

        if (type === 'facebook') {
            await getFacebookFollowers();
        } else {
            window.open(link, '_blank');
        }

        setLoadingType(null);
    };

    return (
        <section className="w-full py-8 bg-background container mx-auto">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-2">Welcome back! Here&#39;s your performance overview.</p>
                </div>

                {/* Stats + Coming Soon Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 space-y-6">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {statsData.map((stat, index) => (
                                <InfluencerStatsCard key={index} title={stat.title} value={stat.value}
                                                     icon={stat.icon}/>
                            ))}
                        </div>

                        {/* Coming Soon Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {Array.from({length: 4}).map((_, index) => (
                                <ComingStatsCard key={index}/>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <aside className="space-y-2">
                        <h2 className="text-base font-semibold text-gray-900 mb-2">Quick Actions</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {socialMediaIcons.map((icon) => (
                                <div key={icon.type} className="text-center">
                                    <Image
                                        src={icon.image}
                                        alt={`${icon.title} logo`}
                                        width={32}
                                        height={32}
                                        className="w-8 h-8 mx-auto mb-2 object-contain rounded"
                                    />
                                    <p className="text-sm font-medium text-gray-900">{icon.title}</p>
                                    <p className="text-xs text-gray-600">{icon.description}</p>
                                    <Button
                                        variant="outline"
                                        className="w-20 h-8 mx-auto mt-2"
                                        onClick={() => handleConnect(icon.type, icon.link)}
                                        disabled={loadingType === icon.type}
                                    >
                                        {loadingType === icon.type ? 'Connecting...' : 'Connect'}
                                    </Button>
                                </div>
                            ))}

                            <div className="text-center">
                                <Button variant="outline" className="w-8 h-8 mx-auto mb-2" disabled>
                                    <Plus className="w-4 h-4"/>
                                </Button>
                                <p className="text-sm font-medium text-gray-900">Add</p>
                                <p className="text-xs text-gray-600">Add Social Media</p>
                            </div>
                        </div>
                    </aside>
                </div>

                {/* Chart + People */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-3 bg-white rounded-lg p-4 shadow-sm">
                        <h2 className="sr-only">Performance Chart</h2>
                        <InfluencerChart/>
                    </div>

                    <aside className="bg-white rounded-lg p-4" aria-labelledby="people-heading">
                        <h2 id="people-heading" className="text-lg font-medium text-gray-900 mb-2">
                            People
                        </h2>
                        <div className="space-y-3">
                            {Array.from({length: 3}).map((_, index) => (
                                <UserCard
                                    key={index}
                                    image="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                                    name="Jese Leos"
                                    username="@jeseleos"
                                />
                            ))}
                        </div>
                    </aside>
                </div>

                {/* Table */}
                <div className="mt-10">
                    <LatestGigsTable/>
                </div>
            </div>
        </section>
    );
}
