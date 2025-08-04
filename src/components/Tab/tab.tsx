"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState, useRef, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

const tabs = ["Overview", "Integrations", "Activity", "Domains", "Usage", "Monitoring"]

export default function TabComponent() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [hoverStyle, setHoverStyle] = useState({})
    const [activeStyle, setActiveStyle] = useState({ left: "0px", width: "0px" })
    const tabRefs = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        if (hoveredIndex !== null) {
            const hoveredElement = tabRefs.current[hoveredIndex]
            if (hoveredElement) {
                const { offsetLeft, offsetWidth } = hoveredElement
                setHoverStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                })
            }
        }
    }, [hoveredIndex])

    useEffect(() => {
        const activeElement = tabRefs.current[activeIndex]
        if (activeElement) {
            const { offsetLeft, offsetWidth } = activeElement
            setActiveStyle({
                left: `${offsetLeft}px`,
                width: `${offsetWidth}px`,
            })
        }
    }, [activeIndex])

    useEffect(() => {
        requestAnimationFrame(() => {
            const overviewElement = tabRefs.current[0]
            if (overviewElement) {
                const { offsetLeft, offsetWidth } = overviewElement
                setActiveStyle({
                    left: `${offsetLeft}px`,
                    width: `${offsetWidth}px`,
                })
            }
        })
    }, [])

    return (
        <div className="flex justify-center items-center w-full bg-transparent">
            <Card
                className="w-full h-[100px] border-none shadow-none relative flex items-center justify-center bg-transparent"
            >
                <CardContent className="p-0 bg-transparent">
                    <div className="relative">
                        {/* Hover Highlight */}
                        <div
                            className="absolute h-[30px] transition-all duration-300 ease-out bg-[#0e0f1114] rounded-[6px] flex items-center"
                            style={{
                                ...hoverStyle,
                                opacity: hoveredIndex !== null ? 1 : 0,
                            }}
                        />

                        {/* Active Indicator */}
                        <div
                            className="absolute bottom-[-6px] h-[2px] bg-[#0e0f11] transition-all duration-300 ease-out"
                            style={activeStyle}
                        />

                        {/* Tabs */}
                        <div className="relative flex space-x-[6px] items-center">
                            {tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    ref={(el: any) => (tabRefs.current[index] = el)}
                                    className={`px-3 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${index === activeIndex ? "text-[#0e0e10]" : "text-[#0e0f1199]"} `}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    onClick={() => setActiveIndex(index)}
                                >
                                    <div className="text-sm font-[var(--www-mattmannucci-me-geist-regular-font-family)] leading-5 whitespace-nowrap flex items-center justify-center h-full">
                                        {tab}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
