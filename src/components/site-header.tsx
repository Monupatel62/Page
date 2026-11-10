import Link from "next/link";
export function SiteHeader() {
  return <header className="site-header"><div className="container header-inner"><Link href="/" className="brand" aria-label="Page home"><span className="brand-mark">P.</span><span>Page</span></Link><span className="header-note">Stories, ideas &amp; updates</span></div></header>;
}
