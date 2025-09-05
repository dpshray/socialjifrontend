'use client'

import {ArrowRight, CheckCircle, TrendingUp, Users,} from 'lucide-react'
import Image from 'next/image'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import HomeHeroSection from '@/components/page/page'
import {OpportunityCard} from '@/components/page'
import {motion} from 'framer-motion'

import {useRouter} from "next/navigation";

import {brandSection, creatorSection, opportunityFeatures, pledgeData} from "@/data";


interface PledgeItemProps {
    icon: any;
    title: string;
    description: string;
    iconColor: string;
}

const PledgeItem: React.FC<PledgeItemProps> = ({icon: Icon, title, description, iconColor}) => (
    <motion.div
        className="flex items-start gap-4"
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{duration: 0.6}}
    >
        <div
            className={`w-12 h-12 rounded-full ${iconColor} flex items-center justify-center flex-shrink-0`}
        >
            <Icon className="w-6 h-6 text-white"/>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-[#404040]">{title}</h3>
            <p className="text-[#6d6d6d]">{description}</p>
        </div>
    </motion.div>
);


export default function Home() {
    const router = useRouter();
    return (
        <main className="font-montserrat">
            {/* Hero Section */}
            <header aria-label="Hero Section">
                <HomeHeroSection/>
            </header>

            {/* OPPORTUNITY CARDS */}
            <section className="py-20 px-6 bg-[#ECE7FA]" aria-label="Opportunity Features">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {opportunityFeatures.map((feature, index) => (
                        <OpportunityCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            colorFrom={feature.colorFrom}
                            colorTo={feature.colorTo}
                            delay={index * 0.3}
                        />
                    ))}
                </div>
            </section>

            {/* FOR BRANDS */}
            <section className="py-24 px-4 sm:px-6 lg:px-8" aria-label="For Brands">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <Badge className="mb-4 bg-[#6C4EE3]/10 text-[#6C4EE3] border-[#6C4EE3]/20">
                                For Brands
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">
                                Scale Your Influencer <span className="text-[#6C4EE3]">Marketing</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                Launch campaigns faster, reach the right audience, and measure real impact with our
                                comprehensive brand toolkit.
                            </p>

                            <div className="space-y-6 mb-8">
                                {brandSection.map((item, i) => (
                                    <div key={i} className="flex items-start space-x-4">
                                        <div
                                            className="w-8 h-8 bg-[#00B882]/10 rounded-full flex items-center justify-center mt-1">
                                            <CheckCircle className="w-5 h-5 text-[#00B882]" aria-hidden="true"/>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className="bg-gradient-to-r from-[#6C4EE3] to-[#00B882] hover:from-[#5A3DD1] hover:to-[#00A074] text-white font-semibold px-8 py-3 shadow-lg">
                                Launch Your First Campaign

                                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true"/>
                            </Button>
                        </div>

                        <div className="relative">
                            <div
                                className="bg-gradient-to-br from-white to-purple-50/50 rounded-3xl p-8 shadow-2xl border border-purple-100/50">
                                <Image
                                    src="/scale-marketing.jpeg"
                                    width={500}
                                    height={400}
                                    alt="Global influencer marketing illustration showing a young woman selecting influencer profiles on a smartphone, with icons for social media, analytics, and communication, set against a world map to represent global brand reach and campaign scaling."
                                    className="w-full h-[600px] object-fill rounded-2xl shadow-lg"
                                />
                            </div>
                            <div
                                className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-[#00B882] to-green-400 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6 text-white" aria-hidden="true"/>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">+247%</div>
                                        <div className="text-sm text-slate-600">ROI Increase</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FOR CREATORS */}
            <section
                className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white"
                aria-label="For Creators"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="lg:order-2">
                            <Badge className="mb-4 bg-[#00B882]/10 text-[#00B882] border-[#00B882]/20">
                                For Creators
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 text-balance">
                                Monetize Your <span className="text-[#00B882]">Influence</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                                Connect with premium brands, negotiate fair rates, and build long-term partnerships
                                that align with your content style.
                            </p>

                            <div className="space-y-6 mb-8">
                                {creatorSection.map((item, i) => (
                                    <div key={i} className="flex items-start space-x-4">
                                        <div
                                            className="w-8 h-8 bg-[#6C4EE3]/10 rounded-full flex items-center justify-center mt-1">
                                            <CheckCircle className="w-5 h-5 text-[#6C4EE3]" aria-hidden="true"/>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className="bg-gradient-to-r from-[#00B882] to-green-400 hover:from-[#00A074] hover:to-green-500 text-white font-semibold px-8 py-3 shadow-lg">
                                Sign Up as Creator
                                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true"/>
                            </Button>
                        </div>

                        <div className="lg:order-1 relative">
                            <div
                                className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl p-8 shadow-2xl border border-green-100/50">
                                <Image
                                    src="/socialji-creators-hero (1).webp"
                                    width={500}
                                    height={400}
                                    alt="Flat digital illustration of diverse content creators celebrating earnings, showing a phone with payout notifications, audience icons, and a secure payment symbol, representing global creator monetization opportunities."
                                    className="w-full h-[600px] object-fill rounded-2xl shadow-lg"
                                />
                            </div>
                            <div
                                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
                                <div className="flex items-center space-x-3">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-r from-[#6C4EE3] to-purple-400 rounded-full flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" aria-hidden="true"/>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900">$12.5K</div>
                                        <div className="text-sm text-slate-600">Monthly Earnings</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PLEDGE SECTION */}
            <section className="w-full relative h-[500px] md:h-[600px]">
                {/* Background Image */}
                <Image
                    src="/pledge.png"
                    alt="Pledge Background"
                    fill
                    priority
                    className="object-fill w-full h-full z-0"
                />

                {/* Overlay (optional for better readability) */}
                <div className="absolute inset-0 bg-black/10 z-10"/>

                {/* Content on top, aligned right */}
                <div className="absolute inset-0 z-20 flex items-center justify-end px-6 md:px-16">
                    <div className="text-white max-w-xl text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                            Your <span className="text-[#00B882]">Pledge</span>
                        </h1>
                        <p className="text-lg text-white/90 mb-6">
                            At Social Ji, we pledge to build a fair, safe, and united creator economy where creators and
                            brands grow together.
                        </p>
                        <div className="space-y-6">
                            {
                                pledgeData.map((pledge, index) => (
                                    <motion.div
                                        key={index}
                                        viewport={{amount: 0.2}}
                                        initial={{opacity: 0}}
                                        whileInView={{opacity: 1}}
                                        transition={{duration: 0.6, delay: index * 0.5}}
                                    >
                                        <PledgeItem
                                            icon={pledge.Icon}
                                            title={pledge.title}
                                            description={pledge.description}
                                            iconColor={pledge.iconColor}
                                        />
                                    </motion.div>
                                ))
                            }
                        </div>

                    </div>
                </div>
            </section>
            {/*Support Platform*/}
        </main>
    )
}
