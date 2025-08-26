"use client"
import Link from "next/link"
import {Facebook, Linkedin, Twitter} from "lucide-react"
import Image from "next/image"

const Footer = () => {
    const company = [
        {label: "About", link: "#"},
        {label: "Careers", link: "#"},
        {label: "Brand Center", link: "#"},
        {label: "Blog", link: "#"},
    ]
    const helpCenter = [
        {label: "Join our Discord Server", link: "#"},
        {label: "Twitter", link: "#"},
        {label: "Facebook", link: "#"},
        {label: "Contact Us", link: "#"},
    ]
    const legal = [
        {label: "Privacy Policy", link: "/privacy-policy"},
        {label: "Licensing", link: "#"},
        {label: "Terms & Conditions", link: "/terms-conditions"},
    ]
    const downloads = [
        {label: "iOS", link: "#"},
        {label: "Android", link: "#"},
        {label: "Windows", link: "#"},
        {label: "MacOS", link: "#"},
    ]
    const socialLinks = [
        {href: "#", label: "Facebook", Icon: Facebook},
        {href: "#", label: "LinkedIn", Icon: Linkedin},
        {href: "#", label: "Twitter", Icon: Twitter},
    ]
    return (
        <footer className="bg-white border-t border-gray-200 font-montserrat mt-12">
            <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-8 lg:py-12">
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            {/* Removed AnimatedElement wrapper */}
                            <div className="flex items-center space-x-3">
                                <Image
                                    src="/logo.png"
                                    width={60}
                                    height={60}
                                    alt="SocialJi Logo"
                                    className="w-3/4 h-16 "
                                />
                                <span className={'sr-only'}> SocialJi</span>
                            </div>
                            {/* Removed AnimatedElement wrapper */}
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-montserrat text-justify">
                                <span className="font-semibold">SocialJi</span> is a platform for content creators to
                                showcase their
                                work and connect with their audience. Whether you&#39;re a professional photographer, a
                                passionate
                                writer, or a talented musician, SocialJi is the perfect place to share your creativity
                                and connect with
                                like-minded individuals.
                            </p>
                        </div>
                        {/* Links Section */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 w-full md:w-[70%] mt-8 md:mt-0">
                            {/* Company Section */}
                            <div>
                                <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
                                <ul className="space-y-2">
                                    {company.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.link}
                                                className="text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors duration-200 text-sm"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Help Center Section */}
                            <div>
                                <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Help
                                    Center</h3>
                                <ul className="space-y-2">
                                    {helpCenter.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.link}
                                                className="text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors duration-200 text-sm"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Legal Section */}
                            <div>
                                <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
                                <ul className="space-y-2">
                                    {legal.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.link}
                                                className="text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors duration-200 text-sm"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Download Section */}
                            <div>
                                <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Download</h3>
                                <ul className="space-y-2">
                                    {downloads.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.link}
                                                className="text-gray-600 hover:text-gray-900 hover:underline hover:underline-offset-4 transition-colors duration-200 text-sm"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Divider */}
                <hr className="border-gray-200"/>
                {/* Footer Bottom */}
                <div className="py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        {/* Copyright and Links */}
                        <div className="text-center sm:text-left">
                            <p className="text-sm text-gray-600">© 2025 SocialJi, Inc. All rights reserved.</p>
                            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-2">
                                {
                                    legal.map((item, index) => (
                                        <Link
                                            key={index}
                                            href={item.link}
                                            className="text-sm text-gray-600 hover:text-gray-900 hover:underline">
                                            {item.label}
                                        </Link>
                                    ))

                                }
                            </div>
                        </div>

                        <div className="flex space-x-3">
                            {socialLinks.map(({href, label, Icon}, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    aria-label={`Visit our ${label} page`}
                                    className="inline-flex items-center justify-center w-10 h-10 bg-purple-50 hover:bg-purple-100 rounded-full transition-colors duration-200 group"
                                >
                                    <Icon
                                        size={18}
                                        className="text-purple-600 group-hover:text-purple-700 transition-colors duration-200"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
