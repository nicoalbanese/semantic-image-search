import { ImageList } from "@/components/image-list";
import { SearchBox } from "@/components/search-box";
import { SearchQuery } from "@/components/search-query";
import { getImages } from "@/lib/db/api";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const images = await getImages(searchParams.q);
  return (
    <main className="p-8 space-y-8">
      <h1 className="font-medium text-2xl">Semantic Image Search</h1>
      <SearchBox query={searchParams.q} />
      <SearchQuery query={searchParams.q} />
      <Suspense fallback={<div>loading...</div>}>
        <ImageList images={images} />
      </Suspense>
    </main>
  );
}
