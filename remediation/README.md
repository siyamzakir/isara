# ISARA URL Remediation — Reference Files Only

This folder is **not deployed** to production. The repo is for local Vite preview only.
Production/staging changes are applied **manually on the server** (MODX Manager + CyberPanel).

## Where changes actually go

| Change | Apply on |
|--------|----------|
| 301 redirects | Staging/production MODX → **Extras → autoRedirector** (import CSV) |
| 410 Gone | Staging/production **`.htaccess`** in site root (CyberPanel File Manager) |
| Canonical snippet | MODX Manager → **Elements → Snippets → canonical (71)** |
| Fred / page HTML | Copy from Vite build output → paste into MODX resource in Manager |
| Laravel funnel subdomain | Separate Laravel project on server (routes / middleware) |

## Workflow

1. **Backup** — CyberPanel: DB dump + download `public_html` (or site root)
2. **Staging first** — `isara.appszonebd.com`
3. Import `redirects-301.csv` into autoRedirector (10 rules at a time, test each batch)
4. Paste rules from `gone-410.htaccess` into staging `.htaccess` (above MODX rewrite block)
5. Run validation (see below)
6. Repeat same steps on production `isara.com` after sign-off

## Validate (run from your Mac, not the repo)

```bash
cd remediation
chmod +x validate-remediation.sh
./validate-remediation.sh https://isara.appszonebd.com
# then after production rollout:
./validate-remediation.sh https://isara.com
```

## Files

| File | Use |
|------|-----|
| `redirects-301.csv` | Import into autoRedirector |
| `gone-410.htaccess` | Copy lines into server `.htaccess` |
| `gone-410-individual.txt` | Reference list of non-/manual/ 410 paths |
| `validate-remediation.sh` | QA script (runs locally against any base URL) |

## Skip (per Excel)

- `/company/services` — Custom 404, wait for Hardik
- `/resource-center/services` — Custom 404, wait for Hardik
- `/company/contact-us` — canonical only (snippet), not a redirect
- `/standards/` — no action

## 3 malformed 410 URLs in sheet (bot junk — skip)

- `/).`
- `/</a>.</p><img`
- `/blog-posts/author/ISARA Corporation & Accenture Federal Services`
