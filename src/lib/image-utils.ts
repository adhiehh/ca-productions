export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const getImageUrl = (path: string, width?: number) => {
  // Use Vercel Image Optimization API in production
  if (import.meta.env.PROD) {
    const params = new URLSearchParams({ url: path });
    if (width) params.set("w", width.toString());
    params.set("q", "85");
    return `/_vercel/image?${params}`;
  }
  return path;
};

export const getResponsiveImageSrcSet = (src: string) => {
  const sizes = [640, 1024, 1280, 1920];
  return sizes.map((size) => `${getImageUrl(src, size)} ${size}w`).join(", ");
};

export const imageSizes =
  "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 1280px";
