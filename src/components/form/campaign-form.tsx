"use client"

import React, { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import TextInputField from "@/components/field/TextInputField"
import MultiSelectField from "@/components/field/MultiSelectInputField"
import FileInputField from "@/components/field/FileInputField"
import { ArrowUpRight, DollarSign, Sparkles, Zap } from "lucide-react"
import type { Campaign, CampaignFormData } from "@/types/campaigns"
import campaignService from "@/services/campaign.service"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

const campaignSchema = yup.object({
    title: yup.string().required("Campaign title is required").min(3, "Title must be at least 3 characters"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
    categories: yup.string().required("Categories are required"),
    eligibility: yup.string().required("Eligibility criteria is required"),
    requirement: yup.string().required("Requirements are required"),
    price: yup.number().typeError("Budget must be a number").required("Budget is required").min(1, "Budget must be greater than 0"),
    image: yup.mixed().nullable(),
    tags: yup.array().of(yup.number()).optional(),
})

interface CampaignFormProps {
    editingCampaign?: Campaign | null
    onSubmit: SubmitHandler<CampaignFormData>
    onCancel: () => void
}

export function CampaignForm({ editingCampaign, onSubmit, onCancel }: CampaignFormProps) {
    const [tags, setTags] = useState<{ label: string; value: number }[]>([])
    const [loading, setLoading] = useState(false)
    const [previewImage, setPreviewImage] = useState<string | null>(null)

    useEffect(() => {
        const loadTags = async () => {
            setLoading(true)
            try {
                const response = await campaignService.getCampaignTags()
                setTags(response.map((tag: any) => ({ label: tag.name, value: tag.id })))
            } finally {
                setLoading(false)
            }
        }
        loadTags()
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        reset,
    } = useForm<CampaignFormData>({
        resolver: yupResolver(campaignSchema) as any,
        mode: "onTouched",
        defaultValues: {
            title: editingCampaign?.title || "",
            description: editingCampaign?.description || "",
            categories: editingCampaign?.categories || "",
            eligibility: editingCampaign?.eligibility || "",
            requirement: editingCampaign?.requirement || "",
            price: editingCampaign?.price || 0,
            image: editingCampaign?.image || null,
            tags: editingCampaign?.tags || [],
        },
    })

    useEffect(() => {
        if (editingCampaign) {
            reset({
                title: editingCampaign.title || "",
                description: editingCampaign.description || "",
                categories: editingCampaign.categories || "",
                eligibility: editingCampaign.eligibility || "",
                requirement: editingCampaign.requirement || "",
                price: editingCampaign.price || 0,
                image: editingCampaign.image || null,
                tags: editingCampaign.tags || [],
            })
            setPreviewImage(editingCampaign.image || null)
        } else {
            reset()
            setPreviewImage(null)
        }
    }, [editingCampaign, reset])

    const selectedTags = watch("tags") || []
    const watchedImage = watch("image")

    useEffect(() => {
        if (watchedImage instanceof File) {
            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                setPreviewImage(fileReader.result as string)
            }
            fileReader.readAsDataURL(watchedImage)
        } else if (typeof watchedImage === "string") {
            setPreviewImage(watchedImage)
        } else {
            setPreviewImage(null)
        }
    }, [watchedImage])

    return (
        <Card className="glass-card border-0">
            <CardHeader className="pb-6">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{editingCampaign ? "Edit Campaign" : "Create New Campaign"}</CardTitle>
                        <CardDescription className="text-base">
                            {editingCampaign ? "Update your campaign details below" : "Fill in the details below to create your influencer marketing campaign"}
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
                                    {...register("title")}
                                    label="Campaign Title"
                                    placeholder="Enter campaign title"
                                    required
                                    error={errors.title?.message}
                                />
                                <TextInputField
                                    {...register("price")}
                                    label="Budget (USD)"
                                    placeholder="0.00"
                                    type="number"
                                    required
                                    icon={DollarSign}
                                    error={errors.price?.message}
                                />
                            </div>
                        </div>
                        <TextInputField
                            {...register("description")}
                            label="Campaign Description"
                            placeholder="Describe your campaign objectives, key messages, and what you want to achieve..."
                            textarea
                            required
                            error={errors.description?.message}
                            className="min-h-[120px]"
                        />
                        <MultiSelectField
                            name="tags"
                            label="Tags"
                            placeholder={loading ? "Loading tags..." : "Select tags"}
                            options={tags}
                            value={tags.filter((tag) => selectedTags.includes(tag.value as any))}
                            required
                            error={errors.tags?.message as string}
                            onChangeAction={(values: any) => setValue("tags", values.map((v: any) => Number(v)))}
                            className={loading ? "opacity-50 pointer-events-none" : ""}
                        />

                        <TextInputField
                            {...register("categories")}
                            label="Categories"
                            placeholder="e.g., Fashion, Lifestyle, Beauty (comma-separated)"
                            required
                            error={errors.categories?.message}
                        />
                        <FileInputField
                            {...register("image")}
                            label="Campaign Image"
                            placeholder="Upload campaign image"
                            accept="image/*"
                            error={errors.image?.message as string}
                            onChangeAction={(file: File) => setValue("image", file)}
                        />
                        {previewImage && (
                            <div className="w-56 h-56">
                                <Image width={200} height={200} src={previewImage} alt="Campaign Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                    <Separator />
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-slate-900">Requirements & Eligibility</h3>
                        <TextInputField
                            {...register("eligibility")}
                            label="Eligibility Criteria"
                            placeholder="Define who can apply for this campaign (follower count, demographics, niche, etc.)"
                            textarea
                            required
                            error={errors.eligibility?.message}
                            className="min-h-[100px]"
                        />
                        <TextInputField
                            {...register("requirement")}
                            label="Campaign Requirements"
                            placeholder="Specify deliverables, content requirements, posting schedule, etc."
                            textarea
                            required
                            error={errors.requirement?.message}
                            className="min-h-[100px]"
                        />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between pt-6">
                        <Button type="button" variant="outline" onClick={onCancel} className="px-8 bg-transparent">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 px-8 flex items-center"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            {isSubmitting ? (editingCampaign ? "Updating..." : "Creating...") : editingCampaign ? "Update Campaign" : "Create Campaign"}
                            <ArrowUpRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
