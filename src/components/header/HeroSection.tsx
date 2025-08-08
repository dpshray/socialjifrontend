import { Brain, Sparkles } from 'lucide-react';
import React from "react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface HeroSectionProps {
    imageSrc: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    badgeContent: React.ReactNode;
}

export default function HeroSection({ imageSrc, title, description, icon, badgeContent }: HeroSectionProps) {
    return (
        <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden !rounded-none ">
            <Image
                src={imageSrc || "/placeholder.svg"}
                width={1200}
                height={600}
                alt="Hero Background"
                className="absolute inset-0 w-full h-full object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                <Badge className="mb-4 bg-gradient-to-r from-violet-500 to-blue-500 text-white border-0 py-1 px-3 text-sm">
                    {badgeContent}
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-slate-200 max-w-2xl mb-8">
                    {description}
                </p>
            </div>
        </section>
    );
}
