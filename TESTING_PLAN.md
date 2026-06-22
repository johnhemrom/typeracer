# Scripture Racer — End-to-End Testing Plan

## Setup
- Run `npm run dev` and open `http://localhost:5173/`
- Clear localStorage before starting: DevTools → Application → Local Storage → Clear All
- Have DevTools Console open to catch errors

---

## Phase 0 — Foundation

### P0.1 Page Loads
- [ ] Page loads without console errors
- [ ] Title "Scripture Racer — Bible Verse Typing Game" is displayed
- [ ] A verse is loaded in the parchment card on first load

### P0.2 Typing Works
- [ ] Click in the typing input field
- [ ] Type the first few words of the displayed verse
- [ ] Characters turn **green** (correct) or **red** (incorrect) in the verse display
- [ ] The active character has a **cursor underline**

### P0.3 Verse Completion
- [ ] Type the entire verse correctly
- [ ] A **bell sound** plays on completion
- [ ] The **completion modal** appears with WPM, Accuracy, Time stats
- [ ] An **encouragement blessing** is shown
- [ ] A **stamp sound** plays after ~600ms
- [ ] Click **Try Again** — same verse reloads
- [ ] Click **New Verse** — a new random verse loads

---

## Phase 1 — Quick Wins

### P1.1 Streak Persistence
- [ ] Complete 2 verses in a row
- [ ] The **streak badge** shows "2 Verse Streak!"
- [ ] **Refresh the page** (F5)
- [ ] Streak badge still shows "2 Verse Streak!" (persisted in localStorage)

### P1.2 Theme Toggle
- [ ] Click the theme button (🕯️)
- [ ] Theme changes to **Dark** (🌙 icon, dark background)
- [ ] Click again — changes to **Sepia** (🕯️ icon, warm tones)
- [ ] Click again — back to **Light** (☀️ icon)
- [ ] **Refresh** — theme persists

### P1.3 Timer Accuracy
- [ ] Start typing a verse
- [ ] Timer updates smoothly (not jerky 1-second jumps)
- [ ] After completion, the time shown matches roughly what you'd expect (no drift)

### P1.4 Sound Toggle Persistence
- [ ] Click sound button (quill icon) to mute
- [ ] Button gets a **muted** visual state
- [ ] Type — no clicking sounds
- [ ] **Refresh** — sound is still muted

---

## Phase 2 — Structure & Maintainability

### P2.1 Separate Files
- [ ] DevTools → Sources tab shows `app.js` and `styles.css` as separate files
- [ ] No embedded `<style>` or `<script>` in HTML (except the 4-line SW registration)

### P2.2 Vite Build
- [ ] Run `npm run build` — succeeds with **no warnings**
- [ ] Output in `dist/` contains `index.html`, `assets/*.css`, `assets/*.js`, `manifest.json`, `sw.js`

### P2.3 Accessibility
- [ ] Completion modal has `role="dialog"` and `aria-modal="true"`
- [ ] Tab key cycles through modal buttons only (focus trap)
- [ ] Escape key closes the modal and loads a new verse
- [ ] The stats bar has `role="status"` and `aria-live="polite"`
- [ ] Background has `aria-hidden="true"` when modal is open

---

## Phase 3 — Content & Replayability

### P3.1 Custom Verse Input
- [ ] Click the **✍️** button in the header
- [ ] Custom verse section **slides down** with a textarea and buttons
- [ ] Click **✍️** again — it **hides**

### P3.2 Start Custom Typing
- [ ] Open custom section, paste/type a verse (e.g. "God is love.")
- [ ] Leave it empty and click **Start Typing** — textarea border turns red briefly (validation)
- [ ] Type a verse and click **Start Typing**
- [ ] Section hides, verse loads, you can type it
- [ ] On completion, ref shows "Custom Verse"

### P3.3 Fetch Random Verse
- [ ] Open custom section, click **📖 Fetch Random**
- [ ] Button shows a **spinner** and "Fetching..."
- [ ] Loading **skeleton lines** appear in the verse card
- [ ] After fetch, the verse card shows the fetched Bible verse with reference
- [ ] Fetch a few times — different verses appear each time

### P3.4 Fetch Fallback
- [ ] Disconnect internet (DevTools → Network → Offline)
- [ ] Click **📖 Fetch Random**
- [ ] Button shows "Fetch Failed — Try Again" for 2 seconds
- [ ] Falls back to a local verse

### P3.5 Loading State
- [ ] Click **📖 Fetch Random** with fast internet
- [ ] Skeleton shimmer is visible briefly while loading
- [ ] Smooth transition from skeleton to real verse content

---

## Phase 4 — Competitive & Engagement

### P4.1 High Scores Leaderboard
- [ ] Click the **🏆** button in the header
- [ ] Leaderboard panel opens with Easy / Medium / Hard tabs
- [ ] Shows "No scores yet" initially
- [ ] Complete a verse on **Easy** difficulty
- [ ] Open leaderboard → Easy tab shows your score (WPM, accuracy, ref, date)
- [ ] Medal emojis for top 3 (🥇🥈🥉)
- [ ] Switch tabs — Medium/Hard show their own scores

### P4.2 Leaderboard Persistence
- [ ] Complete multiple verses, creating top entries
- [ ] Only **top 10** per difficulty are kept
- [ ] **Refresh** — scores are still there

### P4.3 Progress History
- [ ] Click the **📊** button in the header
- [ ] Progress panel opens showing:
  - **Total Verses** completed
  - **Best WPM** ever
  - **Avg Accuracy** across all verses
  - **Current Streak**
- [ ] A **Canvas line chart** shows WPM trend over your last 30 verses
- [ ] Below the chart, a scrollable list of recent entries (WPM, accuracy, ref, date)

### P4.4 Progress Chart
- [ ] Complete 3+ verses
- [ ] Open progress panel
- [ ] Chart shows a **line with dots** for each completed verse
- [ ] Y-axis has WPM labels, X-axis has dates
- [ ] Works in **Dark** and **Sepia** themes (colors adapt)

### P4.5 Share Results
- [ ] Complete a verse
- [ ] In the modal, click **📋 Share** button
- [ ] A tooltip "Copied!" appears above the button
- [ ] Paste anywhere (e.g. Notepad) — text contains:
  ```
  ✝️ Scripture Racer
  📖 John 3:16
  ⚡ 85 WPM
  🎯 98% accuracy
  ⏱ 45s
  "Type the Word. Know the Word."
  ```
- [ ] If clipboard fails, button shows "❌ Copy failed" then resets

### P4.6 Leaderboard / Progress Close
- [ ] Click **Close** button — panel closes
- [ ] Click outside the panel (overlay backdrop) — panel closes
- [ ] Press **Escape** — panel closes

---

## Phase 5 — Polish & Offline

### P5.1 Service Worker
- [ ] Open DevTools → Application → Service Workers
- [ ] "scripture-racer-v1" is registered and **activated**
- [ ] Go offline (DevTools → Network → Offline)
- [ ] **Refresh the page** — it still loads (app shell cached)

### P5.2 PWA Manifest
- [ ] Open DevTools → Application → Manifest
- [ ] Shows name "Scripture Racer", description, theme color `#F3E5C8`
- [ ] Icons listed at 192x192 and 512x512
- [ ] Display is "standalone"

### P5.3 Meta Tags
- [ ] View page source
- [ ] `<meta name="description">` exists and is descriptive
- [ ] `<meta property="og:title">` and `og:description` exist
- [ ] `<meta name="theme-color" content="#F3E5C8">` exists
- [ ] `<link rel="manifest">` points to `manifest.json`

### P5.4 Font Loading
- [ ] Google Fonts URL has `&display=swap` (text remains visible during font load)
- [ ] No "FOUT" (Flash of Unstyled Text) — or it's minimal

### P5.5 Favicon
- [ ] The browser tab shows a **cross icon** (red cross on transparent background)

### P5.6 Vite Build Clean
- [ ] Run `npm run build`
- [ ] No warnings or errors
- [ ] Output files are in `dist/`

---

## Cross-Cutting Concerns

### Difficulty Filter
- [ ] Select "Easy" — verses are short (<100 chars)
- [ ] Select "Medium" — verses are medium length
- [ ] Select "Hard" — verses are long (>300 chars)
- [ ] High scores are tracked **per difficulty**

### Translation Filter
- [ ] Select "KJV Only" — verses are King James Version
- [ ] Select "ESV Only" — verses are ESV
- [ ] "All Translations" shows everything

### Theme Consistency
- [ ] Leaderboard panel respects theme colors
- [ ] Progress panel respects theme colors
- [ ] Chart line/background colors adapt to dark mode
- [ ] Modal respects theme colors

### Keyboard Shortcuts
- [ ] Press any letter key while modal/panel is closed — focus goes to typing input
- [ ] Escape closes modal/panels
- [ ] Enter in modal triggers "New Verse"
- [ ] Tab cycles buttons in modal (focus trap)

---

## Test Matrix (Quick Run)

For a quick smoke test, run these in order:

```
1.  Open page                     → verse loads, no errors
2.  Type a verse                  → green/red chars, timer runs
3.  Complete verse                → modal with stats, blessing
4.  Click New Verse               → new verse loads
5.  Toggle theme (3 times)        → Dark → Sepia → Light
6.  Mute sound                    → no click sounds
7.  Click ✍️ + type verse + Start → custom verse works
8.  Click 📖 Fetch Random         → API verse loads with skeleton
9.  Click 🏆                      → leaderboard shows scores
10. Click 📊                      → progress chart renders
11. Complete verse → click 📋     → clipboard copy works
12. Refresh                       → streak, theme, sound persist
13. Go offline → refresh          → page still loads (SW cache)
```
