# Restoring Credits, Thanks, and Acknowledgments

The Credits, Thanks, and Acknowledgments page is temporarily hidden from the published site.

To edit it while it is hidden, update:

`src/lib/hidden-pages/citations/+page.svelte`

To show it again:

1. Move `src/lib/hidden-pages/citations/+page.svelte` back to `src/routes/citations/+page.svelte`.
2. Add this link back to `src/routes/+layout.svelte` inside `.nav-links`:

```svelte
<a href="{base}/citations">Credits, Thanks, and Acknowledgments</a>
```

3. Rebuild and redeploy the site.
