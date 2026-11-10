import { ExternalLink, Play } from "lucide-react";
function details(source: string): { kind: "file" | "embed" | "external"; url: string } {
  let parsed: URL;
  try { parsed = new URL(source); } catch { return { kind: "external", url: source }; }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return { kind: "external", url: "#" };
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  if (["youtu.be","youtube.com","m.youtube.com"].includes(host)) {
    const id = host === "youtu.be" ? parsed.pathname.slice(1) : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean).at(-1);
    return id ? { kind: "embed", url: "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) } : { kind: "external", url: source };
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean).at(-1);
    return id ? { kind: "embed", url: "https://player.vimeo.com/video/" + encodeURIComponent(id) } : { kind: "external", url: source };
  }
  if (/\.(mp4|webm|ogg)(?:$|\?)/i.test(parsed.pathname + parsed.search)) return { kind: "file", url: source };
  if (host === "wohotech.in" || host.endsWith(".wohotech.in")) return { kind: "embed", url: source };
  return { kind: "external", url: source };
}
export function VideoEmbed({ src, title = "Video", poster, caption }: { src: string; title?: string; poster?: string; caption?: string }) {
  const video = details(src);
  if (video.kind === "external" && video.url === "#") return null;
  return <div>
    <div className="media-frame">
      {video.kind === "file" ? <video controls preload="metadata" playsInline poster={poster}><source src={video.url} />Your browser does not support HTML video.</video>
      : video.kind === "embed" ? <iframe src={video.url} title={title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      : <a href={video.url} target="_blank" rel="noreferrer noopener" className="flex aspect-video flex-col items-center justify-center gap-3 bg-neutral-950 text-white"><span className="grid size-14 place-items-center rounded-full bg-white/15"><Play size={24} fill="currentColor" /></span><span className="text-sm font-semibold">Open video to watch</span></a>}
    </div>
    {caption ? <p className="media-caption">{caption}</p> : null}
    <a className="media-open" href={src} target="_blank" rel="noreferrer noopener"><ExternalLink size={14} /><span className="ml-2">Open video in a new tab</span></a>
  </div>;
}
