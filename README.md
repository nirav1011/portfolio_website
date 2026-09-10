# Nirav Michelsen — Portfolio

A single-page portfolio site for engineering projects. Blueprint aesthetic,
fully responsive, no build step and no dependencies.

**Live:** _(add your Vercel URL here once deployed)_

---

## Running it locally

There is nothing to install. You just need to serve the folder over HTTP —
opening `index.html` directly with `file://` will work for most things but can
behave oddly with images, so use a server:

```bash
# Python (already on macOS and most Linux)
python3 -m http.server 8000

# or Node, if you have it
npx serve .
```

Then open <http://localhost:8000>.

To edit, change a file and refresh the browser. No compile, no watcher.

---

## How the files fit together

```
index.html    page structure — section order, nav, lightbox markup
styles.css    all styling; the palette lives in :root at the top
data.js       ← ALL YOUR CONTENT. This is the only file you normally edit.
script.js     renders data.js into the page, runs the nav and lightbox
images/       your project photos
vercel.json   caching and security headers for deployment
```

The important idea: **`data.js` is the content, everything else is machinery.**
Adding a project or changing a paragraph never requires touching HTML.

---

## Editing your content

### Text, links, and skills

Open `data.js`. The `PROFILE` object at the top holds your name, role,
tagline, about paragraphs, contact links, and the skills lists. Change the
strings and refresh.

**Before you deploy, fix these two:**

1. `github:` is set to `https://github.com/YOUR_GITHUB_USERNAME` — replace it
   with your real handle.
2. `resume:` points at `resume.pdf`. Drop your résumé PDF in the repo root
   with that exact name, or set the value to `null` to hide the button.

### Adding or editing a project

Each entry in the `PROJECTS` array looks like this:

```js
{
  id: "flight-controller",              // used for the #anchor link
  title: "Custom Drone Flight Controller",
  subtitle: "PCB + Firmware · Personal Project",
  period: "Aug 2026 — Present",
  tags: ["Altium", "STM32F405", "Power Electronics"],
  summary: "One sentence a recruiter reads in three seconds.",
  bullets: [
    "What you did, specifically, with the parts and the numbers.",
  ],
  images: [
    { src: "images/fc-board.jpg", caption: "Assembled flight controller" },
  ],
  links: [
    { label: "GitHub — design files", href: "https://github.com/..." },
  ],
}
```

Projects render in array order, so the first one in the list appears first on
the page. `links` and `images` can be empty arrays.

### Adding photos

Put image files in `images/` and list them in that project's `images` array.
See `images/README.md` for the filenames already referenced and for sizing
advice.

Any image listed in `data.js` but not present in `images/` renders as a
labelled placeholder frame rather than a broken image, and it's skipped when
paging through the lightbox — so the site stays presentable while you're still
collecting photos.

---

## Deploying to GitHub + Vercel

### 1. Push to GitHub

The repo is already initialized with a first commit. Create an empty repo on
GitHub (no README, no .gitignore — you have both), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

If you'd rather use the GitHub CLI, `gh repo create portfolio --public
--source=. --push` does the create and push in one step.

### 2. Connect Vercel

1. Go to <https://vercel.com> and sign in **with your GitHub account** — this
   is what lets Vercel see your repos.
2. Click **Add New… → Project**.
3. Find `portfolio` in the repo list and click **Import**. If it isn't listed,
   click **Adjust GitHub App Permissions** and grant access to the repo.
4. On the configure screen, Vercel will detect this as a static site:
   - **Framework Preset:** `Other`
   - **Build Command:** leave empty
   - **Output Directory:** leave empty (it serves the repo root)
   - **Install Command:** leave empty

   These are the correct settings — there is no build step. If Vercel
   pre-filled a build command, clear it.
5. Click **Deploy**. It takes about twenty seconds.

You'll get a URL like `portfolio-abc123.vercel.app`. Put it in the README
above and on your LinkedIn profile.

### 3. Updating the site

Vercel watches the repo. Any push to `main` redeploys automatically:

```bash
git add .
git commit -m "Add flight controller photos"
git push
```

Pushes to other branches get their own preview URL, which is a safe way to try
a change before it goes live.

### 4. A custom domain (optional)

In Vercel: **Project → Settings → Domains → Add**. If you buy something like
`niravmichelsen.com`, Vercel walks you through the two DNS records. HTTPS is
automatic. A personal domain on a résumé reads better than a `.vercel.app`
subdomain, and it costs about $12/year.

---

## Notes

- **Fonts** load from Google Fonts (Inter + JetBrains Mono). If they're
  blocked or slow, the page falls back to system fonts and still looks fine.
- **No JavaScript framework**, no `node_modules`, nothing to keep updated. The
  site will still build and deploy unchanged in five years.
- **Accessibility:** keyboard-navigable, skip link, focus trapping in the
  lightbox, and all content is in the DOM regardless of whether JS runs.
- **Colors** are CSS variables in `:root` at the top of `styles.css`. Change
  `--accent` to re-theme the whole site in one edit.
