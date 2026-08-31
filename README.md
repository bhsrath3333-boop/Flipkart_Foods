# Flipkart Foods — Demo Prototype

A clickable, front-end-only prototype of **Flipkart Foods**: a food-ordering
app with a Regular mode, a `<20-min` certified **TiffinX** mode, and a
**Restaurant Partner** dashboard. Built with React + Vite. All data is
mocked/hardcoded — there is no backend or real auth, by design (this is a
presentation demo).

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL (defaults to `http://localhost:5173`). The app is
designed for a phone-sized viewport (works best around 420px wide — resize
your browser window down, or open dev tools device toolbar).

## What's in here

- **Demo mode toggle** (top of screen) — flips between Customer View and
  Restaurant Partner View, the core demo mechanic.
- **Customer View**: home feed with occasion-based banners (use the 🎛️
  floating button to switch context — Exam Eve, Night Shift, Freshers Week,
  Fest/Farewell, Late-Night Coffee), Regular vs TiffinX menu toggle, full
  order flow (menu → detail → cart → checkout → live countdown tracking),
  SuperCoins wallet, Refer-a-Friend, in-app contextual nudges (tap the 🔔),
  a campus-ID onboarding flow, and a "why TiffinX is fast" info modal.
- **Restaurant Partner View**: order forecast chart, live incoming-demand
  panel, campus events calendar, commission tiers + paid promotion
  budget/reach simulator, and a kitchen capacity traffic light.

## Notes for the presenter

- The TiffinX order countdown is accelerated for the demo (~45s wall-clock
  for the certified flow, ~90s for regular) so the ring completes live on
  stage instead of over a real 20/40 minutes.
- The "Incoming Demand" and "Kitchen Capacity" panels on the restaurant
  dashboard have deliberate demo controls (auto-incrementing counter, a
  drag slider) to make the live/real-time feel tangible without a backend.
