import Link from "next/link";
export default function NotFound() {
  return <div className="container py-28 text-center"><p className="eyebrow">404 · Not found</p><h1 className="mt-4 text-5xl font-extrabold tracking-tight">This page is missing.</h1><p className="mt-4 text-[var(--muted)]">The story may be unpublished or the link may be incorrect.</p><Link href="/" className="mt-8 inline-flex rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-[var(--background)]">Back to Page</Link></div>;
}
