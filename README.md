# 🧠 NeuroSanSolana

> **A Solana-powered AI agent network** - Fork of [neuro-san](https://github.com/cognizant-ai-lab/neuro-san) with native Solana blockchain integration.

[![Solana Privacy Hack](https://img.shields.io/badge/Solana-Privacy_Hack-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/privacyhack)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE.txt)

---

## 🚀 What is NeuroSanSolana?

NeuroSanSolana combines the power of **neuro-san's multi-agent AI networks** with **Solana blockchain** capabilities. Build AI agents that can:

- 💰 Query wallet balances (SOL & tokens)
- 🔒 Keep wallet addresses private via `sly_data`
- 🤖 Use Claude, GPT-4, or any LLM provider
- 🌐 Connect to any Solana RPC (devnet, mainnet, custom)

---

## ⚡ Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/NeuroSolanaAgents/NeuroSanSolana.git
cd NeuroSanSolana

# Create virtual environment (requires Python 3.10+)
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

### 3. Run the Solana Agent

```bash
python -m neuro_san.client.agent_cli \
  --agent solana_agent \
  --sly_data '{"wallet_pubkey": "So11111111111111111111111111111111111111112"}' \
  "What is the balance of this wallet?"
```

**Output:**
```
Balance: 0.0000 SOL (0 lamports)
```

---

## 🔐 Privacy-First Design

NeuroSanSolana uses neuro-san's `sly_data` channel to keep wallet addresses **out of the LLM chat stream**:

```bash
# Wallet address stays private - never exposed to the AI model's context
--sly_data '{"wallet_pubkey": "YourWalletAddress..."}'
```

This is perfect for building **privacy-preserving blockchain AI assistants**.

---

## 🛠️ Agent Configuration

The Solana agent is defined in `neuro_san/registries/solana_agent.hocon`:

```hocon
{
    "llm_config": {
        "model_name": "claude-3-5-sonnet-20241022",
        "api_type": "anthropic"
    },
    "tools": [
        {
            "name": "solana_agent",
            "function": {
                "sly_data_schema": {
                    "properties": {
                        "wallet_pubkey": {
                            "type": "string",
                            "description": "Solana wallet public key - kept private"
                        }
                    }
                }
            },
            "tools": ["balance_tool"]
        },
        {
            "name": "balance_tool",
            "class": "solana.balance.GetBalance"
        }
    ]
}
```

---

## 📁 Project Structure

```
NeuroSanSolana/
├── coded_tools/
│   └── solana/
│       ├── __init__.py
│       └── balance.py          # GetBalance CodedTool
├── neuro_san/
│   └── registries/
│       └── solana_agent.hocon  # Agent config
└── README.md
```

---

## 🏆 Solana Privacy Hack

This project is a submission for the [**Solana Privacy Hack**](https://solana.com/privacyhack) hackathon.

**Theme:** Privacy-preserving AI agents for Web3

---

## ⭐ Support

If you find this useful, please **star this repo!** ⭐

```
gh repo star NeuroSolanaAgents/NeuroSanSolana
```

---

## 📜 License

Apache 2.0 - See [LICENSE.txt](LICENSE.txt)

---

**Built with 💜 by [NeuroSolanaAgents](https://github.com/NeuroSolanaAgents)**
