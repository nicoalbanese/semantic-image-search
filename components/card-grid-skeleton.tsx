import { Skeleton } from "@/components/ui/skeleton";

export function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {new Array(16).fill("").map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-72 min-w-48 rounded-xl" />
    </div>
  );
}
