"use client"

import type React from "react"
import type { ReactNode } from "react"
import { motion, type MotionProps, type Variants, type HTMLMotionProps } from "framer-motion"

export type AnimationType =
    | "fadeIn"
    | "slideUp"
    | "slideDown"
    | "slideLeft"
    | "slideRight"
    | "scale"
    | "bounce"
    | "rotate"
    | "pulse"

export interface AnimatedElementProps extends Omit<MotionProps, "variants" | "initial" | "animate" | "exit"> {
    children: ReactNode
    type?: AnimationType
    duration?: number
    delay?: number
    className?: string
    once?: boolean
    custom?: any
    as?: React.ElementType
    viewport?: {
        once?: boolean
        margin?: string
        amount?: "some" | "all" | number
    }
}

const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const slideUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
}

const slideDown: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
}

const slideLeft: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
}

const slideRight: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
}

const scale: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
}

const bounce: Variants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 10,
        },
    },
}

const rotate: Variants = {
    hidden: { opacity: 0, rotate: -10 },
    visible: { opacity: 1, rotate: 0 },
}

const pulse: Variants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
        opacity: 1,
        scale: [1, 1.05, 1],
        transition: {
            scale: {
                repeat: 0,
                duration: 0.5,
                ease: "easeOut",
            },
        },
    },
}

const animations: Record<AnimationType, Variants> = {
    fadeIn,
    slideUp,
    slideDown,
    slideLeft,
    slideRight,
    scale,
    bounce,
    rotate,
    pulse,
}

export const AnimatedElement = ({
                                    children,
                                    type = "fadeIn",
                                    duration = 0.5,
                                    delay = 0,
                                    className = "",
                                    once = true,
                                    custom,
                                    as = "div",
                                    viewport,
                                    ...rest
                                }: AnimatedElementProps) => {
    const Component = motion[as as keyof typeof motion] as React.ElementType<HTMLMotionProps<"div">>

    const transition = {
        duration,
        delay,
        ease: "easeOut",
    }

    return (
        <Component
            initial="hidden"
            animate={viewport ? undefined : "visible"}
            whileInView={viewport ? "visible" : undefined}
            exit="hidden"
            variants={animations[type]}
            transition={transition as any}

            viewport={viewport}
            className={className}
            custom={custom}
            {...rest}
        >
            {children}
        </Component>
    )
}