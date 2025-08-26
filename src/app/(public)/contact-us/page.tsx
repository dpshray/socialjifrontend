import type {Metadata} from "next"
import ContactClient from "@/components/page/ContactClient";


export const metadata: Metadata = {
    title: "Contact Us | SocialJi Support",
    description:
        "Need help or have questions? Contact SocialJi's support team. We're here to assist with platform issues, collaboration inquiries, or any feedback. Reach out via the form or email and we'll respond promptly.",
    keywords:
        "SocialJi contact, SocialJi support, influencer platform contact, customer support SocialJi, help center SocialJi, brand support, creator support",
    openGraph: {
        title: "Contact SocialJi Support",
        description:
            "Get in touch with the SocialJi team for any assistance or inquiries. Our support team is ready to help both brands and creators have a smooth experience on our platform.",
        type: "website",
        url: "/contact",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact SocialJi Support",
        description:
            "Get in touch with the SocialJi team for any assistance or inquiries. Our support team is ready to help both brands and creators have a smooth experience on our platform.",
    },
}

export default function ContactPage() {
    return <ContactClient/>
}
