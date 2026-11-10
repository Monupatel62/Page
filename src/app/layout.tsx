import type { Metadata, Viewport } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Page — Ideas, stories and updates", template: "%s | Page" },
  description: "Articles, stories and updates published by the Page team.",
  applicationName: "Page",
  openGraph: { type: "website", siteName: "Page", title: "Page — Ideas, stories and updates", description: "Articles, stories and updates published by the Page team." },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{media:"(prefers-color-scheme: light)",color:"#f7f7f5"},{media:"(prefers-color-scheme: dark)",color:"#101113"}] };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body><SiteHeader /><main className="site-main">{children}</main><SiteFooter /></body></html>;
}
