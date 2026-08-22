# AI Almanac

A static, no-backend website comparing AI tools by capability, matching them to your role, and covering AI's effect on jobs, learning, and daily life.

## Files
- `index.html` — page structure and content
- `style.css` — all styling (one accent color, warm paper theme)
- `data.js` — every fact, rating, and list on the site (edit this to update content)
- `script.js` — renders the directory, filter tool, and lists from `data.js`

## Run it locally
Just open `index.html` in a browser — no build step, no server required.

## Publish it live (free)
**Option A — GitHub Pages**
1. Create a new GitHub repository and push these four files to it.
2. In the repo, go to Settings → Pages → set Source to the `main` branch.
3. Your site will be live at `https://<username>.github.io/<repo-name>/` within a minute or two.

**Option B — Netlify or Vercel**
1. Go to netlify.com or vercel.com and sign in.
2. Drag this folder onto the "deploy" area (Netlify) or import it as a new project (Vercel).
3. You'll get a live HTTPS URL immediately, with a free custom-domain option.

## Updating content later
Everything editable — tool ratings, blurbs, the jobs/impact/learning lists — lives in `data.js` as plain arrays and objects. Change the text, save, and re-deploy (or just refresh if hosted via Pages/Netlify with auto-deploy from GitHub connected).

## Why it's secure by design
There's no login, no database, no form that sends data anywhere, and no third-party tracking script. Because nothing is collected, there's nothing to leak. If you later add a contact form or account system, that's the point to add real backend security (HTTPS is already handled by GitHub Pages/Netlify/Vercel automatically).

## A note on the ratings
The capability ratings are informed estimates based on public benchmarks and reviews as of August 2026, not lab-grade scores — this field changes monthly. Treat the directory as a fast starting point, not a final verdict, especially for high-stakes decisions.
