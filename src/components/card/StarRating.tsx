'use client';

import * as React from 'react';
import {Star} from 'lucide-react';
import {cn} from '@/lib/utils';

export type StarRatingProps = {
    rating?: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
};

const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
};

export function StarRating({
                               rating = 5,
                               max = 5,
                               size = 'md',
                               className,
                           }: StarRatingProps) {
    const filledStars = Math.round(rating);

    return (
        <div
            className={cn(
                'flex items-center gap-1 transition-colors',
                'rounded-lg px-2 py-1',
                'bg-white/60 dark:bg-zinc-900/50',
                className
            )}
            role="img"
            aria-label={`${rating} out of ${max} stars`}
        >
            {Array.from({length: max}).map((_, index) => (
                <Star
                    key={index}
                    className={cn(
                        'transition-all duration-200 ease-in-out',
                        starSizes[size],
                        index < filledStars
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                    )}
                    aria-hidden="true"
                />
            ))}
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
        {rating.toFixed(1)}
      </span>
        </div>
    );
}
