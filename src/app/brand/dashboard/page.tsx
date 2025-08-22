'use client';
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LineChart} from "@/components/chart/chart";
import Image from "next/image";
import React, {useEffect, useMemo, useState} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {DashboardUserCard, VertCard} from "@/components/card/card";
import {UsersImages} from "@/data";
import {ButtonProps} from "react-day-picker";
import {brandService} from "@/services/brand.service";
import {InfluencerStatsCard} from "@/components/card/influencer/influencer-dashboard";
import {Briefcase, Star, ThumbsUp, Users} from "lucide-react";


interface BrandCardProps {
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    iconSrc?: string;
    buttonText?: React.ReactNode;
    onButtonClick?: () => void;
    className?: string;
    buttonProps?: Omit<ButtonProps, "children" | "onClick">;
}

const BrandCard: React.FC<BrandCardProps> = ({
                                                 title = "Find Creators",
                                                 subtitle = "Discover and connect",
                                                 iconSrc = "/mail.svg",
                                                 buttonText = "Coming Soon",
                                                 onButtonClick,
                                                 className = "",
                                                 buttonProps = {},
                                             }) => (
    <article
        role="region"
        aria-labelledby="brandcard-title"
        tabIndex={0}
        className={cn(
            "max-w-xs w-full mx-auto flex flex-col rounded-lg p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg ring-1 ring-gray-200 dark:ring-gray-700 transition-colors",
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
                <Image
                    src={iconSrc}
                    width={28}
                    height={28}
                    alt=""
                    aria-hidden="true"
                    className="rounded-full"
                    priority={false}
                />
            </div>
        </header>
        <Button onClick={onButtonClick} className="bg-navyBlue" type="button" {...buttonProps} disabled>
            {buttonText}
        </Button>
    </article>
);

export default function BrandDashboard() {
    const [activeTab, setActiveTab] = useState("tab-1");
    const [dashboardData, setDashboardData] = useState<any>();

    const profileData = useMemo(
        () => [
            {
                image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
                name: "Vercel",
                email: "laboanovskiy@gmail.com",
            },
            {
                image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
                name: "Vercel",
                email: "laboanovskiy@gmail.com",
            },
            {
                image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
                name: "Anton Tkachevet",
                email: "laboanovskiy@gmail.com",
            },
        ],
        []
    );

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                const response = await brandService.brandDashboard();
                console.log('Dashboard data:', response);
                setDashboardData(response);
            } catch {
                console.log('Error fetching dashboard data');
            }
        }

        fetchDashboardData();
    }, []);

    const statsCards = [
        {
            title: "Total Campaigns",
            value: dashboardData?.total_campaigns_added_count || 0,
            icon: Briefcase,
            className: "bg-blue-100 text-blue-600",
        },
        {
            title: "Total Reviews",
            value: dashboardData?.total_reviews_given_count || 0,
            icon: Star,
            className: "bg-yellow-100 text-yellow-600",
        },
        {
            title: "Total Bidders",
            value: dashboardData?.total_bidders_on_campaign_count || 0,
            icon: Users,
            className: "bg-purple-100 text-purple-600",
        },
        {
            title: "User Rated My Brand",
            value: dashboardData?.total_user_rated_my_brand || 0,
            icon: ThumbsUp,
            className: "bg-green-100 text-green-600",
        },
    ];

    const getSocialIcon = (socialName: string) => {
        const icons: { [key: string]: string } = {
            instagram: "/instagram.png",
            facebook: "/facebook1.png",
        };
        return icons[socialName.toLowerCase()] || "/instagram.png";
    };

    return (
        <section className="my-2 px-2 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="md:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {statsCards.map((card, index) => (
                            <InfluencerStatsCard
                                key={index}
                                title={card.title}
                                value={card.value}
                                icon={card.icon}
                                className={card.className}
                            />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((_, index) => (
                            <BrandCard key={index}/>
                        ))}
                    </div>
                    <section className="my-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="flex flex-wrap gap-4 bg-white dark:bg-gray-800 rounded-md p-2">
                                {["Total Influencer", "Top Project", "Operating Status"].map((item, index) => (
                                    <TabsTrigger
                                        key={index}
                                        value={`tab-${index + 1}`}
                                        className={cn(
                                            "bg-transparent",
                                            "data-[state=active]:text-black data-[state=active]:font-semibold dark:data-[state=active]:text-white",
                                            "text-gray-500 dark:text-gray-400 px-3 py-1 cursor-pointer relative",
                                            "after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:after:bg-primary"
                                        )}
                                    >
                                        {item}
                                    </TabsTrigger>
                                ))}
                                <span className="mx-4 hidden sm:inline-block">|</span>
                                <div className="flex items-center font-inter gap-4 text-sm hidden sm:flex">
                                    <p className="text-black dark:text-white flex items-center gap-1">
                                        <span className="h-2 w-2 bg-black dark:bg-white rounded-full"></span>
                                        This Year
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-400 flex items-center gap-1">
                                        <span className="h-2 w-2 bg-[#AEC7ED] rounded-full"></span>
                                        Last Year
                                    </p>
                                </div>
                            </TabsList>
                            {[1, 2, 3].map((_, index) => (
                                <TabsContent key={index} value={`tab-${index + 1}`} className="w-full min-h-[300px]">
                                    <LineChart/>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </section>
                </div>
                <div className="md:col-span-1 space-y-4">
                    <div className="h-[280px] overflow-y-auto p-2 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold font-inter text-black dark:text-gray-100 mb-2">Social
                            Card</h3>
                        <div className="space-y-3">
                            {dashboardData?.social_followers?.map((social: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
                                >
                                    <div
                                        className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-900 rounded-lg flex items-center justify-center mr-4">
                                        <Image
                                            src={getSocialIcon(social.social_site.name) || "/placeholder.svg"}
                                            width={24}
                                            height={24}
                                            alt={`${social.social_site.label} logo`}
                                            loading="lazy"
                                            className="rounded"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                            {social.follower_count.toLocaleString()}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{social.social_site.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <aside className="bg-white rounded-lg p-4  ">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Influencers</h2>
                        <div className="space-y-3">
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
                    </aside>
                    <VertCard users={UsersImages}/>
                </div>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                {profileData.map((profile, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                                    >
                                        <td className="px-2 py-3">{index + 1}</td>
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
