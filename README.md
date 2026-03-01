# Decision AI

> **Privacy-First AI Agents for Solana** — The first AI agent framework that keeps your wallet private from the AI itself.

[![Solana Privacy Hack](https://img.shields.io/badge/Solana-Privacy_Hack-14F195?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com/privacyhack)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE.txt)

---

## The Problem

Traditional AI blockchain assistants require your wallet address directly in the prompt — meaning:

- AI providers see (and log) your addresses
- Your holdings are exposed in prompt history
- Fine-tuning could leak your financial data
- Third-party integrations may receive your data without consent

**Decision AI fixes this** with a zero-knowledge architecture where the AI never sees your wallet.

---

## What Makes This Different

| Traditional AI Tools | Decision AI |
|---|---|
| Wallet address pasted into AI prompt | Wallet never enters the AI context |
| AI provider logs your financial data | Zero-knowledge by design |
| Prompt history exposes holdings | Private data stays private |
| Centralized, closed-source | Open source & auditable |

---

## Capabilities

- **Check Balances** — Query your SOL and SPL token balances privately
- **Review Transactions** — Get human-readable summaries of on-chain activity
- **Explore Tokens** — Discover and analyze your token portfolio
- **Analyze NFTs** — View your NFT collection with full privacy

All queries are processed without the AI model ever learning your wallet address or financial data.

---

## Quick Start

```bash
git clone https://github.com/NeuroSolanaAgents/neurosan.git
cd neurosan

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

See the [README](https://github.com/NeuroSolanaAgents/neurosan) for more details.

---

## How It Works

Decision AI uses a **privacy-preserving architecture** that separates sensitive data from the AI reasoning layer. When you ask a question about your wallet:

1. **Your request** goes to the AI agent in natural language
2. **Your wallet address** travels through a separate, private channel — never visible to the AI
3. **The AI reasons** about your request without knowing who you are
4. **Results are returned** with full blockchain accuracy

The AI can help you with everything a traditional tool can — without the privacy tradeoff.

---

## Solana Privacy Hack

This project is a submission for the [**Solana Privacy Hack**](https://solana.com/privacyhack) hackathon.

**Theme:** Privacy-preserving AI agents for Web3

**Key Innovation:** The first AI blockchain assistant that maintains true data privacy from the AI model itself — your wallet never appears in the AI's context window.

---

## Contributing

We welcome contributions! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

Apache 2.0 — See [LICENSE.txt](LICENSE.txt)

---

If you find this useful, please star the repo!

**Built for the Solana Privacy Hack by [NeuroSolanaAgents](https://github.com/NeuroSolanaAgents)**
