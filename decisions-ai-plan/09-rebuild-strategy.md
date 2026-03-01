# Rebuild Strategy: Combining Mirrored UI + Existing Backend

> How to take the mirrored site template and wire up all the Decision AI functionality.

---

## The Approach: Backend Transplant

Your existing `lib/`, `app/api/`, and `coded_tools/` folders are **100% UI-independent**. They only talk to Solana RPCs. The strategy is:

```
New UI Template (mirrored site)
    + Existing lib/ (solana.ts, signature.ts)
    + Existing app/api/ (Solana RPC proxy)
    + Existing coded_tools/ (Python Solana tools)
    = Rebuilt Decision AI with premium UI
```

---

## Step-by-Step Rebuild

### Phase 1: Foundation (Day 1)
1. **Start new Next.js 16 project** with the mirrored site's design
2. **Copy `lib/` folder** — both files are backend-only
3. **Copy `app/api/solana/`** — server-side RPC proxy
4. **Copy `coded_tools/`** — all Python tools
5. **Copy `neuro_san/`** — framework (don't modify)
6. **Install dependencies** from `08-env-config.md`
7. **Create `.env.local`** with RPC URLs
8. **Verify**: `npm run dev` → `/api/solana` should respond

### Phase 2: Wallet Integration (Day 1-2)
1. Create `components/WalletProvider.tsx` (copy existing)
2. Wrap root layout with `<WalletProvider>`
3. Import wallet adapter CSS
4. Add wallet connect button to template's header/nav
5. **Verify**: Phantom connects, wallet balance shows

### Phase 3: Agent Chat (Day 2-3)
1. Map the template's **chat/messaging section** to AgentChat logic
2. Implement signature auth flow (`handleAuthenticate`)
3. Wire up query submission to POST `/api/solana`
4. Display responses in chat format
5. Add example query prompts
6. **Verify**: Can connect wallet, authenticate, query balance

### Phase 4: Landing Sections (Day 3-5)
1. Map template sections to Decision AI content:
   - **Privacy/security showcase** — sly_data architecture
   - **How it works** — wallet → sign → query → result flow
   - **Features** — privacy, open source, Solana-native
   - **Code preview** — sly_data example code
   - **Comparison** — Decision AI vs traditional AI tools
2. Keep content from existing components, adapt to new template slots
3. Add hero with "Connect Wallet" CTA
4. **Verify**: All sections render with real content

### Phase 5: Docs & Demo Pages (Day 5-6)
1. Map template's **docs layout** to Decision AI documentation content
2. Create `/demo` page with interactive agent
3. Create `/docs` page with privacy architecture explanation
4. **Verify**: Navigation between all pages works

### Phase 6: Polish (Day 6-7)
1. SEO meta tags (already have good foundation in `layout.tsx`)
2. Mobile responsive adjustments
3. Performance optimization (lazy load Spline/Three.js if needed)
4. Custom 404 page
5. OG image and favicons

---

## What You Can Combine (vs. Start Fresh)

| Layer | Combine? | Notes |
|-------|:---:|-------|
| `lib/` (2 files) | **Yes, copy directly** | Zero UI dependency |
| `app/api/solana/` | **Yes, copy directly** | Zero UI dependency |
| `coded_tools/` (5 files) | **Yes, copy directly** | Pure Python backend |
| `neuro_san/` (410 files) | **Yes, copy directly** | Framework — don't touch |
| `WalletProvider.tsx` | **Yes, copy directly** | Provider wrapper |
| `components/ui/` (9 files) | **Maybe** | Lightly styled, might work with new template |
| `components/*.tsx` (29 files) | **No, rebuild** | Tied to old UI |
| `app/page.tsx` | **No, rebuild** | Old landing page layout |
| `app/globals.css` | **No, use template's** | Template has its own CSS |

---

## File Mapping Cheatsheet

| Old Component | What It Does | Map To In Template |
|--------------|--------------|-------------------|
| `Hero` | Landing headline + CTA | Template's hero section |
| `Header` | Top nav + wallet + mobile menu | Template's header/navbar |
| `AgentChat` | Wallet auth + chat queries | Template's chat/messaging |
| `SecurityShowcase` | Privacy feature cards | Template's feature highlight |
| `CodePreview` | Code example display | Template's code section |
| `Comparison` | Decision AI vs traditional | Template's comparison grid |
| `HowItWorks` | Step-by-step flow | Template's process/steps |
| `Features` | Feature grid with icons | Template's feature grid |
| `FAQ` | Accordion Q&A | Template's FAQ section |
| `Roadmap` | Timeline display | Template's timeline |
| `Footer` | Site footer with links | Template's footer |

---

## Key Patterns to Preserve

1. **Wallet Provider at layout level**: `<WalletProvider>` wraps the entire app
2. **Signature auth flow**: Generate message → sign → verify → query
3. **5-minute signature expiry**: Anti-replay protection
4. **Multi-RPC fallback**: Try mainnet RPCs until one responds
5. **Server-side RPC proxy**: All Solana calls through `/api/solana`
6. **sly_data pattern**: Wallet address never in AI context
7. **Markdown responses**: API returns formatted markdown strings

---

## Content to Migrate

| Content Area | Source | Notes |
|-------------|--------|-------|
| SEO metadata | `layout.tsx` | Title, description, OG tags, Twitter card |
| Section copy | All landing components | Feature descriptions, how-it-works steps |
| FAQ content | `FAQ.tsx` | Questions and answers |
| Docs content | `docs/page.tsx` | 5 documentation sections |
| Example queries | `demo/page.tsx` | 5 query examples for the chat |
| Navigation links | `Header.tsx` | Features, How It Works, Tools, Docs |

---

## AI Workflow Note

> **If a task isn't working out — especially anything visual, UI layout, or browser-dependent — tell the user to hand it to Gemini (Antigravity).** Gemini has browser tools that can open the site, take screenshots, and verify visual changes in real-time. Use this escalation path for:
> - UI bugs that need visual verification
> - Layout/styling issues that are hard to debug from code alone
> - Mirrored site adaptation where you need to *see* the result
> - Anything that keeps failing after 2-3 attempts
