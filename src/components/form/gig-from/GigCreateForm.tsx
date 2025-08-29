"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


import {gigsService} from "@/services/gigs.service";
import GigFormBase, {GigFormData} from "@/components/form/gig-from/GigFormBase";


const GigCreateForm: React.FC<{ onSuccess?: () => void }> = ({onSuccess}) => {
    const router = useRouter();

    const handleCreate = async (data: GigFormData) => {
        const formData = new FormData();
        formData.append("status", data.status ?? "0");
        formData.append("title", data.title ?? "");
        formData.append("category", data.category ?? "");
        formData.append("description", data.description ?? "");
        formData.append("requirements", data.requirements?.[0] ?? "");
        formData.append("features", data.features?.[0] ?? "");
        data.tags?.forEach((tag: any) =>
            formData.append("tag_id[]", String(typeof tag === "object" ? tag.id : tag))
        );
        data.pricing?.forEach((tier: any) => {
            formData.append("pricing_tier_id[]", String(tier.pricing_tier_id));
            formData.append("price[]", String(tier.price));
            formData.append("delivery_time[]", tier.delivery_time ?? "");
            formData.append("tier_description[]", tier.tier_description ?? "");
            formData.append("tier_requirement[]", tier.tier_requirement ?? "");
            formData.append("currency_id[]", String(tier.currency_id));
        });
        if (data.image) formData.append("image", data.image as any);
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
        const response = await gigsService.createGig(formData);
        if (response) {
            toast.success("Gig created successfully");
        }
        router.push("/influencer/gigs");
        onSuccess?.();
    };

    return <GigFormBase mode="create" onSubmit={handleCreate}/>;
};

export default GigCreateForm;
