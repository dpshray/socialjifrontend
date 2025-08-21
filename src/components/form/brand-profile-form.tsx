"use client"

import { type SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowUpRight, Sparkles, User } from "lucide-react"
import TextInputField from "@/components/field/TextInputField"
import FileInputField from "@/components/field/FileInputField"

const profileSchema = yup.object({
    nick_name: yup.string().required("Nick name is required").min(2, "Nick name must be at least 2 characters"),
    first_name: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
    last_name: yup.string().optional(),
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    roles: yup.string().required("Role is required"),
    influencer_rating: yup.number().min(0).optional(),
    avatar: yup.mixed().optional(),
})

export interface ProfileFormData {
    nick_name: string
    first_name: string
    last_name?: string
    email: string
    roles: string
    influencer_rating?: number
    avatar?: File
}

interface ProfileFormProps {
    editingProfile?: any
    onSubmit: SubmitHandler<ProfileFormData>
    onCancel: () => void
}

export function ProfileForm({ editingProfile, onSubmit, onCancel }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema) as any,
        defaultValues: {
            nick_name: editingProfile?.nick_name || "",
            first_name: editingProfile?.first_name || "",
            last_name: editingProfile?.last_name || "",
            email: editingProfile?.email || "",
            roles: editingProfile?.roles || "",
            influencer_rating: editingProfile?.influencer_rating || 0,
            avatar: undefined,
        },
    })

    return (
        <Card className="glass-card border-0">
            <CardHeader className="pb-6">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{editingProfile ? "Edit Profile" : "Create Profile"}</CardTitle>
                        <CardDescription className="text-base">
                            {editingProfile ? "Update your profile information below" : "Fill in your details to create your brand profile"}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-4">Basic Information</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <TextInputField
                                    {...register("first_name")}
                                    label="First Name"
                                    placeholder="Enter your first name"
                                    required
                                    error={errors.first_name?.message}
                                />
                                <TextInputField
                                    {...register("last_name")}
                                    label="Last Name"
                                    placeholder="Enter your last name"
                                    error={errors.last_name?.message}
                                />
                                <TextInputField
                                    {...register("nick_name")}
                                    label="Nick Name"
                                    placeholder="Enter your nick name"
                                    required
                                    error={errors.nick_name?.message}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <TextInputField
                                    {...register("email")}
                                    label="Email Address"
                                    placeholder="your@email.com"
                                    type="email"
                                    required
                                    error={errors.email?.message}
                                />
                                <TextInputField
                                    {...register("roles")}
                                    label="Role"
                                    placeholder="Brand / Influencer"
                                    required
                                    disabled
                                    error={errors.roles?.message}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <TextInputField
                                    {...register("influencer_rating")}
                                    label="Influencer Rating"
                                    placeholder="0"
                                    type="number"
                                    error={errors.influencer_rating?.message}
                                />
                            </div>
                        </div>
                        <FileInputField
                            {...register("avatar")}
                            label="Profile Picture"
                            accept="image/*"
                            error={errors.avatar?.message}
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between pt-6">
                        <Button type="button" variant="outline" onClick={onCancel} className="px-8 bg-transparent">
                            Cancel
                        </Button>
                        <div className="flex items-center space-x-4">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                            >
                                <Sparkles className="w-4 h-4 mr-2" />
                                {isSubmitting ? "Saving..." : editingProfile ? "Update Profile" : "Create Profile"}
                                <ArrowUpRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
