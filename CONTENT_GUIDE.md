# Content authoring guide

All public content is stored in Git as MDX. There is deliberately no CMS, login, upload form, public write API, or database. A maintainer adds or updates files, reviews the change, and merges it. Treat MDX as trusted source code: only repository maintainers may write it. The renderer blocks dangerous JavaScript patterns as a defence-in-depth measure, but this is not a sandbox for untrusted uploads.

## Add an article
Create a lowercase kebab-case file in `content/posts/`. Its filename becomes the URL slug.

```mdx
---
title: "How AI Simulation Helps Train Robots"
description: "A short summary for the home page and search results."
publishedAt: "2026-11-10"
updatedAt: "2026-11-10"
category: "Technology"
tags: ["AI", "Robotics"]
coverImage: "/media/images/robotics-cover.webp"
coverAlt: "A robotic arm handling a small component"
author: "Page Editorial"
status: "draft"
featured: false
---

Write the article using Markdown and MDX.

## A section heading
Add paragraphs, lists, links, tables, quotes and code blocks.
```

Keep status as draft while editing. Change it to published only after review. Drafts are excluded from listings, public article routes and the sitemap.

## Images
Put files in `public/media/images/`. Prefer WebP or AVIF for photographs. Reference them with Markdown:

```mdx
![A clear description](/media/images/robotics-cover.webp)

<ImageFigure src="/media/images/robotics-detail.webp" alt="Close-up of a robotic gripper" caption="A close-up view" />
```

For a gallery:

```mdx
<ImageGallery columns={2} images={[
  { src: "/media/images/robot-01.webp", alt: "Robot arm from the side" },
  { src: "/media/images/robot-02.webp", alt: "Robot holding a component" }
]} />
```

## Videos
Store small video files in `public/media/videos/` and poster images in `public/media/posters/`.

```mdx
<VideoEmbed src="/media/videos/robot-demo.mp4" title="Robot demonstration" poster="/media/posters/robot-demo.webp" caption="A short demonstration" />
```

Direct MP4, WebM and OGG files are supported. For long or high-bitrate videos, use a video host instead of committing huge files to Git.

YouTube and Vimeo links are converted to player embeds. HTTPS links on `wohotech.in` subdomains are embedded directly when the provider permits framing. Other external URLs show a link card with an option to open the video on its source site.

For WoHoPlay, paste its complete public HTTPS video/post URL into `src`:

```mdx
<VideoEmbed src="https://play.wohotech.in/your-public-video-link" title="Video title" caption="Optional caption" />
```

If WoHoPlay allows iframe embedding, the video plays inline. If the provider blocks framing, visitors can still open the original link in a new tab.

## Callouts
```mdx
<Callout tone="tip" title="Quick tip">
  Keep captions short and explain why the media matters.
</Callout>
```

Tones: note, tip, warning. GitHub Flavored Markdown tables, task lists, strikethrough and fenced code are supported. Math is rendered with KaTeX.

## Publishing checklist
- Filename is unique lowercase kebab-case.
- Title, description and publishedAt are valid.
- Cover and media files exist in the correct folders.
- Images have useful alt text.
- Video links use HTTPS and are publicly viewable.
- Links and embeds have been checked.
- status is changed to published only after review.
- Run content check, type check, lint and production build.

## Local development
```bash
npm install
cp .env.example .env.local
npm run dev
```

Before pushing, run `npm run validate` and `npm run build`.

## Publishing workflow
1. Create a branch.
2. Add or update MDX and media files.
3. Run validation.
4. Open a pull request.
5. Check the rendered preview and media.
6. Merge to publish.

Only people with repository write access can change published content. GitHub permissions and the deployment workflow control this; the site has no login system.
