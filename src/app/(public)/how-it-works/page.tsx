import type { Metadata } from "next"
import HowItWorksClient from "@/app/(public)/how-it-works/how-it-works";


export const metadata: Metadata = {
    title: "How SocialJi Works | Simple Influencer Hiring & UGC Process",
    description:
        "Learn how SocialJi connects brands with influencers and UGC creators in a few simple steps. Understand our secure hiring process, from finding creators to payment and content delivery.",
    keywords:
        "how SocialJi works, influencer hiring process, hire influencers process, UGC platform steps, brand creator collaboration steps, secure payment process influencer",
    openGraph: {
        title: "How It Works – SocialJi Influencer & UGC Platform",
        description:
            "A step-by-step look at how brands hire influencers and creators earn on SocialJi. See how our marketplace handles discovery, collaboration, and secure payments.",
        images: [
            {
                url: "/how-it-works-flow-diagram.png",
                width: 1200,
                height: 630,
                alt: "How SocialJi Works - Flow diagram showing the steps from brand posts job to creator creates content to payment released",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "How It Works – SocialJi Influencer & UGC Platform",
        description:
            "A step-by-step look at how brands hire influencers and creators earn on SocialJi. See how our marketplace handles discovery, collaboration, and secure payments.",
        images: ["/how-it-works-flow-diagram.png"],
    },
}

export default function HowItWorksPage() {
    return <HowItWorksClient />
}