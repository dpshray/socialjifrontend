"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

import GigFormBase, {GigFormData} from "./GigFormBase";
import {gigsService} from "@/services/gigs.service";

interface GigEditFormProps {
    defaultValues: Partial<GigFormData>;
    onSuccess?: () => void;
}

const GigsUpdateForm: React.FC<GigEditFormProps> = ({defaultValues, onSuccess}) => {
    const router = useRouter();

    const handleUpdate = async (data: GigFormData) => {
        if (!defaultValues?.id) throw new Error("Missing gig ID for update");

        const formData = new FormData();
        formData.append("_method", "patch");

        formData.append("status", data.status ?? "");
        formData.append("title", data.title?.trim() ?? "");
        formData.append("category", data.category?.trim() ?? "");
        formData.append("description", data.description?.trim() ?? "");
        formData.append("features", data.features ?? "");

        formData.append("requirements", data.requirements ?? "");
        data.tags?.forEach((tag: any) =>
            formData.append("tag_id[]", String(typeof tag === "object" ? tag.id : tag))
        );

        if (data.pricing && data.pricing.length > 0) {
            data.pricing.forEach((tier) => {
                formData.append("pricing_tier_id[]", String(tier.pricing_tier_id ?? ""));
                formData.append("price[]", String(tier.price ?? ""));
                formData.append("delivery_time[]", tier.delivery_time ?? "");
                formData.append("tier_description[]", tier.tier_description ?? "");
                formData.append("tier_requirement[]", tier.tier_requirement ?? "");
                formData.append("currency_id[]", String(tier.currency_id ?? ""));
            });
        } else {
            formData.append("pricing_tier_id[]", "");
            formData.append("price[]", "");
            formData.append("delivery_time[]", "");
            formData.append("tier_description[]", "");
            formData.append("tier_requirement[]", "");
            formData.append("currency_id[]", "");
        }

        if (data.image) formData.append("image", data.image as any);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            const response = await gigsService.updateGig(defaultValues.id, formData);
            router.push("/influencer/gigs");
            if (response) {
                toast.success("Gig updated successfully");

            }

        } catch (error: any) {
            console.log(error);
        }
    };

    return <GigFormBase mode="edit" defaultValues={defaultValues} onSubmit={handleUpdate}/>;
};

export default GigsUpdateForm;
