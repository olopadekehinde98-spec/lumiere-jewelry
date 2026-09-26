# Lumière Fine Jewelry

Jewelry house showcase — collections, craft, materials and bespoke commissions. React 19 + TypeScript + Vite, Tailwind CSS v4, Framer Motion, Lucide icons.

**Live:** https://lumiere-jewelry-three.vercel.app

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Structure

- `src/sections/` in scroll order: `Hero` (drifting sparkles over a slow push-in) → `Collections` (six cards, each with a shine sweep on hover) → `Craft` → `Materials` → `Custom` → `Occasions`.
- `src/components/` — `Navbar`, `Img` (CDN image with a blurred placeholder), `SplitLines`, `Reveal`, `Overlays` (the consultation and search dialogs), `Footer`.
- `src/data/content.ts` — collections, materials, craft steps, occasions and all copy. Edit content here, not in sections.
- `src/hooks/` — `useSectionProgress`, `useMediaQuery`.
- `src/lib/` — `image.ts` (Unsplash CDN URLs + `srcset`), `ui.ts` (easing, scroll helpers, dialog state).
- Design tokens live in the `@theme` block of `src/index.css` — Tailwind v4, so there is no `tailwind.config.js`.

## Notes

`useSectionProgress` wraps `useScroll` in an identity `useTransform`, which keeps Framer from handing scroll-linked values to the browser's native ScrollTimeline where multi-stop ranges desync.

Motion respects `prefers-reduced-motion` through `MotionConfig reducedMotion="user"`. Any grid cell wrapping a horizontal rail needs `min-w-0`, or the rail sets the column width and the page overflows sideways on a phone.

Images are served from the Unsplash CDN with a blurred low-quality placeholder behind each one; swap the photo ids in `content.ts` for the client's own photography before launch.
