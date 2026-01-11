# 🧠 NeuroSanSolana

> **Privacy-First AI Agents for Solana** — The first AI agent framework that keeps your wallet private from the AI itself.

[![Solana Privacy Hack](https://img.shields.io/badge/Solana-Privacy_Hack-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/privacyhack)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE.txt)

---

## 🔒 The Privacy Problem

Traditional AI blockchain assistants require your wallet address in the prompt — meaning:
- ❌ AI providers see (and log) your addresses
- ❌ Your holdings are exposed in prompt history  
- ❌ Fine-tuning could leak your data

**NeuroSanSolana fixes this** with a zero-knowledge architecture.

---

## ✨ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│  User Request: "What are my token balances?"                │
└────────────────────────┬────────────────────────────────────┘
                         │
    ┌────────────────────┴────────────────────┐
    │           sly_data (private)            │
    │  {"wallet_pubkey": "YourWallet..."}     │
    └────────────────────┬────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  🧠 AI Agent (Claude/GPT-4)                                 │
│  • Receives request: "What are my token balances?"          │
│  • NEVER sees the wallet address                            │
│  • Delegates to tools that read sly_data privately          │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  ⚡ Solana RPC                                               │
│  • Tools query blockchain with private wallet               │
│  • Results flow back through agent                          │
└─────────────────────────────────────────────────────────────┘
```

Your wallet address travels through the **sly_data channel**, completely bypassing the AI's context window.

---

## ⚡ Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/NeuroSolanaAgents/neurosan.git
cd neurosan

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install neuro-san solana==0.36.11
```

### 2. Set API Keys

```bash
export ANTHROPIC_API_KEY="your-key-here"
export PYTHONPATH=$(pwd)
export AGENT_TOOL_PATH=$(pwd)/coded_tools
```

### 3. Run Your First Query

```bash
# Query SOL balance (wallet hidden from AI!)
python -m neuro_san.client.agent_cli \
  --agent solana_agent \
  --sly_data '{"wallet_pubkey": "YourWalletAddressHere"}' \
  "What is my SOL balance?"
```

---

## 🛠️ Available Tools

| Tool | Description | Privacy |
|------|-------------|---------|
| **GetBalance** | Query SOL balance | ✅ Wallet via sly_data |
| **GetTokenBalances** | All SPL token holdings | ✅ Wallet via sly_data |
| **GetTransactions** | Recent transaction history | ✅ Wallet via sly_data |
| **GetNFTs** | Discover owned NFTs | ✅ Wallet via sly_data |

All tools automatically read `wallet_pubkey` from the private sly_data channel.

---

## 📝 Example Queries

```bash
# Check token holdings
--sly_data '{"wallet_pubkey": "..."}' "Show me my token balances"

# View recent transactions  
--sly_data '{"wallet_pubkey": "..."}' "What are my last 5 transactions?"

# Find NFTs
--sly_data '{"wallet_pubkey": "..."}' "What NFTs do I own?"
```

---

## 🏗️ Project Structure

```
NeuroSanSolana/
├── coded_tools/
│   └── solana/
│       ├── __init__.py
│       ├── balance.py          # GetBalance
│       ├── tokens.py           # GetTokenBalances
│       ├── transactions.py     # GetTransactions
│       └── nfts.py             # GetNFTs
├── neuro_san/
│   └── registries/
│       └── solana_agent.hocon  # Agent config
├── docs/
│   └── landing/
│       └── index.html          # Landing page
└── README.md
```

---

## 🔧 Configuration

The agent is defined in `neuro_san/registries/solana_agent.hocon`:

```hocon
{
    "llm_config": {
        "model_name": "claude-3-haiku",
    },
    "tools": [
        {
            "name": "solana_agent",
            "function": {
                "sly_data_schema": {
                    "properties": {
                        "wallet_pubkey": {
                            "type": "string",
                            "description": "Solana wallet - kept private"
                        }
                    }
                }
            },
            "tools": ["balance_tool", "token_tool", "transaction_tool", "nft_tool"]
        }
    ]
}
```

---

## 🌐 RPC Configuration

By default, tools connect to **mainnet**. Override with:

```bash
--sly_data '{
  "wallet_pubkey": "...",
  "rpc_url": "https://api.devnet.solana.com"
}'
```

---

## 🏆 Solana Privacy Hack

This project is a submission for the [**Solana Privacy Hack**](https://solana.com/privacyhack) hackathon.

**Theme:** Privacy-preserving AI agents for Web3

**Key Innovation:** Using neuro-san's `sly_data` architecture to create the first AI blockchain assistant that maintains true privacy from the AI model itself.

---

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📜 License

Apache 2.0 — See [LICENSE.txt](LICENSE.txt)

---

## ⭐ Star This Repo

If you find this useful, please star the repo!

```bash
gh repo star NeuroSolanaAgents/neurosan
```

---

**Built with 💜 for the Solana Privacy Hack by [NeuroSolanaAgents](https://github.com/NeuroSolanaAgents)**
