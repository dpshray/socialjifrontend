'use client'

import Navbar from "@/components/header/Navbar"
import Footer from "@/components/footer/Footer"
import React from "react"

export default function PublicLayout({
                                         children,
                                     }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="w-full">
                <Navbar/>
            </header>

            <main role="main" className="flex-1 w-full pt-16">
                {children}
            </main>

            <footer className="w-full  bg-background">
                <Footer/>
            </footer>
        </div>
    )
}
