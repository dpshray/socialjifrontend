"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MessageCircle, HelpCircle, FileText, Users } from "lucide-react"
import Link from "next/link"
import { Label } from "@/components/ui/label"

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        inquiryType: "",
        message: "",
    })
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, inquiryType: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MessageCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thanks for reaching out!</h2>
                            <p className="text-gray-600">We&apos;ll get in touch soon.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-10 h-10 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have a question, an issue, or just want to say hello? We&apos;re here to help! Fill out the form below or use one
                        of our direct contact methods, and our team will get back to you shortly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <Card className="shadow-lg">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send us a message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        placeholder="Your full name"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                                        Inquiry Type
                                    </Label>
                                    <Select onValueChange={handleSelectChange} value={formData.inquiryType}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select inquiry type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="support">Support Issue</SelectItem>
                                            <SelectItem value="feedback">Feedback</SelectItem>
                                            <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                                            <SelectItem value="billing">Billing Question</SelectItem>
                                            <SelectItem value="technical">Technical Issue</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full"
                                        placeholder="Brief description of your inquiry"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full min-h-[120px]"
                                        placeholder="Please describe your question or issue in detail..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                                >
                                    Send Message
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information & Resources */}
                    <div className="space-y-8">
                        {/* Direct Contact Info */}
                        <Card className="shadow-lg">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Direct Contact</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Email</p>
                                            <Link
                                                href="mailto:support@socialji.com"
                                                className="text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                support@socialji.com
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Phone</p>
                                            <Link href="tel:+1-234-567-890" className="text-green-600 hover:text-green-700 transition-colors">
                                                +1-234-567-890
                                            </Link>
                                            <p className="text-sm text-gray-500">Mon–Fri, 9am–5pm PST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                            <MessageCircle className="w-5 h-5 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">Live Chat</p>
                                            <p className="text-gray-600">Chat with us via the live chat button in the bottom corner</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Support Resources */}
                        <Card className="shadow-lg">
                            <CardContent className="p-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Support Resources</h2>
                                <p className="text-gray-600 mb-6">
                                    Before you send a message, you might find your answer in our self-help resources:
                                </p>

                                <div className="space-y-4">
                                    <Link
                                        href="#"
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                            <HelpCircle className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 group-hover:text-blue-600">FAQ</p>
                                            <p className="text-sm text-gray-600">Quick answers to common questions</p>
                                        </div>
                                    </Link>

                                    <Link
                                        href="#"
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                                            <Users className="w-5 h-5 text-teal-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 group-hover:text-blue-600">How It Works</p>
                                            <p className="text-sm text-gray-600">Learn how to use SocialJi effectively</p>
                                        </div>
                                    </Link>

                                    <Link
                                        href="#"
                                        className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 group-hover:text-blue-600">Blog & Tips</p>
                                            <p className="text-sm text-gray-600">Guidance and best practices</p>
                                        </div>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
