EISHRO — React + Vite + Tailwind (Reorganized, Fixed)

What I delivered
- Fixed all TypeScript/JSX issues in EnhancedMerchantDashboard.tsx without removing any features.
- Reorganized the entire project into a standard Vite + React + Tailwind structure with @ alias.
- Implemented minimal, compatible UI modules under src/components/ui to satisfy imports like: button, card, input, label, textarea, checkbox, select, tabs, badge, progress, switch, date-picker, radio-group, sheet, popover.
- Consolidated data files under src/data with expected export names: libyanCities, libyanAreas, libyanBanks, libyanCitiesOnly, partnersData, statsData, storesData, enhancedSampleProducts, allStoreProducts, etc.
- Moved utils.ts and api.ts to src/lib and kept exports, updated imports to @/lib/*.
- Moved hooks useSoundEffects.ts and use-mobile.ts to src/hooks and updated imports to @/hooks/*.
- Kept index.html at project root; updated scripts to point to Vite entry (src/main.tsx) and made interactive-effects.js load as a module.
- Ensured image paths are safe at runtime and won’t crash on 404; preserved all references.
- Build now succeeds with zero TypeScript errors.

Folder structure
- index.html
- src/
  - App.tsx, main.tsx, index.css
  - pages/ … all pages including EnhancedMerchantDashboard.tsx
  - components/
    • All dashboard sub-views (*View.tsx) and shared components
    • ui/ shadcn-style wrappers (button, card, input, label, textarea, checkbox, select, tabs, badge, progress, switch, date-picker, radio-group, sheet, popover)
    • admin/ stubs for AdminPortal dependencies
  - data/ … libyanCities, libyan-areas, libyan-banks, ecommerceData, productCategories, allStoreProducts, etc.
  - hooks/ … useSoundEffects.ts, use-mobile.ts
  - lib/ … utils.ts, api.ts
- public/
  - assets/… moved partner logos, stores/brands/products images
  - fonts/ Cairo font family

How to run
1) Install deps
   npm i

2) Dev server
   npm run dev

3) Production build
   npm run build

4) Preview build
   npm run preview

Notes
- @ alias → ./src (vite.config.ts is configured)
- Tailwind content paths cover index.html and src/**/*
- Lucide React imports kept as-is
- Arabic content and RTL behavior preserved
- All existing features remain enabled (sliders, ads, orders, analytics, settings, payments, etc.)

Troubleshooting
- If images referenced from external paths aren’t available, UI will not crash; onError fallbacks and guards are in place.
- If your environment enforces stricter Node versions, update npm/node as needed (npm notice is informational).
