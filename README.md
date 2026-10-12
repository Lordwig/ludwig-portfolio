<div align="center">

# Ludwig Rex Olarte — Portfolio

**React · TypeScript · Vite**

</div>

An interactive portfolio: layered parallax background, browser-window project previews, and a certificate gallery.

## Run it

```bash
npm install
npm run dev
```

## Add your own content

| What | Where |
|---|---|
| Your photo | `public/profile.jpg` |
| Your resume (opens in a new tab) | `public/resume.pdf` |
| Project screenshots | `public/projects/` — filenames are listed per project in `src/data.ts`. The first one is the card cover |
| **Certificates** | Drop the image files into **`src/assets/certs/`** — they appear automatically |

### Certificates
Put images (`.png`, `.jpg`, `.jpeg`, `.webp`) in `src/assets/certs/`. The title is made from the filename:
`aws-cloud-practitioner.png` → "Aws Cloud Practitioner".
For a nicer title / issuer / year, add an entry to `certificateInfo` in `src/data.ts` (key = filename without extension).
No images in the folder = the Certificates section and its menu link are hidden.

### Live project previews
In `src/data.ts`, give a project a `liveUrl`:

```ts
liveUrl: 'https://your-project.vercel.app',
```

Its popup then shows the real site inside a browser window (with a Screenshots tab too). Projects without a `liveUrl` show their screenshots instead.
Some sites refuse to be embedded in other pages — the popup has an "open in a new tab" link for that case.

## Project structure

```
index.html
public/                     profile.jpg · resume.pdf · projects/
src/
├── data.ts                 ALL your content: projects, skills, links
├── certificates.ts         auto-loads images from src/assets/certs
├── index.css               the whole design system
├── App.tsx
├── assets/certs/           ← drop certificate images here
└── components/
    ├── Background.tsx      layered parallax shapes (scroll + mouse)
    ├── Nav.tsx · Hero.tsx · About.tsx · Skills.tsx
    ├── Projects.tsx        project rows
    ├── BrowserFrame.tsx    browser-window mockup
    ├── ProjectModal.tsx    popup: live preview / screenshots
    ├── Certificates.tsx · Lightbox.tsx
    ├── RadarChart.tsx · Reveal.tsx
    └── Contact.tsx · Footer.tsx
```

## Deploy

Push to GitHub; Vercel rebuilds automatically on every push.

```bash
git add .
git commit -m "update portfolio"
git push
```
