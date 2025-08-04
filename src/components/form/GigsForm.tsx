'use client';

import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {Button} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {Textarea} from '@/components/ui/textarea';
import TextInputField from '@/components/field/TextInputField';
import MultiSelectField from '@/components/field/MultiSelectInputField';

import {gigsService} from '@/services/gigs.service';
import {toast} from 'sonner';
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {tagsService} from "@/services/tagsService";

interface PricingTierData {
    pricing_tier_id: number;
    price: number;
    delivery_time: string;
    tier_description: string;
    tier_requirement: string;
    currency_id: number;
}

interface GigFormData {
    title: string;
    category: string;
    description: string;
    features: string[];
    requirements: string[];
    tags: number[];
    status: '0' | '1';
    pricing: PricingTierData[];
}

const schema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    features: Yup.array().of(Yup.string().required()).min(1),
    requirements: Yup.array().of(Yup.string().required()).min(1),
    tags: Yup.array().of(Yup.number()).min(1, 'At least one tag is required'),
    status: Yup.string().oneOf(['0', '1']).required('Status is required'),
    pricing: Yup.array().of(
        Yup.object().shape({
            pricing_tier_id: Yup.number().required(),
            price: Yup.number().required(),
            delivery_time: Yup.string().required(),
            tier_description: Yup.string().required(),
            tier_requirement: Yup.string().required(),
            currency_id: Yup.number().required(),
        })
    ),
});

const GigsForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: {errors},
    } = useForm<GigFormData>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            title: '',
            category: '',
            description: '',
            features: [''],
            requirements: [''],
            tags: [],
            status: '0',
            pricing: [],
        },
    });

    const {fields: pricingFields, append, remove} = useFieldArray({
        control,
        name: 'pricing',
    });

    const [availableTags, setAvailableTags] = useState<any[]>([]);
    const [pricingTiers, setPricingTiers] = useState<any[]>([]);
    const [selectedTiers, setSelectedTiers] = useState<number[]>([]);

    const getAvailableTags = useCallback(async () => {
        try {
            const response = await tagsService.getAllTags();
            setAvailableTags(response?.data);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to fetch tags');
        }
    }, []);

    const getPricingTiers = useCallback(async () => {
        try {
            const response = await gigsService.getAllPricingTiers();
            setPricingTiers(response);
        } catch (error: any) {
            toast.error(error?.message || 'Failed to fetch pricing tiers');
        }
    }, []);

    const handleTierClick = (tierId: number) => {
        if (!selectedTiers.includes(tierId)) {
            setSelectedTiers(prev => [...prev, tierId]);
            append({
                pricing_tier_id: tierId,
                price: 0,
                delivery_time: '',
                tier_description: '',
                tier_requirement: '',
                currency_id: 2,
            });
        } else {
            const index = pricingFields.findIndex(p => p.pricing_tier_id === tierId);
            if (index !== -1) remove(index);
            setSelectedTiers(prev => prev.filter(id => id !== tierId));
        }
    };

    useEffect(() => {
        getAvailableTags();
        getPricingTiers();
    }, [getAvailableTags, getPricingTiers]);

    const tagOptions = useMemo(
        () =>
            availableTags.map((tag: any) => ({
                value: String(tag.id),
                label: tag.name,
            })),
        [availableTags]
    );

    const pricingTierOptions = useMemo(
        () =>
            pricingTiers.map((tier: any) => ({
                id: tier.id,
                label: tier.label,
            })),
        [pricingTiers]
    );
    console.log('Pricing Tiers:', pricingTiers);
    const selectedTags = watch('tags') || [];

    const onSubmit = async (data: GigFormData) => {
        try {
            const formData = new FormData();

            formData.append('status', data.status || '0');
            formData.append('title', data.title);
            formData.append('category', data.category);
            formData.append('description', data.description);
            formData.append('requirements', data.requirements[0]);
            formData.append('features', data.features[0]);

            data.tags.forEach(tag => formData.append('tag_id[]', String(tag)));

            data.pricing.forEach((tier, index) => {
                formData.append('pricing_tier_id[]', String(tier.pricing_tier_id));
                formData.append('price[]', String(tier.price));
                formData.append('delivery_time[]', tier.delivery_time);
                formData.append('tier_description[]', tier.tier_description);
                formData.append('tier_requirement[]', tier.tier_requirement);
                formData.append('currency_id[]', String(tier.currency_id));
            });

            const result = await gigsService.createGig(formData);
            console.log('Gig created:', result);
            if (result) {
                toast.success('Successfully created Gig');

            }
        } catch (error: any) {
            Object.keys(error?.data?.errors || {}).forEach((key) => {
                const messages = error.data.errors[key];
                if (Array.isArray(messages)) {
                    messages.forEach((msg) => toast(msg));
                } else {
                    toast(messages);
                }
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <Card className="p-6 space-y-6 rounded-2xl shadow-sm">
                <h2 className="text-xl font-semibold">Create New Gig</h2>
                <Separator/>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInputField label="Title" {...register('title')} errors={errors} required/>
                    <TextInputField label="Category" {...register('category')} errors={errors} required/>
                </div>

                <div>
                    <Textarea
                        placeholder="Description"
                        {...register('description')}
                        className="min-h-[120px]"
                    />
                    {errors.description && (
                        <p className="text-sm text-destructive mt-1">{errors.description.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <TextInputField label="Feature" {...register('features.0')} errors={errors} required/>
                    <TextInputField label="Requirement" {...register('requirements.0')} errors={errors} required/>
                </div>

                <input type="hidden" value="0" {...register('status')} />

                <MultiSelectField
                    name="tags"
                    label="Tags"
                    required
                    options={tagOptions}
                    value={selectedTags}
                    placeholder="Select tags"
                    onChangeAction={(value) => setValue('tags', value.map((v) => Number(v)))}
                    error={errors.tags?.message}
                />

                <div className="flex flex-wrap gap-2">
                    {pricingTierOptions.map((tier) => (
                        <div className={'flex'} key={tier.id}>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => handleTierClick(tier.id)}
                                className={cn(' w-full text-white', {
                                    'bg-navyBlue': selectedTiers.includes(tier.id),
                                    'bg-gray-200 text-navyBlue': !selectedTiers.includes(tier.id),
                                })}
                            >
                                {tier.label}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                    {pricingFields.map((field, index) => (
                        <div key={field.id} className="space-y-4">
                            <h2 className="text-lg font-semibold">Tier {index + 1}</h2>
                            <TextInputField
                                label="Price"
                                type="number"
                                placeholder="Enter Price"
                                {...register(`pricing.${index}.price` as const)}
                            />
                            <TextInputField
                                label="Delivery Time"
                                type="datetime-local"
                                placeholder="Enter Delivery Time"
                                {...register(`pricing.${index}.delivery_time` as const)}
                            />
                            <Textarea
                                placeholder="Enter Tier Description"
                                {...register(`pricing.${index}.tier_description` as const)}
                            />
                            <TextInputField
                                label="Tier Requirement"
                                placeholder="Enter Tier Requirement"
                                {...register(`pricing.${index}.tier_requirement` as const)}
                            />
                        </div>
                    ))}
                </div>

                <div className="">
                    <Button type="submit" className="w-full md:w-auto">
                        Submit Gig
                    </Button>
                </div>
            </Card>
        </form>
    );
};

export default GigsForm;