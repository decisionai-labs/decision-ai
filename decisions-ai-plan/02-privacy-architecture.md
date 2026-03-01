# Privacy Architecture — sly_data & Zero-Knowledge Design

> **Source**: `coded_tools/solana/`, `neuro_san/interfaces/coded_tool.py`, `web-app/app/docs/page.tsx`

---

## Core Principle

> **The AI should never need to see your sensitive data to help you.**

Decision AI's privacy model is built on a concept called **sly_data** — a side-channel that passes sensitive information (like wallet addresses) directly to backend tools **without the AI language model ever seeing it**.

---

## How sly_data Works

```
┌────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   USER     │     │   AI MODEL       │     │  CODED TOOL     │
│            │     │                  │     │  (Python)       │
│  Wallet    │     │  Sees: "Check    │     │  Receives:      │
│  Connected │────>│  my balance"     │────>│  args + sly_data│
│            │     │                  │     │                 │
│  Address   │     │  Never sees:     │     │  sly_data = {   │
│  stored    │─ ─ ─│  wallet address  │     │    wallet_pubkey│
│  locally   │     │                  │     │  }              │
└────────────┘     └──────────────────┘     └─────────────────┘
       │                                           │
       │        [sly_data bypass — never in        │
       └─────── AI context window] ────────────────┘
```

### The Key Insight
- **args**: Visible to the AI model — contains the query intent ("check balance")
- **sly_data**: Invisible to the AI model — contains sensitive data (wallet address)
- The AI reasons about *what* to do, but never learns *who* is asking

---

## CodedTool Interface

Every Python tool inherits from `CodedTool` and implements `async_invoke`:

```python
class GetBalance(CodedTool):
    async def async_invoke(
        self, 
        args: Dict[str, Any],       # AI-visible arguments
        sly_data: Dict[str, Any]     # Privacy-preserving side-channel
    ) -> Any:
        wallet_pubkey = sly_data.get("wallet_pubkey")
        # Wallet address never passes through AI context
```

---

## Privacy Tools Inventory

| Tool | Class | File | sly_data Usage |
|------|-------|------|---------------|
| Balance Check | `GetBalance` | `balance.py` | `sly_data.wallet_pubkey` |
| Token Holdings | `GetTokenBalances` | `tokens.py` | `sly_data.wallet_pubkey` |
| Transaction History | `GetTransactions` | `transactions.py` | `sly_data.wallet_pubkey` |
| Transaction Details | `GetTransactionDetails` | `transactions.py` | Not used (takes signature in args) |
| NFT Collection | `GetNFTs` | `nfts.py` | `sly_data.wallet_pubkey` |

### Fallback Pattern
All tools have a fallback that checks `args` if `sly_data` is empty:
```python
wallet_pubkey = sly_data.get("wallet_pubkey") or args.get("wallet_pubkey")
```

---

## Privacy Guarantees

| Guarantee | Implementation |
|-----------|----------------|
| **No wallet in AI context** | sly_data bypasses the language model entirely |
| **No persistent storage** | Wallet address lives in browser memory only |
| **Signature expiry** | 5-minute TTL on authentication signatures |
| **Anti-replay** | Timestamp embedded in signed message |
| **Open source** | All code auditable on GitHub |

---

## Three Privacy Pillars (from docs page)

1. **Zero-Knowledge Design**: Wallet address never exposed to AI model
2. **On-Chain, Not In-Context**: Sensitive data stays out of the language model's context window
3. **Open Source & Auditable**: Every component is open source for verification

---

## To Rebuild
1. **Copy `coded_tools/solana/`** — all 5 Python tools are backend-only
2. **Preserve the sly_data interface** — this is the core privacy mechanism
3. **The web-app API route handles the bridge** — signature verification → sly_data injection
4. **The neuro_san framework manages tool dispatch** — connects AI queries to coded_tools
