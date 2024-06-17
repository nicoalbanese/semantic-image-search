"use client";

import { ImageCard } from "./image-card";
import { DBImage } from "@/lib/db/schema";
import { StreamableValue, useStreamableValue } from "ai/rsc";
import { useSearchParams } from "next/navigation";
import { NoImagesFound } from "./no-images-found";
import { useTransition } from "react";
import { ImageStreamStatus, cn } from "@/lib/utils";
import { LoadingSpinner } from "./loading-spinner";

export const ImageListStreamed = (props: {
  images: StreamableValue<DBImage[]>;
  status: StreamableValue<ImageStreamStatus>;
}) => {
  const [images] = useStreamableValue(props.images);
  const [status, , streamLoading] = useStreamableValue(props.status);

  const searchParams = useSearchParams();

  const [loading] = useTransition();

  return (
    <div className="">
      <div className={cn("", loading ? "opacity-50" : "")}>
        {images &&
        images.length === 0 &&
        loading === false &&
        streamLoading === false ? (
          <NoImagesFound query={searchParams.get("q") ?? ""} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 relative">
            {images &&
              images?.map((image) => (
                <ImageCard
                  key={"image_" + image.id}
                  image={image}
                  similarity={image.similarity}
                />
              ))}
            {loading || streamLoading ? (
              <LoadingSpinner status={status} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};