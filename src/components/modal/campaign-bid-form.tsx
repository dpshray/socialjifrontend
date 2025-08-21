"use client"

import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Campaign} from "@/types/campaigns"
import TextInputField from "@/components/field/TextInputField"
import {useEffect} from "react";

const bidSchema = yup.object({
    amount: yup
        .number()
        .transform((value, originalValue) => (originalValue === "" ? NaN : value))
        .typeError("Bid amount must be a number")
        .positive("Bid amount must be greater than zero")
        .required("Bid amount is required"),
    message: yup
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
        formState: {errors, isSubmitting},
        reset,
        setValue,
    } = useForm<BidFormValues>({
        resolver: yupResolver(bidSchema),
        mode: "onTouched",
        defaultValues: {
            amount: 25750.50,
            message: "lorem ipsum dolor",
        },
    })

    useEffect(() => {
        if (open) {
            setValue("amount", 25750.5)
            setValue("message", "lorem ipsum dolor")
        }
    }, [open, setValue])

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
                            {...register("amount")}
                            error={errors.amount?.message}
                            placeholder="Enter your bid amount"
                            type="number"
                            inputMode="decimal"
                            step="any"
                            min="0"
                        />
                    </div>

                    <div className="space-y-1">
                        <TextInputField
                            textarea
                            label="Proposal Message"
                            {...register("message")}
                            error={errors.message?.message}
                            placeholder="Enter your proposal message"
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
