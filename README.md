# Portfolio, CV & link directory

A fast, dependency-free personal site: one scrolling portfolio, a filterable directory of
your online links, and a print-ready CV page. Dark by default with a light-mode toggle,
fully responsive, and free to host on GitHub Pages.

```
index.html                 the portfolio + link directory
cv.html                    one-page CV you can save as PDF
assets/
  cv.pdf                   your original CV (downloadable from the site)
  css/styles.css           all site styling
  css/cv.css               CV page styling
  js/content.js            ← your details live here (edit this file)
  js/main.js               site logic
  js/cv.js                 CV page logic
  favicon.svg              browser tab icon
```

The content is already filled in from your CV. Adjust, extend or reword anything in
`content.js` — the site and the CV page both read from it.

## 1. Look at it

Double-click `index.html`. No build step, no install, no server required.

The only external request is Google Fonts — everything else works offline.

## 2. Make it yours

Open **`assets/js/content.js`** in any text editor (Notepad, VS Code, TextEdit). Every piece
of text on the site comes from that one file.

| Field | What it does |
| --- | --- |
| `meta.siteTitle` | Browser tab title and social preview title |
| `meta.description` | Search/social description |
| `profile` | Name, initials, role, location, timezone, email, phone, summary |
| `profile.availability` | The green badge in the hero (`state: "available"` or `"busy"`) |
| `stats` | The three numbers under the hero |
| `links` | The link directory — see below |
| `experience` | Jobs and bullet points |
| `projects` | The Projects section (shown on the site and the CV page) |
| `skills` | Skill groups and pills |
| `education` | Degrees, certifications and awards |
| `contact` | Heading and paragraph in the contact panel |
| `footer` | Footer notes |

Keep the quotes and commas intact. Save the file, refresh the page.

### Adding a link

Copy one block inside `links` and edit it:

```js
{
  label: "GitHub",
  mono: "GH",                          // 1–2 letters shown on the card
  handle: "@yourname",
  note: "Code and side projects.",
  url: "https://github.com/yourname",
  group: "work",                       // must exist in linkTags above
},
```

The filter buttons are generated automatically from whichever groups you use. Rename a
group in `linkTags` to change its button label, or add a new key there to create a new
category (for example `writing: "Writing"`).

### Adding a photo

1. Put your image in `assets/img/` (e.g. `portrait.jpg`, roughly square).
2. In `content.js`, remove the `//` in front of the `photo:` line:
   ```js
   photo: "assets/img/portrait.jpg",
   ```

Without a photo, the site shows your initials on a gradient tile — which also looks good.

### Changing the colours

In `assets/css/styles.css`, change the lines marked `ACCENT` near the top (`--accent` and
`--accent-soft`), plus the two marked `ACCENT (light)` in the light-theme block. The rest of
the palette adapts automatically.

## 3. The CV page

`cv.html` is generated from the same `content.js`, so it always matches the portfolio.
Open it, click **Download PDF**, and in the print dialog choose *Save as PDF* (A4, margins
default). The **Original PDF** link in the toolbar (and the "Résumé / CV" card) downloads
your uploaded CV at `assets/cv.pdf` instead — replace that file to update it.

`profile.summary` is the paragraph at the top, and `profile.phone` only appears here.
It is currently empty so the number stays off the public site.

## 4. Publish for free on GitHub Pages

1. Create a free account at [github.com](https://github.com).
2. Click **New repository**. Name it `portfolio` (or any name) and make it **Public**.
   For a shorter URL later, naming it `yourusername.github.io` is also an option.
3. On the new repo page, click **uploading an existing file**, then drag in everything from
   this folder — `index.html`, `cv.html`, `README.md`, and the whole `assets` folder.
   Keep the folder structure intact. Commit the changes.
4. Go to **Settings → Pages**. Under *Build and deployment* choose
   **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then **Save**.
5. Wait 1–2 minutes. Your site is live at `https://YOUR-USERNAME.github.io/portfolio/`
   (or `https://YOUR-USERNAME.github.io/` if you used the special repo name).

All links are relative, so the site works the same in a subfolder or at the root.

### After it's live

- Update the placeholder `og:url` (and add an `og:image` if you like) in `index.html` so
  link previews look right when you share the URL.
- Re-deploying is just uploading the changed file and committing again.

### Prefer the command line?

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Then enable Pages as in step 4.

## 5. Optional: your own domain

In **Settings → Pages → Custom domain**, enter your domain, add the DNS records GitHub
shows you, and enable *Enforce HTTPS* once it verifies. A `.com` costs money, but the
`github.io` address stays free.

## Good to know

- **Privacy:** everything you publish is public. The uploaded `assets/cv.pdf` still contains
  your phone number and email even though the website itself hides the phone. Replace that
  file with a version without the number if you'd rather not share it.
- **Theme:** the site remembers light/dark in `localStorage`; default is dark.
- **Printing the portfolio:** `Ctrl/Cmd + P` on the main page also produces a clean copy,
  with link URLs included. The CV page is the better option for applications.
- **Editing on GitHub:** you can edit `content.js` directly on github.com and commit — the
  site updates itself.
- **No tracking, no cookies, no build tools.** Just HTML, CSS and a little JavaScript.
