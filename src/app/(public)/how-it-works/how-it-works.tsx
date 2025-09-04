"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowRight,
    DollarSign,
    Handshake,
    Search,
    Shield,
    User,
    Users,
    Zap,
    CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksClient() {
    const [activeSection, setActiveSection] = useState<"brands" | "creators">(
        "brands"
    );

    const brandSteps = [
        {
            number: 1,
            title: "Post or Apply",
            description:
                "Create campaigns with clear requirements or browse available influencer profiles. Define your project details and budget.",
            icon: Search,
        },
        {
            number: 2,
            title: "Collaborate & Deliver",
            description:
                "Work with selected influencers through SocialJi dashboard. Review and approve content before it goes live.",
            icon: Handshake,
        },
        {
            number: 3,
            title: "Secure Payment",
            description:
                "Funds held safely in Trustap Vault until campaign completion. Payment released automatically upon approval.",
            icon: Shield,
        },
    ];

    const creatorSteps = [
        {
            number: 1,
            title: "Post or Apply",
            description:
                "Browse available campaigns and apply to relevant opportunities. Create your profile showcasing your content style and rates.",
            icon: User,
        },
        {
            number: 2,
            title: "Collaborate & Deliver",
            description:
                "Create awesome content for approved campaigns. Collaborate with brands through SocialJi dashboard for seamless delivery.",
            icon: Zap,
        },
        {
            number: 3,
            title: "Secure Payment",
            description:
                "Get paid safely through Trustap Vault system. Funds released instantly upon campaign completion and approval.",
            icon: DollarSign,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-24">
                <div className="absolute inset-0">
                    <Image
                        src="/how-it-works-flow-diagram.png"
                        alt="SocialJi Trustap secure payment flow"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        How SocialJi Works
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        SocialJi makes influencer marketing easy for both brands and
                        creators. Here&apos;s an overview of what to expect when you
                        collaborate on our platform.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex justify-center mb-8 sm:mb-12">
                    <div className="bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                        <div className="flex flex-col sm:flex-row">
                            <Button
                                size="lg"
                                onClick={() => setActiveSection("brands")}
                                variant={activeSection === "brands" ? "default" : "ghost"}
                                className={`w-full sm:w-auto mb-1 sm:mb-0 ${
                                    activeSection === "brands"
                                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                For Brands
                            </Button>
                            <Button
                                size="lg"
                                onClick={() => setActiveSection("creators")}
                                variant={activeSection === "creators" ? "default" : "ghost"}
                                className={`w-full sm:w-auto ${
                                    activeSection === "creators"
                                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                For Creators
                            </Button>
                        </div>
                    </div>
                </div>

                {activeSection === "brands" && (
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
                            For Brands: Hiring in 3 Easy Steps
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
                            Connect with the perfect creators for your campaign through our
                            streamlined process
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {brandSteps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="bg-blue-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                                            {step.number}
                                        </div>
                                        <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeSection === "creators" && (
                    <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
                            For Creators: Earning in 3 Easy Steps
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-2xl mx-auto">
                            Monetize your content creation skills and build lasting brand
                            partnerships
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {creatorSteps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div className="bg-green-600 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">
                                            {step.number}
                                        </div>
                                        <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-8 lg:p-12 mb-8 sm:mb-16">
                    <div className="text-center mb-6 sm:mb-8">
                        <div className="bg-blue-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                            SocialJi Trustap Secure Payment Flow
                        </h2>
                    </div>
                    <div className="bg-white rounded-xl p-4 sm:p-8 shadow-sm mb-6 sm:mb-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="text-center flex-1">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="font-semibold text-sm sm:text-base">Brand</div>
                            </div>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transform rotate-90 sm:rotate-0" />
                            <div className="text-center flex-1">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="font-semibold text-sm sm:text-base">
                                    Influencer
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transform rotate-90 sm:rotate-0" />
                            <div className="text-center flex-1">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="font-semibold text-sm sm:text-base">Trustap</div>
                            </div>
                            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 transform rotate-90 sm:rotate-0" />
                            <div className="text-center flex-1">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-lg mx-auto mb-2 flex items-center justify-center">
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="font-semibold text-sm sm:text-base">Payout</div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-center">
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                            <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                Secure Escrow
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                SocialJi holds payment in a secure vault until work is completed
                                and approved, protecting both parties.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                            <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                No Hidden Fees
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                No hidden fees for brands. Creators pay a small commission only
                                when they earn.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
                            <div className="bg-purple-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">
                                24/7 Support
                            </h3>
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Our{" "}
                                <Link
                                    href="/contact-us"
                                    className="text-blue-600 hover:underline"
                                >
                                    support team
                                </Link>{" "}
                                helps with content revisions and dispute resolution.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
                        Ready to Get Started?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
                        <div className="bg-blue-50 rounded-xl p-4 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                For Brands
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                                Find the perfect influencer or UGC creator for your campaign on
                                our marketplace.
                            </p>
                            <Link
                                href="/explore?tab=influencers"
                                className="inline-flex items-center bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                Browse Creators
                                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 sm:p-8">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">
                                For Creators
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                                Join SocialJi and start monetizing your content creation skills.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-sm sm:text-base"
                            >
                                Join as a Creator
                                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
