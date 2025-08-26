import type { Metadata } from "next"
import { FileText, Users, CreditCard, Shield, Gavel, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"


export const metadata: Metadata = {
    title: "Terms of Use | SocialJi",
    description:
        "Review the terms and conditions for using SocialJi's platform. These Terms of Use outline the rules for brands and creators, payment and content policies, and user responsibilities on the SocialJi influencer marketplace.",
    keywords:
        "SocialJi Terms of Use, SocialJi terms and conditions, influencer platform terms, user agreement SocialJi, SocialJi policies",
    openGraph: {
        title: "SocialJi Terms of Use",
        description:
            "The Terms of Use for SocialJi, detailing the agreement between users (brands and creators) and the platform. Read about account rules, payment terms, content ownership, and more.",
        url: "/terms-of-use",
        type: "website",
    },
}

const sections = [
    { id: "acceptance", title: "1. Acceptance of Terms", icon: FileText },
    { id: "eligibility", title: "2. Eligibility", icon: Users },
    { id: "account", title: "3. Account Registration & Security", icon: Shield },
    { id: "platform", title: "4. Platform Overview", icon: Users },
    { id: "fees", title: "5. Fees and Payments", icon: CreditCard },
    { id: "content", title: "6. Content Ownership and Usage", icon: FileText },
    { id: "conduct", title: "7. Conduct and Prohibited Uses", icon: Shield },
    { id: "reviews", title: "8. Ratings and Reviews", icon: Users },
    { id: "privacy", title: "9. Privacy", icon: Shield },
    { id: "termination", title: "10. Termination", icon: FileText },
    { id: "disclaimers", title: "11. Disclaimers and Limitation of Liability", icon: Gavel },
    { id: "indemnification", title: "12. Indemnification", icon: Gavel },
    { id: "disputes", title: "13. Dispute Resolution & Governing Law", icon: Gavel },
    { id: "miscellaneous", title: "14. Miscellaneous", icon: FileText },
    { id: "contact", title: "15. Contact Information", icon: Mail },
]

export default function TermsOfUsePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Table of Contents - Sticky Sidebar */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <h2 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    Table of Contents
                                </h2>
                                <nav className="space-y-2">
                                    {sections.map((section) => (
                                        <a
                                            key={section.id}
                                            href={`#${section.id}`}
                                            className="text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 flex items-center gap-2"
                                        >
                                            <section.icon className="w-4 h-4" />
                                            {section.title}
                                        </a>
                                    ))}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                            <CardContent className="p-8 lg:p-12">
                                {/* Header */}
                                <div className="text-center mb-12">
                                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">Terms of Use</h1>
                                    <p className="text-slate-600 italic text-lg">Effective Date: January 1, 2025</p>
                                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
                                </div>

                                {/* Content Sections */}
                                <div className="prose prose-slate max-w-none">
                                    {/* Section 1: Acceptance of Terms */}
                                    <section id="acceptance" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">1. Acceptance of Terms</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            By accessing or using the SocialJi platform, you agree to be bound by these Terms of Use and all
                                            applicable laws and regulations. If you do not agree with any of these terms, you are prohibited
                                            from using or accessing this site. The materials contained in this website are protected by
                                            applicable copyright and trademark law.
                                        </p>
                                    </section>

                                    {/* Section 2: Eligibility */}
                                    <section id="eligibility" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-5 h-5 text-green-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">2. Eligibility</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            You must be at least 18 years old to use SocialJi. By using our platform, you represent and
                                            warrant that you have the legal capacity to enter into these Terms. Users must be located in
                                            jurisdictions where our services are legally available and comply with all local laws and
                                            regulations.
                                        </p>
                                    </section>

                                    {/* Section 3: Account Registration & Security */}
                                    <section id="account" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Shield className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">3. Account Registration & Security</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed mb-4">
                                            When creating an account, you must provide accurate, complete, and current information. You are
                                            responsible for maintaining the confidentiality of your account credentials and for all activities
                                            that occur under your account.
                                        </p>
                                        <p className="text-slate-700 leading-relaxed">
                                            You agree to immediately notify SocialJi of any unauthorized use of your account or any other
                                            breach of security. SocialJi will not be liable for any loss or damage arising from your failure
                                            to comply with this security obligation.
                                        </p>
                                    </section>

                                    {/* Section 4: Platform Overview */}
                                    <section id="platform" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">4. Platform Overview</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            SocialJi is a marketplace platform that connects brands with content creators for influencer
                                            marketing collaborations. Brands can hire creators for various marketing services, while creators
                                            can offer their services and expertise. SocialJi acts as an intermediary and is not an employer of
                                            creators or brands. All users are independent contractors responsible for their own tax
                                            obligations and legal compliance.
                                        </p>
                                    </section>

                                    {/* Section 5: Fees and Payments */}
                                    <section id="fees" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                                <CreditCard className="w-5 h-5 text-emerald-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">5. Fees and Payments</h2>
                                        </div>

                                        <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">5.1 Payment Process</h3>
                                        <p className="text-slate-700 leading-relaxed">
                                            All payments for collaborations are processed through our secure escrow payment system. Brands are
                                            charged upfront and funds are held until successful completion of the project. This ensures both
                                            parties are protected throughout the collaboration process.
                                        </p>

                                        <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">
                                            5.2 Creator Earnings & Withdrawals
                                        </h3>
                                        <p className="text-slate-700 leading-relaxed">
                                            Creators receive their earnings after SocialJi&#39;s service commission is deducted once the
                                            collaboration is marked complete. Payouts are issued via supported payment methods and may take
                                            3-5 business days to process.
                                        </p>

                                        <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-4">5.3 Refunds and Disputes</h3>
                                        <p className="text-slate-700 leading-relaxed">
                                            If a project is not delivered satisfactorily, brands may be entitled to a refund through our
                                            dispute resolution process. SocialJi will mediate disputes fairly, and our decisions are final in
                                            resolving conflicts between users.
                                        </p>
                                    </section>

                                    {/* Section 6: Content Ownership and Usage */}
                                    <section id="content" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">6. Content Ownership and Usage</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed mb-4">
                                            Creators retain ownership of their content until payment is completed. Upon successful completion
                                            and payment, brands receive the agreed-upon usage rights to the content. Users must have proper
                                            rights to any content they upload and warrant that their content does not infringe on any
                                            third-party rights.
                                        </p>
                                        <p className="text-slate-700 leading-relaxed">
                                            By using SocialJi, creators grant us a limited license to use content for promotional purposes of
                                            our platform. This helps showcase the quality of work available on our marketplace.
                                        </p>
                                    </section>

                                    {/* Section 7: Conduct and Prohibited Uses */}
                                    <section id="conduct" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <Shield className="w-5 h-5 text-red-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">7. Conduct and Prohibited Uses</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            Users must not engage in fraudulent activity, harassment, or posting of illegal content.
                                            Attempting to circumvent the platform by taking payments off-platform to avoid fees is strictly
                                            prohibited. We maintain a zero-tolerance policy for abuse, discrimination, or any behavior that
                                            undermines the integrity of our marketplace.
                                        </p>
                                    </section>

                                    {/* Section 8: Ratings and Reviews */}
                                    <section id="reviews" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                <Users className="w-5 h-5 text-yellow-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">8. Ratings and Reviews</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            Our review system helps maintain quality and trust. Reviews should be honest and based on actual
                                            experiences. Extortion, fake reviews, or review manipulation is prohibited. SocialJi reserves the
                                            right to remove reviews that violate our guidelines or appear to be fraudulent.
                                        </p>
                                    </section>

                                    {/* Section 9: Privacy */}
                                    <section id="privacy" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                                                <Shield className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">9. Privacy</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            We care about your privacy. Please see our{" "}
                                            <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                                                Privacy Policy
                                            </a>{" "}
                                            for detailed information about how we collect, use, and protect your personal information.
                                        </p>
                                    </section>

                                    {/* Section 10: Termination */}
                                    <section id="termination" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-gray-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">10. Termination</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            SocialJi reserves the right to terminate accounts that violate these terms. Users may stop using
                                            the platform at any time. If termination occurs during an active project, funds in escrow will be
                                            handled according to our dispute resolution process, typically resulting in refunds to brands if
                                            work was not completed.
                                        </p>
                                    </section>

                                    {/* Section 11: Disclaimers and Limitation of Liability */}
                                    <section id="disclaimers" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                                <Gavel className="w-5 h-5 text-slate-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">
                                                11. Disclaimers and Limitation of Liability
                                            </h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            SocialJi provides the platform &#34;as is&#34; without warranties of any kind. We facilitate connections
                                            and payments but are not responsible for the direct dealings between brands and creators beyond
                                            our payment processing services. Our liability is limited to the maximum extent permitted by law.
                                        </p>
                                    </section>

                                    {/* Section 12: Indemnification */}
                                    <section id="indemnification" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                                                <Gavel className="w-5 h-5 text-rose-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">12. Indemnification</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            Users agree to indemnify and hold SocialJi harmless from any losses, damages, or claims arising
                                            from their breach of these terms, misuse of the platform, or violation of any third-party rights.
                                        </p>
                                    </section>

                                    {/* Section 13: Dispute Resolution & Governing Law */}
                                    <section id="disputes" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                                <Gavel className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">13. Dispute Resolution & Governing Law</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            Any disputes between users and SocialJi will be resolved through binding arbitration. These Terms
                                            are governed by the laws of [Jurisdiction], and any legal proceedings must be conducted in the
                                            appropriate courts of that jurisdiction.
                                        </p>
                                    </section>

                                    {/* Section 14: Miscellaneous */}
                                    <section id="miscellaneous" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-cyan-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">14. Miscellaneous</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed">
                                            These Terms constitute the entire agreement between users and SocialJi. No agency relationship is
                                            created between brands, creators, and SocialJi. We may update these Terms periodically, and
                                            continued use of the platform constitutes acceptance of any changes. If any provision is found
                                            unenforceable, the remainder of these Terms will remain in effect.
                                        </p>
                                    </section>

                                    {/* Section 15: Contact Information */}
                                    <section id="contact" className="mb-12 scroll-mt-8">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-800 m-0">15. Contact Information</h2>
                                        </div>
                                        <p className="text-slate-700 leading-relaxed mb-6">
                                            If you have any questions about these Terms of Use, please contact us:
                                        </p>
                                        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                                            <p className="text-slate-700 mb-2">
                                                <strong>Email:</strong>{" "}
                                                <a href="mailto:legal@socialji.com" className="text-blue-600 hover:text-blue-800">
                                                    legal@socialji.com
                                                </a>
                                            </p>
                                            <p className="text-slate-700">
                                                <strong>Support:</strong> Visit our{" "}
                                                <a href="/contact" className="text-blue-600 hover:text-blue-800 underline">
                                                    Contact page
                                                </a>{" "}
                                                for additional support options
                                            </p>
                                        </div>
                                    </section>
                                </div>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}