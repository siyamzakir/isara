# Blog Post V2 Template — MODX Reference

New blog posts use the **`blog-post-v2`** template. Existing posts stay on the old blog template — nothing changes for them.

Design source: [Figma — /blog-post](https://www.figma.com/design/6ulsgbSfy4Fl1PzF7spduc/ISARA-Web-Pages--Dev---Current-?node-id=1934-544)

---

## Developer setup

One-time MODX configuration, chunk maintenance, and starter HTML for the first v2 post.

### Option B — CSS/JS in MODX chunks

#### Step 1 — Create MODX chunks

| Chunk name | Paste from repo file |
|---|---|
| `blog-post-v2-css` | `modx/chunks/blog-post-v2-css.html` |
| `blog-post-v2-js` | `modx/chunks/blog-post-v2-js.html` |

#### Step 2 — Create `blog-post-v2` template

Duplicate your existing blog template. Add the chunks to your shared head/footer chunks **only for this template**:

**In `$HEAD-CSS` chunk (or directly in blog-post-v2 template `<head>`):**
```
[[*template:is=`blog-post-v2`:then=`[[$blog-post-v2-css]]`]]
```

**In `$MAIN-FOOTER-SCRIPTS` chunk (or before `</body>`):**
```
[[*template:is=`blog-post-v2`:then=`[[$blog-post-v2-js]]`]]
```

Template body stays the same:
```html
<main data-fred-dropzone="content" data-fred-min-height="600px" role="main">
    [[*content]]
</main>
```

#### Step 3 — Wrap content in `.bpv2`

The first block in `[[*content]]` should open the wrapper:
```html
<div class="bpv2">
```
The last block should close it:
```html
</div>
```

All sections (hero, article, CTA) go **inside** this wrapper so scoped CSS applies.

#### Step 4 — Paste starter HTML into the first v2 post

Copy sections from `blog-post.html` (or Fred SECTION blocks) into the first post’s **Content** field:

| Section | Repo file / location | Notes |
|---|---|---|
| **1. Hero** | `blog-post.html` → SECTION 1 | Wire `[[*blog_featured_image]]` TV on hero `<img>` |
| **2. Contents + article** | `blog-post.html` → SECTION 3 | Keep TOC link ids in sync with H2 ids |
| **3A. CTA header** | `modx/chunks/blog-post-v2-section-4a-cta.html` | Buttons fixed to Figma |
| **3B. Related posts** | `blog-post.html` → SECTION 4B | Wire `getResources` later |

Hero image (set once in starter HTML):

```html
<img src="[[*blog_featured_image]]" alt="" width="1280" height="424" />
```

Writers duplicate this post for all future articles — no re-paste per post.

---

### Section 4A — CTA buttons (Figma)

Use these classes (not generic `isara-btn`):

| Element | Class | Style |
|---|---|---|
| Red demo button | `bpv2-cta__btn-primary` | Red `#ec1c24`, Roboto Mono 14px, rounded 7px |
| Text links | `bpv2-cta__link` | White underline + red arrow (`arrow-down.svg` rotated) |
| Card Read More | `bpv2-card__link` | Same arrow link style on dark cards |

**Default URLs:**

| Label | URL |
|---|---|
| Book Your Quantum Readiness Demo | `/company/contact-us.html` |
| Explore Cryptographic Posture Management Solutions | `/solutions.html` |
| Build a Complete Cryptographic Inventory | `/products/isara-advance-cryptographic-inventory-and-risk-assessment-tool.html` |
| Deploying Quantum-Safe Cryptography Across Environments | `/products/isara-radiate-quantum-safe-toolkit.html` |

Copy-ready HTML: `modx/chunks/blog-post-v2-section-4a-cta.html`

---

### Contents sidebar — keep IDs in sync

Each sidebar link must match an `id` on an **H2** in the article.

```html
<!-- Sidebar -->
<a href="#intro" class="bpv2-toc__link">Intro</a>

<!-- Article -->
<h2 id="intro">Intro</h2>
```

Default template IDs: `#intro`, `#main-heading`, `#subheading`, `#comparison`, `#summary`.

---

### Per-post HTML reference (Content field)

Plain HTML inside `[[*content]]`. Keep CSS classes unchanged — only change text, `href`, and `src`.

#### Section 4A — CTA header (top dark block)

| What to change | Where in HTML | Keep this class |
|---|---|---|
| Headline | Inside `<h2 class="bpv2-cta__title">` | `bpv2-cta__title` |
| Intro paragraph | Inside `<p class="bpv2-cta__intro">` | `bpv2-cta__intro` |
| Red button label | Text inside `<a class="bpv2-cta__btn-primary">` | `bpv2-cta__btn-primary` |
| Red button URL | `href="..."` on that same `<a>` | — |
| Link label | Text inside `<span>` in each `<a class="bpv2-cta__link">` | `bpv2-cta__link` |
| Link URL | `href="..."` on each `bpv2-cta__link` | — |

Example — rename button and change link:

```html
<a href="/company/contact-us.html" class="bpv2-cta__btn-primary">Schedule a Demo</a>

<a href="/solutions.html" class="bpv2-cta__link">
    <span>Your custom link text here</span>
    <img src="/assets/LTS/assets/arrow-down.svg" alt="" width="11" height="11" aria-hidden="true" />
</a>
```

Do **not** remove the `<img>` on text links — it renders the red arrow.

#### Section 4B — Related cards (bottom three cards)

Each card is one `<article class="bpv2-card">`. Repeat the block for all three cards.

| What to change | Where in HTML | Keep this class |
|---|---|---|
| Thumbnail | `<img class="bpv2-card__image" src="...">` | `bpv2-card__image` |
| Card title | `<h3>...</h3>` inside `.bpv2-card__body` | — |
| Card excerpt | `<p>...</p>` inside `.bpv2-card__body` | — |
| Read More label | `<span>` inside `<a class="bpv2-card__link">` | `bpv2-card__link` |
| Card link URL | `href="..."` on `bpv2-card__link` | — |
| View All button | `<a class="bpv2-cta__btn-primary" href="...">` in `.bpv2-cta__footer` | `bpv2-cta__btn-primary` |

Example — one card:

```html
<article class="bpv2-card">
    <img class="bpv2-card__image" src="/assets/LTS/assets/blog_a.jpg" alt="" width="300" height="120" />
    <div class="bpv2-card__body">
        <h3>Your Post Title Here</h3>
        <p>Your excerpt text here.</p>
        <a class="bpv2-card__link" href="/blog-posts/your-post-slug.html">
            <span>Read More</span>
            <img src="/assets/LTS/assets/arrow-down.svg" alt="" width="11" height="11" aria-hidden="true" />
        </a>
    </div>
</article>
```

---

### Optional: auto-pull related posts

Replace the three static `<article class="bpv2-card">` blocks with:

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

Until then, writers edit related cards manually per post.

---

### Files in this repo

| File | Role |
|---|---|
| `blog-post.html` | Full page preview — sections to copy into first v2 post |
| `modx/chunks/blog-post-v2.css` | Raw CSS (source of truth) |
| `modx/chunks/blog-post-v2-css.html` | MODX chunk — paste into `blog-post-v2-css` |
| `modx/chunks/blog-post-v2.js` | Raw JS |
| `modx/chunks/blog-post-v2-js.html` | MODX chunk — paste into `blog-post-v2-js` |
| `modx/chunks/blog-post-v2-section-4a-cta.html` | CTA header section only |

---

### Local preview

```bash
npx vite
# open http://localhost:5173/blog-post.html
```

---

### Developer checklist (one-time)

- [ ] Create `blog-post-v2` template + `blog-post-v2-css` / `blog-post-v2-js` chunks
- [ ] Template condition loads CSS/JS for `blog-post-v2` only
- [ ] Paste starter HTML into first v2 post: `<div class="bpv2">` + hero + article + CTA
- [ ] Wire hero image to `[[*blog_featured_image]]` TV if your blog already uses that TV
- [ ] (Optional) Replace related cards with `[[getResources]]` snippet
- [ ] Confirm writers can duplicate that post for all future articles

---

## Writer guide

For content editors using **MODX Manager** (Resources → Blog → Create / edit a post). No Fred or code required for day-to-day writing.

### Create a new post

1. In the left tree, open **Blog** and click **Create Resource** (or right-click → **Duplicate** on an existing v2 post — recommended).
2. On the **Document** tab, fill in:
   - **Title** — post headline (required). Also used in SEO and the hero.
   - **Summary (introtext)** — short blurb for listings, if your site uses it.
   - **Description** / SEO fields — as you do today.
3. In the right panel, set **Uses Template** to **`blog-post-v2`**.
4. Scroll to **Content** (TinyMCE editor at the bottom). This is where the full post layout lives: hero, Contents sidebar, article, and CTA blocks.
5. Save, preview on staging, then check **Published** when ready.

**Tip:** Duplicate an existing `blog-post-v2` post instead of starting blank. You keep the layout and only replace text, images, and links.

---

### Fred vs MODX Manager — do writers use Fred every time?

**No.** For day-to-day posts, writers use **MODX Manager** only (Resources → Blog → Create or Duplicate → edit **Content**).

| Tool | Who uses it | How often |
|---|---|---|
| **MODX Manager → Content** (TinyMCE) | Writers | **Every post** — duplicate a v2 post, edit text, images, links |
| **Fred** (front-end editor / SECTION blocks) | Optional | **Not required** if you edit in Manager. Fred and Manager both save to the same `[[*content]]` field. |

**One-time (developer):** Paste starter HTML from `blog-post.html` into the first v2 post.

**Every new post (writer):** **Duplicate** that post. You do **not** re-copy Fred SECTION blocks or re-paste from `blog-post.html` unless you are fixing a broken layout.

---

### What each part of the page is

| What you see on the live page | Where you edit it |
|---|---|
| Hero title + author/date | **Title** field + hero HTML in **Content** |
| Featured image | **Template Variables** tab → `blog_featured_image` (preferred), or hero `<img src="...">` in **Content** |
| **Contents** sidebar (Intro, Main Heading, …) | Left column HTML in **Content** — see below |
| **Definition** box (one-line takeaway) | Top of article in **Content** — not listed in Contents |
| Lead paragraph | `.bpv2-article__lead` in **Content** |
| Section headings + body | **Heading 2** + paragraphs in **Content** |
| CTA block + related cards | Bottom sections in **Content** |

The **Title** field at the top is the page title. The **Contents** list (Intro, Comparison, etc.) is separate HTML inside the editor — not automatic from headings.

---

### Contents sidebar — how it works

The left **Contents** list and the right **article sections** are linked in pairs:

```html
<!-- Left sidebar — label the reader clicks -->
<a href="#intro" class="bpv2-toc__link">Intro</a>

<!-- Right article — section it jumps to -->
<h2 id="intro">Intro</h2>
```

**Rule:** Sidebar link text and **Heading 2** text should match. The `href="#intro"` must match `id="intro"`.

Default section IDs in the starter template:

| Contents label | Heading id |
|---|---|
| Intro | `#intro` |
| Main Heading | `#main-heading` |
| Subheading Content | `#subheading` |
| Comparison | `#comparison` |
| Summary | `#summary` |

**Definition** appears above the first section but is **not** in Contents. Edit it here:

```html
<div class="bpv2-article__definition">
    <p class="bpv2-article__definition-label">Definition</p>
    <p class="bpv2-article__definition-text">Your one-sentence takeaway.</p>
</div>
```

---

### Visual editor vs Source mode

| Task | Use |
|---|---|
| Paragraphs, bold, lists, links | **Visual** editor (normal typing) |
| Rename a Contents item | **Source** — update sidebar link **and** matching `<h2>` |
| Add or remove a section | **Source** — add/remove sidebar `<a>` **and** matching `<h2>` block |
| Definition text, tables, callouts, FAQ | **Source** (or visual where formatting allows) |
| CTA button text / URLs | **Source** — edit `href` and link text; keep CSS classes |

In TinyMCE, open **Source** from the toolbar (code / `<>` icon) or **View → Source code**.

After editing headings in visual mode, check **Source** — TinyMCE may remove `id="..."` from headings. Restore the id if a Contents link stops working.

---

### Common tasks (step by step)

#### Rename a section (e.g. “Intro” → “Background”)

1. Open **Source** in Content.
2. Find the sidebar link and change the label:
   ```html
   <a href="#intro" class="bpv2-toc__link">Background</a>
   ```
3. Find the matching heading and change the text (keep the same `id` unless you change both sides):
   ```html
   <h2 id="intro">Background</h2>
   ```
4. Save and preview — click **Background** in Contents; the page should scroll to that section.

#### Add a new Contents section

1. In **Source**, add a sidebar link:
   ```html
   <a href="#timeline" class="bpv2-toc__link">Timeline</a>
   ```
2. In the article, add a **Heading 2** with the same id:
   ```html
   <h2 id="timeline">Timeline</h2>
   <p>Section content…</p>
   ```
3. Use **Format → Heading 2** in visual mode for the heading, then add `id="timeline"` in Source if needed.

#### Remove a section

Delete **both** the sidebar `<a>` and the whole `<h2>…</h2>` section (heading + its content).

#### Edit body copy only

Stay in **visual** mode. Edit text under each heading. Do not change class names or wrapper `<div>` tags.

#### Featured blog image (hero banner)

**Recommended — Template Variable (same as existing blog posts, if your site has it):**

1. Open the post in MODX Manager.
2. Go to the **Template Variables** tab (or **Settings** sidebar, depending on your MODX layout).
3. Set **Featured image** / `blog_featured_image` (exact TV name may match your current Blog Post template).
4. Save.

After dev wires the hero to `[[*blog_featured_image]]`, writers only change the TV per post — no need to edit hero HTML each time.

**Alternative — edit the image path in Content:**

1. Upload the image via **Media**.
2. Open **Content → Source**, find the hero section, and update `src`:

```html
<img src="/assets/LTS/assets/your-image.jpg" alt="" width="1280" height="424" />
```

Use this only if your site does not use a featured-image TV on v2 posts yet.

#### CTA links and buttons

The dark CTA block at the bottom has two parts:

| Part | Changes every post? | Where to edit |
|---|---|---|
| **CTA header** (headline, intro, red demo button, 3 text links) | Usually **no** — same ISARA links on most posts | **Content → Source** — only if marketing gives new copy/URLs |
| **Related cards** (3 cards + “View All Articles”) | **Yes** — pick 3 related posts per article | **Content → Source** — card title, excerpt, `href`, thumbnail `src` |

**CTA header — default links (leave as-is unless told otherwise):**

| Button / link text | URL |
|---|---|
| Book Your Quantum Readiness Demo | `/company/contact-us.html` |
| Explore Cryptographic Posture Management Solutions | `/solutions.html` |
| Build a Complete Cryptographic Inventory | `/products/isara-advance-cryptographic-inventory-and-risk-assessment-tool.html` |
| Deploying Quantum-Safe Cryptography Across Environments | `/products/isara-radiate-quantum-safe-toolkit.html` |

To change label or URL, edit in **Source**. Keep classes: `bpv2-cta__btn-primary`, `bpv2-cta__link`. Do not remove the arrow `<img>` on text links.

**Related cards — update per post:**

Edit each `<article class="bpv2-card">` block: thumbnail `src`, `<h3>` title, excerpt `<p>`, and `href` on `bpv2-card__link`. See **Section 4B** in Developer setup for HTML structure.

---

### Heading levels

| Level | Use | In Contents? |
|---|---|---|
| **Heading 2** | Main sections (Intro, Comparison, …) | **Yes** — one sidebar link per H2 |
| **Heading 3** | Sub-points inside a section (FAQ questions, etc.) | **No** |

---

### When to ask a developer

- First post on the new template (need starter HTML pasted once)
- Layout broken after editing (missing `</div>` or class names changed)
- Auto-generated Contents from headings (not built yet — sidebar is manual today)
- Related posts should pull automatically instead of three hand-edited cards

---

### Writer checklist (each new post)

- [ ] Duplicate an existing **blog-post-v2** post (do not start blank)
- [ ] **Uses Template** = `blog-post-v2`
- [ ] **Title**, Summary, SEO fields filled in
- [ ] **Featured image** — Template Variable tab **or** hero `<img src="...">` in Content
- [ ] Edit **Content** only (visual + Source) — **no Fred required**
- [ ] Article + Definition + Contents sidebar in sync
- [ ] Related cards updated; CTA header links changed only if marketing requests it
- [ ] Preview on staging, then publish
