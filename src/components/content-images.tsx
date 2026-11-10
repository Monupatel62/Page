import Image from "next/image";
type ImageFigureProps = { src: string; alt: string; caption?: string; width?: number; height?: number };
export function ImageFigure({ src, alt, caption, width = 1600, height = 900 }: ImageFigureProps) {
  if (!src || (!src.startsWith("/media/images/") && !src.startsWith("https://"))) return null;
  return <figure><Image src={src} alt={alt || "Article image"} width={width} height={height} sizes="(max-width: 820px) 100vw, 820px" unoptimized={!src.startsWith("/")} />{caption ? <figcaption>{caption}</figcaption> : null}</figure>;
}
type GalleryImage = { src: string; alt: string; caption?: string };
export function ImageGallery({ images, columns = 2 }: { images: GalleryImage[]; columns?: 2 | 3 }) {
  if (!Array.isArray(images) || images.length === 0) return null;
  return <div className="my-8 grid gap-3" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>{images.map((item,index) => <ImageFigure key={item.src + index} {...item} width={900} height={900} />)}</div>;
}
