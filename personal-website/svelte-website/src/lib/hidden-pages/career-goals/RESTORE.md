# Restoring Career Goals

The Career Goals page is temporarily hidden from the published site.

To show it again:

1. Move `src/lib/hidden-pages/career-goals/+page.svelte` back to `src/routes/career-goals/+page.svelte`.
2. Add this link back to `src/routes/+layout.svelte` inside `.nav-links`:

```svelte
<a href="{base}/career-goals">Career Goals</a>
```

3. Rebuild and redeploy the site.
