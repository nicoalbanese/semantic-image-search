import { getImagesStreamed } from "@/lib/db/api";
import { ImageListStreamed } from "./image-list-streamed";

export const ImageList = async ({ query }: { query?: string }) => {
  const { images, status } = await getImagesStreamed(query);

  return <ImageListStreamed images={images} status={status} />;
};
