"use client";

import { ImageCard } from "./image-card";
import { DBImage } from "@/lib/db/schema";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { useSearchParams } from "next/navigation";
import { NoImagesFound } from "./no-images-found";

export const ImageListStreamed = ({
  images,
}: {
  images: StreamableValue<DBImage[]>;
}) => {
  const [data, _, loading] = useStreamableValue(images);
  const searchParams = useSearchParams();

  if (
    data &&
    data.length === 0 &&
    loading === false &&
    searchParams.get("stale") === null
  )
    return <NoImagesFound query={searchParams.get("q") ?? ""} />;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {data
          ? data.map((i) => (
              <ImageCard
                key={"image_" + i.id}
                image={i}
                similarity={i.similarity}
              />
            ))
          : null}
      </div>
    </div>
  );
};
