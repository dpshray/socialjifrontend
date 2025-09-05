"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MessageCircle, Phone, Users, HelpCircle, FileText } from "lucide-react";
import Link from "next/link";
import globalService from "@/services/GlobalService";
import { toast } from "sonner";

const schema = yup.object({
    name: yup.string().trim().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    subject: yup.string().trim(),
    inquiry_type: yup.string().trim().optional(),
    message: yup.string().trim().required("Message is required"),
}).required();

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    inquiry_type?: string;
    message: string;
}

export default function ContactClient() {
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm<IFormInput>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            inquiry_type: "",
            message: "",
        },
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            setLoading(true);
            const response = await globalService.contactUs(data);
            reset();
            if (response) {
                toast.success(response?.message ?? "Message sent successfully");
                setIsSubmitted(true);
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center py-6 px-4 bg-gray-50 sm:py-12 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="p-6 sm:p-10">
                        <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 sm:w-16 sm:h-16">
                            <MessageCircle className="w-6 h-6 text-green-600 sm:w-8 sm:h-8" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2 sm:text-2xl">Thanks for reaching out!</h2>
                        <p className="text-sm text-gray-600 sm:text-base">We&#39;ll get in touch soon.</p>
                        <Button
                            onClick={() => setIsSubmitted(false)}
                            className="mt-4 w-full sm:mt-6"
                            disabled={loading}
                            variant="default"
                        >
                            Go Back
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <main className="min-h-screen py-6 px-4 bg-white sm:py-12 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:w-20 sm:h-20 sm:mb-6">
                        <Mail className="w-8 h-8 text-blue-600 sm:w-10 sm:h-10" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3 sm:text-4xl sm:mb-4">Contact Us</h1>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto sm:text-lg">
                        Have a question, an issue, or just want to say hello? We&#39;re here to help! Fill out the form below or use one of our direct contact methods, and our team will get back to you shortly.
                    </p>
                </div>

                <Card className="shadow-lg">
                    <CardContent className="p-4 sm:p-8">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl sm:mb-6">Send us a message</h2>
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                                    <div>
                                        <Label htmlFor="name" className="text-sm font-medium">Full Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="name"
                                            {...register("name")}
                                            placeholder="Your full name"
                                            className="mt-1"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            placeholder="your.email@example.com"
                                            className="mt-1"
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="inquiry_type" className="text-sm font-medium">Inquiry Type</Label>
                                        <Select value={watch("inquiry_type")} onValueChange={(val) => setValue("inquiry_type", val)}>
                                            <SelectTrigger className="mt-1">
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
                                        <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                                        <Input
                                            id="subject"
                                            {...register("subject")}
                                            placeholder="Brief description of your inquiry"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="message" className="text-sm font-medium">Message <span className="text-red-500">*</span></Label>
                                        <Textarea
                                            id="message"
                                            {...register("message")}
                                            placeholder="Please describe your question or issue in detail..."
                                            className="min-h-[100px] mt-1 sm:min-h-[120px]"
                                        />
                                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                                    </div>

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:w-auto sm:px-8 sm:py-3"
                                            disabled={loading}
                                        >
                                            {loading ? "Sending..." : "Send Message"}
                                        </Button>
                                    </div>
                                </form>
                            </div>

                            <div className="space-y-6 sm:space-y-8">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl sm:mb-6">Direct Contact</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900">Email</p>
                                                <Link
                                                    href="mailto:support@socialji.com"
                                                    className="text-blue-600 hover:text-blue-700 break-all"
                                                >
                                                    support@socialji.com
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900">Phone</p>
                                                <Link
                                                    href="tel:+1-234-567-890"
                                                    className="text-green-600 hover:text-green-700"
                                                >
                                                    +1-234-567-890
                                                </Link>
                                                <p className="text-sm text-gray-500 mt-1">Mon–Fri, 9am–5pm PST</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start space-x-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <MessageCircle className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900">Live Chat</p>
                                                <p className="text-gray-600 text-sm">Chat with us via the live chat button in the bottom corner</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4 sm:text-2xl sm:mb-6">Support Resources</h2>
                                    <p className="text-gray-600 mb-4 text-sm sm:text-base sm:mb-6">
                                        Before you send a message, you might find your answer in our self-help resources:
                                    </p>
                                    <div className="space-y-3 sm:space-y-4">
                                        <Link
                                            href="#"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group sm:p-4"
                                        >
                                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <HelpCircle className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900 group-hover:text-blue-600">FAQ</p>
                                                <p className="text-sm text-gray-600">Quick answers to common questions</p>
                                            </div>
                                        </Link>

                                        <Link
                                            href="#"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group sm:p-4"
                                        >
                                            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <Users className="w-5 h-5 text-teal-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900 group-hover:text-blue-600">How It Works</p>
                                                <p className="text-sm text-gray-600">Learn how to use SocialJi effectively</p>
                                            </div>
                                        </Link>

                                        <Link
                                            href="#"
                                            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group sm:p-4"
                                        >
                                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <FileText className="w-5 h-5 text-indigo-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="font-medium text-gray-900 group-hover:text-blue-600">Blog & Tips</p>
                                                <p className="text-sm text-gray-600">Guidance and best practices</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}