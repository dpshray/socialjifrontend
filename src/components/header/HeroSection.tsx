'use client'

import Image from 'next/image'
import {Badge} from '@/components/ui/badge'
import {ReactNode} from 'react'

interface HeroSectionProps {
    imageSrc: string
    title: string
    description: string
    badgeText?: string
    badgeContent?: ReactNode
    icon?: ReactNode
    overlayClassName?: string
    textClassName?: string
}

export default function HeroSection({
                                        imageSrc,
                                        title,
                                        description,
                                        badgeText,
                                        badgeContent,
                                        icon,
                                        overlayClassName = 'bg-black/50',
                                        textClassName = 'text-white',
                                    }: HeroSectionProps) {
    return (
        <div className="relative w-full h-[600px]">
            {/* Background Image */}
            <Image
                src={imageSrc}
                alt="Hero Background"
                fill
                sizes="100vw"
                className="z-0 w-full h-full object-cover"
                priority
            />

            {/* Overlay */}
            <div className={`absolute inset-0 ${overlayClassName}`}/>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4 text-center">
                {(badgeText || badgeContent) && (
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        {icon}
                        {badgeText && (
                            <Badge className="bg-violet-100 text-violet-700 border border-violet-200">
                                {badgeText}
                            </Badge>
                        )}
                        {badgeContent}
                    </div>
                )}
                <h1 className={`text-3xl md:text-5xl font-bold mb-2 ${textClassName}`}>
                    {title}
                </h1>
                <p className={`text-base md:text-lg ${textClassName}`}>{description}</p>
            </div>
        </div>
    )
}
