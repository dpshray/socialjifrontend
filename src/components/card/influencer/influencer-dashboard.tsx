import React from "react";
import {cn} from "@/lib/utils";
import {WatchIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage,} from '@/components/ui/avatar';

interface StatsCardProps {
    title: string;
    value: string;
    icon: any;
    className?: string

}

interface ProfileCardProps {
    name?: string
    email?: string
    imageUrl?: string
    className?: string
}

export function ProfileCard({
                                name = "Bibek Sah",
                                email = "Eddie@gmail.com",
                                imageUrl = "https://github.com/faizanahmed.png",
                                className,
                            }: ProfileCardProps) {
    return (
        <div
            className={cn(
                "flex items-center gap-4 p-1 rounded-xl w-full",
                "bg-gradient-to-br from-muted to-background/80 dark:from-muted/60 dark:to-background/60",
                " shadow-sm backdrop-blur-sm",
                className
            )}
            role="region"
            aria-label="User Profile"
        >
            <Avatar className="h-12 w-12">
                <AvatarImage src={imageUrl} alt={`${name} profile picture`}/>
                <AvatarFallback>{name?.[0] ?? "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
                <p className="text-sm sm:text-base font-semibold text-foreground truncate">{name}</p>
                <span className="text-sm text-muted-foreground truncate">{email}</span>
            </div>
        </div>
    )
}

export function InfluencerStatsCard({title, value, icon: Icon,className}: StatsCardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-md w-full h-22 font-inter p-2 px-4 overflow-hidden border border-gray-200 shadow-sm",
                "hover:shadow-md transition-all duration-200 ease-in-out",
                "rounded-sm",
                className
            )}
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <p className="text-muted-foreground text-sm mb-1">{title}</p>
                    <h3 className="text-2xl mt-4 font-inter font-bold">{value}</h3>
                </div>
                <div className="bg-gray-200 rounded-full p-2">
                    <Icon className="w-5 h-5 text-purple-600"/>
                </div>
            </div>
        </div>
    )
}

export function ComingStatsCard() {
    return (
        <div
            className={cn(
                "w-full h-28 p-3 rounded-xl shadow-sm border border-border",
                "hover:shadow-md transition-shadow duration-200",
                "flex flex-col justify-between",
                "rounded-sm"
            )}
            role="region"
            aria-label="Coming Soon Card: Digital Twin AI Platform"
        >
            <div className="flex items-center gap-3">
                <div className="rounded-full bg-gradient-to-br from-primary to-secondary/70 p-2">
                    <WatchIcon className="w-6 h-6 text-white" aria-hidden="true"/>
                </div>
                <div className="flex flex-col">
                    <h2 className="text-sm sm:text-base font-semibold text-foreground leading-none">Digital Twin</h2>
                    <span className="text-xs text-muted-foreground font-medium">AI Platform</span>
                </div>
            </div>
            <Button variant="default" size={'sm'}
                    className="w-full bg-slate-800 text-white font-medium hover:bg-slate-700"
                    disabled>
                Coming Soon
            </Button>
        </div>
    )
}
