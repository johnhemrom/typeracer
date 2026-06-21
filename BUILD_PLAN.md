# Scripture Racer — Build Plan

## Phase 0: Foundation & GitHub Setup

- [ ] Push to GitHub (create repo, initial commit)
- [ ] Add `.gitignore` (already done — `.vercel` ignored)
- [ ] Set up `package.json` with basic dev server (e.g. `live-server` or `vite`)

---

## Phase 1: Quick Wins (30 min each)

| # | Task | Why |
|---|---|---|
| 1 | **Persist streak & settings via `localStorage`** | Streak, sound toggle, difficulty, translation filter all reset on reload. Save/restore in `localStorage`. |
| 2 | **Dark / Sepia theme toggle** | Add `data-theme` attribute swap on `<html>` with CSS custom properties. Simple button in header. |
| 3 | **Timer accuracy fix** | Replace `setInterval`-based timer with `requestAnimationFrame` + elapsed time from `startTime`. Fixes drift. |
| 4 | **Sound toggle persistence** | Save `soundEnabled` to `localStorage` so user preference survives reload. |

**Estimated total: 2 hours**

---

## Phase 2: Structure & Maintainability

| # | Task | Why |
|---|---|---|
| 5 | **Split into separate files** | Extract CSS → `styles.css`, JS → `app.js`. Single 1947-line file is hard to navigate. |
| 6 | **Add build tooling** | `npm init`, add `vite` for dev server + hot reload. Add `build` script for minification. |
| 7 | **Fix accessibility** | Add ARIA roles, labels, `role="dialog"` on modal, focus trapping, screen reader announcements. |

**Estimated total: 2.5 hours**

---

## Phase 3: Content & Replayability

| # | Task | Why |
|---|---|---|
| 8 | **Integrate Bible API** | Replace 32 hardcoded verses with dynamic fetch (e.g. `bible-api.com` or `scripture.api.bible`). Infinite variety. |
| 9 | **Add loading / error states** | Spinner while fetching, graceful fallback to cached verses if offline. |
| 10 | **Custom verse input mode** | Textarea to type/paste any passage. Great for memorization practice. |

**Estimated total: 4 hours**

---

## Phase 4: Competitive & Engagement Features

| # | Task | Why |
|---|---|---|
| 11 | **High scores / leaderboard** | Track best WPM per difficulty. Show top 10 in a panel. Stored in `localStorage`. |
| 12 | **Verse history & progress tracking** | Log completed verses, WPM over time, accuracy trends. Simple chart using Canvas or SVG. |
| 13 | **Share results** | Share WPM/accuracy on social media or copy as text. |

**Estimated total: 3 hours**

---

## Phase 5: Polish & Offline

| # | Task | Why |
|---|---|---|
| 14 | **Service worker (offline support)** | Cache app shell so it works without internet — important for a Bible tool. |
| 15 | **SEO / meta tags / PWA manifest** | Open Graph tags, `manifest.json`, app icons. Makes it installable as a PWA. |
| 16 | **Performance audit** | Optimize clip-path rendering, lazy-load Google Fonts, add `font-display: swap`. |

**Estimated total: 3 hours**

---

## Summary

| Phase | Focus | Est. Time |
|---|---|---|
| 0 | GitHub + Setup | 30 min |
| 1 | Quick Wins | 2 hr |
| 2 | Structure | 2.5 hr |
| 3 | Content | 4 hr |
| 4 | Engagement | 3 hr |
| 5 | Polish | 3 hr |
| **Total** | | **~15 hours** |
