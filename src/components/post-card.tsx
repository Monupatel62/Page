import Link from "next/link";
import { CalendarDays, Clock3 } from "lucide-react";
import type { PostSummary } from "@/lib/content/schema";
export function PostCard({ post }: { post: PostSummary }) {
  const date = new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(post.publishedAt));
  return <article className="post-card">
    <Link href={`/posts/${post.slug}`} className="post-cover" aria-label={`Read ${post.title}`}>
      {post.coverImage ? <img src={post.coverImage} alt={post.coverAlt || post.title} loading="lazy" /> : <span className="cover-placeholder">P.</span>}
    </Link>
    <div className="post-card-body"><div className="post-kicker"><span className="category-label">{post.category}</span><span>·</span><span className="inline-flex items-center gap-1"><CalendarDays size={12} />{date}</span></div>
      <h2><Link href={`/posts/${post.slug}`}>{post.title}</Link></h2><p>{post.description}</p>
      <div className="post-tags"><span className="tag inline-flex items-center gap-1"><Clock3 size={11} />{post.readingTime} min read</span>{post.tags.slice(0,2).map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
    </div>
  </article>;
}
