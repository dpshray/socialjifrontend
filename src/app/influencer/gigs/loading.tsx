export default function GigsCardSkeleton() {
    return (
        <div className="max-w-md mx-auto">
            <div className="rounded-xl border-[1px] border-gray-300 bg-white p-4 overflow-hidden w-[350px] animate-pulse">
                {/* Image Skeleton */}
                <div className="relative rounded-2xl overflow-hidden mb-4 h-[200px] bg-gray-200"></div>

                {/* Status Badge Skeleton */}
                <div className="absolute top-0 left-0 bg-gray-300 h-5 w-20 rounded-md"></div>

                {/* Badge Skeletons */}
                <div className="flex justify-end gap-2 mb-4">
                    <div className="h-6 w-12 bg-gray-200 rounded-md"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded-md"></div>
                    <div className="h-6 w-12 bg-gray-200 rounded-md"></div>
                </div>

                {/* Title Skeleton */}
                <div className="h-6 bg-gray-300 rounded-md mb-2 w-3/4"></div>

                {/* Features Skeleton */}
                <div className="flex flex-wrap gap-2 mb-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-md"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded-md"></div>
                    <div className="h-5 w-14 bg-gray-200 rounded-md"></div>
                </div>

                {/* Description Skeleton */}
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-full"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-2 w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded-md mb-4 w-3/4"></div>

                {/* Buttons Skeleton */}
                <div className="flex gap-2">
                    <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded-lg"></div>
                </div>
            </div>
        </div>
    );
}
