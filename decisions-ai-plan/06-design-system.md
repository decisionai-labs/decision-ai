# Design System

> **Source**: `web-app/app/globals.css` (864 lines)

---

## CSS Variables (Design Tokens)

```css
:root {
  /* Background */
  --bg-primary: #FAFAF8;
  --bg-surface: #FFFFFF;
  --bg-code: #F3F4F6;

  /* Text */
  --text-primary: #1A1A1A;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;

  /* Accent - Muted Teal */
  --accent: #14B8A6;
  --accent-hover: #0D9488;
  --accent-light: #CCFBF1;

  /* Borders */
  --border: #E5E7EB;
  --border-light: #F3F4F6;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.03);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.05);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.05);

  /* Timing */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Body | Inter | Base (1rem) | 400 |
| h1 | Inter | 3.5rem | 600 |
| h2 | Inter | 2.25rem | 600 |
| h3 | Inter | 1.5rem | 600 |
| h4 | Inter | 1.25rem | 600 |
| Code | JetBrains Mono | 0.875em | 400 |

---

## Tailwind Theme Extension

```css
@theme inline {
  --color-background: var(--bg-primary);
  --color-foreground: var(--text-primary);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-surface: var(--bg-surface);
  --color-border: var(--border);
  --color-muted: var(--text-secondary);
  --font-sans: "Inter", system-ui, ...;
  --font-mono: "JetBrains Mono", "Fira Code", ...;
}
```

---

## Animation Library

### Keyframes Available
| Animation | Effect | Duration |
|-----------|--------|----------|
| `fadeInUp` | Fade in + slide up 20px | 0.5s |
| `fadeIn` | Simple fade in | 0.3s |
| `slideInRight` | Fade + slide from right | 0.4s |
| `shimmer` | Background shimmer sweep | 3s loop |
| `float` | Vertical float ±10px | 3s loop |
| `glow-pulse` | Box-shadow teal glow pulse | 2s loop |
| `gradient-shift` | Background gradient animation | 3-15s loop |
| `bounce-subtle` | Small bounce ±5px | 2s loop |
| `scale-in` | Scale 0.95→1 + fade | 0.5s |
| `rotate-glow` | 360° rotation | Continuous |
| `wave` | Typing indicator wave | 1.2s loop |
| `border-glow` | Border color pulse | Continuous |
| `spin-slow` | Slow rotation | 8s loop |
| `typewriter` | Width 0→100% reveal | 2s |
| `fade-up` | Fade + translate Y | 0.6s |
| `slide-in-left` / `slide-in-right` | Directional slide-in | 0.5s |

### Utility Classes
| Class | Animation |
|-------|-----------|
| `.animate-fade-in-up` | fadeInUp |
| `.animate-fade-in` | fadeIn |
| `.animate-float` | 3s float |
| `.animate-float-slow` | 5s float |
| `.animate-float-delayed` | 3s float + 0.5s delay |
| `.animate-bounce-subtle` | Subtle bounce |
| `.animate-scale-in` | Scale entrance |
| `.animate-spin-slow` | 8s rotation |
| `.animate-gradient-x` | Gradient shift |
| `.animate-typewriter` | Typewriter effect |
| `.animate-wave-{1,2,3}` | Staggered wave dots |

### Stagger Delays
| Class | Delay |
|-------|-------|
| `.stagger-1` | 0.1s |
| `.stagger-2` | 0.2s |
| `.stagger-3` | 0.3s |
| `.stagger-4` | 0.4s |

---

## Glassmorphism

| Class | Background | Blur | Border |
|-------|------------|------|--------|
| `.glass` | rgba(255,255,255, 0.7) | 12px | white 0.3 |
| `.glass-dark` | rgba(26,26,26, 0.8) | 16px | white 0.1 |
| `.glass-subtle` | rgba(250,250,248, 0.85) | 20px | border 0.5 |

---

## Gradient Text

| Class | Colors |
|-------|--------|
| `.text-gradient` | Teal #14B8A6 → #0D9488 |
| `.text-gradient-purple` | Purple #8B5CF6 → #A855F7 |
| `.text-gradient-blue` | Blue #3B82F6 → #06B6D4 |
| `.text-shimmer` | Dark → Teal shimmer sweep |

---

## Glow Effects

| Class | Effect |
|-------|--------|
| `.glow-teal` | Static teal box-shadow |
| `.glow-teal-hover` | Teal glow on hover |
| `.glow-pulse-teal` | Pulsing teal glow |
| `.glow-border` | Gradient border glow on hover |

---

## Card Effects

| Class | Effect |
|-------|--------|
| `.card-shine` | Shine sweep on hover |
| `.card-lift` | 8px lift + shadow on hover |

---

## Scroll Reveal

| Class | Direction |
|-------|-----------|
| `.reveal` | Fade up (30px) |
| `.reveal-left` | Slide from left |
| `.reveal-right` | Slide from right |
| `.reveal-scale` | Scale from 0.9 |

Trigger by adding `.visible` class (via IntersectionObserver).

---

## Button Effects

| Class | Effect |
|-------|--------|
| `.btn-ripple` | Radial pulse on click |
| `.btn-glow` | Background glow on hover |

---

## To Rebuild
1. **Extract the design tokens** — CSS variables are reusable regardless of template
2. **Keep animation library if you like it** — or let the new template bring its own
3. **The `.glass` utilities** are useful for any modern UI
4. **Gradient text classes** are brand-specific — adapt to new colors
5. **The new template will replace `globals.css`** — merge useful tokens only
