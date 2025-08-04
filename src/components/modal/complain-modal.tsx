"use client"

import {SubmitHandler, useForm} from "react-hook-form"
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import TextInputField from "@/components/field/TextInputField"
import {toast} from "sonner"
import paymentService from "@/services/paymentService"

interface ComplainModalProps {
    isOpen: boolean
    onCloseAction: () => void
    paymentId?: number
    gigTitle?: string
}

type FormValues = {
    complaint: string
}

export default function ComplainModal({
                                          isOpen,
                                          onCloseAction,
                                          paymentId,
                                          gigTitle,
                                      }: ComplainModalProps) {
    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<FormValues>()

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await paymentService.brandPaymentComplaint(paymentId!, data)
            if (response.status === 200) {
                toast.success("Complaint submitted successfully.")
                reset()
                onCloseAction()
            }
        } catch (error:any) {
            toast.error(error?.message || "Failed to submit complaint.")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onCloseAction}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Submit a Complaint</DialogTitle>
                    <DialogDescription>
                        {gigTitle ? `Regarding "${gigTitle}". ` : ""}
                        Please describe your issue in detail.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <TextInputField
                            textarea
                            {...register("complaint", {required: "Complaint message cannot be empty."})}
                            label="Complaint"
                            error={errors.complaint?.message}
                            disabled={isSubmitting}
                            placeholder="Please describe your issue in detail."
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={onCloseAction} disabled={isSubmitting}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Submit Complaint"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
