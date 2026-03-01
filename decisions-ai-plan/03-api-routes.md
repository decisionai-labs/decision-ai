# API Routes

> **Source**: `web-app/app/api/solana/route.ts`

---

## Endpoint Summary

| # | Endpoint | Method | Purpose |
|---|----------|--------|---------|
| 1 | `/api/solana` | POST | Wallet queries (balance, tokens, transactions) |

> **Note**: Decision AI currently has a single API endpoint compared to CTO Hub's 12. All wallet query logic is routed through this one endpoint with query-based dispatch.

---

## `/api/solana` — Solana Wallet Query Proxy

### Purpose
Server-side Solana RPC proxy that:
1. Bypasses CORS restrictions on browser RPC calls
2. Verifies wallet ownership via Ed25519 signatures
3. Dispatches queries to the correct Solana RPC method
4. Returns formatted markdown responses

### Request
```typescript
POST /api/solana
Content-Type: application/json

{
    "query": "What is my balance?",      // Natural language query
    "wallet": "7xKX...",                  // Wallet public key
    "signature": "base58EncodedSig",      // Wallet signature proof
    "message": "Authenticate with...",    // Signed message (w/ timestamp)
    "useDevnet": false                    // Optional: query devnet
}
```

### Response
```typescript
// Success
{ "response": "**SOL Balance**: 1.2345 SOL (1234500000 lamports)..." }

// Auth Error (401)
{ "error": "Authentication required. Please sign a message to prove wallet ownership." }

// Expired Signature (401)
{ "error": "Signature expired. Please reconnect and sign a new message." }

// Invalid Signature (403)
{ "error": "Signature verification failed: Invalid signature" }

// Server Error (500)
{ "error": "Failed to query Solana: ..." }
```

### Query Router Logic
```typescript
const lower = query.toLowerCase();

if (lower.includes('balance') && !lower.includes('token'))  → getBalance()
if (lower.includes('token') || 'spl' || 'holding')          → getTokens()
if (lower.includes('transaction') || 'history' || 'activity')→ getTransactions()
else                                                          → Help message
```

### Authentication Pipeline
```
Request → Validate wallet (>32 chars) → Check signature exists
        → Check timestamp expiry (5 min) → Decode base58 signature
        → Verify Ed25519 → Process query
```

---

## Server-Side Functions

| Function | Returns |
|----------|---------|
| `getBalance(wallet, useDevnet)` | SOL balance in SOL + lamports |
| `getTokens(wallet, useDevnet)` | Top 10 SPL tokens by amount |
| `getTransactions(wallet, useDevnet)` | Last 5 transactions with status |

---

## To Rebuild
1. **Copy `app/api/solana/route.ts`** — zero UI dependency, pure backend
2. This is the ONLY API route; no database, no auth provider
3. Wire up your new chat UI to POST to `/api/solana`
