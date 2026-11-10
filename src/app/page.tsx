import { PostExplorer } from "@/components/post-explorer";
import { getPostCategories, getPublishedPosts } from "@/lib/content/posts";
export default function HomePage() {
  const posts = getPublishedPosts();
  return <div className="container"><section className="hero"><span className="eyebrow">The Page journal</span><h1>Ideas worth<br />spending time with.</h1><p>Stories, explainers and updates, published by the team. Explore the latest writing below.</p></section><PostExplorer posts={posts} categories={getPostCategories()} /></div>;
}
