import { z } from "zod";

export const postFrontmatterSchema = z.object({
  title: z.string().trim().min(1).max(120),
  description: z.string().trim().min(1).max(260),
  publishedAt: z.iso.date(),
  updatedAt: z.iso.date().optional(),
  category: z.string().trim().min(1).max(40),
  tags: z.array(z.string().trim().min(1).max(30)).default([]),
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
  author: z.string().trim().min(1).max(60).default("Page Editorial"),
  status: z.enum(["draft", "published"]).default("draft"),
  featured: z.boolean().default(false),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;
export type PostSummary = PostFrontmatter & { slug: string; readingTime: number };
