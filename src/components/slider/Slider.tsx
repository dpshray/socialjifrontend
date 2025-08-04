import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const ImageSlider = () => {
    return (
        <div className="relative w-full">
            <Swiper
                navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                {[...Array(5)].map((_, index) => (
                    <SwiperSlide key={index} className="my-4">
                        <SliderContent/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button
                className="custom-prev  sm:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10
               w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center
               transition-all hover:scale-110 hover:bg-white/70 hover:shadow-lg"
            >
                <CircleChevronLeft size={24} className="text-black"/>
            </button>

            <button
                className="custom-next  sm:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10
               w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex justify-center items-center
               transition-all hover:scale-110 hover:bg-white/70 hover:shadow-lg"
            >
                <CircleChevronRight size={24} className="text-black"/>
            </button>

        </div>
    );
};

export default ImageSlider;

const SliderContent = () => {
    return (
        <div
            className="flex flex-col md:flex-row items-center bg-white px-6 sm:px-8 py-6 sm:py-8  font-montserrat">
            {/* Left Section: Illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
                <Image
                    src="/slide1.png"
                    alt="Illustration of a content creator"
                    width={400}
                    height={400}
                    className="object-cover w-[80%] md:w-[70%] max-w-xs sm:max-w-md h-auto"
                />
            </div>

            {/* Right Section: Content */}
            <div className="w-full md:w-1/2 px-4 sm:px-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-2">
                    <Image
                        src="https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg"
                        alt="Toyota Logo"
                        width={40}
                        height={40}
                    />
                    <h2 className="text-lg sm:text-xl font-bold ml-2">TOYOTA</h2>
                </div>
                <h3 className="text-md sm:text-lg  font-montserrat font-semibold">ADVENTURE UNLOCKED</h3>
                <p className="text-gray-600 mt-2 text-sm sm:text-base leading-relaxed font-montserrat">
                    &#34;Unmatched Strategy and Flawless Execution from the Company That
                    Pioneered and Revolutionized the Industry.&#34;
                </p>
                <button
                    className="mt-4 py-2 px-4 sm:py-2.5 sm:px-6 text-sm sm:text-base font-semibold text-white
                     bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-md
                     hover:bg-opacity-90 hover:shadow-lg transition-all duration-300"
                >
                    VIEW OUR WORK
                </button>
            </div>
        </div>
    );
};
