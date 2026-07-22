import { cn } from "@/lib/utils";

interface ProductSkeletonProps {
  className?: string;
}

export function ProductSkeleton({ className }: ProductSkeletonProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-[4px] border border-[#D4DFDC] bg-white",
        className
      )}
    >
      {/* Skeleton Image Area */}
      <div className="relative h-56 w-full animate-pulse bg-slate-100 sm:h-60 md:h-52 lg:h-56">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-32 w-32 rounded bg-slate-200" />
        </div>
      </div>

      {/* Skeleton Content Area */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Title */}
        <div className="mb-3 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="mb-4 h-5 w-1/2 animate-pulse rounded bg-slate-200" />
        
        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-slate-100" />
        </div>
      </div>
    </article>
  );
}
