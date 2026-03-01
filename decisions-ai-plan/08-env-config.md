# Environment & Deployment Config

> **Source**: `web-app/package.json`, `web-app/next.config.ts`, `web-app/tsconfig.json`

---

## Scripts

```json
{
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
}
```

---

## Dependencies (Production)

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.1 | App framework |
| `react` | 19.2.3 | UI library |
| `react-dom` | 19.2.3 | DOM rendering |
| `@solana/wallet-adapter-base` | ^0.9.27 | Wallet adapter base |
| `@solana/wallet-adapter-react` | ^0.15.39 | React wallet hooks |
| `@solana/wallet-adapter-react-ui` | ^0.9.39 | Wallet UI components |
| `@solana/wallet-adapter-wallets` | ^0.19.37 | Wallet implementations |
| `@solana/web3.js` | ^1.98.4 | Solana JavaScript SDK |
| `@splinetool/react-spline` | ^4.1.0 | 3D Spline scenes |
| `@types/three` | ^0.182.0 | Three.js types |
| `bs58` | ^6.0.0 | Base58 encoding |
| `framer-motion` | ^12.33.0 | React animations |
| `gsap` | ^3.14.2 | Advanced animations |
| `ogl` | ^1.0.11 | WebGL library (Ballpit) |
| `react-icons` | ^5.5.0 | Icon library |
| `three` | ^0.182.0 | 3D rendering |
| `tweetnacl` | ^1.0.3 | Ed25519 cryptography |

---

## Dependencies (Development)

| Package | Version | Purpose |
|---------|---------|---------|
| `@tailwindcss/postcss` | ^4 | Tailwind PostCSS plugin |
| `tailwindcss` | ^4 | Utility-first CSS |
| `typescript` | ^5 | TypeScript compiler |
| `@types/node` | ^20 | Node.js types |
| `@types/react` | ^19 | React types |
| `@types/react-dom` | ^19 | React DOM types |
| `eslint` | ^9 | Code linting |
| `eslint-config-next` | 16.1.1 | Next.js ESLint rules |

---

## Next.js Config

```typescript
// next.config.ts — Currently minimal
const nextConfig: NextConfig = {
  /* config options here */
};
```

No custom Webpack, no image optimization, no redirects configured.

---

## RPC Endpoints (Hardcoded)

| Network | Endpoint | Usage |
|---------|----------|-------|
| Mainnet | `https://api.mainnet-beta.solana.com` | Primary (WalletProvider + API) |
| Mainnet | `https://solana-api.projectserum.com` | Fallback (API only) |
| Mainnet | `https://solana-mainnet.g.alchemy.com/v2/demo` | Fallback (client lib only) |
| Devnet | `https://api.devnet.solana.com` | When "devnet" in query |

> **Note**: No `.env.local` file found — RPCs are hardcoded. For production, move these to environment variables.

---

## Missing / Needed for Production

| Item | Status | Recommendation |
|------|--------|----------------|
| `.env.local` | Missing | Create with RPC URLs + API keys |
| `NEXT_PUBLIC_RPC_URL` | Not configured | Add for client-side RPC |
| `RPC_URL` | Not configured | Add for server-side RPC |
| Custom domain | Not configured | Add in Vercel/deployment |
| Analytics | Not configured | Add Vercel Analytics or similar |
| Rate limiting | Not implemented | Add for `/api/solana` endpoint |
| Error monitoring | Not implemented | Add Sentry or similar |

---

## Public Assets

```
public/
├── file.svg      (391B)
├── globe.svg     (1.0KB)
├── next.svg      (1.4KB)
├── vercel.svg    (128B)
└── window.svg    (385B)
```

> All default Next.js starter assets — no custom assets in public yet.

---

## To Rebuild
1. **Copy `package.json`** — install same dependencies in new project
2. **Move hardcoded RPCs to `.env.local`** — use `NEXT_PUBLIC_RPC_URL` and `RPC_URL`
3. **Add production config to `next.config.ts`** — image optimization, headers, etc.
4. **Replace public assets** — the defaults are placeholder
