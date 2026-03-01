# Decision AI — Technical Build Plan

> **Purpose**: This folder is the complete technical blueprint for rebuilding the Decision AI platform. It extracts every functional system from the existing codebase so you can start fresh with a new UI template while preserving all backend logic and Solana integration.

---

## Current Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.1.1 |
| Language | TypeScript | 5.x |
| React | React | 19.2.3 |
| Styling | Tailwind CSS 4 + Custom Design System | 4.x |
| Animation | Framer Motion + GSAP | 12.33 / 3.14 |
| 3D/VFX | Spline (React Spline) + Three.js + OGL | Various |
| Blockchain | @solana/web3.js | 1.98.4 |
| Wallet | @solana/wallet-adapter-react (Phantom, Solflare) | 0.15.39 |
| Cryptography | tweetnacl (signature verification) | 1.0.3 |
| Icons | React Icons | 5.5.0 |
| Fonts | Inter (sans) + JetBrains Mono (mono) | Google Fonts |
| Python Backend | neuro_san framework (coded_tools) | Custom |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                  FRONTEND (Next.js 16)               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │
│  │  Landing     │  │  Demo       │  │  Docs       │  │
│  │  (page.tsx)  │  │  (/demo)    │  │  (/docs)    │  │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  │
│         │                │                │          │
│  ┌──────┴────────────────┴────────────────┴───────┐  │
│  │              Components Layer (38 files)        │  │
│  │  Header, Hero, AgentChat, SecurityShowcase,     │  │
│  │  CodePreview, Comparison, Features, Roadmap,    │  │
│  │  FAQ, Integrations, TechStack, WalletProvider   │  │
│  └──────────────────────┬─────────────────────────┘  │
│                         │                             │
│  ┌──────────────────────┴─────────────────────────┐  │
│  │          Providers & Utilities                  │  │
│  │  WalletProvider (Phantom + Solflare)            │  │
│  │  ScrollProgress, BackToTop, HomeDock            │  │
│  └──────────────────────┬─────────────────────────┘  │
└─────────────────────────┼────────────────────────────┘
                          │ API Calls
┌─────────────────────────┼────────────────────────────┐
│                    API LAYER                          │
│  /api/solana  — Wallet queries (balance/tokens/tx)   │
│               — Signature verification (tweetnacl)   │
│               — Multi-RPC fallback                   │
└─────────────────────────┼────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────┐
│                    LIB LAYER                          │
│  solana.ts      — RPC utilities (multi-provider)     │
│  signature.ts   — Ed25519 signature verification     │
└─────────────────────────┼────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────┐
│             PYTHON BACKEND (neuro_san)                │
│  coded_tools/solana/                                  │
│    balance.py       — GetBalance (sly_data)           │
│    tokens.py        — GetTokenBalances (sly_data)     │
│    transactions.py  — GetTransactions (sly_data)      │
│    nfts.py          — GetNFTs (sly_data)              │
└─────────────────────────┼────────────────────────────┘
                          │
┌─────────────────────────┼────────────────────────────┐
│              EXTERNAL SERVICES                        │
│  Solana RPC (mainnet-beta, devnet)                    │
│  GitHub (NeuroSolanaAgents/neurosan)                  │
└──────────────────────────────────────────────────────┘
```

---

## Project Structure (Key Files)

```
Decision AISolana/
├── web-app/
│   ├── app/
│   │   ├── page.tsx                    # Landing page (29 component sections)
│   │   ├── layout.tsx                  # Root layout + WalletProvider
│   │   ├── globals.css                 # Design system (864 lines)
│   │   ├── not-found.tsx               # Custom 404
│   │   ├── demo/page.tsx               # Interactive agent demo
│   │   ├── docs/page.tsx               # Documentation page
│   │   └── api/
│   │       └── solana/route.ts         # Solana RPC proxy + auth
│   ├── components/
│   │   ├── AgentChat.tsx               # Core chat interface (323 lines)
│   │   ├── Header.tsx                  # Top nav + mobile menu
│   │   ├── Hero.tsx                    # Hero section
│   │   ├── WalletProvider.tsx          # Solana wallet context
│   │   ├── SecurityShowcase.tsx        # Privacy feature showcase
│   │   ├── CodePreview.tsx             # Code example section
│   │   ├── Comparison.tsx              # Decision AI vs traditional
│   │   ├── Features.tsx                # Feature grid
│   │   ├── FeaturesCardSwap.tsx        # Animated feature cards
│   │   ├── Integrations.tsx            # Integration partners
│   │   ├── TechStack.tsx               # Tech stack display
│   │   ├── Roadmap.tsx                 # Development roadmap
│   │   ├── FAQ.tsx                     # FAQ accordion
│   │   ├── Testimonials.tsx            # Social proof
│   │   ├── Newsletter.tsx              # Email signup
│   │   ├── UseCases.tsx                # Use case examples
│   │   ├── HowItWorks.tsx              # Step-by-step flow
│   │   ├── Ballpit.tsx                 # Particle animation
│   │   ├── Particles.tsx               # Background particles
│   │   ├── ParticlesBackground.tsx     # Particle wrapper
│   │   ├── CardSwap.tsx                # Card swap animation
│   │   ├── AnimatedLogo.tsx            # Animated logo
│   │   ├── AnimatedStats.tsx           # Animated statistics
│   │   ├── ScrollProgress.tsx          # Scroll progress bar
│   │   ├── BackToTop.tsx               # Back-to-top button
│   │   ├── HomeDock.tsx                # Floating dock nav
│   │   ├── Dock.tsx                    # Dock component
│   │   ├── Footer.tsx                  # Site footer
│   │   ├── Credits.tsx                 # Credits section
│   │   └── ui/                         # Primitives (9 files)
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── CopyButton.tsx
│   │       ├── GradientBorder.tsx
│   │       ├── Input.tsx
│   │       ├── LoadingSpinner.tsx
│   │       ├── Skeleton.tsx
│   │       └── Tooltip.tsx
│   ├── lib/
│   │   ├── solana.ts                   # Solana RPC utilities (216 lines)
│   │   └── signature.ts               # Ed25519 signature verification (69 lines)
│   ├── public/                         # SVG assets (5 files)
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
├── coded_tools/
│   └── solana/                         # Python Solana tools (5 files)
│       ├── __init__.py
│       ├── balance.py                  # GetBalance
│       ├── tokens.py                   # GetTokenBalances
│       ├── transactions.py             # GetTransactions + GetTransactionDetails
│       └── nfts.py                     # GetNFTs
├── neuro_san/                          # Core Python framework (410+ files)
│   ├── api/
│   ├── client/
│   ├── coded_tools/
│   ├── interfaces/
│   ├── internals/
│   ├── service/
│   ├── session/
│   └── registries/
├── docs/                               # Framework documentation
│   ├── landing/index.html              # Static landing page
│   └── *.md                            # HOCON reference docs
└── tests/                              # Python test suite
```

---

## Document Index

| File | Covers |
|------|--------|
| [01-solana-integration.md](./01-solana-integration.md) | Wallet adapter, RPC, signature verification |
| [02-privacy-architecture.md](./02-privacy-architecture.md) | sly_data, zero-knowledge design, coded_tools interface |
| [03-api-routes.md](./03-api-routes.md) | All API endpoints with request/response |
| [04-agent-chat.md](./04-agent-chat.md) | Interactive demo chat system |
| [05-components.md](./05-components.md) | UI component inventory for rebuild |
| [06-design-system.md](./06-design-system.md) | CSS tokens, animations, effects |
| [07-python-backend.md](./07-python-backend.md) | neuro_san framework & coded_tools |
| [08-env-config.md](./08-env-config.md) | Environment variables & deployment |
| [09-rebuild-strategy.md](./09-rebuild-strategy.md) | How to combine new UI + existing backend |
