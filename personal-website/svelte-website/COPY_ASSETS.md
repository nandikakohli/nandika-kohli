# Copy Assets Instructions

Please copy all files from `personal-website/public/` to `personal-website/svelte-website/static/`

Required files:
- profile-new.jpeg
- profile-backup.jpg
- Master Resume.docx.pdf
- Primary Care - Poster.pdf
- WhatsApp Image 2024-12-09 at 12.43.08_65a96428.jpg
- baymax-cute-cartoon-robot-with-friendly-design-TwJbeC1k.jpg
- vite.svg
- favicon.png (optional, using Baymax image instead)

You can do this manually or run:
```powershell
Copy-Item -Path "personal-website\public\*" -Destination "personal-website\svelte-website\static\" -Force
```

