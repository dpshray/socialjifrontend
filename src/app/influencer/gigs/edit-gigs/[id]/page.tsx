"use client";

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {Lightbulb, Plus, Rocket, Star, Target} from "lucide-react";
import {toast} from "sonner";
import GigsEditForm from "@/components/form/GigsEditForm";
import {gigsService} from "@/services/gigs.service";
import GigFormSkeleton from "@/components/form/GigEditFormSkeleton";


export default function EditGigPage() {
    const {id} = useParams<{ id: string }>();
    const [gigData, setGigData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchGig = async () => {
            setLoading(true);
            try {
                const response = await gigsService.GetGigById(Number(id));
                const data = response?.data;
                console.log(' data', data);
                const formattedGigData = {
                    ...data,
                    pricing: Array.isArray(data?.pricings)
                        ? data.pricings.map((pricing: any) => ({
                            pricing_tier_id: pricing.id,
                            price: parseFloat(pricing.price),
                            delivery_time: pricing.delivery_time,
                            tier_description: pricing.description,
                            tier_requirement: pricing.requirement,
                            currency_id: pricing.currency.id,
                        }))
                        : [],
                };
                setGigData(formattedGigData);
            } catch (error: any) {
                toast.error(error?.message || "Failed to fetch gig data");
            } finally {
                setLoading(false);
            }
        };

        fetchGig();
    }, [id]);

    return (
        <div className="w-full min-h-screen  ">
            {/* Banner Section with Illustrations */}
            <section className="relative bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"></div>
                    <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white rounded-full"></div>
                </div>
                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-white">
                            <div
                                className="inline-flex items-center gap-2 bg-orange-500 rounded-full px-4 py-2 text-sm font-medium mb-6">
                                <Plus className="w-4 h-4" display="inline"/>
                                Edit Gig
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-100">
                                Share Your
                                <span className="block text-orange-400">Expertise</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Turn your skills into income by creating professional gigs that attract the right
                                clients
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div
                                    className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                                    <div
                                        className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <Lightbulb className="w-5 h-5 text-white"/>
                                    </div>
                                    <span className="text-gray-300 text-sm text-center">Showcase Skills</span>
                                </div>
                                <div
                                    className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                                    <div
                                        className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white"/>
                                    </div>
                                    <span className="text-gray-300 text-sm text-center">Find Clients</span>
                                </div>
                                <div
                                    className="flex flex-col items-center gap-2 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm">
                                    <div
                                        className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                                        <Rocket className="w-5 h-5 text-white"/>
                                    </div>
                                    <span className="text-gray-300 text-sm text-center">Earn Money</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Illustration */}
                        <div className="relative">
                            <div
                                className="relative bg-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30">
                                {/* Illustration */}
                                <div className="space-y-6">
                                    {/* Main workspace illustration */}
                                    <div className="flex justify-center">
                                        <div className="relative">
                                            {/* Desk */}
                                            <div className="w-40 h-6 bg-gray-600 rounded-lg"></div>
                                            {/* Monitor */}
                                            <div
                                                className="absolute -top-12 left-6 w-20 h-16 bg-gray-700 rounded-lg border-2 border-gray-600"></div>
                                            <div
                                                className="absolute -top-10 left-8 w-16 h-12 bg-orange-400/20 rounded flex items-center justify-center">
                                                <Star className="w-6 h-6 text-orange-400"/>
                                            </div>
                                            {/* Stand */}
                                            <div className="absolute -top-2 left-14 w-2 h-4 bg-gray-600"></div>
                                            <div
                                                className="absolute top-2 left-12 w-6 h-2 bg-gray-600 rounded"></div>
                                            {/* Person silhouette */}
                                            <div
                                                className="absolute -top-20 left-16 w-8 h-8 bg-gray-500 rounded-full"></div>
                                            <div
                                                className="absolute -top-16 left-14 w-12 h-10 bg-gray-600 rounded-t-2xl"></div>
                                        </div>
                                    </div>
                                    {/* Floating service cards */}
                                    <div className="flex justify-around items-center">
                                        <div
                                            className="w-14 h-14 bg-gray-700 rounded-xl flex items-center justify-center border border-gray-600">
                                            <div className="w-6 h-6 bg-orange-400 rounded"></div>
                                        </div>
                                        <div
                                            className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                                            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                                        </div>
                                        <div
                                            className="w-16 h-16 bg-gray-700 rounded-2xl flex items-center justify-center border border-gray-600">
                                            <div className="w-8 h-8 bg-orange-400 rounded-lg"></div>
                                        </div>
                                    </div>
                                    {/* Stats bars */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full">
                                                <div className="w-4/5 h-full bg-orange-400 rounded-full"></div>
                                            </div>
                                            <span className="text-xs text-gray-400">85%</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-4 h-4 bg-orange-400 rounded-full"></div>
                                            <div className="flex-1 h-2 bg-gray-700 rounded-full">
                                                <div className="w-3/5 h-full bg-orange-400 rounded-full"></div>
                                            </div>
                                            <span className="text-xs text-gray-400">60%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? (
                <div className="flex items-center justify-center h-auto">
                    <GigFormSkeleton/>
                </div>
            ) : gigData ? (
                <div className="mt-10 container mx-auto">
                    <GigsEditForm mode="edit" defaultValues={gigData}/>
                </div>

            ) : (
                <p className="text-destructive text-center">Gig not found or failed to load.</p>
            )}
        </div>
    );
}
