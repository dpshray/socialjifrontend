"use client"

import Link from "next/link"
import Image from "next/image"
import {Facebook, ImageIcon, Linkedin, Twitter, UserPlus, Users} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {Separator} from "@/components/ui/separator"
import {cn} from "@/lib/utils"

interface LinkItem {
    label: string
    href: string
}

interface CTAButton {
    label: string
    href: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    variant?: "default" | "secondary" | "outline"
}

interface SocialLink {
    href: string
    label: string
    icon: React.ComponentType<{ size?: number; className?: string }>
}

const Footer: React.FC = () => {
    const companyLinks: LinkItem[] = [
        {label: "Explore", href: "/explore"},
        {label: "Insights", href: "/insights"},
        {label: "How it Works", href: "/how-it-works"},
        {label: "FAQ", href: "/faq"},
    ]

    const supportLinks: LinkItem[] = [
        {label: "Discord Community", href: process.env.NEXT_PUBLIC_DISCORD_URL || "#"},
        {label: "Help Center", href: "/help"},
        {label: "Contact Support", href: "/contact"},
        {label: "Status Page", href: "/status"},
    ]

    const legalLinks: LinkItem[] = [
        {label: "Privacy Policy", href: "/privacy"},
        {label: "Terms of Service", href: "/terms"},
        {label: "Cookie Policy", href: "/cookies"},
    ]

    const quickLinks: LinkItem[] = [
        {label: "Join as Creator", href: "/register?type=creator"},
        {label: "Hire Influencers", href: "/explore?tab=influencers"},
        {label: "Image Assets", href: "/assets"},
    ]

    const socialLinks: SocialLink[] = [
        {href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#", label: "Facebook", icon: Facebook},
        {href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#", label: "LinkedIn", icon: Linkedin},
        {href: process.env.NEXT_PUBLIC_TWITTER_URL || "#", label: "Twitter", icon: Twitter},
    ]

    const ctaButtons: CTAButton[] = [
        {
            label: "Join as Creator",
            href: "/register?type=creator",
            icon: UserPlus,
            variant: "default",

        },
        {
            label: "Find Influencers",
            href: "/explore",
            icon: Users,
            variant: "secondary",
        },
        {
            label: "Image Assets",
            href: "/image-assets",
            icon: ImageIcon,
            variant: "outline",
        },
    ]

    const FooterLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({
                                                                                                       href,
                                                                                                       children,
                                                                                                       className
                                                                                                   }) => (
        <Link
            href={href}
            className={cn(
                "text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium",
                className
            )}
        >
            {children}
        </Link>
    )

    return (
        <footer className="bg-background border-t">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                            Ready to Transform Your
                            <span
                                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Creator Journey?
              </span>
                        </h2>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Join thousands of creators and brands building meaningful connections on SocialJi
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {ctaButtons.map((button, index) => {
                            const IconComponent = button.icon
                            return (
                                <Button
                                    key={index}
                                    asChild
                                    variant={button.variant}
                                    size="lg"
                                    className={cn(
                                        " font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                                        button.variant === "default" && "  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                                        button.variant === "secondary" && " !text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    )}
                                >
                                    <Link href={button.href} className="flex items-center justify-center gap-2">
                                        <IconComponent size={20}/>
                                        <span>{button.label}</span>
                                    </Link>
                                </Button>
                            )
                        })}
                    </div>
                </div>

                <Separator className="my-8"/>

                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                        <div className="lg:col-span-4 w-full space-y-2">

                            <Link href="/" className="flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    width={180}
                                    height={60}
                                    alt="SocialJi"
                                    className="h-32 w-full object-cover max-w-[200px] "
                                    priority
                                />
                            </Link>

                            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
                                The premier platform connecting creators with brands for authentic collaborations.
                                Build your influence, grow your audience, and monetize your creativity.
                            </p>


                            <div className="flex space-x-3">
                                {socialLinks.map(({href, label, icon: IconComponent}, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        size="icon"
                                        asChild
                                        className="hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-300"
                                    >
                                        <Link
                                            href={href}
                                            aria-label={`Follow us on ${label}`}
                                        >
                                            <IconComponent size={18}/>
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">

                                <Card className="border-none shadow-none bg-transparent">
                                    <CardContent className="p-0">
                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                            Quick Links
                                        </h3>
                                        <ul className="space-y-3">
                                            {quickLinks.map((item, index) => (
                                                <li key={index}>
                                                    <FooterLink href={item.href}>
                                                        {item.label}
                                                    </FooterLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-none bg-transparent">
                                    <CardContent className="p-0">
                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                            Company
                                        </h3>
                                        <ul className="space-y-3">
                                            {companyLinks.map((item, index) => (
                                                <li key={index}>
                                                    <FooterLink href={item.href}>
                                                        {item.label}
                                                    </FooterLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-none bg-transparent">
                                    <CardContent className="p-0">
                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                            Support
                                        </h3>
                                        <ul className="space-y-3">
                                            {supportLinks.map((item, index) => (
                                                <li key={index}>
                                                    <FooterLink href={item.href}>
                                                        {item.label}
                                                    </FooterLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                                <Card className="border-none shadow-none bg-transparent">
                                    <CardContent className="p-0">
                                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                                            Legal
                                        </h3>
                                        <ul className="space-y-3">
                                            {legalLinks.map((item, index) => (
                                                <li key={index}>
                                                    <FooterLink href={item.href}>
                                                        {item.label}
                                                    </FooterLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>

                            </div>
                        </div>
                    </div>
                </div>

                <Separator/>

                <div className="py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                            <p className="text-sm text-muted-foreground font-medium">
                                © {new Date().getFullYear()} SocialJi, Inc. All rights reserved.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">

                            </div>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {legalLinks.slice(0, 2).map((item, index) => (
                                <FooterLink key={index} href={item.href} className="text-xs">
                                    {item.label}
                                </FooterLink>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer