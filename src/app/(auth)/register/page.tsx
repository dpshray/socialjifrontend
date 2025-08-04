'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'
import { CircleArrowLeft } from 'lucide-react'

import { RegisterSchema } from '@/lib/schema'
import { authService } from '@/app/(auth)/auth.service'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import TextInputField from '@/components/field/TextInputField'
import PasswordInputField from '@/components/field/PasswordInputField'
import FileInputField from '@/components/field/FileInputField'

type RegisterFormData = InferType<typeof RegisterSchema>

export default function RegisterPage() {
    const [roles, setRoles] = useState<{ id: number; name: string }[]>([])
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(RegisterSchema),
    })

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const result = await authService.fetchRole()
                setRoles(result.data)
                console.log(`Roles:`, result.data)
                const defaultRole = result.data.find((r: any) => r.name === 'Influencer') || result.data[0]
                setSelectedRoleId(defaultRole.id)
                console.log(`Default Role:`, defaultRole)
                setValue('role_id', defaultRole.id)
            } catch {
                toast.error('Failed to load roles.')
            }
        }
        fetchRoles()
    }, [setValue])

    const submitForm = async (data: RegisterFormData) => {
        try {
            setLoading(true)

            const payload = {
                ...data,
                first_name: data.first_name.trim(),
                last_name: data.last_name.trim(),
                nick_name: `${data.first_name.trim()} ${data.last_name.trim()}`,
                image: data.image[0],
            }
            console.log('submitForm', payload)
            const result = await authService.handleRegister(payload)
            toast.success(result?.message || 'Registration successful!')
            router.push('/login')
        } catch (error: any) {
            if (error?.errors && typeof error.errors === 'object') {
                Object.entries(error.errors).forEach(([_, message]) => {
                    toast.error(typeof message === 'string' ? message : JSON.stringify(message))
                })
            }
        } finally {
            setLoading(false)
        }
    }

    const selectedRoleName = roles?.find((r) => r.id === selectedRoleId)?.name
    const image = selectedRoleName?.toUpperCase() === 'BRAND' ? '/images/brand.jpg' : '/images/influencer.jpg'

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-slate-200 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700 px-4 font-roboto">
            <section className="w-full max-w-6xl bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                <div className="p-4 sm:p-10 flex flex-col justify-center">
                    <Button asChild variant="ghost" className="w-fit text-muted-foreground mb-6 px-0">
                        <Link href="/" className="flex items-center gap-2 text-sm">
                            <CircleArrowLeft size={16} />
                            Home
                        </Link>
                    </Button>

                    <h1 className="text-3xl font-bold mb-1">Create Your Account</h1>
                    <p className="text-muted-foreground mb-6 text-sm">
                        Begin your journey with us. Let’s collaborate and grow.
                    </p>

                    <form onSubmit={handleSubmit(submitForm)} className="space-y-4" aria-label="Registration Form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <TextInputField
                                label="First Name"
                                placeholder="John"
                                error={errors.first_name?.message}
                                {...register('first_name')}
                            />
                            <TextInputField
                                label="Last Name"
                                placeholder="Doe"
                                error={errors.last_name?.message}
                                {...register('last_name')}
                            />
                        </div>

                        <TextInputField
                            label="Username"
                            placeholder="username"
                            error={errors.nick_name?.message}
                            {...register('nick_name')}
                        />

                        <TextInputField
                            label="Email"
                            placeholder="you@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <PasswordInputField
                            label="Password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <PasswordInputField
                            label="Confirm Password"
                            placeholder="••••••••"
                            error={errors.password_confirmation?.message}
                            {...register('password_confirmation')}
                        />

                        {/* <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setValue('image', file)
                                }
                            }}
                        /> */}
                        <FileInputField
                            label="Profile Picture"
                            required
                            accept="image/*"
                            placeholder="Upload your profile picture"
                            {...register("image")}
                        />

                        <input type="hidden" {...register('role_id')} value={selectedRoleId ?? ''} />

                        {roles?.length > 0 && (
                            <div className="flex items-center justify-center">
                                <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-full p-1 w-full max-w-md">
                                    {roles.map((role) => (
                                        <button
                                            key={role.id}
                                            type="button"
                                            onClick={() => {
                                                setSelectedRoleId(role.id)
                                                setValue('role_id', role.id)
                                            }}
                                            className={`flex-1 py-2 text-sm font-medium rounded-full transition-all duration-300 ${selectedRoleId === role.id
                                                    ? 'bg-navyBlue text-white'
                                                    : 'text-gray-700 dark:text-gray-300'
                                                }`}
                                            aria-pressed={selectedRoleId === role.id}
                                        >
                                            I am a {role.name.toLowerCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button
                            aria-label={`Register as ${selectedRoleName || 'user'}`}
                            type="submit"
                            className="w-full bg-navyBlue text-white py-2 rounded-xl transition duration-200"
                            disabled={loading}
                            aria-busy={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Login
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

                <motion.div
                    key={selectedRoleId}
                    initial={{ opacity: 0, scale: 0.95, x: -30 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="hidden md:block h-full w-full bg-[#f0f2f5] dark:bg-zinc-800"
                >
                    <div className="relative w-full h-full aspect-[4/5] md:aspect-auto">
                        <Image
                            src={image}
                            alt={`${selectedRoleName} illustration`}
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 50vw, 100vw"
                            priority
                        />
                    </div>
                </motion.div>
            </section>
        </main>
    )
}
