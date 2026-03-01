# Agent Chat System

> **Source**: `web-app/components/AgentChat.tsx` (323 lines), `web-app/app/demo/page.tsx`

---

## Overview

The Agent Chat is the core interactive feature — a chat interface where users connect their Solana wallet, prove ownership via signature, and then query their on-chain data through natural language.

---

## Component Architecture

```
DemoPage (app/demo/page.tsx)
  └── AgentChat (components/AgentChat.tsx)
        ├── Wallet Connection (WalletMultiButton)
        ├── Authentication (signature verification)
        ├── Message List (chat history)
        └── Query Input (send queries to /api/solana)
```

---

## State Management

```typescript
interface Message {
    id: string;
    role: 'user' | 'agent';
    content: string;
    timestamp: Date;
}

// Component state
const [messages, setMessages] = useState<Message[]>([]);
const [input, setInput] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [authSignature, setAuthSignature] = useState<string | null>(null);
const [authMessage, setAuthMessage] = useState<string | null>(null);
```

---

## User Flow

```
1. User visits /demo page
2. Clicks "Connect Wallet" (WalletMultiButton)
3. Phantom/Solflare popup → approve connection
4. Clicks "Verify Wallet" button
5. handleAuthenticate() → generateAuthMessage() → wallet.signMessage()
6. Signature stored in state (isAuthenticated = true)
7. User types query (e.g., "What is my balance?")
8. handleSend() → POST /api/solana with {query, wallet, signature, message}
9. Response displayed as agent message
10. Scroll to bottom automatically
```

---

## Key Functions

| Function | Purpose |
|----------|---------|
| `scrollToBottom()` | Auto-scroll chat to latest message |
| `handleAuthenticate()` | Generate auth message → sign with wallet → store signature |
| `handleSend()` | Send query to `/api/solana` → display response |

### Authentication Flow
```typescript
async function handleAuthenticate() {
    const message = generateAuthMessage();          // Timestamped message
    const encoded = new TextEncoder().encode(message);
    const signature = await wallet.signMessage(encoded); // Wallet popup
    const sigBase58 = bs58.encode(signature);       // Encode for transport
    
    setAuthSignature(sigBase58);
    setAuthMessage(message);
    setIsAuthenticated(true);
}
```

### Query Flow
```typescript
async function handleSend() {
    // Add user message to chat
    // POST to /api/solana with wallet + signature + query
    // Add agent response to chat
    // Auto-scroll
}
```

---

## Demo Page Layout

The demo page (`/demo`) wraps the AgentChat with:
- Back to home navigation
- "Interactive Demo" badge
- Title and description
- Two info cards: "Privacy Protected" + "Live Data"
- Example queries section (5 pre-written prompts)

### Example Queries
- "What is my SOL balance?"
- "Show all my tokens"
- "Get my recent transactions"
- "Do I have any NFTs?"
- "Query devnet balance"

---

## Dependencies
- `@solana/wallet-adapter-react` — wallet hooks
- `@solana/wallet-adapter-react-ui` — WalletMultiButton component
- `bs58` — base58 signature encoding
- `lib/signature.ts` — auth message generation

---

## To Rebuild
1. **Keep the authentication logic** — `handleAuthenticate()` pattern is UI-independent
2. **Keep the API call pattern** — POST to `/api/solana` with signature
3. **Rebuild the chat UI** — match the new template's chat/messaging component
4. **Map example queries** — add to new template's prompt suggestion area
