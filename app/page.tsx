import { CardGridSkeleton } from "@/components/card-grid-skeleton";
import { ImageList } from "@/components/image-list";
import { SearchBox } from "@/components/search-box";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <main className="p-8 space-y-8">
      <h1 className="font-medium text-2xl">Semantic Image Search</h1>
      <SearchBox query={searchParams.q} />
      <Suspense
        fallback={<CardGridSkeleton />}
        key={JSON.stringify(searchParams)}
      >
        <ImageList query={searchParams.q} />
      </Suspense>
    </main>
  );
}
