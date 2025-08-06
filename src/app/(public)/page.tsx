'use client'

import {
    ArrowRight,
    BarChart3,
    CheckCircle,
    Clock,
    CreditCard,
    Headset,
    Shield,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react'
import Image from 'next/image'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import HomeHeroSection from '@/components/landing/page'
import {OpportunityCard} from '@/components/landing'
import {motion} from 'framer-motion'


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
const pledgeData = [
    {
        Icon: CreditCard,
        title: "Fair Compensations",
        description: "Transparent pricing and secure payments for creators",
        iconColor: "bg-[#be50c8]",
    },
    {
        Icon: Headset,
        title: "24/7 Support",
        description: "Dedicated support team for both brands and creators",
        iconColor: "bg-[#4158d0]",
    },
    {
        Icon: Clock,
        title: "Fast Matching",
        description: "AI-powered matching within 24 hours",
        iconColor: "bg-[#c9184a]",
    },
];


const opportunityFeatures = [
    {
        icon: BarChart3,
        title: 'Smart Analytics',
        description:
            'Real-time performance tracking with predictive insights to optimize campaign ROI and audience engagement.',
        colorFrom: 'from-[#6C4EE3]',
        colorTo: 'to-purple-400',
    },
    {
        icon: Zap,
        title: 'Instant Matching',
        description:
            'AI-powered algorithm matches brands with ideal creators in seconds based on audience demographics and engagement.',
        colorFrom: 'from-[#00B882]',
        colorTo: 'to-green-400',
    },
    {
        icon: Shield,
        title: 'Fraud Protection',
        description:
            'Advanced AI detects fake followers and engagement, ensuring authentic partnerships and genuine ROI.',
        colorFrom: 'from-blue-500',
        colorTo: 'to-cyan-400',
    },
]

const pledge = [
    {
        title: "Transparency First",
        desc: "We ensure every brand and creator partnership is backed by clear terms, fair pricing, and full visibility.",
    },
    {
        title: "AI With Integrity",
        desc: "Our algorithms are built to eliminate bias and fake engagement — prioritizing authentic connections only.",
    },
    {
        title: "Privacy-Driven Approach",
        desc: "Your data stays secure. Always. We never sell or misuse your information for third-party gain.",
    },
    {
        title: "Real Impact, Real Results",
        desc: "From campaign launch to ROI analytics, everything is designed to drive real value and measurable outcomes.",
    },
    {
        title: "Creator Empowerment",
        desc: "We believe creators deserve respect, fair pay, and the tools to grow their influence responsibly.",
    },
]

export default function Home() {
    return (
        <main className="font-montserrat">
            {/* Hero Section */}
            <header>
                <HomeHeroSection/>
            </header>

            {/* OPPORTUNITY CARDS */}
            <section className="py-20 px-6 bg-[#ECE7FA]" aria-label="Opportunity Features">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
                                {[
                                    {
                                        title: 'AI-Powered Discovery',
                                        desc: 'Find creators that perfectly align with your brand values and target audience',
                                    },
                                    {
                                        title: 'Campaign Management',
                                        desc: 'Streamlined workflow from brief creation to content approval and payment',
                                    },
                                    {
                                        title: 'Performance Analytics',
                                        desc: 'Real-time insights and ROI tracking across all your influencer partnerships',
                                    },
                                ].map((item, i) => (
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
                                Start Campaign
                                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true"/>
                            </Button>
                        </div>

                        <div className="relative">
                            <div
                                className="bg-gradient-to-br from-white to-purple-50/50 rounded-3xl p-8 shadow-2xl border border-purple-100/50">
                                <Image
                                    src="/land2.jpeg"
                                    width={500}
                                    height={400}
                                    alt="Brand Dashboard"
                                    className="w-full h-auto rounded-2xl shadow-lg"
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
                                {[
                                    {
                                        title: 'Smart Opportunities',
                                        desc: 'AI matches you with brands that fit your niche and audience demographics',
                                    },
                                    {
                                        title: 'Fair Compensation',
                                        desc: 'Transparent pricing tools and secure payment processing for all collaborations',
                                    },
                                    {
                                        title: 'Growth Analytics',
                                        desc: 'Track your performance and optimize your content strategy with detailed insights',
                                    },
                                ].map((item, i) => (
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
                                Join as Creator
                                <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true"/>
                            </Button>
                        </div>

                        <div className="lg:order-1 relative">
                            <div
                                className="bg-gradient-to-br from-white to-green-50/50 rounded-3xl p-8 shadow-2xl border border-green-100/50">
                                <Image
                                    src="/land1.jpeg"
                                    width={500}
                                    height={400}
                                    alt="Creator Dashboard"
                                    className="w-full h-auto object-fill rounded-2xl shadow-lg"
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
                            Join the movement to build a safe and empowering space for creators and brands.
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
