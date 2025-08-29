"use client"

import React, {useCallback, useEffect, useMemo, useState} from "react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {toast} from "sonner"
import {Loader2, Plus, TagIcon} from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {ScrollArea} from "@/components/ui/scroll-area"

import {cn} from "@/lib/utils"
import {tagsService} from "@/services/tagsService"

type TagFormValues = {
    tag: string
}

const validationSchema = Yup.object({
    tag: Yup.string().required("Tag is required").min(2, "Tag must be at least 2 characters"),
})

export default function TagModal() {
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
    } = useForm<TagFormValues>({
        resolver: yupResolver(validationSchema),
    })

    const watchedTag = watch("tag")

    const getAvailableTags = useCallback(async () => {
        setLoading(true)
        try {
            const response = await tagsService.getAllTags()
            const tagNames = response?.data?.map((tag: any) => tag.name) || []
            const uniqueTags = Array.from(new Set(tagNames))
            setTags(uniqueTags as string[])
        } catch (error: any) {
            toast.error(error?.message || "Failed to fetch tags")
        } finally {
            setLoading(false)
        }
    }, [])

    const onSubmit = async (data: TagFormValues) => {
        setSubmitting(true)
        try {
            const response = await tagsService.addTags(data.tag)
            toast.success(response?.message || "Tag added successfully")
            reset()
            getAvailableTags()
        } catch (error: any) {
            toast.error(error?.message || "Failed to add tag")
        } finally {
            setSubmitting(false)
        }
    }

    useEffect(() => {
        getAvailableTags()
    }, [getAvailableTags])

    const filteredTags = useMemo(() => {
        if (!watchedTag) return tags
        return tags.filter((tag) => tag.toLowerCase().includes(watchedTag.toLowerCase()))
    }, [tags, watchedTag])

    const renderedTags = useMemo(() => {
        return filteredTags.map((tag) => (
            <Badge
                key={tag}
                variant="secondary"
                className="capitalize cursor-default rounded-full px-3 py-1.5 text-xs sm:text-sm bg-muted select-none"
            >
                {tag}
            </Badge>
        ))
    }, [filteredTags])

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="font-semibold text-sm !text-white sm:text-base bg-gradient-to-br from-blue-500 to-purple-600 flex items-center gap-1"
                >
                    <Plus size={16}/>
                    <span className="hidden xs:inline">Add Tags</span>
                    <span className="xs:hidden">Tags</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] max-w-md sm:max-w-lg md:max-w-xl mx-auto">
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <div
                        className="flex size-12 sm:size-14 items-center justify-center rounded-full border bg-background overflow-hidden">
                        <div
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white"/>
                        </div>
                    </div>

                    <DialogHeader className="w-full text-center space-y-1 sm:space-y-2">
                        <DialogTitle className="text-lg sm:text-xl">Add Tags</DialogTitle>
                        <DialogDescription className="text-sm sm:text-base px-2">
                            Add new tags or select from existing ones that best describe your interests.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5 mt-2 sm:mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="tag" className="text-sm font-medium">
                            New Tag
                        </Label>
                        <div className="relative">
                            <TagIcon
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4"/>
                            <Input
                                {...register("tag")}
                                id="tag"
                                type="text"
                                placeholder="Enter a new tag..."
                                className="pl-10 text-sm sm:text-base"
                                autoComplete="off"
                            />
                        </div>
                        {errors.tag && <p className="text-sm text-destructive">{errors.tag.message}</p>}
                    </div>

                    <div className="space-y-2 sm:space-y-3">
                        <Label className="text-sm font-medium">Available Tags</Label>
                        <ScrollArea className="h-32 sm:h-40 w-full rounded-md border p-3 sm:p-4">
                            {loading ? (
                                <div className="flex items-center justify-center h-full">
                                    <Loader2 className="w-4 h-4 animate-spin mr-2"/>
                                    <span className="text-sm text-muted-foreground">Loading tags...</span>
                                </div>
                            ) : filteredTags.length > 0 ? (
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">{renderedTags}</div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-sm text-muted-foreground text-center">
                                        {watchedTag ? "No matching tags found" : "No tags available"}
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    <Button type="submit" className={cn("bg-navyBlue")} disabled={submitting}>
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2"/>
                                Adding Tag...
                            </>
                        ) : (
                            "Add Tag"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
