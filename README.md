# Page

A developer-managed, MDX-powered publishing platform built with Next.js.

## Included
- MDX files in `content/posts/*.mdx`; only published entries appear.
- Home-page listing, search, category filters and individual article routes.
- Local image galleries, local video files, YouTube, Vimeo and WoHoPlay link support.
- Metadata, Open Graph, sitemap, robots.txt and content validation.
- GitHub Actions checks for content, types, lint and production build.

## Intentionally excluded
No login, signup, authentication, CMS, database, public upload form, upload API, admin dashboard, user-generated posts or comments. Content is changed by maintainers through GitHub commits and pull requests.

## Quick start
Node.js 22 and npm 10+:
```bash
npm install
cp .env.example .env.local
npm run dev
```
Open http://localhost:3000.

## Content and media
Create MDX files in `content/posts/`. Keep drafts at `status: draft`; set `status: published` after review.
- `public/media/images/` — covers and article images
- `public/media/videos/` — small local video files
- `public/media/posters/` — video poster images

See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for the authoring reference.

## Validation
```bash
npm run content:check
npm run type-check
npm run lint
npm run build
```

## Deployment
Deploy as a standard Next.js Node.js application. Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS origin. No database or auth secrets are needed.
