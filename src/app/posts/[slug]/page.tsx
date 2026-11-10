import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import { mdxComponents } from "@/components/mdx-components";
import { ReadingProgress } from "@/components/reading-progress";
import { PostCard } from "@/components/post-card";
import { getPublishedPost, getPublishedPosts, getRelatedPosts } from "@/lib/content/posts";
type PageProps = { params: Promise<{slug:string}> };
export function generateStaticParams() { return getPublishedPosts().map((post) => ({slug:post.slug})); }
export async function generateMetadata({params}:PageProps):Promise<Metadata> {
  const {slug}=await params; const post=getPublishedPost(slug);
  if (!post) return {title:"Story not found"};
  return {title:post.title,description:post.description,authors:[{name:post.author}],openGraph:{type:"article",title:post.title,description:post.description,publishedTime:post.publishedAt,modifiedTime:post.updatedAt || post.publishedAt,authors:[post.author],images:post.coverImage?[{url:post.coverImage,alt:post.coverAlt || post.title}]:[]},twitter:{card:post.coverImage?"summary_large_image":"summary",title:post.title,description:post.description,images:post.coverImage?[post.coverImage]:[]}};
}
export default async function PostPage({params}:PageProps) {
  const {slug}=await params; const post=getPublishedPost(slug); if(!post) notFound();
  const related=getRelatedPosts(post.slug,post.category);
  const date=new Intl.DateTimeFormat("en",{day:"numeric",month:"long",year:"numeric"}).format(new Date(post.publishedAt));
  return <>
    <ReadingProgress />
    <article className="article-shell">
      <Link href="/" className="back-link"><ArrowLeft size={15}/> Back to all stories</Link>
      <header className="article-header"><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p className="article-description">{post.description}</p><div className="article-meta"><span>{post.author}</span><span className="inline-flex items-center gap-1"><CalendarDays size={14}/>{date}</span><span className="inline-flex items-center gap-1"><Clock3 size={14}/>{post.readingTime} min read</span></div></header>
      {post.coverImage ? <div className="article-cover"><img src={post.coverImage} alt={post.coverAlt || post.title}/></div> : null}
      <div className="article-content"><MDXRemote source={post.source} components={mdxComponents} options={{mdxOptions:{remarkPlugins:[remarkGfm,remarkMath],rehypePlugins:[rehypeSlug,[rehypeAutolinkHeadings,{behavior:"wrap"}],rehypeKatex]}}}/></div>
      <footer className="article-end"><span>Filed under {post.category}</span><Link href="/" className="back-link"><ArrowLeft size={14}/> More stories</Link></footer>
    </article>
    {related.length ? <section className="container mt-12"><div className="mb-5 flex items-end justify-between gap-4"><h2 className="text-2xl font-bold tracking-tight">More in {post.category}</h2><Link href="/" className="text-sm text-[var(--accent)]">All stories</Link></div><div className="post-grid">{related.map((item)=><PostCard key={item.slug} post={item}/>)}</div></section> : null}
  </>;
}
