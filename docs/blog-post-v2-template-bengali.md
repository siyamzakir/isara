# ব্লগ পোস্ট V2 টেমপ্লেট — MODX রেফারেন্স (বাংলা)

নতুন ব্লগ পোস্টগুলোর জন্য **`blog-post-v2`** টেমপ্লেট ব্যবহার হবে। আগের (পুরাতন) ব্লগ পোস্টগুলো পুরনো টেমপ্লেটেই থাকবে — সেগুলোতে কোনো পরিবর্তন হবে না।

ডিজাইনের সোর্স: [Figma — /blog-post](https://www.figma.com/design/6ulsgbSfy4Fl1PzF7spduc/ISARA-Web-Pages--Dev---Current-?node-id=1934-544)

---

## ডেভেলপার সেটআপ

এটি একবারের জন্য করা MODX কনফিগারেশন, চাংক (chunk) মেইনটেনেন্স এবং প্রথম v2 পোস্টের জন্য শুরুর HTML।

### অপশন B — MODX চাংকে CSS/JS রাখা

#### ধাপ ১ — MODX চাংক তৈরি করুন

| চাংকের নাম | রিপোর ফাইল থেকে কপি করুন |
|---|---|
| `blog-post-v2-css` | `modx/chunks/blog-post-v2-css.html` |
| `blog-post-v2-js` | `modx/chunks/blog-post-v2-js.html` |

#### ধাপ ২ — `blog-post-v2` টেমপ্লেট তৈরি করুন

আপনার বিদ্যমান ব্লগ টেমপ্লেট কপি (duplicate) করুন। এই চাংকগুলো শুধুমাত্র **এই টেমপ্লেটের জন্যই** শেয়ার্ড হেড/ফুটার চাংকে যোগ করুন:

**`$HEAD-CSS` চাংকে (অথবা সরাসরি blog-post-v2 টেমপ্লেটের `<head>`-এ):**
```
[[*template:is=`blog-post-v2`:then=`[[$blog-post-v2-css]]`]]
```

**`$MAIN-FOOTER-SCRIPTS` চাংকে (অথবা `</body>`-এর আগে):**
```
[[*template:is=`blog-post-v2`:then=`[[$blog-post-v2-js]]`]]
```

টেমপ্লেট বডি আগের মতোই থাকবে (কোনো পরিবর্তন লাগবে না):
```html
<main data-fred-dropzone="content" data-fred-min-height="600px" role="main">
    [[*content]]
</main>
```

#### ধাপ ৩ — কনটেন্ট `.bpv2` দিয়ে ঘিরে (wrap) দিন

`[[*content]]`-এর প্রথম ব্লকে wrapper ওপেন করতে হবে:
```html
<div class="bpv2">
```
সবার শেষ ব্লকে এটি ক্লোজ করতে হবে:
```html
</div>
```

হিরো, আর্টিকেল, CTA — সব সেকশনই এই wrapper-এর **ভেতরে** থাকতে হবে, তাহলেই স্কোপড CSS ঠিকভাবে কাজ করবে।

#### ধাপ ৪ — প্রথম v2 পোস্টে শুরুর HTML পেস্ট করুন

`blog-post.html` (অথবা Fred SECTION ব্লক) থেকে সেকশনগুলো কপি করে প্রথম পোস্টের **Content** ফিল্ডে পেস্ট করুন:

| সেকশন | রিপো ফাইল / লোকেশন | নোট |
|---|---|---|
| **১. হিরো** | `blog-post.html` → SECTION 1 | হিরোর `<img>`-এ `[[*blog_featured_image]]` TV যুক্ত করুন |
| **২. Contents + আর্টিকেল** | `blog-post.html` → SECTION 3 | TOC লিংকের id-গুলো H2 id-এর সাথে মিল রাখুন |
| **৩A. CTA হেডার** | `modx/chunks/blog-post-v2-section-4a-cta.html` | বাটনগুলো Figma অনুযায়ী ফিক্সড |
| **৩B. রিলেটেড পোস্ট** | `blog-post.html` → SECTION 4B | পরে `getResources` যুক্ত করে দিন |

হিরো ইমেজ (শুরুর HTML-এ একবার সেট করলেই হবে):

```html
<img src="[[*blog_featured_image]]" alt="" width="1280" height="424" />
```

লেখকরা ভবিষ্যতের সব আর্টিকেলের জন্য এই পোস্টটি ডুপ্লিকেট করবেন — প্রতি পোস্টে নতুন করে পেস্ট করার দরকার নেই।

---

### সেকশন 4A — CTA বাটন (Figma অনুযায়ী)

সাধারণ `isara-btn` ক্লাস ব্যবহার করবেন না, এই ক্লাসগুলো ব্যবহার করুন:

| এলিমেন্ট | ক্লাস | স্টাইল |
|---|---|---|
| লাল ডেমো বাটন | `bpv2-cta__btn-primary` | লাল `#ec1c24`, Roboto Mono 14px, রাউন্ডেড কোণা 7px |
| টেক্সট লিংক | `bpv2-cta__link` | সাদা আন্ডারলাইন + লাল অ্যারো (`arrow-down.svg` ঘোরানো) |
| কার্ডের Read More | `bpv2-card__link` | ডার্ক কার্ডেও একই অ্যারো লিংক স্টাইল |

**ডিফল্ট URL গুলো:**

| লেবেল | URL |
|---|---|
| Book Your Quantum Readiness Demo | `/company/contact-us.html` |
| Explore Cryptographic Posture Management Solutions | `/solutions.html` |
| Build a Complete Cryptographic Inventory | `/products/isara-advance-cryptographic-inventory-and-risk-assessment-tool.html` |
| Deploying Quantum-Safe Cryptography Across Environments | `/products/isara-radiate-quantum-safe-toolkit.html` |

কপি-রেডি HTML: `modx/chunks/blog-post-v2-section-4a-cta.html`

---

### Contents সাইডবার — id মিলিয়ে রাখা

প্রতিটি সাইডবার লিংক অবশ্যই আর্টিকেলের একটি **H2**-এর `id`-এর সাথে মিলতে হবে।

```html
<!-- সাইডবার -->
<a href="#intro" class="bpv2-toc__link">Intro</a>

<!-- আর্টিকেল -->
<h2 id="intro">Intro</h2>
```

টেমপ্লেটের ডিফল্ট id: `#intro`, `#main-heading`, `#subheading`, `#comparison`, `#summary`।

---

### প্রতি পোস্টের HTML রেফারেন্স (Content ফিল্ড)

`[[*content]]`-এর ভেতরে সাধারণ HTML থাকে। CSS ক্লাস অপরিবর্তিত রাখুন — শুধু টেক্সট, `href`, আর `src` পরিবর্তন করুন।

#### সেকশন 4A — CTA হেডার (উপরের ডার্ক ব্লক)

| কী পরিবর্তন করবেন | কোথায় (HTML-এ) | এই ক্লাস অপরিবর্তিত রাখুন |
|---|---|---|
| হেডলাইন | `<h2 class="bpv2-cta__title">`-এর ভেতরে | `bpv2-cta__title` |
| ইন্ট্রো প্যারাগ্রাফ | `<p class="bpv2-cta__intro">`-এর ভেতরে | `bpv2-cta__intro` |
| লাল বাটনের লেবেল | `<a class="bpv2-cta__btn-primary">`-এর ভেতরের টেক্সট | `bpv2-cta__btn-primary` |
| লাল বাটনের URL | একই `<a>`-এ `href="..."` | — |
| লিংকের লেবেল | প্রতিটি `<a class="bpv2-cta__link">`-এর ভেতরের `<span>`-এর টেক্সট | `bpv2-cta__link` |
| লিংকের URL | প্রতিটি `bpv2-cta__link`-এ `href="..."` | — |

উদাহরণ — বাটনের নাম বদলানো ও লিংক পরিবর্তন:

```html
<a href="/company/contact-us.html" class="bpv2-cta__btn-primary">Schedule a Demo</a>

<a href="/solutions.html" class="bpv2-cta__link">
    <span>Your custom link text here</span>
    <img src="/assets/LTS/assets/arrow-down.svg" alt="" width="11" height="11" aria-hidden="true" />
</a>
```

টেক্সট লিংক থেকে `<img>` ট্যাগটি **কখনো মুছবেন না** — এটিই লাল অ্যারো দেখায়।

#### সেকশন 4B — রিলেটেড কার্ড (নিচের তিনটি কার্ড)

প্রতিটি কার্ড একটি `<article class="bpv2-card">`। তিনটি কার্ডের জন্যই এই ব্লক রিপিট করুন।

| কী পরিবর্তন করবেন | কোথায় (HTML-এ) | এই ক্লাস অপরিবর্তিত রাখুন |
|---|---|---|
| থাম্বনেইল | `<img class="bpv2-card__image" src="...">` | `bpv2-card__image` |
| কার্ডের টাইটেল | `.bpv2-card__body`-এর ভেতরে `<h3>...</h3>` | — |
| কার্ডের এক্সসার্প্ট | `.bpv2-card__body`-এর ভেতরে `<p>...</p>` | — |
| Read More লেবেল | `<a class="bpv2-card__link">`-এর ভেতরের `<span>` | `bpv2-card__link` |
| কার্ডের লিংক URL | `bpv2-card__link`-এ `href="..."` | — |
| View All বাটন | `.bpv2-cta__footer`-এর ভেতরে `<a class="bpv2-cta__btn-primary" href="...">` | `bpv2-cta__btn-primary` |

উদাহরণ — একটি কার্ড:

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

### ঐচ্ছিক: রিলেটেড পোস্ট অটোমেটিক টেনে আনা

তিনটি স্ট্যাটিক `<article class="bpv2-card">` ব্লকের জায়গায় এটি বসান:

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

এটি সেট না করা পর্যন্ত, লেখকরা প্রতি পোস্টে রিলেটেড কার্ড নিজেরাই ম্যানুয়ালি এডিট করবেন।

---

### এই রিপোর ফাইলগুলো

| ফাইল | ভূমিকা |
|---|---|
| `blog-post.html` | পুরো পেজের প্রিভিউ — প্রথম v2 পোস্টে যেসব সেকশন কপি করতে হবে |
| `modx/chunks/blog-post-v2.css` | মূল CSS (সোর্স অফ ট্রুথ) |
| `modx/chunks/blog-post-v2-css.html` | MODX চাংক — `blog-post-v2-css`-এ পেস্ট করুন |
| `modx/chunks/blog-post-v2.js` | মূল JS |
| `modx/chunks/blog-post-v2-js.html` | MODX চাংক — `blog-post-v2-js`-এ পেস্ট করুন |
| `modx/chunks/blog-post-v2-section-4a-cta.html` | শুধু CTA হেডার সেকশন |

---

### লোকাল প্রিভিউ

```bash
npx vite
# ব্রাউজারে খুলুন http://localhost:5173/blog-post.html
```

---

### ডেভেলপার চেকলিস্ট (একবারের জন্য)

- [ ] `blog-post-v2` টেমপ্লেট + `blog-post-v2-css` / `blog-post-v2-js` চাংক তৈরি করুন
- [ ] টেমপ্লেট কন্ডিশন শুধু `blog-post-v2`-এর জন্যই CSS/JS লোড করে তা নিশ্চিত করুন
- [ ] প্রথম v2 পোস্টে শুরুর HTML পেস্ট করুন: `<div class="bpv2">` + হিরো + আর্টিকেল + CTA
- [ ] যদি আপনার ব্লগ ইতিমধ্যে সেই TV ব্যবহার করে থাকে, তাহলে হিরো ইমেজকে `[[*blog_featured_image]]`-এর সাথে যুক্ত করুন
- [ ] (ঐচ্ছিক) রিলেটেড কার্ডের জায়গায় `[[getResources]]` স্নিপেট বসান
- [ ] লেখকরা যেন এই পোস্টটি ভবিষ্যতের সব আর্টিকেলের জন্য ডুপ্লিকেট করতে পারেন তা নিশ্চিত করুন

---

## লেখকদের জন্য গাইড

যারা **MODX Manager** (Resources → Blog → নতুন পোস্ট তৈরি / এডিট) দিয়ে কনটেন্ট লেখেন, তাদের জন্য। নিয়মিত লেখালেখির জন্য Fred বা কোডের দরকার নেই।

### নতুন পোস্ট তৈরি করা

১. বাম পাশের ট্রি-তে **Blog** খুলে **Create Resource**-এ ক্লিক করুন (অথবা বিদ্যমান একটি v2 পোস্টে রাইট-ক্লিক করে **Duplicate** করুন — এটাই সুপারিশ করা হয়)।
২. **Document** ট্যাবে গিয়ে পূরণ করুন:
   - **Title** — পোস্টের হেডলাইন (আবশ্যক)। এটি SEO ও হিরোতেও ব্যবহৃত হয়।
   - **Summary (introtext)** — যদি আপনার সাইটে লিস্টিং-এ ব্যবহার হয়, তাহলে একটি ছোট ব্লার্ব লিখুন।
   - **Description** / SEO ফিল্ড — আগের মতোই পূরণ করুন।
৩. ডান পাশের প্যানেলে **Uses Template**-এ **`blog-post-v2`** সিলেক্ট করুন।
৪. নিচে স্ক্রল করে **Content** (TinyMCE এডিটর) খুঁজুন। এখানেই পুরো পোস্টের লেআউট থাকে: হিরো, Contents সাইডবার, আর্টিকেল, এবং CTA ব্লক।
৫. সেভ করুন, স্টেজিং-এ প্রিভিউ দেখুন, তারপর রেডি হলে **Published** চেক করুন।

**টিপস:** একদম খালি থেকে শুরু না করে বিদ্যমান একটি `blog-post-v2` পোস্ট ডুপ্লিকেট করুন। এতে লেআউট ঠিক থাকবে, শুধু টেক্সট, ছবি আর লিংক বদলালেই হবে।

---

### Fred vs MODX Manager — প্রতিবার কি Fred ব্যবহার করতে হবে?

**না।** দৈনন্দিন পোস্টের জন্য লেখকরা শুধু **MODX Manager** ব্যবহার করেন (Resources → Blog → Create বা Duplicate → **Content** এডিট করুন)।

| টুল | কে ব্যবহার করে | কত ঘন ঘন |
|---|---|---|
| **MODX Manager → Content** (TinyMCE) | লেখকরা | **প্রতিটি পোস্টে** — v2 পোস্ট ডুপ্লিকেট করে টেক্সট, ছবি, লিংক এডিট |
| **Fred** (ফ্রন্ট-এন্ড এডিটর / SECTION ব্লক) | ঐচ্ছিক | Manager-এ এডিট করলে **দরকার নেই**। Fred আর Manager দুটোই একই `[[*content]]` ফিল্ডে সেভ হয়। |

**একবারের জন্য (ডেভেলপার):** `blog-post.html` থেকে শুরুর HTML প্রথম v2 পোস্টে পেস্ট করা।

**প্রতিটি নতুন পোস্টে (লেখক):** ওই পোস্টটি **Duplicate** করুন। Fred SECTION ব্লক আবার কপি করা বা `blog-post.html` থেকে আবার পেস্ট করার দরকার নেই — যদি না লেআউট ভেঙে যায়।

---

### পেজের কোন অংশ কোথায় এডিট করবেন

| লাইভ পেজে যা দেখা যায় | কোথায় এডিট করবেন |
|---|---|
| হিরো টাইটেল + লেখক/তারিখ | **Title** ফিল্ড + **Content**-এ হিরো HTML |
| ফিচার্ড ইমেজ | **Template Variables** ট্যাব → `blog_featured_image` (প্রাধান্য দিন), অথবা **Content**-এ হিরোর `<img src="...">` |
| **Contents** সাইডবার (Intro, Main Heading, …) | **Content**-এর বাম কলাম HTML — নিচে দেখুন |
| **Definition** বক্স (এক লাইনের সারসংক্ষেপ) | **Content**-এর আর্টিকেলের উপরে — Contents-এ থাকে না |
| লিড প্যারাগ্রাফ | **Content**-এ `.bpv2-article__lead` |
| সেকশন হেডিং + বডি | **Content**-এ **Heading 2** + প্যারাগ্রাফ |
| CTA ব্লক + রিলেটেড কার্ড | **Content**-এর নিচের সেকশনগুলো |

উপরের **Title** ফিল্ডটি পেজের টাইটেল। **Contents** লিস্ট (Intro, Comparison, ইত্যাদি) এডিটরের ভেতরের আলাদা HTML — এটি হেডিং থেকে অটোমেটিক তৈরি হয় না।

---

### Contents সাইডবার — কীভাবে কাজ করে

বাম পাশের **Contents** লিস্ট এবং ডান পাশের **আর্টিকেল সেকশন** জোড়ায় জোড়ায় লিংক করা থাকে:

```html
<!-- বাম সাইডবার — পাঠক যে লেবেলে ক্লিক করবে -->
<a href="#intro" class="bpv2-toc__link">Intro</a>

<!-- ডান আর্টিকেল — যে সেকশনে গিয়ে থামবে -->
<h2 id="intro">Intro</h2>
```

**নিয়ম:** সাইডবার লিংকের টেক্সট এবং **Heading 2**-এর টেক্সট একই হওয়া উচিত। `href="#intro"` অবশ্যই `id="intro"`-এর সাথে মিলতে হবে।

শুরুর টেমপ্লেটের ডিফল্ট সেকশন id:

| Contents-এর লেবেল | হেডিং-এর id |
|---|---|
| Intro | `#intro` |
| Main Heading | `#main-heading` |
| Subheading Content | `#subheading` |
| Comparison | `#comparison` |
| Summary | `#summary` |

**Definition** প্রথম সেকশনের আগে দেখায়, কিন্তু এটি Contents লিস্টে **থাকে না**। এটি এভাবে এডিট করুন:

```html
<div class="bpv2-article__definition">
    <p class="bpv2-article__definition-label">Definition</p>
    <p class="bpv2-article__definition-text">Your one-sentence takeaway.</p>
</div>
```

---

### Visual এডিটর vs Source মোড

| কাজ | কোনটা ব্যবহার করবেন |
|---|---|
| প্যারাগ্রাফ, বোল্ড, লিস্ট, লিংক | **Visual** এডিটর (সাধারণ টাইপিং) |
| Contents-এর কোনো আইটেমের নাম বদলানো | **Source** — সাইডবার লিংক **এবং** সংশ্লিষ্ট `<h2>` দুটোই আপডেট করুন |
| সেকশন যোগ বা মুছে ফেলা | **Source** — সাইডবার `<a>` **এবং** সংশ্লিষ্ট `<h2>` ব্লক যোগ/মুছে ফেলুন |
| Definition টেক্সট, টেবিল, কলআউট, FAQ | **Source** (অথবা যেখানে ফরম্যাটিং সাপোর্ট করে সেখানে Visual) |
| CTA বাটনের টেক্সট / URL | **Source** — `href` ও লিংক টেক্সট এডিট করুন; CSS ক্লাস অপরিবর্তিত রাখুন |

TinyMCE-তে টুলবার থেকে **Source** খুলুন (কোড / `<>` আইকন) অথবা **View → Source code**।

Visual মোডে হেডিং এডিট করার পর **Source**-এ গিয়ে চেক করুন — TinyMCE মাঝে মাঝে হেডিং থেকে `id="..."` মুছে ফেলে। কোনো Contents লিংক কাজ না করলে সেই id আবার বসিয়ে দিন।

---

### সাধারণ কাজগুলো (ধাপে ধাপে)

#### একটি সেকশনের নাম বদলানো (যেমন: "Intro" → "Background")

১. Content-এ **Source** খুলুন।
২. সাইডবার লিংক খুঁজে লেবেল বদলান:
   ```html
   <a href="#intro" class="bpv2-toc__link">Background</a>
   ```
৩. সংশ্লিষ্ট হেডিং খুঁজে টেক্সট বদলান (একই `id` রাখুন, যদি না দুই পাশই বদলান):
   ```html
   <h2 id="intro">Background</h2>
   ```
৪. সেভ করে প্রিভিউ দেখুন — Contents-এ **Background**-এ ক্লিক করলে পেজটি সেই সেকশনে স্ক্রল করে যাওয়া উচিত।

#### নতুন Contents সেকশন যোগ করা

১. **Source**-এ একটি সাইডবার লিংক যোগ করুন:
   ```html
   <a href="#timeline" class="bpv2-toc__link">Timeline</a>
   ```
২. আর্টিকেলে একই id দিয়ে একটি **Heading 2** যোগ করুন:
   ```html
   <h2 id="timeline">Timeline</h2>
   <p>Section content…</p>
   ```
৩. Visual মোডে **Format → Heading 2** ব্যবহার করুন, তারপর দরকার হলে Source-এ `id="timeline"` যোগ করুন।

#### সেকশন মুছে ফেলা

সাইডবারের `<a>` এবং পুরো `<h2>…</h2>` সেকশন (হেডিং + তার কনটেন্ট) — **দুটোই** মুছে ফেলুন।

#### শুধু বডি টেক্সট এডিট করা

**Visual** মোডেই থাকুন। প্রতিটি হেডিং-এর নিচের টেক্সট এডিট করুন। ক্লাসের নাম বা wrapper `<div>` ট্যাগ পরিবর্তন করবেন না।

#### ফিচার্ড ব্লগ ইমেজ (হিরো ব্যানার)

**সুপারিশকৃত পদ্ধতি — Template Variable (আগের ব্লগ পোস্টের মতোই, যদি আপনার সাইটে থাকে):**

১. MODX Manager-এ পোস্টটি খুলুন।
২. **Template Variables** ট্যাবে যান (অথবা আপনার MODX লেআউট অনুযায়ী **Settings** সাইডবারে)।
৩. **Featured image** / `blog_featured_image` সেট করুন (সঠিক TV নাম আপনার বর্তমান Blog Post টেমপ্লেটের সাথে মিলতে পারে)।
৪. সেভ করুন।

ডেভেলপার একবার হিরোকে `[[*blog_featured_image]]`-এর সাথে যুক্ত করে দিলে, লেখকরা শুধু প্রতি পোস্টে TV বদলালেই হবে — প্রতিবার হিরো HTML এডিট করার দরকার নেই।

**বিকল্প পদ্ধতি — Content-এ ইমেজ পাথ এডিট করা:**

১. **Media**-এর মাধ্যমে ছবি আপলোড করুন।
২. **Content → Source**-এ গিয়ে হিরো সেকশন খুঁজে `src` আপডেট করুন:

```html
<img src="/assets/LTS/assets/your-image.jpg" alt="" width="1280" height="424" />
```

এই পদ্ধতি তখনই ব্যবহার করুন যখন আপনার সাইট v2 পোস্টে এখনো ফিচার্ড-ইমেজ TV ব্যবহার করে না।

#### CTA লিংক ও বাটন

নিচের ডার্ক CTA ব্লকের দুটি অংশ আছে:

| অংশ | প্রতি পোস্টে কি বদলায়? | কোথায় এডিট করবেন |
|---|---|---|
| **CTA হেডার** (হেডলাইন, ইন্ট্রো, লাল ডেমো বাটন, ৩টি টেক্সট লিংক) | সাধারণত **না** — বেশিরভাগ পোস্টে একই ISARA লিংক থাকে | **Content → Source** — শুধু মার্কেটিং থেকে নতুন কপি/URL দিলে |
| **রিলেটেড কার্ড** (৩টি কার্ড + "View All Articles") | **হ্যাঁ** — প্রতিটি আর্টিকেলের জন্য ৩টি সম্পর্কিত পোস্ট বাছাই করুন | **Content → Source** — কার্ডের টাইটেল, এক্সসার্প্ট, `href`, থাম্বনেইল `src` |

**CTA হেডার — ডিফল্ট লিংক (নির্দেশনা না দেওয়া পর্যন্ত এভাবেই রাখুন):**

| বাটন / লিংকের টেক্সট | URL |
|---|---|
| Book Your Quantum Readiness Demo | `/company/contact-us.html` |
| Explore Cryptographic Posture Management Solutions | `/solutions.html` |
| Build a Complete Cryptographic Inventory | `/products/isara-advance-cryptographic-inventory-and-risk-assessment-tool.html` |
| Deploying Quantum-Safe Cryptography Across Environments | `/products/isara-radiate-quantum-safe-toolkit.html` |

লেবেল বা URL বদলাতে **Source**-এ এডিট করুন। এই ক্লাসগুলো রাখুন: `bpv2-cta__btn-primary`, `bpv2-cta__link`। টেক্সট লিংকের অ্যারো `<img>` মুছবেন না।

**রিলেটেড কার্ড — প্রতি পোস্টে আপডেট করুন:**

প্রতিটি `<article class="bpv2-card">` ব্লক এডিট করুন: থাম্বনেইল `src`, `<h3>` টাইটেল, এক্সসার্প্ট `<p>`, এবং `bpv2-card__link`-এ `href`। HTML স্ট্রাকচারের জন্য Developer setup-এর **Section 4B** দেখুন।

---

### হেডিং লেভেল

| লেভেল | ব্যবহার | Contents-এ থাকবে কি? |
|---|---|---|
| **Heading 2** | মূল সেকশন (Intro, Comparison, …) | **হ্যাঁ** — প্রতিটি H2-এর জন্য একটি করে সাইডবার লিংক |
| **Heading 3** | কোনো সেকশনের ভেতরের সাব-পয়েন্ট (FAQ প্রশ্ন, ইত্যাদি) | **না** |

---

### কখন ডেভেলপারকে জিজ্ঞাসা করবেন

- নতুন টেমপ্লেটের প্রথম পোস্ট (শুরুর HTML একবার পেস্ট করা লাগবে)
- এডিট করার পর লেআউট ভেঙে গেলে (মিসিং `</div>` অথবা ক্লাসের নাম বদলে গেলে)
- হেডিং থেকে অটোমেটিক Contents তৈরি করা (এখনও তৈরি হয়নি — সাইডবার এখন ম্যানুয়াল)
- রিলেটেড পোস্ট অটোমেটিক টানা উচিত, তিনটি হাতে-এডিট করা কার্ডের বদলে

---

### লেখকদের চেকলিস্ট (প্রতিটি নতুন পোস্টে)

- [ ] বিদ্যমান একটি **blog-post-v2** পোস্ট ডুপ্লিকেট করুন (একদম খালি থেকে শুরু করবেন না)
- [ ] **Uses Template** = `blog-post-v2`
- [ ] **Title**, Summary, SEO ফিল্ড পূরণ করুন
- [ ] **Featured image** — Template Variable ট্যাব **অথবা** Content-এ হিরোর `<img src="...">`
- [ ] শুধু **Content** এডিট করুন (visual + Source) — **Fred লাগবে না**
- [ ] আর্টিকেল + Definition + Contents সাইডবার একসাথে মিলিয়ে রাখুন
- [ ] রিলেটেড কার্ড আপডেট করুন; মার্কেটিং না বললে CTA হেডারের লিংক বদলাবেন না
- [ ] স্টেজিং-এ প্রিভিউ দেখুন, তারপর পাবলিশ করুন
