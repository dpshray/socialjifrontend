'use client';
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LineChart} from "@/components/chart/chart";
import Image from "next/image";
import React, {useMemo, useState} from "react";
import {Plus} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {VertCard} from "@/components/card/card";
import {UsersImages} from "@/data";
import CategoryNav from "@/components/header/category-nav";
import {ButtonProps} from "react-day-picker";

interface VertCardProps {
    projectNumber?: number;
    price?: number;
    users?: string[];
}

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
                                             }) => {
    return (
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
                    <h3
                        id="brandcard-title"
                        className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                    >
                        {title}
                    </h3>
                    <p className="text-xs font-light text-gray-500 dark:text-gray-400">
                        {subtitle}
                    </p>
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

            <Button
                onClick={onButtonClick}
                className="bg-navyBlue"
                type="button"
                {...buttonProps}
            >
                {buttonText}
            </Button>
        </article>
    );
};
export default function BrandDashboard() {
    const [activeTab, setActiveTab] = useState("tab-1");

    const profileData = useMemo(() => [
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
    ], []);

    return (
        <section className="my-2">
            <div className={' flex my-2 '}>
                <CategoryNav categories={[{label: "All", href: "1"}]}/>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                <div className="md:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((_, index) => (
                            <BrandCard key={index}/>
                        ))}
                    </div>

                    <section className="my-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="flex flex-wrap gap-4 bg-white">
                                {["Total Influencer", "Top Project", "Operating Status"].map((item, index) => (
                                    <TabsTrigger
                                        key={index}
                                        value={`tab-${index + 1}`}
                                        className={cn(
                                            ' bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold text-gray-500 px-2   cursor-pointer relative',
                                            'after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:after:bg-primary'
                                        )}
                                    >
                                        {item}
                                    </TabsTrigger>
                                ))}
                                <span className="mx-4">|</span>
                                <div className="flex items-center font-inter  gap-4 text-sm">
                                    <p className="text-black flex items-center gap-1">
                                        <span className="h-2 w-2 bg-black rounded-full"></span>
                                        This Year
                                    </p>
                                    <p className="text-gray-400 flex items-center gap-1">
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
                    <div className="h-[280px] overflow-y-auto p-2">
                        <h3 className="text-lg font-semibold font-inter text-black mb-2">Social Card</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={index}
                                     className="flex flex-col items-start bg-gray-100 justify-evenly rounded-md space-y-2 p-2 w-full h-auto">
                                    <Image
                                        src="/instagram.svg"
                                        width={32}
                                        height={32}
                                        alt="Instagram logo"
                                        loading="lazy"
                                    />
                                    <h3 className="text-lg font-semibold font-inter text-black">33%</h3>
                                    <span className="text-sm  font-medium">Instagram</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <VertCard users={UsersImages}/>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="w-full md:max-w-lg mx-auto border border-[#BE50C8]">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between pb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Latest</h2>
                            <Button className="bg-gradient-to-r from-[#C5A2E3] to-[#C5A2E3] text-white rounded-lg"
                                    aria-label="Add Influencers">
                                <Plus className="w-4 h-4 "/>
                                Add Influencers
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-2 py-3 text-left">#</th>
                                    <th className="px-2 py-3 text-left">Name</th>
                                    <th className="px-2 py-3 text-left">Role</th>
                                    <th className="px-2 py-3 text-left">Date</th>
                                    <th className="px-2 py-3 text-left">Status</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-500">
                                {profileData.map((profile, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
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
                                        <span
                                            className="bg-green-200 text-green-900 text-xs font-semibold px-2 py-1 rounded-full">
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
