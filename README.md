# rfmariano.it

Personal website. Live at [rfmariano.it](https://rfmariano.it).

Built with [Astro](https://astro.build).

## Stack

- Astro 6
- Tailwind CSS v4
- TypeScript
- Bun
- GitHub Pages

## Project structure

```
src/
├── components/    # Astro components (Layout, ProjectCard, i18n switcher, etc.)
├── data/          # JSON files for projects, i18n labels, participations
├── pages/         # EN/IT home pages and privacy policy pages
├── scripts/       # Client-side TS (language switcher)
├── styles/        # global.css
├── types/         # Shared TypeScript types
└── utils/         # i18n helpers
```

## Getting started

```sh
bun install
bun run dev      # → localhost:4321
bun run build    # → dist/
bun run preview  # preview production build locally
```

## i18n

- English: `/`
- Italian: `/it/`

Translations live in `src/data/i18n.json`. Text per language is resolved at build time via `src/utils/i18n.ts`.

## Deploy

Automatically deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.
