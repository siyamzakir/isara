# Blog Post Template — MODX Reference

Use this when creating a **new blog post** for ISARA. New posts go in the existing MODX **Blog** collection (separate blog template), not as one-off marketing pages.

Local Vite preview only lives in this repo. Production content is pasted into MODX Manager.

---

## What the post layout includes

| Feature | Behavior |
|---------|----------|
| **Contents sidebar** | Left rail of in-page anchor links. Click → jump to that heading on the **same** post. Sticky on desktop; collapsible on mobile. Active section gets a red left marker while scrolling. |
| **Article body** | Headings, lists, images, callouts, tables, optional FAQ accordion. |
| **Related posts** | Dark section at the bottom with three cards + **View All Articles**. In MODX, replace static cards with `getResources` when ready. |

Do **not** rebuild these as a custom page template outside Collections → Blog.

---

## Files in this repo

| File | Role |
|------|------|
| `blog-post.html` | Individual post page markup (hero, Contents, article, related posts) |
| `src/css/blog.css` | Post styles (`.blog-post-*`, `.blog-toc`, `.blog-article`, `.blog-related`) |
| `src/js/blog.js` | Smooth scroll, Contents active state, FAQ accordion |
| `blog.html` | Blog **listing** page (unchanged; different from the post template) |
| `vite.config.js` | Includes `blogPost` → `blog-post.html` for build/preview |

---

## Local preview

```bash
npx vite
# open http://localhost:5173/blog-post.html
```

---

## Publish a new post in MODX

1. Open **Collections → Blog**.
2. Click **New Page**.
3. Set **Page Title**, URL alias/slug, author, and publish date (so it appears in the blog list).
4. Paste the main markup from `blog-post.html` into the page content (Fred / resource content).
5. Replace placeholder **Blog Title**, breadcrumbs, lead, and article copy with the real post.
6. Keep every Contents link in sync with article heading `id`s (see below).
7. Update related-post cards (or wire `getResources`) and share links.
8. Save and preview on staging (`isara.appszonebd.com`), then publish to production.

Nav/header/footer come from the MODX blog template — this repo only supplies the **main** content block.

---

## Contents sidebar — keep IDs in sync

Each sidebar link must match an `id` on an **H2** in the article.

**Sidebar**

```html
<a href="#intro" class="blog-toc__link">Intro</a>
<a href="#main-heading" class="blog-toc__link">Main Heading</a>
```

**Article**

```html
<h2 id="intro">Intro</h2>
<h2 id="main-heading">Main Heading</h2>
```

Rules:

- Use H2 for Contents entries; use H3 for sub-points inside a section.
- When you add, rename, or remove a section, update **both** the `href`/`id` and the link label.
- Links must be same-page anchors (`#...`), not URLs to other posts.
- Default template IDs: `#intro`, `#main-heading`, `#subheading`, `#comparison`, `#summary`.

---

## Related posts (bottom)

Static placeholder cards in `blog-post.html` point at existing posts. For production, prefer a MODX `getResources` call under the Blog parent so the three cards stay current, e.g.:

```
[[getResources?
  &parents=`BLOG_PARENT_ID`
  &tpl=`blogRelatedCardTpl`
  &limit=`3`
  &sortby=`publishedon`
  &sortdir=`DESC`
  &includeTVs=`1`
]]
```

Adjust parent ID and chunk name to match the live site.

---

## Checklist for each new post

- [ ] Created under **Collections → Blog → New Page** (not a random resource)
- [ ] Title, slug, and publish date set
- [ ] Markup from `blog-post.html` pasted and content replaced
- [ ] Contents links ↔ heading `id`s match
- [ ] Related posts updated (or `getResources` wired)
- [ ] Previewed on staging, then published

---

## Cursor tip

In Cursor, open this file (`docs/blog-post-modx.md`) or `@`-mention it when asking for a new blog post so the agent follows the Blog collection template, Contents sidebar, and related-posts pattern.
