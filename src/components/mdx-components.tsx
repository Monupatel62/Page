import type { MDXComponents } from "mdx/types";
import { VideoEmbed } from "./video-embed";
import { ImageFigure, ImageGallery } from "./content-images";
import { Callout } from "./callout";
export const mdxComponents: MDXComponents = {
  VideoEmbed, ImageFigure, ImageGallery, Callout,
  img: (props) => {
    const { src, alt = "", title } = props;
    if (typeof src !== "string") return null;
    return <ImageFigure src={src} alt={String(alt)} caption={typeof title === "string" ? title : undefined} />;
  },
  a: ({ href, children, ...props }) => <a href={href} {...props} target={typeof href === "string" && href.startsWith("http") ? "_blank" : undefined} rel={typeof href === "string" && href.startsWith("http") ? "noreferrer noopener" : undefined}>{children}</a>
};
