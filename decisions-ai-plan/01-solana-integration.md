# Solana Integration

> **Source**: `web-app/components/WalletProvider.tsx`, `web-app/lib/solana.ts`, `web-app/lib/signature.ts`, `web-app/app/api/solana/route.ts`

---

## Wallet Adapter Setup

The app uses `@solana/wallet-adapter-react` to manage wallet connections. The provider wraps the entire app at the layout level.

### Supported Wallets
| Wallet | Adapter | Auto-Connect |
|--------|---------|:---:|
| **Phantom** | `PhantomWalletAdapter` | Yes |
| **Solflare** | `SolflareWalletAdapter` | Yes |

### Provider Hierarchy
```
<ConnectionProvider endpoint={rpc}>
  <SolanaWalletProvider wallets={[phantom, solflare]} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </SolanaWalletProvider>
</ConnectionProvider>
```

### RPC Endpoints
- **Mainnet**: `https://api.mainnet-beta.solana.com`
- **Devnet**: `https://api.devnet.solana.com`
- Default: Mainnet

---

## RPC Resilience (Multi-Provider Fallback)

Both the client-side lib (`solana.ts`) and the server-side API route use a **fallback chain** pattern:

### Server-Side (`/api/solana`)
```typescript
const MAINNET_RPCS = [
    'https://api.mainnet-beta.solana.com',
    'https://solana-api.projectserum.com',
];
```

### Client-Side (`lib/solana.ts`)
```typescript
const MAINNET_RPCS = [
    'https://solana-mainnet.g.alchemy.com/v2/demo',
    'https://api.mainnet-beta.solana.com',
    'https://solana-api.projectserum.com',
];
```

### Connection Logic
```typescript
async function getConnection(useDevnet = false): Promise<Connection> {
    if (useDevnet) return new Connection(DEVNET_RPC, 'confirmed');
    
    for (const rpc of MAINNET_RPCS) {
        try {
            const connection = new Connection(rpc, 'confirmed');
            await connection.getSlot(); // Health check
            return connection;
        } catch { continue; }
    }
    return new Connection(MAINNET_RPCS[0], 'confirmed');
}
```

**Pattern**: Try each RPC, run `getSlot()` as health check, fall back to next on failure.

---

## Signature Verification (Wallet Ownership Proof)

Uses `tweetnacl` for Ed25519 signature verification. This is how the app proves wallet ownership without storing credentials.

### Flow
1. Client generates auth message with timestamp
2. User signs with Phantom/Solflare
3. Signature sent to server as base58
4. Server verifies using `nacl.sign.detached.verify()`
5. Timestamp checked for 5-minute expiry window

### Auth Message Format
```
Authenticate with Decision AI

Timestamp: {Date.now()}

This signature proves you own this wallet.
```

### Key Functions (`lib/signature.ts`)

| Function | Purpose |
|----------|---------|
| `generateAuthMessage()` | Generate timestamped message for signing |
| `verifySignature(wallet, sig, message)` | Verify Ed25519 signature against wallet pubkey |
| `isSignatureExpired(message, maxAgeMs)` | Check if signed message is older than 5 minutes |

### Anti-Replay Protection
- Timestamp embedded in signed message
- 5-minute expiry window (`maxAgeMs = 5 * 60 * 1000`)
- Regex extraction: `/Timestamp: (\d+)/`

---

## Known Token Registry

Both client and server maintain a hardcoded known-token map:

| Mint Address | Symbol | Decimals |
|-------------|--------|----------|
| `EPjFWdd5...` | USDC | 6 |
| `Es9vMFrz...` | USDT | 6 |
| `So111111...` | wSOL | 9 |
| `DezXAZ8z...` | BONK | 5 |
| `JUPyiwrY...` | JUP | 6 |
| `mSoLzYCx...` | mSOL | 9 |

Unknown tokens display as `{first4}...{last4}` of the mint address.

---

## On-Chain Queries

| Query | Method | RPC Call |
|-------|--------|----------|
| SOL Balance | `getBalance()` | `connection.getBalance(pubkey)` |
| Token Balances | `getTokenBalances()` | `connection.getParsedTokenAccountsByOwner()` |
| Transaction History | `getTransactions()` | `connection.getSignaturesForAddress()` |
| Devnet Support | Add "devnet" to query | Switches RPC endpoint |

---

## Dependencies

```json
{
    "@solana/wallet-adapter-base": "^0.9.27",
    "@solana/wallet-adapter-react": "^0.15.39",
    "@solana/wallet-adapter-react-ui": "^0.9.39",
    "@solana/wallet-adapter-wallets": "^0.19.37",
    "@solana/web3.js": "^1.98.4",
    "bs58": "^6.0.0",
    "tweetnacl": "^1.0.3"
}
```

---

## To Rebuild
1. **Copy `lib/solana.ts` and `lib/signature.ts`** — pure utility, no UI dependency
2. **Copy `WalletProvider.tsx`** — provider wrapper, template-agnostic
3. **Copy `app/api/solana/route.ts`** — server-side RPC proxy, zero UI dependency
4. **Rebuild `AgentChat.tsx`** — this is the UI-specific wallet interaction component
5. **Install wallet adapter packages** — see dependencies above
6. **Import wallet adapter CSS** — `@solana/wallet-adapter-react-ui/styles.css`
