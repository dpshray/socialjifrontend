"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, X } from "lucide-react";
import { toast } from "sonner";

import { gigsSchema, gigsUpdateSchema } from "@/lib/schema";
import { tagsService } from "@/services/tagsService";

import TextInputField from "@/components/field/TextInputField";
import FileInputField from "@/components/field/FileInputField";
import MultiSelectField from "@/components/field/MultiSelectInputField";
import { InferType } from "yup";
import { gigsService } from "@/services/gigs.service";
import TagModal from "@/components/modal/TagModal";

export type GigFormData = InferType<typeof gigsSchema>;

interface Tag {
    id: number;
    name: string;
}

interface PricingTier {
    id: number;
    label: string;
}

interface GigFormBaseProps {
    mode: "create" | "edit";
    defaultValues?: Partial<GigFormData>;
    onSubmit: (data: GigFormData) => Promise<void>;
}

const GigFormBase: React.FC<GigFormBaseProps> = ({ mode, defaultValues, onSubmit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm<GigFormData>({
        resolver: yupResolver((mode === "edit" ? gigsUpdateSchema : gigsSchema) as any),
        mode: "onBlur",
        defaultValues: {
            title: "",
            category: "",
            description: "",
            features:"" ,
            requirements: "",
            tags: [],
            status: "0",
            pricing: [],
            ...defaultValues,
        },
    });

    const { fields: pricingFields, append, remove, replace } = useFieldArray({
        control,
        name: "pricing",
    });

    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
    const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [apiError, setApiError] = useState<string | null>(null);

    const getAvailableTags = useCallback(async () => {
        try {
            const response = await tagsService.getAllTags();
            setAvailableTags(response?.data || []);
        } catch (error: any) {
            toast.error(error?.message || "Failed to fetch tags");
        }
    }, []);

    const getPricingTiers = useCallback(async () => {
        try {
            const response = await gigsService.getAllPricingTiers();
            setPricingTiers(response || []);
        } catch (error: any) {
            toast.error(error?.message || "Failed to fetch pricing tiers");
        }
    }, []);

    useEffect(() => {
        getAvailableTags();
        getPricingTiers();
    }, [getAvailableTags, getPricingTiers]);

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
            setImagePreview(typeof defaultValues.image === "string" ? defaultValues.image : null);
            if (defaultValues.pricing?.length) {
                setSelectedTiers(defaultValues.pricing.map((p: any) => p.pricing_tier_id));
                replace(defaultValues.pricing);
                setActiveTab(String(defaultValues.pricing[0].pricing_tier_id));
            }
        }
    }, [defaultValues, reset, replace]);

    const handleTierClick = (tierId: number) => {
        const isSelected = selectedTiers.includes(tierId);
        if (!isSelected) {
            setSelectedTiers((prev) => [...prev, tierId]);
            append({
                pricing_tier_id: tierId,
                price: 0,
                delivery_time: "",
                tier_description: "",
                tier_requirement: "",
                currency_id: 2,
            });
            setActiveTab(String(tierId));
        } else {
            const index = pricingFields.findIndex((p) => p.pricing_tier_id === tierId);
            if (index !== -1) remove(index);
            setSelectedTiers((prev) => prev.filter((id) => id !== tierId));
            if (activeTab === String(tierId)) {
                const remaining = selectedTiers.filter((id) => id !== tierId);
                setActiveTab(remaining.length > 0 ? String(remaining[0]) : "");
            }
        }
    };

    const tagOptions = useMemo(
        () => availableTags.map((tag) => ({ value: String(tag.id), label: tag.name })),
        [availableTags]
    );

    const pricingTierOptions = useMemo(
        () => pricingTiers.map((tier) => ({ id: tier.id, label: tier.label })),
        [pricingTiers]
    );

    const selectedTags = watch("tags") || [];

    const selectedTagsDisplay = useMemo(
        () =>
            availableTags.filter((tag) =>
                selectedTags.some((selectedTag: any) =>
                    typeof selectedTag === "object" ? selectedTag.id === tag.id : selectedTag === tag.id
                )
            ),
        [availableTags, selectedTags]
    );

    const selectedTagOptions = useMemo(
        () => selectedTagsDisplay.map((tag) => ({ value: String(tag.id), label: tag.name })),
        [selectedTagsDisplay]
    );

    const handleRemoveTag = (tagId: number) => {
        const updatedTags = selectedTags.filter((tag: any) =>
            typeof tag === "object" ? tag.id !== tagId : tag !== tagId
        );
        setValue("tags", updatedTags, { shouldValidate: true });
    };

    const internalOnSubmit = async (data: GigFormData) => {
        setApiError(null);
        try {
            await onSubmit(data);
        } catch (error: any) {
            const errorData = error?.data?.errors || {};
            Object.entries(errorData).forEach(([_, messages]) => {
                if (Array.isArray(messages)) messages.forEach((msg) => toast.error(msg));
                else toast.error(messages as string);
            });
            setApiError(error?.message || "An error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(internalOnSubmit)} className="space-y-6 w-full" noValidate>
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
                <div className="bg-gray-50 flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold">{mode === "edit" ? "Edit Your Gig" : "Create New Gig"}</h2>
                        <p className="text-gray-600 mt-1">Fill in the details to get started</p>
                    </div>
                    {isSubmitting && (
                        <div className="flex items-center gap-2 bg-gray-200 rounded-full px-4 py-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-500 border-t-transparent"></div>
                            <span className="text-sm font-medium text-gray-700">Saving...</span>
                        </div>
                    )}
                    <TagModal />
                </div>
                <div className="p-8 space-y-8">
                    {apiError && (
                        <Alert variant="destructive" className="border-red-200 bg-red-50">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{apiError}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-6">
                        <TextInputField
                            label="Gig Title"
                            placeholder="e.g., I will create stunning social media graphics"
                            {...register("title")}
                            error={errors.title?.message}
                            required
                        />
                        <TextInputField
                            label="Category"
                            placeholder="e.g., Design & Creative"
                            {...register("category")}
                            error={errors.category?.message}
                            required
                        />
                        <TextInputField
                            textarea
                            label="Description"
                            placeholder="Describe your gig in detail"
                            {...register("description")}
                            error={errors.description?.message}
                            className="min-h-[140px]"
                            required
                        />
                        <FileInputField
                            label="Gigs Image"
                            placeholder="Upload image"
                            accept="image/*"
                            error={errors.image?.message as string}
                            onChangeAction={(files: File[]) => setValue("image", files[0], { shouldValidate: true })}
                        />
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Gig Preview"
                                className="rounded-xl border border-gray-200 max-h-60 object-contain mt-4"
                            />
                        )}
                        <TextInputField
                            label="Key Feature"
                            placeholder="What's the main benefit?"
                            {...register("features")}
                            error={errors.features?.message}
                            required
                        />
                        <TextInputField
                            label="Main Requirement"
                            placeholder="What do you need from the client?"
                            {...register("requirements")}
                            error={errors.requirements?.message}
                            required
                        />
                        <input type="hidden" {...register("status")} value="0" />
                        <MultiSelectField
                            name="tags"
                            label="Tags"
                            required
                            options={tagOptions}
                            value={selectedTagOptions}
                            placeholder="Select tags"
                            onChangeAction={(value) =>
                                setValue(
                                    "tags",
                                    value.map((v: any) => Number(v)),
                                    { shouldValidate: true }
                                )
                            }
                            error={errors.tags?.message}
                        />
                        {selectedTagsDisplay.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedTagsDisplay.map((tag) => (
                                    <Badge
                                        key={tag.id}
                                        className="bg-blue-100 text-black rounded-full text-sm font-medium inline-flex items-center"
                                    >
                                        {tag.name}
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-4 w-4 p-0 hover:bg-blue-300 rounded-full"
                                            onClick={() => handleRemoveTag(tag.id)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        )}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {pricingTierOptions.map((tier) => (
                                <Button
                                    key={tier.id}
                                    type="button"
                                    variant={selectedTiers.includes(tier.id) ? "default" : "outline"}
                                    onClick={() => handleTierClick(tier.id)}
                                    className="px-4 py-2 text-sm"
                                >
                                    {tier.label}
                                </Button>
                            ))}
                        </div>
                        {selectedTiers.length > 0 && (
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {selectedTiers.map((tierId) => (
                                        <TabsTrigger key={tierId} value={String(tierId)}>
                                            {pricingTierOptions.find((t) => t.id === tierId)?.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                                {pricingFields.map((field, index) => (
                                    <TabsContent key={field.id} value={String(field.pricing_tier_id)} className="mt-4">
                                        <div className="space-y-4 p-4 border border-muted rounded-xl bg-muted/50">
                                            <TextInputField
                                                label="Price"
                                                type="number"
                                                placeholder="Enter Price"
                                                {...register(`pricing.${index}.price` as const)}
                                                error={errors.pricing?.[index]?.price?.message}
                                            />
                                            <TextInputField
                                                label="Delivery Time"
                                                type="date"
                                                placeholder="Enter Delivery Time"
                                                {...register(`pricing.${index}.delivery_time` as const)}
                                                error={errors.pricing?.[index]?.delivery_time?.message}
                                            />
                                            <Textarea
                                                placeholder="Enter Tier Description"
                                                {...register(`pricing.${index}.tier_description` as const)}
                                                className="min-h-[80px]"
                                            />
                                            {errors.pricing?.[index]?.tier_description && (
                                                <p className="text-sm text-red-600 mt-1">{errors.pricing[index]?.tier_description?.message}</p>
                                            )}
                                            <TextInputField
                                                label="Tier Requirement"
                                                placeholder="Enter Tier Requirement"
                                                {...register(`pricing.${index}.tier_requirement` as const)}
                                                error={errors.pricing?.[index]?.tier_requirement?.message}
                                            />
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        )}
                        <div className="flex justify-end">
                            <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || !isValid}>
                                {isSubmitting ? (mode === "edit" ? "Updating..." : "Submitting...") : mode === "edit" ? "Update Gig" : "Submit Gig"}
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </form>
    );
};

export default GigFormBase;
