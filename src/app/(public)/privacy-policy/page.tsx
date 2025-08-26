import type { Metadata } from "next"
import { Shield, Lock, Eye, Users, FileText, Mail, Calendar, Globe } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Privacy Policy | SocialJi",
    description:
        "Read SocialJi's Privacy Policy to understand how we collect, use, and protect your personal information. Learn about what data we gather from brands and creators, why we need it, and how you can manage your privacy preferences on the SocialJi platform.",
    keywords:
        "SocialJi Privacy Policy, data privacy SocialJi, influencer platform privacy, personal data SocialJi, SocialJi data policy",
    openGraph: {
        title: "SocialJi Privacy Policy",
        description:
            "The Privacy Policy of SocialJi explains what information we collect from our users and how we use, share, and protect that data. Your privacy is important to us – find out more here.",
        images: ["/og-privacy.jpg"],
    },
}

const sections = [
    { id: "information-we-collect", title: "Information We Collect", icon: Eye },
    { id: "how-we-use", title: "How We Use Your Information", icon: FileText },
    { id: "cookies-tracking", title: "Cookies and Tracking Technologies", icon: Globe },
    { id: "how-we-share", title: "How We Share Your Information", icon: Users },
    { id: "your-choices", title: "Your Choices & Rights", icon: Shield },
    { id: "data-security", title: "Data Security", icon: Lock },
    { id: "data-retention", title: "Data Retention", icon: Calendar },
    { id: "international-users", title: "International Users", icon: Globe },
    { id: "childrens-privacy", title: "Children's Privacy", icon: Shield },
    { id: "policy-changes", title: "Changes to This Policy", icon: FileText },
    { id: "contact-us", title: "Contact Us", icon: Mail },
]

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto px-4 py-12 max-w-7xl">


                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Table of Contents */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-xl shadow-sm border p-6">
                                <h2 className="font-semibold text-gray-900 mb-4">Table of Contents</h2>
                                <nav className="space-y-2">
                                    {sections.map((section) => {
                                        const IconComponent = section.icon
                                        return (
                                            <a
                                                key={section.id}
                                                href={`#${section.id}`}
                                                className="flex items-center text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg px-3 py-2 transition-colors"
                                            >
                                                <IconComponent className="w-4 h-4 mr-2 flex-shrink-0" />
                                                {section.title}
                                            </a>
                                        )
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border p-8 space-y-12">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                                    <Shield className="w-8 h-8 text-blue-600" />
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                                <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border">
                                    <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                                    <span className="text-sm text-gray-600">Last Updated: January 1, 2025</span>
                                </div>
                            </div>
                            {/* Information We Collect */}
                            <section id="information-we-collect">
                                <div className="flex items-center mb-6">
                                    <Eye className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Information You Provide</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            When you register an account, we collect personal details like name, email, and login credentials.
                                            As a creator, you may provide social media account information, profile descriptions, and
                                            portfolio content. As a brand, you may provide company information, project details, and payment
                                            information.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            2. Information We Collect Automatically
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-3">
                                            We gather some data automatically when you use the platform:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                                            <li>Device information and IP addresses</li>
                                            <li>Log-in timestamps and session data</li>
                                            <li>Usage data (pages viewed, clicks, time spent)</li>
                                            <li>Cookies and similar tracking technologies</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Information from Third Parties</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            If you log in via social networks or link accounts, we may receive information from those
                                            platforms (like follower counts). We may also use analytics or advertising partners who provide
                                            aggregated data.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* How We Use Your Information */}
                            <section id="how-we-use">
                                <div className="flex items-center mb-6">
                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Service Provision</h4>
                                        <p className="text-sm text-gray-600">
                                            Create accounts, profile pages, facilitate communications and payments
                                        </p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Communication</h4>
                                        <p className="text-sm text-gray-600">
                                            Send notifications about projects, updates, and marketing emails (if opted in)
                                        </p>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Platform Protection</h4>
                                        <p className="text-sm text-gray-600">
                                            Monitor for fraud, security incidents, and enforce our Terms
                                        </p>
                                    </div>
                                    <div className="bg-purple-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Service Improvement</h4>
                                        <p className="text-sm text-gray-600">Analyze usage trends and develop new features</p>
                                    </div>
                                </div>
                            </section>

                            {/* Cookies and Tracking */}
                            <section id="cookies-tracking">
                                <div className="flex items-center mb-6">
                                    <Globe className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking Technologies</h2>
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-4">
                                    SocialJi uses cookies for session management, user preferences, and third-party analytics (Google
                                    Analytics). We may also use advertising cookies to improve your experience.
                                </p>
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                    <p className="text-amber-800 text-sm">
                                        <strong>Note:</strong> You can control cookies via your browser settings, but some parts of the site
                                        may not function properly without them.
                                    </p>
                                </div>
                            </section>

                            {/* How We Share */}
                            <section id="how-we-share">
                                <div className="flex items-center mb-6">
                                    <Users className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">How We Share Your Information</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-semibold text-gray-800">Public Profile</h4>
                                        <p className="text-gray-600 text-sm">
                                            Creator profile details, username, profile photo, bio, and social stats are public on the site.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h4 className="font-semibold text-gray-800">Between Users</h4>
                                        <p className="text-gray-600 text-sm">
                                            Brands and creators can see each other&#39;s relevant information when engaging on projects.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <h4 className="font-semibold text-gray-800">Service Providers</h4>
                                        <p className="text-gray-600 text-sm">
                                            We share info with payment processors, email services, and analytics providers to support our
                                            services.
                                        </p>
                                    </div>
                                    <div className="border-l-4 border-red-500 pl-4">
                                        <h4 className="font-semibold text-gray-800">Legal Compliance</h4>
                                        <p className="text-gray-600 text-sm">
                                            We may disclose information if required by law or to enforce our Terms.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Your Choices & Rights */}
                            <section id="your-choices">
                                <div className="flex items-center mb-6">
                                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Your Choices & Rights</h2>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                                    <h4 className="font-semibold text-gray-800 mb-4">You have the right to:</h4>
                                    <ul className="space-y-2 text-gray-600">
                                        <li className="flex items-center">
                                            <Shield className="w-4 h-4 mr-2 text-blue-500" /> Access and update your profile information
                                        </li>
                                        <li className="flex items-center">
                                            <Mail className="w-4 h-4 mr-2 text-blue-500" /> Opt out of marketing communications
                                        </li>
                                        <li className="flex items-center">
                                            <Eye className="w-4 h-4 mr-2 text-blue-500" /> Control cookie preferences
                                        </li>
                                        <li className="flex items-center">
                                            <FileText className="w-4 h-4 mr-2 text-blue-500" /> Request data correction or deletion (GDPR/CCPA
                                            rights)
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Data Security */}
                            <section id="data-security">
                                <div className="flex items-center mb-6">
                                    <Lock className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    We take security seriously and use encryption for sensitive data, following industry best practices to
                                    protect personal information. However, no method is 100% secure, so we cannot guarantee absolute
                                    security.
                                </p>
                            </section>

                            {/* Data Retention */}
                            <section id="data-retention">
                                <div className="flex items-center mb-6">
                                    <Calendar className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Data Retention</h2>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    We retain personal information as long as needed for our operations and to comply with laws.
                                    Transaction records may be kept for several years. If you delete your account, some information may
                                    remain in backups or logs for a limited period.
                                </p>
                            </section>

                            {/* International Users */}
                            <section id="international-users">
                                <div className="flex items-center mb-6">
                                    <Globe className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">International Users</h2>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    Your information may be stored and processed in different countries. By using SocialJi, you consent to
                                    data transfer to servers possibly outside your country.
                                </p>
                            </section>

                            {/* Children's Privacy */}
                            <section id="childrens-privacy">
                                <div className="flex items-center mb-6">
                                    <Shield className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Children&#39;s Privacy</h2>
                                </div>

                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <p className="text-red-800">
                                        <strong>Important:</strong> SocialJi is not intended for children under 13 (or under 16 in some
                                        regions). We do not knowingly collect data from them. If you believe a minor has provided us
                                        personal information, please contact us to remove it.
                                    </p>
                                </div>
                            </section>

                            {/* Policy Changes */}
                            <section id="policy-changes">
                                <div className="flex items-center mb-6">
                                    <FileText className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
                                </div>

                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Privacy Policy from time to time. We will notify users by updating the effective
                                    date and possibly via email or platform notification if changes are significant. Continued use of
                                    SocialJi after changes means acceptance of the new policy.
                                </p>
                            </section>

                            {/* Contact Us */}
                            <section id="contact-us">
                                <div className="flex items-center mb-6">
                                    <Mail className="w-6 h-6 text-blue-600 mr-3" />
                                    <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
                                </div>

                                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
                                    <h4 className="font-semibold mb-3">Questions about your privacy?</h4>
                                    <p className="mb-4">If you have questions or concerns about your privacy, we&#39;re here to help.</p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href="mailto:privacy@socialji.com"
                                            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                        >
                                            <Mail className="w-4 h-4 mr-2" />
                                            privacy@socialji.com
                                        </Link>
                                        <Link
                                            href="/contact-us"
                                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition-colors"
                                        >
                                            Contact Page
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}