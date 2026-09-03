# Blog Post V2 Template — MODX Reference

New blog posts use the **`blog-post-v2`** template. Existing posts stay on the old blog template — nothing changes for them.

Design source: [Figma — /blog-post](https://www.figma.com/design/6ulsgbSfy4Fl1PzF7spduc/ISARA-Web-Pages--Dev---Current-?node-id=1934-544)

---

## How it works with MODX

### 1. Create the `blog-post-v2` template

Duplicate your existing blog template and rename it `blog-post-v2`. The structure is identical:

```html
<!doctype html>
<html lang="en">
<head>
<base href="[[!++site_url]]" />
<title>[[*longtitle]] - [[++site_name]]</title>
[[!$HEAD-META?]]
[[!$HEAD-OG?]]
[[!$HEAD-CSS?]]
[[!$HEAD-SCRIPTS?]]
[[SchemaBreadcrumbsJSON?]]
</head>
<body>
[[$MAIN-NAVIGATION?]]
<main data-fred-dropzone="content" data-fred-min-height="600px" role="main">
    [[*content]]
</main>
[[$MAIN-FOOTER?]]
[[$MAIN-FOOTER-SCRIPTS?]]
</body>
</html>
```

**No changes** to HEAD-CSS, HEAD-SCRIPTS, NAV, or FOOTER chunks. Everything stays the same because all CSS/JS for blog-post-v2 is **inline inside the content sections** (scoped under `.bpv2`), just like `contact.html` does.

### 2. All styles are scoped — no conflicts

Every CSS class starts with `bpv2-` and all rules are scoped under `.bpv2`. This means:

- ✅ No conflict with existing blog template styles
- ✅ No need to edit HEAD-CSS or add external CSS files
- ✅ Styles travel with the content when pasted into Fred

### 3. Copy sections into Fred SECTION elements

Open `blog-post.html` and copy each section one at a time into a **Fred → SECTION** element.

---

## Section-by-section guide

### Section 1: Hero
**Fred element:** SECTION

Copy the `<section class="bpv2-hero">...</section>` block.

In MODX, change the hero image `src` to your blog featured image TV:
```html
<img src="[[*blog_featured_image]]" alt="" width="1280" height="424" />
```

Replace title, author, date with MODX placeholders or edit in Fred.

---

### Section 2: Topic Chips (optional)
**Fred element:** SECTION

Copy the `<section class="bpv2-topics">...</section>` block.

Delete this entire section if the post doesn't need skim/SEO points.

---

### Section 3: Contents + Article
**Fred element:** SECTION

Copy the `<section class="bpv2-body">...</section>` block.

This is the main content area. The **article body** goes into the TinyMCE rich text editor.

**Important:** Keep the TOC sidebar links in sync with article H2 IDs:

| Sidebar link | Article heading |
|---|---|
| `<a href="#intro">Intro</a>` | `<h2 id="intro">Intro</h2>` |
| `<a href="#main-heading">Main Heading</a>` | `<h2 id="main-heading">Main Heading</h2>` |

**Article building blocks** (use these CSS classes in TinyMCE source mode):

| Class | Use for |
|-------|---------|
| `bpv2-article__definition` | Opening definition block |
| `bpv2-article__lead` | Lead paragraph |
| `bpv2-article__list` | Diamond-bullet list |
| `bpv2-article__callout` | Highlighted quote/definition box |
| `bpv2-article__table-wrap` | Data table |
| `bpv2-article__grid` | 2×2 scannable grid |
| `bpv2-article__faq` + `bpv2-faq-item` | FAQ accordion |

---

### Section 4: CTA + Related Posts
**Fred element:** SECTION

Copy the `<section class="bpv2-cta">...</section>` block.

For production, replace static cards with `getResources`:
```
[[getResources?
  &parents=`BLOG_PARENT_ID`
  &tpl=`blogRelatedCardV2Tpl`
  &limit=`3`
  &sortby=`publishedon`
  &sortdir=`DESC`
  &includeTVs=`1`
]]
```

---

### The `<style>` and `<script>` blocks

The `<style>` block at the top and `<script>` block at the bottom of `blog-post.html` **must be included** in your MODX content. Two options:

**Option A (recommended):** Paste the `<style>` block as the **first Fred SECTION** (before the hero). Paste the `<script>` block as the **last Fred SECTION** (after the CTA). This keeps everything self-contained in Fred content.

**Option B:** Create two MODX chunks (`blog-post-v2-css` and `blog-post-v2-js`) and include them in the template's HEAD-CSS and FOOTER-SCRIPTS **only when** using blog-post-v2 template:
```
[[*template:is=`blog-post-v2`:then=`[[$blog-post-v2-css]]`]]
```

---

## Files in this repo

| File | Role |
|------|------|
| `blog-post.html` | Complete page with inline CSS/JS — copy sections into Fred |
| `docs/blog-post-modx.md` | This reference document |

---

## Local preview

```bash
npx vite
# open http://localhost:5173/blog-post.html
```

---

## Checklist for each new post

- [ ] Created under **Collections → Blog → New Page**
- [ ] Template set to **blog-post-v2** (not the old blog template)
- [ ] Title, slug, and publish date set
- [ ] `<style>` block included (Option A or B above)
- [ ] Hero section pasted, featured image updated
- [ ] Topic chips pasted (or omitted)
- [ ] Article section pasted, TOC links ↔ heading IDs match
- [ ] CTA + related posts section pasted (or wired with `getResources`)
- [ ] `<script>` block included (Option A or B above)
- [ ] Previewed on staging, then published
