import { readStreamableValue } from "ai/rsc";
import { ImageCard } from "./image-card";
import { getImages, getImagesStreamed } from "@/lib/db/api";
import { ImageListStreamed } from "./image-list-streamed";

export const ImageList = async ({ query }: { query?: string }) => {
  // const semanticImages = await getImagesSemantic(query);
  const images = await getImagesStreamed(query);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      <ImageListStreamed images={images} />
    </div>
  );
};
