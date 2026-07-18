# Nandika Kohli Website

This repo contains an older React/Vite app at `personal-website/`, but the live site is the SvelteKit app in `personal-website/svelte-website/`.

Run all day-to-day commands from this `personal-website` folder:

```sh
npm run dev
```

Use that for editing locally. It starts the SvelteKit site without the GitHub Pages `/nandika-kohli` base path.

Before pushing changes:

```sh
npm run check
npm run build
```

To test the exact GitHub Pages build locally:

```sh
npm run build:pages
npm run preview:pages
```

GitHub Actions uses the same `npm run build:pages` command, so the deploy build and the local Pages test stay aligned.
