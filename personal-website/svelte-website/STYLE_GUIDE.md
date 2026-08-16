# Website Style Guide

This guide captures the current visual direction for the personal website. Use it when adding new sections, editing project cards, or adjusting shared layout styles.

## Design Personality

The site should feel technical, personal, calm, and hands-on. It is a robotics portfolio, so the design can reference engineering notebooks, CAD work, project logs, and lab documentation without becoming visually heavy.

Aim for:

- Clean technical layouts with generous breathing room.
- Warm paper-like surfaces instead of bright white whenever content sits on the projects page.
- Blue and purple accents used with restraint.
- Real project media, PDFs, videos, robot photos, and 3D models as the main visual interest.
- Soft borders and minimal shadows. Avoid glowing effects unless intentionally used for a separate interactive/timeline page.

Avoid:

- Bright neon glow around content boxes.
- One-off card colors that do not match the surrounding section.
- Large decorative gradients, blobs, or purely ornamental effects.
- Marketing-page composition for project content.
- Overly rounded cards or pill-heavy UI.

## Color System

Use the CSS variables in `src/app.css` as the source of truth.

Primary palette:

- `--deep-blue: #1931AB` for headings and strong UI text.
- `--royal-blue: #234DC2` for secondary blue accents.
- `--vibrant-purple: #685DCE` for primary accents, hover states, and borders.
- `--soft-lavender: #917AD3` and `--light-purple: #AB85DC` for softer accent moments.
- `--accent-pink: #E2A9DB` for rare highlight details.
- `--warm-peach: #FFC198` for small badges or warm emphasis.

Neutral surfaces:

- Site background: `#fafaf5`.
- Projects page background: `#f3f1e7`.
- Home cards: `var(--card-bg)` or `rgba(255, 255, 255, 0.85)`.
- SO-101/project-log boxes: `rgba(243, 241, 231, 0.7)`.

Text:

- Main text: `--text: #1a1539`.
- Supporting text: `--text-light: #4a4563`.

## Typography

The site uses monospace typography throughout.

- Headings: `JetBrains Mono`, falling back to `Roboto Mono`.
- Body: `Roboto Mono`, falling back to system monospace.
- Keep letter spacing at `0` unless there is a narrow, intentional label treatment.
- Use headings for content structure, not decoration.
- Inside cards and panels, keep heading sizes compact and scannable.

Recommended hierarchy:

- Page titles: large, prominent, blue or gradient only on the homepage title.
- Section headings: `var(--deep-blue)`, medium weight, compact spacing.
- Card headings: `var(--deep-blue)`, smaller than section headings.
- Body copy: `var(--text-light)` for general content, `var(--text)` when the content needs stronger presence.

## Surfaces And Cards

Cards should look like quiet project notes, not floating neon panels.

Default content box:

```css
background: rgba(243, 241, 231, 0.7);
border: 1px solid rgba(104, 93, 206, 0.2);
border-radius: 12px;
box-shadow: none;
```

Use this for:

- SO-101 overview text.
- SO-101 skills box.
- The "Website updated 2026" footer box.
- Similar project-log or documentation panels.

Home-page blurbs can use the lighter home card treatment:

```css
background: var(--card-bg);
border: 1px solid rgba(104, 93, 206, 0.2);
border-radius: 12px;
box-shadow: none;
backdrop-filter: blur(6px);
```

Project cards:

- Keep `box-shadow: none`.
- Use a purple-tinted border.
- Use `border-radius` around `12px` to `14px`.
- Use consistent padding: usually `1rem` for cards and `1.25rem 1.5rem` for text panels.

## Layout

General pages:

- Use `.page` with top padding that clears the fixed nav.
- Keep content max width around the existing `1200px` rhythm unless a project layout needs extra room.
- Prefer grids and structured rows for technical content.

Homepage:

- Keep the intro text and profile photo visually balanced.
- Let the background image do the visual work.
- Keep text boxes readable and lightly translucent.

Projects page:

- Use the warm grid background.
- Let project media define the section.
- Keep SO-101 as a wide, technical project showcase with the text overview, iteration timeline, video, ACT plan, 3D model, and skills panel.
- Avoid adding decorative cards inside cards.

Responsive behavior:

- Collapse multi-column layouts to one column on tablet/mobile.
- Ensure buttons, nav links, captions, and project cards do not overflow.
- Fixed-format media should use explicit width, height, aspect ratio, or max-width rules.

## Media

Use real project artifacts whenever possible:

- Robot photos.
- Embedded PDFs.
- Demonstration videos.
- 3D models.
- Iteration images.

Media styling:

- Images and iframes should use subtle borders: `1px solid rgba(104, 93, 206, 0.2)`.
- Use `border-radius: 10px` for media.
- Avoid heavy shadows on images.
- Use descriptive `alt` text for images and `title` for iframes.

## Navigation And Links

Navigation should feel lightweight and technical.

- Fixed transparent nav with blur is the default.
- Nav text uses `var(--deep-blue)`.
- Hover states can shift to `var(--vibrant-purple)`.
- Underline hover effect can use the existing blue-purple-lavender gradient.
- Keep icon buttons compact and familiar.

## Motion And Interaction

Motion should be subtle.

Use:

- Small hover lifts on nav/home controls.
- Gentle image scale on project iteration thumbnails.
- Svelte fade for homepage entrance.

Avoid:

- Animated glow around content cards.
- Constant motion near dense reading content.
- Hover effects that change layout size.

## Content Voice

The writing should sound specific, reflective, and project-based.

Prefer:

- Concrete work done.
- Technical systems and constraints.
- Collaboration, ownership, iteration, and learning.
- Short project summaries followed by scannable details.

Avoid:

- Generic portfolio claims.
- Long unbroken paragraphs unless they are intentionally used as a project overview.
- Repeating the same accomplishment wording across sections.

## Implementation Rules

When adding or editing styles:

- Reuse existing CSS variables before adding new colors.
- Match nearby boxes before inventing a new style.
- Keep shadows off project content unless there is a clear reason.
- Use `rgba(243, 241, 231, 0.7)` for warm project-document boxes.
- Use `var(--card-bg)` for home-page translucent content.
- Keep all card borders in the purple family.
- Add new component classes near related sections in `src/app.css`.

Before finishing a visual change:

- Check the homepage and projects page.
- Confirm the footer update box matches the SO-101 text boxes.
- Confirm mobile layouts do not overlap.
- Run `npm run build`.
