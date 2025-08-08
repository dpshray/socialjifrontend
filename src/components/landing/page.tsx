import {AnimatedElement} from "@/components/animation/Animation";
import Link from "next/link";
import {motion} from "framer-motion";


const getRandomDirection = () => {
    const directions = [
        {x: -50, y: 0},
        {x: 50, y: 0},
        {x: 0, y: -50},
        {x: 0, y: 50},
    ];
    return directions[Math.floor(Math.random() * directions.length)];
};


const imageVariants = (index: number) => ({
    hidden: () => ({
        opacity: 0,
        scale: 0.8,
        ...getRandomDirection(),
    }),
    visible: {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transition: {duration: 0.6, ease: "easeOut", delay: index * 0.2},
    },
    shake: {
        x: [0, -5, 5, -5, 5, 0], // Shake effect
        transition: {duration: 1.5, ease: "easeInOut", delay: index * 0.5}, // Staggered shaking
    },
    hover: {
        scale: 1.05,
        y: -5,
        transition: {duration: 0.1, ease: "easeOut"},

    },
});


const staggerContainer = {
    hidden: {opacity: 1},
    visible: {
        opacity: 1,
        transition: {staggerChildren: 0.2},
    },
};

const images = [
    {
        src: '/land1.jpeg',
        style: "rounded-tl-[122px] rounded-bl-xl",
    },
    {
        src: 'land2.jpeg',
        style: "rounded-2xl",
    },
    {
        src: '/land3.jpeg',
        style: "rounded-2xl",
    },
    {
        src: '/land4.jpeg',
        style: "rounded-tr-[122px] rounded-br-[122px]",
    },
];

export default function HomeHeroSection() {
    return (
        <section className="container mx-auto py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

                {/* Left Content */}
                <div className="space-y-1 text-left">
                    <AnimatedElement type='slideRight' delay={0.3} viewport={{once: false}} whileInView={"visible"}>
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#BE50C8]">
                            <span className="text-purple-600">AI-Powered</span>
                            <br/>
                            <span className="text-gray-900">Influencer Marketplace</span>
                        </h1>
                    </AnimatedElement>
                    <AnimatedElement type='slideLeft' delay={0.3} viewport={{once: false}} whileInView={"visible"}>
                        <p className="text-gray-700 text-lg md:text-xl max-w-xl">
                            Connect with the perfect influencers for your brand using our AI-driven platform.
                        </p>
                    </AnimatedElement>

                    {/* Buttons */}
                    <motion.div
                        initial={{opacity: 0, y: -80}}
                        viewport={{once: false}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.5, ease: "easeOut", delay: 0.2}}
                        className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link href="/register" className="btn-gradient">
                            Join as Brand
                        </Link>
                        <Link href="/register"
                              className="border border-gray-700 text-gray-900 px-6 py-3 rounded-md text-center font-medium hover:bg-gray-100 transition sm:w-auto w-full">
                            Join as Creator
                        </Link>
                    </motion.div>
                </div>

                {/* Right Image Grid with Scroll Animation */}
                <motion.div
                    className="grid grid-cols-2 gap-3 sm:gap-6 place-items-center"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: false, amount: 0.2}}
                >
                    {images.map((image, index) => (
                        <motion.img
                            key={index}
                            src={image.src}
                            alt={`image-${index}`}
                            className={`w-64 h-64 object-cover ${image.style}`}
                            width={400}
                            height={400}
                            variants={imageVariants(index) as any}
                            initial="hidden"
                            whileInView={["visible", "shake"]}
                            whileHover="hover"
                            viewport={{once: false, amount: 0.3}}
                        />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}


