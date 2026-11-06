# didulana.github.io

Personal portfolio of **Didulana Lokugamage**, Computer Engineering undergraduate at the University of Peradeniya.

Live at **https://didulana.github.io**

Built with React 18, TypeScript, Vite, Tailwind CSS and Framer Motion. Deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

Requires Node.js 18 or newer (CI uses Node 20).

## Editing content

All text lives in `src/data/`, so content changes don't need any layout code:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, links (email, GitHub, LinkedIn, CV), hero terminal lines, scrolling tool strip |
| `projects.ts` | Project cards: problem, what I did, stack, GitHub/demo links |
| `skills.ts` | Skill groups and where each was used |
| `experience.ts` | Leadership roles, awards, certifications |

Empty values in `profile.ts` (`email`, `linkedin`, `resumeUrl`) are hidden on the site automatically.

## Project structure

```
index.html            page shell, meta tags, fonts, theme pre-paint script
src/
  App.tsx             section order
  index.css           theme colours (light/dark CSS variables) and effects
  components/         one file per section, plus shared motion helpers
  data/               all site content
public/               static files served as-is (favicon, CV PDF)
.github/workflows/    GitHub Pages deployment
```

To change the colour theme, edit the CSS variables at the top of `src/index.css`.

## Deployment

`.github/workflows/deploy.yml` installs dependencies, builds the site and publishes `dist/` to GitHub Pages whenever `main` is pushed. It can also be run manually from the **Actions** tab (“Run workflow”).
