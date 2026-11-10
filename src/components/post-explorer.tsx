"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { PostSummary } from "@/lib/content/schema";
import { PostCard } from "./post-card";
export function PostExplorer({ posts, categories }: { posts: PostSummary[]; categories: string[] }) {
  const [query,setQuery] = useState("");
  const [category,setCategory] = useState("All");
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => (category === "All" || post.category === category) && (!term || [post.title,post.description,post.category,...post.tags].join(" ").toLowerCase().includes(term)));
  },[posts,query,category]);
  return <>
    <section className="content-toolbar" aria-label="Find articles">
      <div className="search-wrap"><Search className="search-icon" size={17} /><input type="search" placeholder="Search stories, topics and tags" aria-label="Search stories" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      {categories.length ? <div className="filter-row" aria-label="Filter by category">{["All",...categories].map((item) => <button key={item} type="button" className="filter-chip" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div> : null}
    </section>
    {visible.length ? <div className="post-grid">{visible.map((post) => <PostCard key={post.slug} post={post} />)}</div> : <div className="empty-state"><h2>{posts.length ? "No matching stories" : "The first story is on its way"}</h2><p>{posts.length ? "Try another search or category." : "Published MDX articles will appear here automatically."}</p></div>}
  </>;
}
