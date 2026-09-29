# Nirav Michelsen — Portfolio

A one-page site whose job is to make people want the full portfolio PDF.
Five projects, two sentences and one image each, and a prominent download
button for the deck. Blueprint aesthetic, fully responsive, no build step and
no dependencies.

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
index.html    page structure — nav, hero, projects, closing call to action
styles.css    all styling; the palette lives in :root at the top
data.js       ← ALL YOUR CONTENT. This is the only file you normally edit.
script.js     renders data.js into the page
images/       one photo per project, plus the headshot
Nirav-Michelsen-Portfolio.pdf   the full deck behind every download button
vercel.json   caching and security headers for deployment
```

The important idea: **`data.js` is the content, everything else is machinery.**
Adding a project or changing a paragraph never requires touching HTML.

---

## Editing your content

### Text and links

Open `data.js`. The `PROFILE` object at the top holds your name, role, the
short "what I do" paragraph, contact links, and the path to the portfolio PDF.
Change the strings and refresh.

### Updating the portfolio PDF

Replace `Nirav-Michelsen-Portfolio.pdf` with the new deck, keeping the same
filename, and update `portfolio.detail` in `data.js` if the page count
changed. Compress it first: the original export was 8 MB, and a 2–3 MB copy
downloads much faster on a phone.

### Adding or editing a project

Each entry in the `PROJECTS` array looks like this:

```js
{
  id: "flight-controller",              // used for the #anchor link
  title: "Custom 5\" Drone + Flight Controller",
  period: "Aug 2026 — Present",
  status: "In progress · v1 boards on order",   // optional
  tags: ["Altium", "STM32F405", "4-layer PCB"],
  blurb: "Two sentences. The detail belongs in the PDF.",
  image: { src: "images/flight-controller.jpg", alt: "…", position: "50% 40%" },
  link: { label: "Code on GitHub", href: "https://github.com/..." }, // optional
}
```

Projects render in array order. `image.position` adjusts the crop when the
interesting part of a photo isn't in the center.

### Photos

See `images/README.md`. Resize to about 1400px on the long edge before
committing.

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
- **Accessibility:** keyboard-navigable, skip link, and alt text on every
  project image.
- **Colors** are CSS variables in `:root` at the top of `styles.css`. Change
  `--accent` to re-theme the whole site in one edit.
