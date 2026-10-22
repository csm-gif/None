# Digi World — Phase 2: Design System

## Concept: noise into signal

Digi World's promise is to turn too much data into a clear next step. The visual system shows that idea literally, in one restrained motif: **scattered short marks (noise) that settle into one clean rising line (signal)**. The motif is used sparingly and never decoratively for its own sake.

| Where | How it appears |
|---|---|
| **Hero** | A fine measurement grid. On the left, about 230 short grey marks point in random directions. Moving right, they line up and converge onto one teal line, which ends at a single point. The labels are "noise" and "signal" in Plex Mono. The graphic is generated at build time from a fixed seed, so it is identical on every build and costs no JavaScript. With motion allowed, the line draws in once (280 ms). |
| **Section dividers** | A thin strip of jittery vertical ticks that flattens into a single teal rule. It separates major sections, at most twice per page. |
| **Icons** | 24px line icons in ink. Each has exactly **one** teal "signal point": the bar top on the analytics icon, the centre of the target, the dot of the question mark, and so on. |
| **Wordmark** | The two i-dots in "Digi World" are teal squares, the signal points within the name. |
| **Smaller echoes** | A dashed timeline that ends in a filled teal node. The "Noise vs Signal" comparison panel on Home has a faint striped texture behind the "noise" column. |

## Wordmark, favicon, share image

- **Wordmark:** `src/assets/img/logo.svg`. IBM Plex Sans SemiBold, converted to outlines, so it doesn't depend on the font being installed. The i-dots are separate shapes in the accent colour. The site uses it inline through an SVG `<symbol>`.
- **Favicon:** `favicon.svg`, plus `favicon.ico` (16/32/48 px), `apple-touch-icon.png` (180 px), and manifest icons (192/512 px). An ink square with a white "D" and a teal signal point.
- **Share image:** `og-image.png`, 1200×630. The wordmark, the headline "Know what's working. Fix what isn't.", and the hero graphic.

## Palette (CSS variables)

Ratios are WCAG 2.x contrast ratios, measured with a script.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `--ink` | `#0D1B2A` | Body text, dark bands | 16.2:1 on `--bg`, 17.4:1 on white |
| `--ink-2` | `#3A4858` | Secondary text | 8.7:1 on `--bg`, 8.1:1 on `--bg-2` |
| `--muted` | `#566373` | Labels, captions | 5.7:1 on `--bg`, 5.3:1 on `--bg-2` |
| `--bg` | `#F5F7F6` | Page background (cool neutral, slight green bias toward the accent) | n/a |
| `--bg-2` | `#EBF0EE` | Alternate bands | n/a |
| `--surface` | `#FFFFFF` | Cards, inputs | n/a |
| `--signal` | `#08705F` | The one accent: links, primary buttons, signal line | 5.6:1 on `--bg`; white text on it 6.0:1 |
| `--signal-strong` | `#055446` | Hover and active | 7.5:1 on tint; white on it 8.9:1 |
| `--signal-tint` | `#DFF0EB` | Success fills, definitions | `--signal` on it 5.1:1 |
| `--signal-on-ink` | `#5FD3BC` | Accent on dark bands and footer | 9.6:1 on `--ink`; ink text on it 9.6:1 |
| `--on-ink-2` | `#C9D2DA` | Secondary text on dark | 11.4:1 on `--ink` |
| `--line-strong` | `#7E8A93` | Input borders (non-text UI, needs 3:1) | 3.3:1 on `--bg`, 3.5:1 on white |
| `--error` | `#B42318` | Error text and borders | 6.1:1 on `--bg`, 6.6:1 on white |
| `--noise` / `--line` | `#AFBBC0` / `#D5DDDA` | Decorative only (noise marks, hairlines) | n/a (not information-bearing) |

All text pairs pass AA, and most pass AAA.

## Typography

There are two families, both self-hosted, using `font-display: swap`, latin subset only, 59 KB total:
- **IBM Plex Sans** (variable, 100–700) for everything you read. Headings are 600 weight with tight tracking (−0.02 to −0.03em), which gives a confident, engineered feel without a second display face.
- **IBM Plex Mono** (500) for data labels only: eyebrows, step numbers, dates, table headers, and "noise/signal". It is the "instrument readout" voice of a measurement-led consultancy.

| Token | Size | Use |
|---|---|---|
| `--fs-xs` | 13px | Mono labels, legal lines |
| `--fs-sm` | 15px | Card text, buttons, nav |
| `--fs-base` | 17px | Body (line-height 1.65) |
| `--fs-md` | 20px | Lead paragraphs, card titles |
| `--fs-lg` | 25px | H3 |
| `--fs-xl` | 28–38px (fluid) | Section H2 on detail pages |
| `--fs-2xl` | 34–52px (fluid) | H2 |
| `--fs-3xl` | 42–72px (fluid) | H1 |

The scale ratio is 1.25. Line length is capped at 68ch.

## Spacing, layout, radius, shadow

- **Spacing (8px scale):** 4 · 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px (`--s-0` to `--s-8`).
- **Layout:** a 12-column grid with a 1200px maximum content width. Gutters are 16px on mobile (including safe-area insets) and 32px from 768px. Breakpoints are 768, 1080 and 1440px.
- **Radius:** 4px for small chips and code, 8px for buttons and inputs, 12px for cards and panels. Pills are used only for the service jump links.
- **Shadows:** `--shadow-1` is a 1px resting lift for cards. `--shadow-2` is a soft 32px drop for hovered cards, the form card and the open mobile menu. There is no glass and no glow.

## Components and states

| Component | Default | Hover | Focus-visible | Active | Disabled | Error / success |
|---|---|---|---|---|---|---|
| **Primary button** | Teal fill, white 600 text, 48px min height (44px small, 56px large) | `--signal-strong` fill, arrow nudges 3px | 3px teal outline, 3px offset (mint on dark) | Moves down 1px | 55% opacity, not-allowed cursor | Loading: spinner on the icon, clicks blocked |
| **Secondary button** | Transparent, `--line-strong` border, ink text | `--bg-2` fill, ink border | Same as primary | Moves down 1px | Same as primary | n/a |
| **Link** | Teal, 1px underline | `--signal-strong`, 2px underline | 3px outline | n/a | n/a | n/a |
| **Input / select / textarea** | White, 1px `--line-strong` border, 48px min height | Border turns `--ink-2` | 3px teal outline, teal border | n/a | `--bg-2` fill, muted text | **Error:** 2px red border, pale red fill, red message with "!" icon and `aria-invalid`. **Valid after edit:** teal border |
| **Checkbox** | 22px native box, `accent-color` teal | n/a | Native focus ring | n/a | n/a | Error message below |
| **Card** | White, 1px hairline, 12px radius, `--shadow-1` | Linked cards: teal border, `--shadow-2`, lifts 2px | Outline around the whole card (`:has(:focus-visible)`) | n/a | n/a | n/a |
| **Form summary** | n/a | n/a | Receives focus on a failed submit | n/a | n/a | Red border box listing each error as a link to its field |
| **Form status** | n/a | n/a | Receives focus | n/a | n/a | **Error:** red box with email fallback. **Success:** redirect to /thank-you/ |

**Motion:** every transition is 180–280 ms, and all of it is turned off under `prefers-reduced-motion`. Content is fully visible without JavaScript.

There are no stock photos, AI-generated people, carousels, pop-ups, autoplay, neon, blobs or heavy glass. The consent notice is a slim, non-blocking bar at the bottom of the screen, not a modal.
