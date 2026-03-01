# Python Backend — neuro_san Framework & Coded Tools

> **Source**: `neuro_san/` (410+ files), `coded_tools/solana/` (5 files)

---

## Overview

The Python backend has two main parts:
1. **neuro_san** — the core multi-agent framework (large, established, ~410 files)
2. **coded_tools/solana** — the 5 Solana blockchain tools built for the hackathon

For a UI rebuild, you only need to understand `coded_tools/solana/`. The `neuro_san` framework itself is infrastructure that doesn't change.

---

## coded_tools/solana/ — Tool Inventory

| Tool Class | File | Lines | Purpose |
|------------|------|-------|---------|
| `GetBalance` | `balance.py` | ~45 | Query SOL balance for a wallet |
| `GetTokenBalances` | `tokens.py` | ~90 | Query all SPL token holdings |
| `GetTransactions` | `transactions.py` | ~68 | Get recent transaction history |
| `GetTransactionDetails` | `transactions.py` | ~68 | Get details of a specific tx by signature |
| `GetNFTs` | `nfts.py` | ~75 | Query NFT collection for a wallet |

### Module Exports (`__init__.py`)
```python
from .balance import GetBalance
from .tokens import GetTokenBalances
from .transactions import GetTransactions, GetTransactionDetails
from .nfts import GetNFTs
```

---

## CodedTool Interface

Every tool inherits from `neuro_san.interfaces.coded_tool.CodedTool`:

```python
class GetBalance(CodedTool):
    async def async_invoke(
        self,
        args: Dict[str, Any],       # AI-generated arguments
        sly_data: Dict[str, Any]     # Privacy side-channel
    ) -> Any:
        wallet_pubkey = sly_data.get("wallet_pubkey") or args.get("wallet_pubkey")
        # ... query Solana RPC
        return formatted_result_string
```

### Key Pattern
- All tools accept `args` (from AI) and `sly_data` (private)
- All tools return formatted **markdown strings**
- All tools use `solana.rpc.api.Client` for RPC calls
- All tools have graceful error handling with user-friendly messages

---

## Python Dependencies

```
solana          — Solana Python SDK
solders         — Solana data structures (Pubkey, Signature)
neuro_san       — Multi-agent framework (local)
```

---

## neuro_san Framework Structure

| Directory | Purpose | Files |
|-----------|---------|-------|
| `api/` | API layer | 21 |
| `client/` | Client interfaces | 9 |
| `coded_tools/` | Built-in tools | 13 |
| `interfaces/` | Abstract interfaces (CodedTool, etc.) | 10 |
| `internals/` | Core engine | 185 |
| `message_processing/` | Message handlers | 8 |
| `registries/` | Tool/agent registries | 27 |
| `service/` | Service layer | 90 |
| `session/` | Session management | 17 |
| `deploy/` | Deployment config | 5 |
| `test/` | Internal tests | 24 |

### Documentation (`docs/`)
| File | Topic |
|------|-------|
| `agent_hocon_reference.md` | Agent configuration format (35KB) |
| `llm_info_hocon_reference.md` | LLM provider config (11KB) |
| `manifest_hocon_reference.md` | Manifest file reference (4KB) |
| `toolbox_info_hocon_reference.md` | Tool registration (7KB) |
| `test_case_hocon_reference.md` | Test case format (20KB) |
| `mcp_service.md` | MCP service documentation (12KB) |
| `clients.md` | Client usage guide (5KB) |
| `tests.md` | Testing guide (3KB) |

---

## To Rebuild
1. **Do NOT touch `neuro_san/`** — it's the framework, leave as-is
2. **Copy `coded_tools/solana/`** entirely — all 5 files are backend-only
3. **The web-app API route bridges the gap** — TypeScript → Python isn't direct, the web-app route replicates the tool logic in TypeScript for the demo
4. **For production**: The Python tools would be called via the neuro_san service, not the web-app API route
