import Image from 'next/image'

const logos = [
    {
        name: 'Vercel',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881430/vercel_wordmark_dark_mhv8u8.svg'
    },
    {name: 'Nextjs', url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715881475/nextjs_logo_dark_gfkf8m.svg'},
    {
        name: 'Prime',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/t2awrrfzdvmg1chnzyfr.svg'
    },
    {
        name: 'Trustpilot',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tkfspxqmjflfllbuqxsi.svg'
    },
    {
        name: 'Webflow',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/nymiivu48d5lywhf9rpf.svg'
    },
    {
        name: 'Airbnb',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/pmblusboe7vkw8vxdknx.svg'
    },
    {name: 'Tina', url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276560/logos/afqhiygywyphuou6xtxc.svg'},
    {
        name: 'Stackoverflow',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/ts1j4mkooxqmscgptafa.svg'
    },
    {
        name: 'Mistral',
        url: 'https://res.cloudinary.com/dfhp33ufc/image/upload/v1715276558/logos/tyos2ayezryjskox3wzs.svg'
    }
]

const AnimatedLogoCloud = () => {
    return (
        <div className="w-full py-12 bg-white">
            <div className="mx-auto w-full px-4 md:px-8">
                <div
                    className="relative flex overflow-hidden py-4"
                    style={{
                        maskImage: 'linear-gradient(to left, transparent 0%, black 10%, black 90%, transparent 100%)'
                    }}
                >
                    {/* Duplicate logos twice for seamless scrolling */}
                    <div className="flex logo-cloud gap-6">
                        {Array(2).fill(logos).flat().map((logo, key) => (
                            <Image
                                key={key}
                                src={logo.url}
                                width={112}
                                height={40}
                                className="h-10 w-auto px-2 brightness-0 "
                                alt={logo.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimatedLogoCloud
