import { CardGridSkeleton } from "@/components/card-grid-skeleton";
import { ImageListStreamed } from "@/components/image-list-streamed-copy";
import { getImagesStreamed } from "@/lib/db/api";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  noStore();

  return (
    <Suspense fallback={<CardGridSkeleton />}>
      <ImageList query={searchParams.q} />
    </Suspense>
  );
}

const ImageList = async ({ query }: { query?: string }) => {
  const { images, status } = await getImagesStreamed(query);

  return <ImageListStreamed images={images} status={status} />;
};
