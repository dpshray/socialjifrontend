'use client'
import Image from "next/image";
import React, {FC} from "react";
import {ArrowDownRight, ArrowUpRight, ChevronDown, Star} from "lucide-react";
import {Button} from "@/components/ui/button";
import {ReviewType, VertCardProps} from "@/types/types";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {cn} from "@/lib/utils";
import {FaFlag} from "react-icons/fa";


export const avatarImages = [{
    alt: "user 1",
    src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
}, {
    alt: "user 2",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=1061&q=80"
}, {
    alt: "user 3",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1288&q=80"
}, {
    alt: "user 4",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
}];

export const MultipleAvatar = () => {
    return (<div className="flex items-center -space-x-5">
        {avatarImages.map((avatar, index) => (<Image
            width={400}
            height={400}
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            className="h-8 w-8  rounded-full border-2 border-white object-cover hover:z-10"
        />))}
    </div>)

}


export interface StatsCardProps {
    title: string
    value: string
    icon?: string
    change: string
    increasing: boolean
    className?: string
}

export function StatsCard({title, value, icon, change, increasing, className}: StatsCardProps) {
    return (
        <Card className={cn("p-4 flex items-center gap-4", className)}>
            {icon && (
                <Image src={icon || "/placeholder.svg"} alt={`${title} icon`} width={36} height={36}
                       className="shrink-0"/>
            )}
            <CardContent className="p-0 flex-1">
                <p className="text-sm text-muted-foreground">{title}</p>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold">{value}</span>
                    <span
                        className={cn("flex items-center text-xs font-medium", increasing ? "text-green-600" : "text-red-600")}>
            {increasing ? (
                <ArrowUpRight size={14} className="mr-0.5"/>
            ) : (
                <ArrowDownRight size={14} className="mr-0.5"/>
            )}
                        {change}
          </span>
                </div>
            </CardContent>
        </Card>
    )
}


export function SocialHandlerCard() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                    <div
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">IG</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold">Instagram</h4>
                        <p className="text-sm text-muted-foreground">@johndoe_brand</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">12.5K</p>
                        <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export const VertCard: FC<VertCardProps> = ({
                                                projectNumber = 1,
                                                price = 12,
                                                users = [],
                                            }) => (
    <TooltipProvider delayDuration={0}>
        <Card
            className="w-full max-w-sm p-6 md:p-5 rounded-3xl flex flex-col gap-4"
            style={{
                background:
                    "linear-gradient(117.07deg, #BE50C8 14.65%, #4158D0 79.32%)",
            }}
        >
            <div className="flex -space-x-2">
                {users.slice(0, 3).map((user, index) => (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild className={'cursor-pointer'}>
                                <Avatar className="w-8 h-8 border-2 border-white cursor-pointer">
                                    <AvatarImage
                                        src={user.src}
                                        alt={user.alt || `Avatar ${index + 1}`}
                                        className="object-cover"
                                    />
                                    <AvatarFallback>
                                        {user.alt?.charAt(0).toUpperCase() || `U${index + 1}`}
                                    </AvatarFallback>
                                </Avatar>
                            </TooltipTrigger>
                            <TooltipContent className={cn('px-2 py-1 text-xs bg-white text-black ',
                                '')}>
                                <span>{user.alt || `User ${index + 1}`}</span>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>

            <CardContent className="p-0 flex flex-col gap-2">
        <span className="text-sm font-semibold text-white/50 tracking-tight">
          Finished Projects
        </span>
                <h2 className="text-lg font-medium text-white tracking-tight">
                    Completed Project - {projectNumber} (${price})
                </h2>
            </CardContent>

            {/*<Button*/}
            {/*    variant="outline"*/}
            {/*    className="flex items-center gap-1 py-3 px-3 rounded-lg border-white bg-transparent text-white hover:bg-white/10 w-fit"*/}
            {/*    */}
            {/*>*/}
            {/*    Check Projects*/}
            {/*    <ChevronDown className="w-4 h-4"/>*/}
            {/*</Button>*/}
        </Card>
    </TooltipProvider>
);

export const ReviewCard = ({avatar, name, country, rating, review}: ReviewType) => (
    <Card className="w-full bg-white p-4 flex flex-col sm:flex-row items-start gap-4">
        <div className="flex-shrink-0">
            <Image
                width={80}
                height={80}
                src={avatar}
                alt={`Avatar of ${name}`}
                className="rounded-full object-cover w-16 h-16"
                loading="lazy"
            />
        </div>

        <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
                <div className="flex items-center flex-wrap gap-2 font-medium text-foreground">
                    <h3 className="text-base font-semibold">{name}</h3>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground"
                         aria-label={`Country: ${country}`}>
                        <FaFlag className="text-gray-500" size={12} aria-hidden="true"/>
                        <span>({country})</span>
                    </div>

                    <span className="text-gray-300 mx-1" aria-hidden="true">|</span>

                    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                strokeWidth={1}
                                className={cn(i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")}
                                aria-hidden="true"
                            />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">80</span>
                    </div>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review}</p>
        </div>
    </Card>
);

interface UserCardProps {
    image: string
    name: string
    username: string
    followers: number
    growthRate: number
}

export const DashboardUserCard: React.FC<UserCardProps> = ({image, name, username, followers, growthRate}) => (
    <Card className="p-3">
        <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src={image || "/placeholder.svg"} alt={name}/>
                <AvatarFallback>
                    {name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1 ">
                <p className="text-sm font-medium text-gray-900 truncate">{name}</p>
                <p className="text-xs text-gray-500 truncate">@{username}</p>
                <p className="text-xs text-gray-600">{followers.toLocaleString()} followers</p>
                <p className="text-xs text-green-600">+{growthRate}% growth</p>
            </div>
        </div>
    </Card>
)