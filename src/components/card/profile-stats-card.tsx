import {Card, CardContent} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {cn, formatCompactNumber} from "@/lib/utils";
import {ReactNode} from "react";

interface ProfileStatsCardProps {
    title: string;
    value: number | string;
    description: string;
    icon: ReactNode;
    colorClass: string;
    isLoading: boolean;
    className?: string
}

export function ProfileStatsCard({
                                     title,
                                     value,
                                     description,
                                     icon,
                                     colorClass,
                                     isLoading,
                                     className
                                 }: ProfileStatsCardProps) {
    return (
        <Card className={cn("border-0 shadow-lg p-3", className)}>
            <CardContent className="p-6 space-y-4">
                {isLoading ? (
                    <>
                        <Skeleton className="w-12 h-12 rounded-xl"/>
                        <Skeleton className="h-4 w-24"/>
                        <Skeleton className="h-6 w-32"/>
                        <Skeleton className="h-4 w-20"/>
                    </>
                ) : (
                    <>
                        <div
                            className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center shadow-lg`}>
                            {icon}
                        </div>
                        <p className={`text-sm font-medium ${colorClass.replace('bg-', 'text-')} mb-1`}>{title}</p>
                        <p className="text-3xl font-bold text-gray-900">
                            {typeof value === 'number' ? formatCompactNumber(value) : value}
                        </p>
                        <p className={`text-xs ${colorClass.replace('bg-', 'text-')} mt-1`}>{description}</p>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
