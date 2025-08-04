import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Bookmark, EllipsisVertical, Heart, Pencil, Zap} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import React from "react";
import {avatarImages} from "@/components/card/card";

interface ProfileCardProps {
    name: string | null;
    email: string | null;
    imageUrl?: string;

}

export const ProfileCard = ({name, email, imageUrl}: ProfileCardProps) => {


    return (
        <div className="font-inter max-w-md w-full mx-auto space-y-4">
            <section aria-labelledby="profile-header"
                     className="text-center space-y-4 bg-white shadow-sm rounded-lg p-4">
                <Image
                    src={imageUrl || '/brand.png'}
                    alt={`Profile of ${name}`}
                    width={224}
                    height={224}
                    className="rounded-full object-cover mx-auto w-48 h-48"
                    priority
                />
                <div>
                    <h1 id="profile-header" className="text-2xl font-bold text-gray-800">
                        {name}
                    </h1>
                    <p className="text-lg text-gray-600">{email}</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-black font-medium">
                        Creator: <span className="text-gray-600"></span>
                    </p>
                    <div className="flex items-center space-x-2">
                        <span className="text-black font-medium">Followers</span>
                        <div className="flex -space-x-3">
                            {avatarImages.map((avatar, index) => (
                                <Image
                                    key={index}
                                    src={avatar.src}
                                    alt={`Follower ${index + 1}`}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover hover:z-10"
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    <Button
                        aria-label="View associates"
                        asChild
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
                    >
                        <Link href="/associates">
                            <Zap className="w-5 h-5 mr-1"/>
                            Associated
                        </Link>
                    </Button>
                    <Button
                        aria-label="Like profile"
                        className="bg-gray-200 hover:bg-red-100 text-red-600"
                    >
                        <Heart fill="red"/>
                    </Button>
                    <Button
                        aria-label="Bookmark profile"
                        className="bg-gray-200 hover:bg-indigo-100 text-black"
                    >
                        <Bookmark fill="black"/>
                    </Button>
                    <Button
                        aria-label="Edit profile"
                        className="bg-gray-200 hover:bg-indigo-100 text-gray-700"
                    >
                        <Pencil/>
                    </Button>
                    <Button
                        aria-label="More options"
                        className="bg-gray-200 hover:bg-indigo-100 text-gray-700"
                    >
                        <EllipsisVertical/>
                    </Button>
                </div>
            </section>

            <section aria-labelledby="profile-content" className="space-y-4 bg-white shadow-sm rounded-lg p-4">
                <div>
                    <h2 id="profile-content" className="text-xl font-semibold">
                        Tags
                    </h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {["Crypto", "Influencer", "NFT"].map((tag, index) => (
                            <Badge key={index} className="bg-pink-200 text-foreground">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <Separator/>
                <div>
                    <h2 id="profile-content" className="text-xl font-semibold">
                        About
                    </h2>
                    <p className="text-gray-600 text-justify">
                        I am a passionate UI/UX Developer with over 5 years of experience in the industry. I specialize
                        in creating
                        seamless user experiences by combining design principles with intuitive functionality. I’ve
                        worked on e-commerce
                        platforms and mobile apps, always ensuring smooth experiences. I believe in collaboration and
                        enjoy mentoring
                        junior designers.
                    </p>
                </div>
            </section>

            <div className="text-center">
                <Button aria-label="Explore more profile details" variant={"outline"} className={"w-full"}>
                    Explore More
                </Button>
            </div>
        </div>
    );
};
