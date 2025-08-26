import type { Metadata } from "next"
import FAQClient from "@/app/(public)/faq/FAQClient";


export const metadata: Metadata = {
    title: "Frequently Asked Questions (FAQ) | SocialJi",
    description:
        "Find answers to common questions about using SocialJi. Learn how our influencer marketplace works for brands and creators, how payments and escrow are handled, what fees apply, and more. If you have a question, our FAQ is a great place to start.",
    keywords:
        "SocialJi FAQ, SocialJi help, influencer marketplace questions, how SocialJi works, SocialJi support questions, brand questions, creator questions",
    openGraph: {
        title: "SocialJi FAQ – Answers for Brands & Creators",
        description:
            "Have questions about SocialJi? Our FAQ covers how to hire influencers, how creators get paid, what our fees are, and other common queries to help you use our platform with confidence.",
        images: [
            {
                url: "/faq-page-with-question-mark-icon-and-brand-creator.png",
                width: 1200,
                height: 630,
                alt: "SocialJi FAQ - Questions and Answers for Brands and Creators",
            },
        ],
    },
}

export default function FAQPage() {
    return <FAQClient />
}