## Project layout

```
src/
  data/            content: projects, experiences, education, CV, contact links
  locales/en|fr/   interface text, one JSON file per page
  theme/           theme.const.ts holds every token (colours, type, spacing, motion);
                   it feeds both the MUI theme and the CSS variables
  Pages/           one folder or file per route
  Components/      layout, motion helpers, decoration
  assets/projects/ project screenshots and videos (see below)
scripts/
  generate-cv.mjs  prints /cv/en and /cv/fr to public/resume*.pdf
  prerender.mjs    writes dist/<route>/index.html and dist/sitemap.xml
```

## Content

Projects live in `src/data/projects.data.ts`. Each entry is written in English, with an optional `fr` block for the fields that change. Projects marked `featured: true` get a page at `/projects/<id>`; the others are listed in the archive.

Media: put files in `src/assets/projects/<project-id>/`, named `NN-short-name.ext` (webp, avif, png, jpg, webm or mp4). They are shown in name order. The alt text comes from the name (`02-control-panel` becomes "Control panel"); set `mediaAlt` on the project to override it. Videos play muted on a loop, or show controls when the visitor prefers reduced motion.

URLs: English pages are at the root (`/projects`), French pages under `/fr` (`/fr/projects`). Paths in the code are written without the prefix.

## Scripts

- `npm run dev`: development server
- `npm run build`: type check, CV PDFs, Vite build, then prerender and sitemap
- `npm run preview`: serve the built site
- `npm run lint`: ESLint
- `npm run cv:pdf` / `npm run prerender`: run one build step on its own

The two Puppeteer steps skip themselves with a warning when Chrome cannot start (set `CV_PDF_STRICT=1` or `PRERENDER_STRICT=1` to fail instead). Without prerendering the site still works as a plain SPA.

## Deployment

Serve the `dist/` folder as static files. Each route must resolve to its own prerendered file before falling back to the app shell, for example with nginx:

```nginx
location / {
    try_files $uri $uri/index.html /index.html;
}

location /assets/ {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## License

GPL-3.0, see [LICENSE](LICENSE).
