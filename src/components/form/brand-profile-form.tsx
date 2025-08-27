"use client";

import React, {useEffect, useState} from "react";
import {type SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {ArrowUpRight, Sparkles, User} from "lucide-react";
import TextInputField from "@/components/field/TextInputField";
import FileInputField from "@/components/field/FileInputField";
import Image from "next/image";

const profileSchema = yup.object({
    nick_name: yup.string().required("Nick name is required").min(2, "Nick name must be at least 2 characters"),
    first_name: yup.string().required("First name is required").min(2, "First name must be at least 2 characters"),
    last_name: yup.string().optional(),
    email: yup.string().required("Email is required").email("Please enter a valid email"),
    roles: yup.string().required("Role is required"),
    influencer_rating: yup
        .number()
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .min(0, "Influencer rating cannot be less than 0")
        .optional(),
    image: yup.mixed().optional(),
});

export interface ProfileFormData {
    nick_name: string;
    first_name: string;
    last_name?: string;
    email: string;
    roles: string;
    influencer_rating?: number;
    image?: File;
}

interface ProfileFormProps {
    editingProfile?: Partial<ProfileFormData>;
    onSubmitAction: SubmitHandler<ProfileFormData>;
    onCancelAction: () => void;
}

export function ProfileForm({editingProfile, onSubmitAction, onCancelAction}: ProfileFormProps) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {errors, isSubmitting},
    } = useForm<ProfileFormData>({
        resolver: yupResolver(profileSchema) as any,
        defaultValues: editingProfile ?? {},
        mode: "onBlur",
    });

    const [preViewImage, setPreviewImage] = useState<string>("");

    useEffect(() => {
        if (typeof editingProfile?.image === "string" && editingProfile.image) {
            setPreviewImage(editingProfile.image);
        }
    }, [editingProfile]);

    useEffect(() => {
        return () => {
            if (preViewImage) URL.revokeObjectURL(preViewImage);
        };
    }, [preViewImage]);

    const imageFile = watch("image");

    const onSubmitHandler: SubmitHandler<ProfileFormData> = (data) => {
        console.log("data", data);
        if (data.image instanceof File) {
            onSubmitAction(data);
        } else {
            const {image, ...rest} = data;
            onSubmitAction(rest as ProfileFormData);
        }
    };

    return (
        <Card className="glass-card border-0">
            <CardHeader className="pb-6">
                <div className="flex items-center space-x-3">
                    <div
                        className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white"/>
                    </div>
                    <div>
                        <CardTitle className="text-2xl">{editingProfile ? "Edit Profile" : "Create Profile"}</CardTitle>
                        <CardDescription className="text-base">
                            {editingProfile
                                ? "Update your profile information below"
                                : "Fill in your details to create your brand profile"}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8" noValidate>
                    <div className="space-y-6">
                        <section>
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
                                    disabled
                                />
                                <TextInputField
                                    {...register("roles")}
                                    label="Role"
                                    placeholder="Brand / Influencer"
                                    required
                                    error={errors.roles?.message}
                                    disabled
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <TextInputField
                                    disabled
                                    {...register("influencer_rating")}
                                    label="Influencer Rating"
                                    placeholder="0"
                                    type="number"
                                    error={errors.influencer_rating?.message}
                                />
                            </div>
                        </section>
                        <FileInputField
                            label="Profile Picture"
                            accept="image/*"
                            error={errors.image?.message}
                            onChangeAction={(files: File[]) => {
                                if (files.length > 0) {
                                    setValue("image", files[0], {shouldValidate: true});
                                    const url = URL.createObjectURL(files[0]);
                                    setPreviewImage(url);
                                } else {
                                    setValue("image", undefined);
                                    setPreviewImage("");
                                }
                            }}
                        />
                        { preViewImage && (
                            <div>
                                <Image
                                    width={100}
                                    height={100}
                                    src={preViewImage}
                                    alt="Preview"
                                    className="w-24 h-24 object-cover"
                                    priority={true}
                                />
                            </div>
                        )}
                    </div>
                    <Separator/>
                    <div className="flex items-center justify-between pt-6">
                        <Button type="button" variant="outline" onClick={onCancelAction}
                                className="px-8 bg-transparent">
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 flex items-center"
                        >
                            <Sparkles className="w-4 h-4 mr-2"/>
                            {isSubmitting ? "Saving..." : editingProfile ? "Update Profile" : "Create Profile"}
                            <ArrowUpRight className="w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
