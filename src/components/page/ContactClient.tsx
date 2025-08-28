"use client"

import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {Button} from "@/components/ui/button"
import TextInputField from "@/components/field/TextInputField"
import {Card, CardContent} from "@/components/ui/card"
import {FileText, HelpCircle, Mail, MessageCircle, Phone, Users} from "lucide-react"
import Link from "next/link"
import globalService from "@/services/GlobalService"
import {toast} from "sonner"

const schema = yup
    .object({
        name: yup.string().trim().required("Full Name is required"),
        email: yup.string().email("Invalid email").required("Email is required"),
        subject: yup.string().trim(),
        inquiry_type: yup.string().trim().optional(),
        message: yup.string().trim().required("Message is required"),
    })
    .required()

interface IFormInput {
    name: string
    email: string
    subject: string
    inquiry_type?: string
    message: string
}

export default function ContactClient() {
    const [loading, setLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<IFormInput>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            inquiry_type: "",
            message: "",
        },
        mode: "onBlur",
    })

    if (isSubmitted) {
        return (
            <div
                className="min-h-screen flex flex-col justify-center items-center py-12 px-4 bg-gray-50 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md text-center p-10">
                    <CardContent>
                        <div
                            className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100">
                            <MessageCircle className="w-8 h-8 text-green-600" aria-hidden="true"/>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2" role="heading" aria-level={2}>
                            Thanks for reaching out!
                        </h2>
                        <p className="text-gray-600">We&apos;ll get in touch soon.</p>
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            className="mt-6 w-full"
                            disabled={loading}
                            variant="default"
                            aria-label="Go back and send another message"
                        >
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const onSubmit = async (data: IFormInput) => {
        try {
            setLoading(true)
            const response = await globalService.contactUs(data)
            reset()
            if (response) {
                toast.success(response?.message ?? "Message sent successfully")
                setIsSubmitted(true)
            }
        } catch {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen py-12 px-4 bg-white sm:px-6 lg:px-8">
            <section aria-labelledby="contact-heading" className="max-w-7xl mx-auto">
                <header className="mb-12 text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-6">
                        <Mail className="w-10 h-10 text-blue-600" aria-hidden="true"/>
                    </div>
                    <h1 id="contact-heading" className="text-4xl font-extrabold text-gray-900">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question, an issue, or just want to say hello? We&apos;re here to help! Fill out the form
                        below or use one of our direct contact methods, and our team will get back to you shortly.
                    </p>
                </header>

                <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8">
                    <Card className="shadow-lg h-fit">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                                <TextInputField
                                    {...register("name")}
                                    id="name"
                                    label="Full Name"
                                    placeholder="Your full name"
                                    required
                                    error={errors.name?.message}
                                    aria-invalid={!!errors.name}
                                    aria-describedby={errors.name ? "name-error" : undefined}
                                />

                                <TextInputField
                                    {...register("email")}
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    required
                                    error={errors.email?.message}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? "email-error" : undefined}
                                />

                                <TextInputField
                                    {...register("subject")}
                                    id="subject"
                                    label="Subject"
                                    placeholder="Subject"
                                    error={errors.subject?.message}
                                    aria-invalid={!!errors.subject}
                                    aria-describedby={errors.subject ? "subject-error" : undefined}
                                />

                                <TextInputField
                                    {...register("inquiry_type")}
                                    id="inquiry_type"
                                    label="Inquiry Type"
                                    placeholder="Inquiry Type"
                                    error={errors.inquiry_type?.message}
                                    aria-invalid={!!errors.inquiry_type}
                                    aria-describedby={errors.inquiry_type ? "inquiry_type-error" : undefined}
                                />

                                <TextInputField
                                    {...register("message")}
                                    id="message"
                                    label="Message"
                                    textarea
                                    required
                                    rows={5}
                                    placeholder="Write your message here"
                                    error={errors.message?.message}
                                    aria-invalid={!!errors.message}
                                    aria-describedby={errors.message ? "message-error" : undefined}
                                />

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto py-3 text-white"
                                        disabled={loading}
                                        aria-disabled={loading}
                                        aria-live="polite"
                                        aria-busy={loading}
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <aside className="space-y-8" aria-label="Direct Contact and Support Resources">
                        <Card className="shadow-lg">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Direct Contact</h2>
                                <ul className="space-y-6">
                                    <li>
                                        <address className="not-italic flex items-start space-x-3">
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <Mail className="w-5 h-5 text-blue-600" aria-hidden="true"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Email</p>
                                                <Link
                                                    href="mailto:support@socialji.com"
                                                    className="text-blue-600 hover:text-blue-700 transition-colors break-all"
                                                    aria-label="Send email to support@socialji.com"
                                                >
                                                    support@socialji.com
                                                </Link>
                                            </div>
                                        </address>
                                    </li>
                                    <li>
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <Phone className="w-5 h-5 text-green-600" aria-hidden="true"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Phone</p>
                                                <Link
                                                    href="tel:+1234567890"
                                                    className="text-green-600 hover:text-green-700 transition-colors"
                                                    aria-label="Call phone number +1 234 567 890"
                                                >
                                                    +1-234-567-890
                                                </Link>
                                                <p className="text-sm text-gray-500">Mon–Fri, 9am–5pm PST</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-start space-x-3">
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                <MessageCircle className="w-5 h-5 text-purple-600" aria-hidden="true"/>
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Live Chat</p>
                                                <p className="text-gray-600">Chat with us via the live chat button in
                                                    the bottom corner</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="shadow-lg">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Support Resources</h2>
                                <p className="text-gray-600 mb-6 max-w-prose">
                                    Before you send a message, you might find your answer in our self-help resources:
                                </p>

                                <nav aria-label="Support resources navigation" className="space-y-4">
                                    <Link
                                        href="#"
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                            <HelpCircle className="w-5 h-5 text-orange-600" aria-hidden="true"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 group-hover:text-blue-600">FAQ</p>
                                            <p className="text-sm text-gray-600">Quick answers to common questions</p>
                                        </div>
                                    </Link>

                                    <Link
                                        href="#"
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-teal-600" aria-hidden="true"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 group-hover:text-blue-600">How It
                                                Works</p>
                                            <p className="text-sm text-gray-600">Learn how to use SocialJi
                                                effectively</p>
                                        </div>
                                    </Link>

                                    <Link
                                        href="#"
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" aria-hidden="true"/>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 group-hover:text-blue-600">Blog &
                                                Tips</p>
                                            <p className="text-sm text-gray-600">Guidance and best practices</p>
                                        </div>
                                    </Link>
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </section>
        </main>
    )
}
