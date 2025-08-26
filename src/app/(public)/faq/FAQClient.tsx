"use client"

import type React from "react"
import {useState} from "react"
import {Briefcase, Camera, ChevronDown, ChevronUp, HelpCircle, Users} from "lucide-react"
import Link from "next/link"
import type {JSX} from "react/jsx-runtime"

interface FAQItem {
    id: string
    question: string
    answer: JSX.Element
}

const brandFAQs: FAQItem[] = [
    {
        id: "brand-1",
        question: "What is SocialJi and how does it work for brands?",
        answer: (
            <p>
                SocialJi is an online marketplace that connects brands with social media influencers and content
                creators. As a
                brand, you can search for influencers or UGC creators by category or platform, hire them for
                collaborations
                (like sponsored posts or custom content), and manage payments all in one place. Simply put: you find a
                creator,
                agree on deliverables, pay through our <strong>secure escrow</strong>, and receive your content or
                promotion.
                It&apos;s a streamlined way to run influencer marketing campaigns without the hassle.
            </p>
        ),
    },
    {
        id: "brand-2",
        question: "How do I hire an influencer on SocialJi?",
        answer: (
            <p>
                It&apos;s easy! First, sign up for a brand account. Then you can browse the marketplace or use filters
                to find an
                influencer who matches your target audience and budget. On an influencer&apos;s profile, you&apos;ll see
                their available
                services or you can click &quot;Hire&quot; to propose a new collaboration. You&apos;ll detail what you
                need (content type,
                timeline, etc.) and submit the request. Once the influencer accepts, you&apos;ll be prompted to pay the
                agreed fee
                into escrow. From there, you can chat with the influencer, wait for the content, and approve it when
                it&apos;s
                delivered. (If an influencer declines or doesn&apos;t respond, you won&apos;t be charged in that case.)
            </p>
        ),
    },
    {
        id: "brand-3",
        question: "Is my payment secure? What if I'm not satisfied with the content?",
        answer: (
            <p>
                Yes – your payment is <strong>100% secure</strong>. When you pay an influencer, your money goes into our
                escrow
                vault and is not released to the influencer until you have received and approved the work. If
                you&apos;re not happy
                with the delivered content, you can request a revision or open a dispute before the payment is released.
                SocialJi&apos;s team will step in to help mediate any issues. If ultimately the content isn&apos;t
                delivered as agreed,
                you are eligible for a <strong>refund</strong> as per our{" "}
                <Link href="/terms-of-use" className="text-blue-600 hover:text-blue-800 underline">
                    Terms
                </Link>
                . This system protects both you and the creator.
            </p>
        ),
    },
    {
        id: "brand-4",
        question: "How much does it cost to use SocialJi? Are there any fees for brands?",
        answer: (
            <p>
                Creating an account on SocialJi is <strong>free for brands</strong>. You pay only for the collaborations
                you
                book. The price of each collaboration is set by the influencer (or negotiated). SocialJi does not charge
                brands
                a separate commission or subscription fee at this time – the platform takes a service fee from the
                creator&apos;s
                side on each transaction. So the price you agree on is what you pay, and that covers the creator&apos;s
                payment plus
                platform facilitation.
            </p>
        ),
    },
    {
        id: "brand-5",
        question: "How do I communicate with the influencer I hire?",
        answer: (
            <p>
                SocialJi provides an <strong>integrated messaging/chat system</strong> once you initiate a
                collaboration. After
                you send a hire request and the influencer accepts, a project chat opens where you can exchange details,
                files
                (like briefs or content drafts), and feedback. This keeps all communication in one place. We recommend
                using
                this channel for record-keeping and so our support team can assist if needed. If you need to ship a
                product to
                the influencer, you can exchange shipping info securely via chat as well.
            </p>
        ),
    },
]

const creatorFAQs: FAQItem[] = [
    {
        id: "creator-1",
        question: "How do I become a creator on SocialJi?",
        answer: (
            <p>
                Just click &quot;Join as a Creator&quot; on our website and fill out the sign-up form. You&apos;ll need
                to provide some basic
                info and set up your profile. This includes linking your social media accounts (so brands can see your
                audience
                size), writing a short bio, selecting your categories/niches, and perhaps listing services or packages
                you offer
                (like an Instagram post, a TikTok video, a batch of UGC photos, etc.). Once your profile is complete, it
                will be
                visible to brands searching the marketplace. <strong>Tip:</strong> A complete profile with sample
                content and a
                clear description will attract more brands!
            </p>
        ),
    },
    {
        id: "creator-2",
        question: "How do I get paid, and is my payment guaranteed?",
        answer: (
            <p>
                Payments are handled through SocialJi&apos;s secure system. When a brand hires you, they pay the fee
                upfront into an{" "}
                <strong>escrow account</strong>. That means the money is ready and reserved for you. You will see in
                your
                dashboard that the project is funded. After you deliver the work and the brand marks it as approved (or
                the
                no-complaint period passes), the money is released to you. You can then withdraw your earnings to your
                preferred
                payment method (e.g., bank account, PayPal, etc.). Yes, your <strong>payment is guaranteed</strong> as
                long as
                you deliver the work as agreed – since the brand&apos;s funds were locked in escrow, you won&apos;t have
                to chase
                payments.
            </p>
        ),
    },
    {
        id: "creator-3",
        question: "How much does SocialJi charge creators?",
        answer: (
            <p>
                It&apos;s <strong>free to join</strong> and list your services on SocialJi. We only make money when you
                do – SocialJi
                takes a small commission fee (service fee) from the payout of each completed collaboration. The exact
                fee will
                be communicated to you (and visible in earnings breakdown) and is used to maintain the platform and
                payment
                protection. There are <strong>no monthly charges or hidden fees</strong>. Essentially, if you don&apos;t
                have any
                gigs, you owe nothing; when you do earn, we handle the transaction and deduct the fee automatically.
            </p>
        ),
    },
    {
        id: "creator-4",
        question: "Can I decline an order or choose who I work with?",
        answer: (
            <p>
                Absolutely. As a creator, you have <strong>full control</strong> over which jobs you accept. If a brand
                sends
                you a request that doesn&apos;t feel like a good fit – whether due to budget, brand mismatch, or timing
                – you can
                decline it with no penalty. We believe collaborations should be mutually agreeable. That said, try to
                respond to
                requests in a timely manner (within 72 hours ideally) because if you don&apos;t respond, the requests
                will expire and
                you might miss opportunities.
            </p>
        ),
    },
    {
        id: "creator-5",
        question: "What if a brand asks for more work than agreed or wants extra revisions?",
        answer: (
            <p>
                The scope of work should be clearly communicated upfront in the SocialJi chat before you start. We
                advise
                agreeing on deliverables, number of revisions, and timeline in writing. If a brand requests
                significantly more
                content or major changes beyond the original agreement, you&apos;re not obligated to do additional
                unpaid work. You
                can politely explain that the request is out of scope, and even use SocialJi&apos;s &quot;custom
                offer&quot; feature to propose
                an additional fee for the extra work (if you&apos;re willing). Most brands understand that extra asks
                may incur extra
                costs.
            </p>
        ),
    },
    {
        id: "creator-6",
        question: "Do I have to post content on my own social media, or can I just create content (UGC)?",
        answer: (
            <p>
                That&apos;s up to you and what you offer! SocialJi supports both <strong>influencer posts and
                UGC</strong> (content
                creation) gigs. If you&apos;re open to posting on your own channels, you can list services like an
                Instagram story or
                a TikTok video post to your profile. If you prefer to strictly create content for brands to use (and not
                share
                on your own profile), you can offer UGC packages (like a set of product photos or a video). Many
                creators do
                both. Make sure your profile or communication clarifies what is included.
            </p>
        ),
    },
    {
        id: "creator-7",
        question: "Are collaborations legally contracted or is there a formal agreement?",
        answer: (
            <p>
                When a brand and creator agree to a project on SocialJi, the{" "}
                <Link href="/terms-of-use" className="text-blue-600 hover:text-blue-800 underline">
                    Terms of Use
                </Link>{" "}
                and the specifics in your project chat act as the binding agreement. There isn&apos;t a separate paper
                contract to
                sign – the digital acceptance (the brand paying and you accepting the job) is considered an agreement
                under our
                platform*&apos;s terms. We provide basic contract protection via our terms (covering deliverables,
                payment, revisions,
                etc.).
            </p>
        ),
    },
]

const generalFAQs: FAQItem[] = [
    {
        id: "general-1",
        question: "What social platforms do SocialJi creators use?",
        answer: (
            <p>
                We have creators from all major platforms –{" "}
                <strong>Instagram, TikTok, YouTube, Twitter/X, Facebook, Twitch</strong>, and also those who just create
                content
                (UGC) without posting. Each creator&apos;s profile shows which platforms they are active on (with icons
                or links).
                You can also filter the marketplace by platform to find, say, only TikTokers or only YouTubers.
            </p>
        ),
    },
    {
        id: "general-2",
        question: "How are influencers vetted before joining SocialJi?",
        answer: (
            <p>
                We want quality creators on our platform. When a creator signs up, our team may verify their identity or
                social
                accounts (checking for authentic engagement, etc.). We also encourage brands to leave reviews after
                collaborations, so over time you can see who consistently delivers great work. While we don&apos;t
                manually vet every
                single profile preemptively, we have systems to detect fake followers or problematic content and we
                remove
                creators who don&apos;t meet our standards or violate guidelines.
            </p>
        ),
    },
]

interface AccordionSectionProps {
    title: string
    icon: React.ReactNode
    faqs: FAQItem[]
    openItems: string[]
    toggleItem: (id: string) => void
}

function AccordionSection({title, icon, faqs, openItems, toggleItem}: AccordionSectionProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
                {icon}
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            </div>
            <div className="space-y-4">
                {faqs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            onClick={() => toggleItem(faq.id)}
                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                        >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                            {openItems.includes(faq.id) ? (
                                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0"/>
                            ) : (
                                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0"/>
                            )}
                        </button>
                        {openItems.includes(faq.id) && (
                            <div className="px-6 py-4 bg-white border-t border-gray-200">
                                <div className="text-gray-700 leading-relaxed">{faq.answer}</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function FAQClient() {
    const [openItems, setOpenItems] = useState<string[]>([])

    const toggleItem = (id: string) => {
        setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <HelpCircle className="h-8 w-8"/>
                        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
                    </div>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Got questions? We&apos;ve got answers. Browse the FAQs below to learn more about using SocialJi
                        as a brand or
                        creator.
                    </p>
                    <p className="mt-4 text-blue-100">
                        If you don&apos;t see your question here, feel free to{" "}
                        <Link href="/contact" className="text-white underline hover:text-blue-200">
                            contact us
                        </Link>
                        .
                    </p>
                </div>
            </div>

            {/* Quick Navigation */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button
                            onClick={() => scrollToSection("brands-section")}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Briefcase className="h-4 w-4"/>
                            For Brands
                        </button>
                        <button
                            onClick={() => scrollToSection("creators-section")}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Camera className="h-4 w-4"/>
                            For Creators
                        </button>
                        <button
                            onClick={() => scrollToSection("general-section")}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <Users className="h-4 w-4"/>
                            General
                        </button>
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div id="brands-section">
                    <AccordionSection
                        title="For Brands"
                        icon={<Briefcase className="h-6 w-6 text-blue-600"/>}
                        faqs={brandFAQs}
                        openItems={openItems}
                        toggleItem={toggleItem}
                    />
                </div>

                <div id="creators-section">
                    <AccordionSection
                        title="For Creators"
                        icon={<Camera className="h-6 w-6 text-purple-600"/>}
                        faqs={creatorFAQs}
                        openItems={openItems}
                        toggleItem={toggleItem}
                    />
                </div>

                <div id="general-section">
                    <AccordionSection
                        title="General"
                        icon={<Users className="h-6 w-6 text-green-600"/>}
                        faqs={generalFAQs}
                        openItems={openItems}
                        toggleItem={toggleItem}
                    />
                </div>

                {/* Contact CTA */}
                <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
                    <p className="text-gray-600 mb-4">Our support team is here to help you succeed on SocialJi.</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <HelpCircle className="h-4 w-4"/>
                        Contact Support Team
                    </Link>
                </div>
            </div>
        </div>
    )
}