'use client'

import { Trash2 } from "lucide-react"
import React, { memo } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"

interface DeleteModalProps {
    open: boolean
    onCloseAction: () => void
    onConfirmAction: () => void
    loading?: boolean
    title?: string
    description?: string
}

export const DeleteModal = memo(({
                                     open,
                                     onCloseAction,
                                     onConfirmAction,
                                     loading = false,
                                     title = "Are you sure?",
                                     description = "This action cannot be undone. Do you really want to proceed?",
                                 }: DeleteModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={open ? undefined : onCloseAction}>
            <AlertDialogContent
                className="max-w-sm rounded-lg p-6 shadow-lg bg-white dark:bg-zinc-900
          mx-4 sm:mx-auto
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
            >
                <AlertDialogHeader className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                    <div
                        aria-hidden="true"
                        className="flex-shrink-0 rounded-full bg-red-50 dark:bg-red-900 p-3"
                    >
                        <Trash2 className="h-6 w-6 text-red-600 dark:text-red-200" />
                    </div>
                    <div className="flex flex-col gap-1 text-center sm:text-left">
                        <AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-gray-600 dark:text-gray-400">
                            {description}
                        </AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <AlertDialogCancel
                        className={buttonVariants({ variant: "outline" })}
                        onClick={onCloseAction}
                        disabled={loading}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className={buttonVariants({ variant: "destructive" })}
                        onClick={onConfirmAction}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="inline-flex items-center gap-2">
                <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                  />
                  <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Deleting...
              </span>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
})

DeleteModal.displayName = "DeleteModal"
