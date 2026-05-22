import Masonry from "react-masonry-css";
import { imageSizes } from "@/lib/image-utils";

interface MasonryGalleryProps {
  images: string[];
  projectName: string;
}

export default function MasonryGallery({ images, projectName }: MasonryGalleryProps) {
  const breakpointColumns = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="masonry-grid"
      columnClassName="masonry-grid-column"
    >
      {images.map((src: string, i: number) => (
        <img
          key={src}
          src={src}
          alt={`${projectName} ${i + 1}`}
          loading="lazy"
          sizes={imageSizes}
          className="w-full rounded-lg object-cover transition-shadow duration-300 hover:shadow-lg cursor-pointer"
        />
      ))}
    </Masonry>
  );
}
