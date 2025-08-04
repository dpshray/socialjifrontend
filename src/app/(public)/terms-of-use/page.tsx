// app/terms-of-use/page.tsx

import { Metadata } from "next"
import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
    title: "Terms of Use | SocialJi",
    description:
        "Review the terms and conditions for using SocialJi's platform. These Terms of Use outline the rules for brands and creators, payment and content policies, and user responsibilities on the SocialJi influencer marketplace.",
    openGraph: {
        title: "SocialJi Terms of Use",
        description:
            "The Terms of Use for SocialJi, detailing the agreement between users (brands and creators) and the platform. Read about account rules, payment terms, content ownership, and more.",
        images: ["/og/terms.jpg"],
    },
}

const TERMS = [
    {
        title: "1. Acceptance of Terms",
        text: "By accessing or using SocialJi, you agree to be bound by these Terms of Use. If you do not agree to all of the terms and conditions, then you may not access the platform or use any services.",
    },
    {
        title: "2. User Roles & Eligibility",
        text: "SocialJi is available to users who are at least 18 years of age. Users may register as Brands (to hire influencers or buy UGC) or as Creators (to offer content services).",
    },
    {
        title: "3. Account Responsibilities",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    },
    {
        title: "4. Content Ownership",
        text: "Upon approval and release of escrow payment, Brands receive full rights to the content delivered by Creators. Creators agree not to reuse or resell exclusive content unless explicitly allowed.",
    },
    {
        title: "5. Escrow & Payments",
        text: "SocialJi holds funds in escrow until the Brand approves the delivered content. Once approved, payment is released to the Creator. If a dispute arises, SocialJi may intervene.",
    },
    {
        title: "6. Prohibited Uses",
        text: "You may not use the platform for unlawful purposes, to solicit others to perform illegal acts, or to violate intellectual property rights. Abuse may result in suspension.",
    },
    {
        title: "7. Suspension and Termination",
        text: "SocialJi may suspend or terminate access to the platform for any user who violates these terms, with or without notice.",
    },
    {
        title: "8. Updates to Terms",
        text: "These Terms may be updated periodically. Continued use of SocialJi after changes have been posted constitutes acceptance of the new terms.",
    },
    {
        title: "9. Contact Information",
        text: "For any questions or concerns, please contact us at support@socialji.com.",
    },
]

const TermsSection = memo(() => (
    <Card className="w-full  mx-auto rounded-none border  shadow-none border-none bg-white ">
        <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Terms of Use
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1 italic">Effective Date: January 1, 2025</p>
        </CardHeader>

        <CardContent className="space-y-10 px-6 py-10 sm:px-10 text-base leading-relaxed text-gray-800">
            {TERMS.map((section, idx) => (
                <section key={idx} className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-gray-700">
                        {section.text.includes("support@socialji.com") ? (
                            <>
                                For any questions or concerns, please contact us at{" "}
                                <a href="mailto:support@socialji.com" className="text-blue-600 underline">
                                    support@socialji.com
                                </a>
                                .
                            </>
                        ) : (
                            section.text
                        )}
                    </p>
                </section>
            ))}

            <footer className="pt-10 mt-6 border-t border-gray-100 text-sm text-muted-foreground">
                Created by{" "}
                <a
                    href="https://laxmankafle.com"
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    LaxmanKafle.com
                </a>{" "}
                for SocialJi.com
            </footer>
        </CardContent>
    </Card>
))

TermsSection.displayName = "TermsSection"

export default function TermsOfUsePage() {
    return (
        <main className="flex-1 container mx-auto my-6 w-full">
            <TermsSection />
        </main>
    )
}
