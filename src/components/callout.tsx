import type { ReactNode } from "react";
export function Callout({ title, children, tone = "note" }: { title?: string; children: ReactNode; tone?: "note" | "tip" | "warning" }) {
  return <aside className="callout" data-tone={tone}><strong>{title || (tone === "tip" ? "Tip" : tone === "warning" ? "Please note" : "Note")}</strong><div>{children}</div></aside>;
}
