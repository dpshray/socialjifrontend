import {CircleAlert} from "lucide-react";
import {Button} from "@/components/ui/button";
import Image from "next/image";

interface PricingCardProps {
    title: string;
    price: number;
    description: string;
    requirements: string[];
}

export  const PricingCard = ({
                         title,
                         price,
                         description,
                         requirements,
                     }: PricingCardProps) => {
    return (
        <div className="flex flex-col gap-6 md:flex-row  ">
            {/* Pricing Details */}
            <div className="flex flex-col justify-evenly gap-4 md:w-[50%]">
                {/* Icon & Title */}
                <div className="flex flex-nowrap space-x-4 items-center">
                    <div
                        className="bg-[#ECEBFF] w-14 h-14 rounded-md flex items-center justify-center"
                        aria-hidden="true"
                    >
                        <CircleAlert className="w-8 h-8 text-[#FFC107]"/>
                    </div>
                    <div className="flex flex-col">
                            <span className="text-sm text-[#6F6C90] font-montserrat text-nowrap font-medium">
                             For individuals
                            </span>
                        <h2 className="text-xl text-[#170F49] capitalize  font-bold font-montserrat">
                            {title}
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <p className="text-base text-gray-700">{description}</p>

                {/* Pricing */}
                <h2 className="text-3xl text-[#170F49] font-bold font-montserrat flex items-baseline">
                    ${price}
                    <span className="text-sm text-[#6F6C90] ml-1 font-montserrat font-medium align-baseline">
                        / month
                      </span>
                </h2>
                <Button className="w-full gap-2 btn-gradient">Book Now</Button>
            </div>

            {/* Features List */}
            <div className="bg-[#D9D9D97D]  flex flex-col gap-4 p-4  md:w-[50%] ">
                    <span className="text-sm text-[#6F6C90] font-montserrat font-medium">
                      What’s included
                    </span>
                <ul className="list-none space-y-3 ">
                    {requirements?.length > 0 ? (
                            requirements.map((requirement: string, index: number) => (
                                <li key={index} className="flex items-center capitalize  justify-start space-x-1">
                                    <Image
                                        src="/checkCircle.svg"
                                        alt="Feature included"
                                        width={20}
                                        height={20}
                                        className="w-4 h-4 aling-middle"
                                    />
                                    <p className="text-gray-700 text-base ">{requirement}</p>
                                </li>
                            ))
                        ) :
                        (
                            <li className="flex items-start space-x-3">
                                <Image
                                    src="/checkCircle.svg"
                                    alt="Feature included"
                                    width={20}
                                    height={20}
                                    className="w-5 h-5"
                                />
                                <p className="text-gray-700 text-sm ">No requirements</p>
                            </li>
                        )
                    }

                </ul>
            </div>

        </div>
    );
};
