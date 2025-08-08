'use client'

import {Card} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {LucideIcon, TrendingDown, TrendingUp} from 'lucide-react'
import {cn} from '@/lib/utils'
import {memo} from 'react'

type InsightStatCardProps = {
    icon: React.ElementType | LucideIcon
    label: string
    value: string | number
    percentageChange: number
    description?: string
}

function InsightStatCardComponent({
                                      icon: Icon,
                                      label,
                                      value,
                                      percentageChange,
                                      description = 'vs last month',
                                  }: InsightStatCardProps) {
    const isPositive = percentageChange >= 0

    return (
        <Card className="glass-card border-0 p-6 w-full">
            <div className="flex items-center justify-between mb-4">
                <div
                    className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white"/>
                </div>
                <Badge
                    className={cn(
                        'border',
                        isPositive
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                    )}
                >
                    {isPositive ? <TrendingUp className="w-3 h-3 mr-1"/> : <TrendingDown className="w-3 h-3 mr-1"/>}
                    {percentageChange > 0 ? `+${percentageChange}%` : `${percentageChange}%`}
                </Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
            <div className="text-sm text-slate-500">{label}</div>
            <div className="text-xs text-slate-400 mt-2">{description}</div>
        </Card>
    )
}

const InsightStatCard = memo(InsightStatCardComponent)

export default InsightStatCard
