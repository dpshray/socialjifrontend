"use client"

import React, {useCallback, useState} from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import {useRouter, useSearchParams} from "next/navigation"
import {toast} from "sonner"
import Link from "next/link"

import {authService} from "@/app/(auth)/auth.service"
import {cn} from "@/lib/utils"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import TextInputField from "@/components/field/TextInputField"

interface ForgotPasswordFormData {
    email: string
}

export default function ForgotPassword() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const email = searchParams.get("email") || ""

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
    } = useForm<ForgotPasswordFormData>()


    const submitForm: SubmitHandler<ForgotPasswordFormData> = useCallback(
        async (data) => {
            try {
                setLoading(true)
                const result = await authService.handleForgotPassword(data.email)
                toast.success(result?.message || "Email sent successfully.")
                reset()
                const emailEncoded = encodeURIComponent(data.email)
                router.push(`/forgot-password/otp?email=${emailEncoded}`)
            } catch (error: any) {
                toast.error(error?.message || "Something went wrong.")
            } finally {
                setLoading(false)
            }
        },
        [reset, router]
    )

    const handleEmailVerification = useCallback(async () => {
        if (!email) {
            toast.error("Please enter your email first.")
            return
        }
        try {
            const result = await authService.handleEmailVerification(email)
            toast.success(result?.message)
        } catch (error: any) {
            toast.error(error?.message || "Failed to resend email verification.")
        }
    }, [email])

    return (
        <main
            className={cn(
                "min-h-screen flex items-center justify-center",
                "bg-gradient-to-br from-muted/40 to-background/60 dark:from-black/30",
                "px-4 py-8"
            )}
        >
            <Card
                className={cn(
                    "w-full max-w-md backdrop-blur-md border border-border/60",
                    "bg-white/70 dark:bg-black/40 shadow-xl rounded-2xl transition-colors"
                )}
                aria-labelledby="forgot-password-heading"
            >
                <CardHeader className="text-center">
                    <CardTitle
                        id="forgot-password-heading"
                        className="text-2xl sm:text-3xl font-semibold text-foreground"
                    >
                        Reset Your Password
                    </CardTitle>
                    <CardDescription className="mt-1 text-muted-foreground">
                        Enter your email to receive a password reset link.
                    </CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit(submitForm)} noValidate>
                    <CardContent className="space-y-4">
                        <TextInputField
                            label="Email Address"
                            type="email"
                            placeholder="you@example.com"
                            {...register("email", {required: "Email is required"})}
                            error={errors.email?.message}
                            autoComplete="email"
                            aria-required="true"
                        />

                        <div className="flex justify-end">
                            <Button
                                type="button"
                                variant="link"
                                onClick={handleEmailVerification}
                                className="text-sm font-medium"
                                aria-label="Resend email verification"
                            >
                                Resend Email Verification
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-3 pt-0">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-navyBlue text-white font-semibold shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring transition"
                            aria-label="Send Reset Link"
                        >
                            {loading ? "Sending Reset Link..." : "Send Reset Link"}
                        </Button>

                        <Link
                            href="/login"
                            className="text-sm font-medium text-primary hover:underline text-center"
                            aria-label="Back to Login"
                        >
                            Back to Login
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </main>
    )
}
