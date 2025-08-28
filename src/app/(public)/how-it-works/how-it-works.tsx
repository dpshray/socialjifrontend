"use client";

import {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {ArrowRight, DollarSign, Handshake, Package, Search, Shield, User, Users, Zap,} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function HowItWorksClient() {
    const [activeSection, setActiveSection] = useState<"brands" | "creators">(
        "brands"
    );

    const brandSteps = [
        {
            number: 1,
            title: "Discover Creators",
            description:
                "Browse or search thousands of influencer profiles by category or platform. Use filters to find the perfect match for your campaign.",
            icon: Search,
        },
        {
            number: 2,
            title: "Securely Book & Collaborate",
            description:
                "Directly hire an influencer or UGC creator. Define project details (deliverables, deadlines) and pay through our secure escrow system. Communicate via integrated chat to finalize details.",
            icon: Handshake,
        },
        {
            number: 3,
            title: "Receive Content & Launch",
            description:
                "Get notified when content is delivered. Review the work, request edits if needed, then approve. Once approved, the content is yours to use and the payment is released to the creator.",
            icon: Package,
        },
    ];

    const creatorSteps = [
        {
            number: 1,
            title: "Create Your Profile",
            description:
                "Sign up and set up your creator profile. Showcase your social accounts, set your rates/packages (e.g., post, story, video, or UGC content), and highlight your niche and style.",
            icon: User,
        },
        {
            number: 2,
            title: "Get Hired & Create",
            description:
                "Brands will find you via search or you can share your SocialJi profile. When you receive a collaboration request, review the project details and accept the job. Communicate with the brand to align on content, then create awesome content!",
            icon: Zap,
        },
        {
            number: 3,
            title: "Deliver & Get Paid",
            description:
                "Upload the completed content for the brand's review. Once the brand approves it, you'll get paid through SocialJi's secure payment system. Payouts are released to your chosen method (e.g., bank or e-wallet) quickly after approval.",
            icon: DollarSign,
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}

            <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-16 lg:py-24">
                <div className="absolute inset-0">
                    <Image
                        src="/how-it-works-flow-diagram.png"
                        alt="How SocialJi Works Flow Diagram"
                        fill
                        className="object-cover opacity-10"
                        priority
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                        How SocialJi Works
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        SocialJi makes influencer marketing easy for both brands and
                        creators. Here&apos;s an overview of what to expect when you
                        collaborate on our platform.
                    </p>
                </div>
            </div>

            {/* Process Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-center mb-12">
                    <div className="bg-gray-100 p-1 rounded-lg">
                        <Button
                            size="lg"
                            onClick={() => setActiveSection("brands")}
                            variant={activeSection === "brands" ? "default" : "ghost"}
                            className={
                                activeSection === "brands"
                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                                    : "text-gray-600 hover:text-gray-900"
                            }
                        >
                            For Brands
                        </Button>

                        <Button
                            size={"lg"}
                            onClick={() => setActiveSection("creators")}
                            variant={activeSection === "creators" ? "default" : "ghost"}
                            className={
                                activeSection === "creators"
                                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-md"
                                    : "text-gray-600 hover:text-gray-900"
                            }
                        >
                            For Creators
                        </Button>
                    </div>
                </div>

                {/* Brands Section */}
                {activeSection === "brands" && (
                    <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
                            For Brands: Hiring in 3 Easy Steps
                        </h2>
                        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                            Connect with the perfect creators for your campaign through our
                            streamlined process
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {brandSteps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div
                                            className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                            {step.number}
                                        </div>
                                        <div
                                            className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-6 h-6 text-blue-600"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Creators Section */}
                {activeSection === "creators" && (
                    <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 lg:p-12 mb-16">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
                            For Creators: Earning in 3 Easy Steps
                        </h2>
                        <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                            Monetize your content creation skills and build lasting brand
                            partnerships
                        </p>

                        <div className="grid md:grid-cols-3 gap-8">
                            {creatorSteps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="text-center">
                                        <div
                                            className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                                            {step.number}
                                        </div>
                                        <div
                                            className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-6 h-6 text-green-600"/>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Safe & Transparent Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 lg:p-12 mb-16">
                    <div className="text-center mb-8">
                        <div
                            className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="w-8 h-8 text-blue-600"/>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Safe & Transparent for Everyone
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div
                                className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-6 h-6 text-green-600"/>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                Secure Escrow
                            </h3>
                            <p className="text-gray-600 text-sm">
                                SocialJi holds payment in a secure vault until work is completed
                                and approved, protecting both parties.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div
                                className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="w-6 h-6 text-blue-600"/>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">
                                No Hidden Fees
                            </h3>
                            <p className="text-gray-600 text-sm">
                                No hidden fees for brands. Creators pay a small commission only
                                when they earn.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div
                                className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-purple-600"/>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">24/7 Support</h3>
                            <p className="text-gray-600 text-sm">
                                Our{" "}
                                <Link href="/contact-us" className="text-blue-600 hover:underline">
                                    support team
                                </Link>{" "}
                                helps with content revisions and dispute resolution.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">
                        Ready to Get Started?
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-blue-50 rounded-xl p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                For Brands
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Find the perfect influencer or UGC creator for your campaign on
                                our marketplace.
                            </p>
                            <Link
                                href="/explore?tab=influencers"
                                className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Browse Creators
                                <ArrowRight className="ml-2 w-4 h-4"/>
                            </Link>
                        </div>

                        <div className="bg-green-50 rounded-xl p-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                For Creators
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Join SocialJi and start monetizing your content creation skills.
                            </p>
                            <Link
                                href="/register"
                                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                                Join as a Creator
                                <ArrowRight className="ml-2 w-4 h-4"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}