import { DBImage } from "@/lib/db/schema";
import { ImageCard } from "./image-card";

export const ImageList = ({ images }: { images: DBImage[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
      {images.map((i) => (
        <ImageCard key={i.id} image={i} similarity={i.similarity} />
      ))}
    </div>
  );
};
