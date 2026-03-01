# UI Component Inventory

> **Source**: `web-app/components/` (29 custom + 9 UI primitives)

---

## Core Components

| Component | File | Purpose | Size |
|-----------|------|---------|------|
| **Header** | `Header.tsx` | Top nav, mobile hamburger, GitHub link, CTA | 6.8KB |
| **Footer** | `Footer.tsx` | Site footer with links | 6.2KB |
| **HomeDock** | `HomeDock.tsx` | Floating bottom dock navigation | 1.5KB |
| **Dock** | `Dock.tsx` | Dock component base | 5.9KB |
| **ScrollProgress** | `ScrollProgress.tsx` | Reading progress bar | 1.2KB |
| **BackToTop** | `BackToTop.tsx` | Scroll-to-top button | 1.4KB |
| **WalletProvider** | `WalletProvider.tsx` | Solana wallet context wrapper | 1.5KB |

---

## Landing Page Sections

| Component | File | Purpose | Size |
|-----------|------|---------|------|
| **Hero** | `Hero.tsx` | Main hero with headline & CTA | 7.3KB |
| **AnimatedStats** | `AnimatedStats.tsx` | Animated counter statistics | 3.5KB |
| **FeaturesCardSwap** | `FeaturesCardSwap.tsx` | Animated swappable feature cards | 8.0KB |
| **SecurityShowcase** | `SecurityShowcase.tsx` | Privacy & security features | 11.6KB |
| **Comparison** | `Comparison.tsx` | Decision AI vs traditional approach | 7.3KB |
| **HowItWorks** | `HowItWorks.tsx` | Step-by-step flow explanation | 5.8KB |
| **CodePreview** | `CodePreview.tsx` | Code example showcase | 15.0KB |
| **UseCases** | `UseCases.tsx` | Real-world use case examples | 10.1KB |
| **Features** | `Features.tsx` | Feature grid with icons | 7.5KB |
| **Integrations** | `Integrations.tsx` | Integration partner logos/cards | 5.9KB |
| **Testimonials** | `Testimonials.tsx` | Social proof / quotes | 5.8KB |
| **Roadmap** | `Roadmap.tsx` | Development timeline | 8.2KB |
| **TechStack** | `TechStack.tsx` | Technology stack display | 9.4KB |
| **FAQ** | `FAQ.tsx` | Accordion FAQ section | 9.0KB |
| **Newsletter** | `Newsletter.tsx` | Email signup section | 5.6KB |
| **Credits** | `Credits.tsx` | Attribution section | 3.3KB |

---

## Interactive / Functional

| Component | File | Purpose | Size |
|-----------|------|---------|------|
| **AgentChat** | `AgentChat.tsx` | Core chat interface with wallet auth | 15.1KB |

---

## Visual / Animation Components

| Component | File | Purpose | Size |
|-----------|------|---------|------|
| **Ballpit** | `Ballpit.tsx` | 3D particle ball animation (OGL) | 23.6KB |
| **Particles** | `Particles.tsx` | Canvas particle system | 4.3KB |
| **ParticlesBackground** | `ParticlesBackground.tsx` | Background particle wrapper | 4.7KB |
| **CardSwap** | `CardSwap.tsx` | Card swap animation | 6.9KB |
| **AnimatedLogo** | `AnimatedLogo.tsx` | Logo animation | 1.7KB |

---

## UI Primitives (`components/ui/`)

9 reusable, styled components:

| Component | File | Purpose | Size |
|-----------|------|---------|------|
| **Badge** | `Badge.tsx` | Status/label badges | 907B |
| **Button** | `Button.tsx` | Button variants | 1.5KB |
| **Card** | `Card.tsx` | Card container | 1.0KB |
| **CopyButton** | `CopyButton.tsx` | Copy-to-clipboard | 1.7KB |
| **GradientBorder** | `GradientBorder.tsx` | Animated gradient border | 1.1KB |
| **Input** | `Input.tsx` | Form input | 1.6KB |
| **LoadingSpinner** | `LoadingSpinner.tsx` | Loading states | 2.2KB |
| **Skeleton** | `Skeleton.tsx` | Loading skeleton | 2.3KB |
| **Tooltip** | `Tooltip.tsx` | Hover tooltips | 2.2KB |

---

## Pages (App Router)

| Page | Route | Purpose | Size |
|------|-------|---------|------|
| **Landing** | `/` (`app/page.tsx`) | Full marketing landing page | 6.1KB |
| **Demo** | `/demo` | Interactive wallet agent demo | 6.8KB |
| **Docs** | `/docs` | Privacy documentation | 25.5KB |
| **404** | Not found | Custom 404 page | 3.9KB |

---

## Section Order (Landing Page)

```
1. Header (fixed)
2. Hero
3. AnimatedStats
4. FeaturesCardSwap
5. SecurityShowcase
6. Comparison
7. HowItWorks
8. CodePreview
9. UseCases
10. Features
11. Integrations
12. Testimonials
13. Roadmap
14. TechStack
15. FAQ
16. Newsletter
17. CTA Section (inline)
18. Credits
19. Footer
20. HomeDock (floating)
```

---

## Design System Notes

- **Theme**: Light mode (#FAFAF8 background, #1A1A1A text)
- **Accent**: Muted teal (#14B8A6 primary, #0D9488 hover)
- **Fonts**: Inter (body), JetBrains Mono (code)
- **Responsive**: Mobile-first with hamburger nav
- **Animations**: Framer Motion + CSS keyframes + GSAP
- **3D**: Spline scenes + OGL Ballpit + Three.js

---

## To Rebuild
1. **Keep `WalletProvider.tsx`** — provider wrapper, template-agnostic
2. **Keep `AgentChat.tsx` logic** — but rebuild the UI to match new template
3. **Keep all `ui/` primitives** — they are reusable and lightly styled
4. **Rebuild all landing sections** — these are 100% tied to the current design
5. **Map functionality** from old components to new template:
   - Hero → new template's hero
   - FAQ → new template's accordion
   - AgentChat → new template's chat/modal
   - SecurityShowcase → new template's feature highlight
