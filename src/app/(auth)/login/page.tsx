'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hook'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { CircleArrowLeft } from 'lucide-react'
import { authService } from '@/app/(auth)/auth.service'
import { LoginSchema } from '@/lib/schema'
import { loginSuccess } from '@/redux/slices/authSlice'
import { Button } from '@/components/ui/button'
import TextInputField from '@/components/field/TextInputField'
import PasswordInputField from '@/components/field/PasswordInputField'

interface LoginFormData {
    email: string
    password: string
}

export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({ resolver: yupResolver(LoginSchema) })

    const dispatch = useAppDispatch()
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const submitForm = async (data: LoginFormData) => {
        try {
            setLoading(true)
            const result = await authService.handleLogin(data.email, data.password)
            console.log(`Login Result:`, result?.role)
            if (result?.token && result?.role && result?.user) {
                dispatch(loginSuccess({ ...result.user, token: result.token, role: result.role }))
                toast.success(`Welcome back, ${result.role}`)
                router.push(`/${result.role.toLowerCase()}/dashboard`)
            }

        } catch (error: any) {
            toast.error(error?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 p-4">
            <section className="w-full max-w-5xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <Button asChild variant="ghost" className="w-fit text-muted-foreground mb-6 px-0">
                        <Link href="/" className="flex items-center gap-2 text-sm">
                            <CircleArrowLeft size={16} />
                            Home
                        </Link>
                    </Button>

                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome Back 👋</h1>
                    <p className="text-sm md:text-base text-muted-foreground mb-6">
                        Sign in to connect, collaborate, and grow with the HireInfluencer platform.
                    </p>

                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4" aria-label="Login form">
                        <TextInputField
                            label="Email"
                            placeholder="Enter your email"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <PasswordInputField
                            label="Password"
                            placeholder="Enter your password"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <div className="text-right text-sm">
                            <Link href="/forgot-password" className="text-blue-500 hover:underline">
                                Forgot Password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-navyBlue text-white rounded-xl py-2"
                            disabled={loading || Object.keys(errors).length > 0}
                            aria-busy={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
                        <span className="text-xs text-gray-400 dark:text-gray-500">OR</span>
                        <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        onClick={handleGoogleLogin}
                        aria-label="Login with Google"
                    >
                        <Image src="/googleIcon.png" alt="Google" width={20} height={20} />
                        <span className="text-sm text-muted-foreground">Sign in with Google</span>
                    </Button>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Don’t have an account?{' '}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>

                    <p className="text-xs text-center text-gray-400 mt-6 leading-relaxed">
                        © 2025 HireInfluencer, Inc. •{' '}
                        <a href="#" className="underline">
                            Terms
                        </a>{' '}
                        •{' '}
                        <a href="#" className="underline">
                            Cookies
                        </a>{' '}
                        •{' '}
                        <a href="#" className="underline">
                            Accessibility
                        </a>{' '}
                        •{' '}
                        <a href="#" className="underline">
                            Privacy
                        </a>
                    </p>
                </div>

                <div className="hidden md:flex items-center justify-center bg-[#f0f2f5] dark:bg-zinc-800">
                    <Image
                        src="/images/influencer.jpg"
                        alt="Login illustration"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full"
                        priority
                    />
                </div>
            </section>
        </main>
    )
}
