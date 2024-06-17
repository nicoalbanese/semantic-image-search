"use client";
import React from "react";
import { ImageCard } from "./image-card";
import { DBImage } from "@/lib/db/schema";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { SkeletonCard } from "./card-grid-skeleton";
import { ImageStreamStatus } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";
import { useSearchParams } from "next/navigation";
import { NoImagesFound } from "./no-images-found";

export const ImageListStreamed = ({
  images,
  status,
}: {
  images: StreamableValue<DBImage[]>;
  status: StreamableValue<ImageStreamStatus>;
}) => {
  const [data, _, loading] = useStreamableValue(images);
  const [streamStatus] = useStreamableValue(status);
  const searchParams = useSearchParams();

  if (data && data.length === 0 && loading === false)
    return <NoImagesFound query={searchParams.get("q") ?? ""} />;
  return (
    <div>
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
        {searchParams.get("q") && streamStatus ? (
          <LoadingSpinner status={streamStatus} />
        ) : null}
        {data
          ? data.map((i) => (
              <ImageCard
                key={"image_" + i.id}
                image={i}
                similarity={i.similarity}
              />
            ))
          : null}
        {loading
          ? new Array(16).fill("").map((_, i) => <SkeletonCard key={i} />)
          : null}
      </div>
    </div>
  );
};
