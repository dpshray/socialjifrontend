"use client"

import { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import TextInputField from "@/components/field/TextInputField"
import PasswordInputField from "@/components/field/PasswordInputField"
import { ForgotPasswordSchema } from "@/lib/schema"
import { authService } from "@/app/(auth)/auth.service"
import {toast} from "sonner";

interface FormData {
    token: string
    email: string
    password: string
    password_confirmation: string
}

const tokenLength = 6

export default function ForgotPasswordOtp() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const emailFromUrl = searchParams.get("email") || ""

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        trigger,
    } = useForm<FormData>({
        resolver: yupResolver(ForgotPasswordSchema),
        defaultValues: {
            token: "",
            email: "",
            password: "",
            password_confirmation: "",
        },
        mode: "onBlur",
    })

    useEffect(() => {
        if (!emailFromUrl) {
            router.replace("/forgot-password")
        } else {
            setValue("email", emailFromUrl)
            trigger("email")
        }
    }, [emailFromUrl, router, setValue, trigger])

    const onSubmit = useCallback(async (data: FormData) => {
        try {
            console.log(`Submitting data:`, data)
            const response = await authService.handleResetPassword(data)
            if (response) {
                toast.success("Password reset successfully")
                router.replace("/login")
            }

        } catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleTokenChange = useCallback(
        (value: string) => {
            setValue("token", value, { shouldValidate: true })
        },
        [setValue]
    )

    const tokenValue = watch("token")

    const handleResendOtp = useCallback(() => {
        console.log("Resend OTP")
    }, [])

    return (
        <main
            className={cn(
                "flex items-center justify-center min-h-screen px-4 sm:px-6",
                "bg-gradient-to-br from-white via-gray-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700"
            )}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="OTP Verification Form"
                className="w-full max-w-md"
            >
                <Card
                    className={cn(
                        "backdrop-blur-md bg-white/60 dark:bg-slate-900/60",
                        "border border-gray-200 dark:border-slate-700",
                        "shadow-lg dark:shadow-md rounded-2xl transition-shadow gap-2 p-6"
                    )}
                >
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Verify OTP & Reset Password
                        </CardTitle>
                        <CardDescription>
                            Enter the 6-digit code sent to your email and set a new password.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <TextInputField
                            {...register("email")}
                            label="Email"
                            type="email"
                            disabled
                            value={emailFromUrl}
                            error={errors.email?.message}
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                        />

                        <PasswordInputField
                            {...register("password")}
                            label="New Password"
                            placeholder="Enter your new password"
                            error={errors.password?.message}
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            onBlur={() => trigger("password")}
                            autoComplete="new-password"
                        />

                        <PasswordInputField
                            {...register("password_confirmation")}
                            label="Confirm Password"
                            placeholder="Confirm your new password"
                            error={errors.password_confirmation?.message}
                            aria-invalid={!!errors.password_confirmation}
                            aria-describedby={
                                errors.password_confirmation ? "password-confirm-error" : undefined
                            }
                            onBlur={() => trigger("password_confirmation")}
                            autoComplete="new-password"
                        />

                        <div>
                            <InputOTP
                                maxLength={tokenLength}
                                value={tokenValue}
                                onChange={handleTokenChange}
                                aria-label="Verification Code"
                                autoFocus
                                aria-invalid={!!errors.token}
                                aria-describedby={errors.token ? "token-error" : undefined}
                            >
                                <InputOTPGroup className="gap-2 justify-center">
                                    {Array.from({ length: tokenLength }).map((_, i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className={cn(
                                                "w-12 h-12 text-lg sm:text-xl text-center",
                                                "rounded-md border border-gray-300 dark:border-slate-600",
                                                "focus:outline-none focus:ring-[1px] focus:ring-primary",
                                                "bg-white dark:bg-slate-800",
                                                "text-gray-900 dark:text-gray-100",
                                                "shadow-sm transition-all"
                                            )}
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            {errors.token && (
                                <p
                                    id="token-error"
                                    role="alert"
                                    className="mt-2 text-sm text-red-500 text-center"
                                >
                                    {errors.token.message}
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-3 mt-4">
                        <Button
                            type="submit"
                            className="w-full bg-navyBlue hover:bg-black text-white font-semibold shadow-lg hover:brightness-110 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition"
                            aria-label="Verify and Reset Password"
                        >
                            Verify & Reset Password
                        </Button>

                        <Button
                            type="button"
                            variant="link"
                            className="text-sm font-semibold text-primary self-center"
                            aria-label="Resend OTP"
                            onClick={handleResendOtp}
                        >
                            Resend OTP
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </main>
    )
}
