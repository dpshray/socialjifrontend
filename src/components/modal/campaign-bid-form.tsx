"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Campaign } from "@/types/campaigns"
import TextInputField from "@/components/field/TextInputField"

const bidSchema = yup.object({
    bid: yup
        .number()
        .transform((value, originalValue) =>
            originalValue === "" ? NaN : value
        )
        .typeError("Bid amount must be a number")
        .positive("Bid amount must be greater than zero")
        .required("Bid amount is required"),
    detail: yup
        .string()
        .min(10, "Proposal message should be at least 10 characters")
        .required("Proposal message is required"),
})

type BidFormValues = yup.InferType<typeof bidSchema>

interface CampaignBidFormModalProps {
    campaign: Campaign
    open: boolean
    onClose: () => void
    onSubmit: (data: BidFormValues, campaign: Campaign) => void | Promise<void>
}

export function CampaignBidFormModal({
                                         campaign,
                                         open,
                                         onClose,
                                         onSubmit,
                                     }: CampaignBidFormModalProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<BidFormValues>({
        resolver: yupResolver(bidSchema),
        mode: "onTouched",
        // no defaultValues provided here
    })

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            reset()
        }
    }, [open, reset])

    const handleFormSubmit = async (data: BidFormValues) => {
        await onSubmit(data, campaign)
        reset()
        onClose()
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Apply to {campaign.title}</DialogTitle>
                    <DialogDescription>
                        Submit your bid to participate in this campaign.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                    <div className="space-y-1">
                        <TextInputField
                            label="Bidding Price"
                            {...register("bid")}
                            error={errors.bid?.message}
                            placeholder="e.g., 12345.67"
                            type="number"
                            inputMode="decimal"
                            step="0.01"
                            min="0"
                        />
                    </div>

                    <div className="space-y-1">
                        <TextInputField
                            textarea
                            label="Proposal Message"
                            {...register("detail")}
                            error={errors.detail?.message}
                            placeholder="Enter your proposal message (minimum 10 characters)"
                        />
                    </div>

                    <DialogFooter className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Bid"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
