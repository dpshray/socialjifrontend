'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {LucideIcon} from 'lucide-react';
import {cn} from "@/lib/utils";

interface BannerSectionProps {
    reverse: boolean;
    data: { title: string; desc: string }[];
    heading: string;
    images: string[];
}

interface PlatformCardProps {
    name: string;
    logo: string;
    features: string;
    delay?: number;
}

interface OpportunityCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    colorFrom: string;
    colorTo: string;
    delay?: number;
}

interface AnalyticHomeProps {
    title: string;
    sub: string;
    icon: LucideIcon;
    delay: number;
}

export const ListCard = ({title, desc}: { title: string; desc: string }) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.5, ease: 'easeOut', delay: 0.5}}
        viewport={{amount: 0.2}}
        className="bg-white border border-[#e5ecf6] rounded-xl p-4 shadow-sm"
    >
        <h3 className="text-[#0c1f26] text-lg font-medium mb-1">{title}</h3>
        <p className="text-[#0c1f26] text-base font-normal">{desc}</p>
    </motion.div>
);

export const BannerSection = ({reverse, data, heading, images}: BannerSectionProps) => (
    <div
        className={`max-w-7xl mx-auto flex flex-col-reverse md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} justify-between gap-8`}>
        <div className="relative w-full md:w-1/2 min-h-[600px] flex">
            <motion.div
                initial={{opacity: 0, y: -100}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: 'easeOut'}}
                viewport={{amount: 0.2}}
                className="absolute top-0 left-8 h-[250px] z-20"
            >
                <Image
                    src={images[0] || '/brand1.png'}
                    alt={`${heading} image`}
                    width={400}
                    height={300}
                    className="object-contain h-full w-full"
                />
            </motion.div>
            <motion.div
                initial={{opacity: 0, x: -100}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.8, ease: 'easeOut'}}
                viewport={{amount: 0.2}}
                className="absolute top-24 right-[40px] h-[350px] z-10"
            >
                <Image
                    src={images[1]}
                    alt={`${heading} image`}
                    width={400}
                    height={400}
                    className="object-cover h-full w-full"
                />
            </motion.div>
            <motion.div
                initial={{opacity: 0, x: 100}}
                whileInView={{opacity: 1, x: 0}}
                transition={{duration: 0.8, ease: 'easeOut'}}
                viewport={{amount: 0.2}}
                className="absolute bottom-[72px] left-0 h-[250px] z-20"
            >
                <Image
                    src={images[2]}
                    alt={`${heading} image`}
                    width={100}
                    height={100}
                    className="object-contain h-full w-full"
                />
            </motion.div>
        </div>

        <div className="flex flex-col space-y-6 w-full lg:w-1/2">
            <h2 className="text-[#0c1f26] text-5xl font-bold mb-6">{heading}</h2>
            <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{amount: 0.2}}
                variants={{
                    hidden: {opacity: 0},
                    visible: {
                        opacity: 1,
                        transition: {staggerChildren: 0.3, delayChildren: 0.3},
                    },
                }}
            >
                {data.map((item, index) => (
                    <motion.div
                        key={index}
                        viewport={{amount: 0.2}}
                        variants={{
                            hidden: {opacity: 0, y: 20},
                            visible: {opacity: 1, y: 0},
                        }}
                        transition={{delay: index * 0.5, duration: 0.5}}
                    >
                        <ListCard title={item.title} desc={item.desc}/>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </div>
);

export function PlatformCard({name, logo, features, delay = 0}: PlatformCardProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: 'easeOut', delay}}
            viewport={{amount: 0.2}}
            className="bg-white max-w-[250px] rounded-lg p-6 flex flex-col items-center justify-center border border-gray-200 shadow-[0px_10px_60px_0px_#262D7614]"
        >
            <div className="h-20 w-20 relative mb-4 flex items-center justify-center">
                <Image
                    src={logo}
                    alt={`logo-${name}`}
                    width={100}
                    height={100}
                    className="h-18 w-18 aspect-square"
                />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-1 font-montserrat">{name}</h3>
            <p className="text-gray-600 text-sm text-nowrap text-center font-montserrat">{features}</p>
        </motion.div>
    );
}

export function OpportunityCard({
                                    icon: Icon,
                                    title,
                                    description,
                                    colorFrom,
                                    colorTo,
                                    delay = 0,
                                }: OpportunityCardProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: 'easeOut', delay}}
            viewport={{amount: 0.2}}
        >
            <Card
                className={cn('group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-muted/50',
                    'h-[300px]')}>
                <CardHeader className="pb-4">
                    <div
                        className={`w-14 h-14 bg-gradient-to-r ${colorFrom} ${colorTo} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                        <Icon className="w-7 h-7 text-white"/>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export const AnalyticHomeCard = ({title, sub, icon: Icon, delay}: AnalyticHomeProps) => (
    <motion.div
        initial={{opacity: 0, x: -50, y: -80}}
        whileInView={{opacity: 1, x: 0, y: 0}}
        transition={{duration: 0.5, ease: 'easeOut', delay}}
        viewport={{amount: 0.2}}
        className="flex flex-col items-center"
    >
        <div className="bg-[#9A9A9A]/20 w-18 h-18 aspect-square rounded-xl flex items-center justify-center mb-2">
            <Icon className="w-8 h-8 text-gray-800"/>
        </div>
        <h3 className="text-xl font-medium text-black font-montserrat">{sub}</h3>
        <p className="text-[#1A202C] text-sm font-normal line-clamp-2">{title}</p>
    </motion.div>
);
