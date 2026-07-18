<div align="center">

# 💻 Ludwig Rex Olarte — Portfolio

### A React + TypeScript developer portfolio, built with Vite

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/status-active-5EEAD4?style=for-the-badge" />

</div>

---

## ✨ Overview

A dark-themed, "systems dashboard"–styled portfolio site — built to reflect the kind of work it showcases: real inventory, thesis, and academic systems, not just a template. Fully typed, component-based, and content is separated from layout so it's easy to update without touching design code.

## 🧩 Sections

| Section | What it shows |
|---|---|
| **Hero** | Terminal-style intro card, quick stack summary |
| **About** | Background, focus area, quick-facts card |
| **Skills** | Tools grouped by frontend / backend / data / tooling |
| **Projects** | Real repos — Auto Avenue IMS, PalengkeHub, Pharmacy Management System, ITELECT4 Project |
| **Contact** | Working `mailto:` button + copy-email fallback, LinkedIn, GitHub |

## 📁 Project structure

```
├── index.html              Vite entry HTML
├── src/
│   ├── main.tsx              React root render
│   ├── App.tsx                Assembles all page sections
│   ├── index.css               Global stylesheet (design system)
│   ├── data.ts                  Typed content — projects, skills, contact info
│   └── components/
│       ├── Nav.tsx               Sticky status bar + mobile menu
│       ├── Hero.tsx              Landing section with terminal card
│       ├── Reveal.tsx            Scroll-in fade animation wrapper
│       ├── About.tsx             About section
│       ├── Skills.tsx            Skills/tools grid
│       ├── Projects.tsx          Project cards (data-driven)
│       ├── Contact.tsx           Contact buttons (mailto + copy email)
│       └── Footer.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev
```

Then open the local URL VS Code / Vite prints (usually `http://localhost:5173`).

## ✏️ Editing content

Everything you'd actually want to change day-to-day lives in **`src/data.ts`**:
- `projects` — add, remove, or edit project cards
- `skillGroups` — update your tools/languages
- `contact` — email, LinkedIn, GitHub links

No need to touch component files just to update text.

## 🏗️ Building for production

```bash
npm run build
```

Outputs a static, deployable site to `dist/`.

## 🌐 Deploying it live

<details>
<summary><b>Vercel</b> (recommended — easiest, auto-redeploys on push)</summary>

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click **Add New Project** → import your repo
4. Vercel auto-detects Vite — click **Deploy**

</details>

<details>
<summary><b>Netlify</b></summary>

1. Push to GitHub, import the repo in Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

</details>

<details>
<summary><b>GitHub Pages</b></summary>

1. Run `npm run build`
2. Deploy the `dist/` folder using [`gh-pages`](https://www.npmjs.com/package/gh-pages) or a GitHub Actions workflow

</details>

## 🛠️ Tech stack

`React` · `TypeScript` · `Vite` · `CSS`

## 📬 Contact

**Ludwig Rex Olarte** — BSIT, System Development, De La Salle Lipa

[LinkedIn](https://www.linkedin.com/in/ludwigrexolarte/?skipRedirect=true) · [GitHub](https://github.com/lordwig) · ludwigrexolarte1002@gmail.com

---

<div align="center">
<sub>Built with intent, not templates.</sub>
</div>
