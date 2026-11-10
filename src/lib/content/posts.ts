import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { postFrontmatterSchema } from "./schema";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function readingTime(source: string) {
  const words = source.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

function readPost(filename: string) {
  const slug = filename.replace(/\.mdx$/i, "");
  if (!SLUG_PATTERN.test(slug)) return null;

  const parsed = matter(fs.readFileSync(path.join(POSTS_DIR, filename), "utf8"));
  const checked = postFrontmatterSchema.safeParse(parsed.data);
  if (!checked.success) {
    console.error("Invalid frontmatter:", filename, checked.error.flatten());
    return null;
  }

  for (const [field, value] of [["coverImage", checked.data.coverImage]] as const) {
    if (value && (!value.startsWith("/media/images/") || value.includes(".."))) {
      console.error(`${field} must be a safe /media/images/ path:`, filename);
      return null;
    }
    if (value && !fs.existsSync(path.join(process.cwd(), "public", value.slice(1)))) {
      console.error(`${field} file does not exist:`, filename, value);
      return null;
    }
  }

  return { metadata: checked.data, slug, source: parsed.content };
}

function filenames() {
  return fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((name) => name.endsWith(".mdx")).sort()
    : [];
}

export function getPublishedPosts() {
  return filenames()
    .map(readPost)
    .filter((post): post is NonNullable<typeof post> => Boolean(post && post.metadata.status === "published"))
    .map(({ metadata, slug, source }) => ({ ...metadata, slug, readingTime: readingTime(source) }))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPublishedPost(slug: string) {
  if (!SLUG_PATTERN.test(slug)) return null;
  const filename = `${slug}.mdx`;
  if (!filenames().includes(filename)) return null;

  const post = readPost(filename);
  if (!post || post.metadata.status !== "published") return null;

  // Keep the detail-page shape consistent with getPublishedPosts().
  return {
    ...post.metadata,
    slug: post.slug,
    source: post.source,
    readingTime: readingTime(post.source),
  };
}

export function getPostCategories() {
  return [...new Set(getPublishedPosts().map((post) => post.category))].sort((a, b) => a.localeCompare(b));
}

export function getRelatedPosts(slug: string, category: string, limit = 3) {
  return getPublishedPosts().filter((post) => post.slug !== slug && post.category === category).slice(0, limit);
}
