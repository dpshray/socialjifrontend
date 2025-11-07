import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date)
}

export function formatCompactNumber(value: number): string {
    if (isNaN(value)) return '0'
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 1,
    }).format(value)
}

export function formatDateCampaign(dateString?: string | null) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}


export const getBrandInitials = (firstName: string, lastName?: string) =>
    lastName ? `${firstName[0]}${lastName[0]}`.toUpperCase() : firstName.slice(0, 2).toUpperCase()


export const generatePageRange = (currentPage: number, totalPages: number) => {
    const delta = 2
    const range: (number | string)[] = []

    for (let i = Math.max(2, currentPage - delta);
         i <= Math.min(totalPages - 1, currentPage + delta);
         i++) {
        range.push(i)
    }

    if (currentPage - delta > 2) {
        range.unshift("ellipsis")
    }
    if (currentPage + delta < totalPages - 1) {
        range.push("ellipsis")
    }

    range.unshift(1)
    if (totalPages > 1) {
        range.push(totalPages)
    }

    return range.filter((item, index, arr) => arr.indexOf(item) === index)
}
