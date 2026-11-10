import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { postFrontmatterSchema } from "../src/lib/content/schema";

const root = process.cwd();
const directory = path.join(root, "content", "posts");
const publicDirectory = path.join(root, "public");
const files = fs.existsSync(directory)
  ? fs.readdirSync(directory).filter((file) => file.endsWith(".mdx")).sort()
  : [];
const seenSlugs = new Set<string>();
let errors = 0;

function checkMediaReference(reference: string, file: string) {
  if (!reference.startsWith("/media/")) return;
  if (!/^\/media\/(images|videos|posters)\/[A-Za-z0-9._/-]+$/.test(reference) || reference.includes("..")) {
    console.error("Unsafe media path:", file, reference);
    errors++;
    return;
  }
  const absolute = path.resolve(publicDirectory, reference.slice(1));
  if (!absolute.startsWith(publicDirectory + path.sep) || !fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) {
    console.error("Media file does not exist:", file, reference);
    errors++;
  }
}

for (const file of files) {
  const slug = file.replace(/\.mdx$/i, "");
  const normalizedSlug = slug.toLowerCase();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    console.error("Invalid slug:", file);
    errors++;
  }
  if (seenSlugs.has(normalizedSlug)) {
    console.error("Duplicate slug (case-insensitive):", file);
    errors++;
  }
  seenSlugs.add(normalizedSlug);

  const parsed = matter(fs.readFileSync(path.join(directory, file), "utf8"));
  const result = postFrontmatterSchema.safeParse(parsed.data);
  if (!result.success) {
    console.error("Invalid frontmatter:", file, result.error.issues);
    errors++;
    continue;
  }

  if (result.data.coverImage) checkMediaReference(result.data.coverImage, file);
  if (result.data.coverImage && !result.data.coverAlt?.trim()) {
    console.error("Cover image requires descriptive coverAlt:", file);
    errors++;
  }

  const mediaPattern = /(?:src|poster)\s*=\s*["']([^"']+)["']|\]\((\/media\/[^)\s]+)\)/g;
  for (const match of parsed.content.matchAll(mediaPattern)) {
    const reference = match[1] || match[2];
    if (reference) checkMediaReference(reference, file);
  }

  console.log((result.data.status === "published" ? "✓ published: " : "• draft: ") + slug);
}

if (errors) {
  console.error(`Content check failed: ${errors} issue(s).`);
  process.exit(1);
}
console.log(`Content check passed. ${files.length} MDX file(s) checked.`);
