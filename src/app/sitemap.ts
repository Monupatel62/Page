import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/content/posts";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [{url:base,lastModified:new Date(),changeFrequency:"daily",priority:1},...getPublishedPosts().map((post)=>({url:base + "/posts/" + post.slug,lastModified:new Date(post.updatedAt || post.publishedAt),changeFrequency:"monthly" as const,priority:0.7}))];
}
