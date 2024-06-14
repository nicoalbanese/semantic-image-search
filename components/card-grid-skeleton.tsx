import { Skeleton } from "@/components/ui/skeleton";

export function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {new Array(20).fill("").map((i) => (
        <SkeletonCard />
      ))}
    </div>
  );
}
export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="min-h-[25ch] min-w-[25ch] rounded-xl" />
    </div>
  );
}
