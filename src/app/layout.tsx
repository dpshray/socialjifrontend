import type {Metadata} from "next"
import "./globals.css"
import {Montserrat} from "next/font/google"
import type React from "react"
import StoreProvider from "@/redux/store/storeProvider"
import {Toaster} from "sonner"
import ReactQueryProvider from "@/app/providers"
import {ThemeProvider} from "@/components/theme-provider"

const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
})

export const metadata: Metadata = {
    title: "SocialJi – Influencer & UGC Marketplace for Brands",
    description: "Connect with top influencers and user-generated content creators to boost your brand. Hire creators for authentic content and secure collaborations with SocialJi's escrow-protected platform.",
}
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
        <body className={`${montserrat.variable} font-montserrat`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <StoreProvider>
                <ReactQueryProvider>
                    <Toaster position="top-right"/>
                    {children}
                </ReactQueryProvider>
            </StoreProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}
