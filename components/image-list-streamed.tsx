"use client";
import React from "react";
import { ImageCard } from "./image-card";
import { DBImage } from "@/lib/db/schema";
import { StreamableValue, useStreamableValue } from "ai/rsc";

export const ImageListStreamed = ({
  images,
}: {
  images: StreamableValue<DBImage[]>;
}) => {
  const [data, error, pending] = useStreamableValue(images);
  return (
    <>
      {data
        ? data.map((i) => (
            <ImageCard key={i.id} image={i} similarity={i.similarity} />
          ))
        : null}
    </>
  );
};
