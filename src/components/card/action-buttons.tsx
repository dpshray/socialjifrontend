"use client"

import type React from "react"
import { Eye, Trash, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActionButtonsProps {
    id: number
    onView?: (id: number) => void
    onEdit?: (id: number) => void // Changed to accept id
    onDelete?: (id: number) => void // Changed to accept id
    showView?: boolean
    showEdit?: boolean
    showDelete?: boolean
    size?: "sm" | "md" | "lg"
}

export function ActionButtons({
    id,
    onView,
    onEdit,
    onDelete,
    showView = true,
    showEdit = true,
    showDelete = true,
    size = "sm",
}: ActionButtonsProps) {
    const iconSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"

    const handleView = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (onView) onView(id)
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (onEdit) onEdit(id) // Pass id
    }

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (onDelete) onDelete(id) // Pass id
    }

    return (
        <TooltipProvider>
            <div className="flex items-center gap-1">
                {showView && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleView}
                                className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                                <Eye className={iconSize} />
                                <span className="sr-only">View gig details</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>View details</p>
                        </TooltipContent>
                    </Tooltip>
                )}
                {showEdit && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleEdit}
                                className="h-8 w-8 p-0 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                            >
                                <Edit className={iconSize} />
                                <span className="sr-only">Edit gig</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit gig</p>
                        </TooltipContent>
                    </Tooltip>
                )}
                {showDelete && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleDelete}
                                className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <Trash className={iconSize} />
                                <span className="sr-only">Delete gig</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Delete gig</p>
                        </TooltipContent>
                    </Tooltip>
                )}
            </div>
        </TooltipProvider>
    )
}
