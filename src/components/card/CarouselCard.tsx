import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,} from "@/components/ui/carousel";
import {Card, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {RxHamburgerMenu} from "react-icons/rx";
import {FaHeart} from "react-icons/fa6";
import React from "react";

export function CarouselCardItem() {
    return (
        <Card
            className="w-[250px] h-[320px] flex flex-col justify-between py-0 gap-2 overflow-hidden  shadow-md bg-white transition hover:shadow-lg rounded-sm">
            {/* Image section (fixed height, covers image) */}
            <div className="relative h-[100px] w-full">
                <Image
                    src="/brand.png"
                    alt="Brand showcase image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg h-full w-full object-fill"
                    priority
                />
            </div>

            {/* Card header */}
            <CardHeader className="flex flex-row items-start gap-2 px-2 py-1">
                <Avatar className="h-7 w-7 items-center justify-center mt-1">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Brand avatar"/>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-2 truncate">
                    <CardTitle className="text-xs font-medium text-gray-900 truncate">
                        Brand Name
                    </CardTitle>
                    <div className="flex flex-wrap gap-px">
                        {["Fashion", "Modeling", "Photography"].map((tag) => (
                            <Badge
                                key={tag}
                                variant="outline"
                                className="text-[9px] px-1.5 py-0.5 rounded-sm"
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardHeader>

            {/* Description */}
            <div className="px-2 text-sm text-gray-600 line-clamp-2 leading-tight">
                I will create amazing TikTok reels for you. I will create amazing TikTok reels for you. I will
                create amazing TikTok reels for you. I will create amazing TikTok reels for you. I will create
                amazing TikTok reels for you.
            </div>

            <Separator className=""/>

            {/* Footer */}
            <CardFooter className="px-2 py-1 mb-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-1 hover:bg-gray-100"
                        aria-label="More Options"
                    >
                        <RxHamburgerMenu className="text-base"/>
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 p-1 hover:bg-red-100"
                        aria-label="Add to Favorites"
                    >
                        <FaHeart className="text-base text-red-500"/>
                    </Button>
                </div>
                <span className="text-sm font-semibold text-gray-800">₹1,258</span>
            </CardFooter>
        </Card>
    );
}

export default function CarouselCard() {
    return (
        <div className="w-full">
            <Carousel className="w-full">
                <CarouselContent>
                    {[...Array(6)].map((_, index) => (
                        <CarouselItem key={index} className="basis-auto px-2">
                            <CarouselCardItem/>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious aria-label="Previous Slide"/>
                <CarouselNext aria-label="Next Slide"/>
            </Carousel>
        </div>
    );
}
