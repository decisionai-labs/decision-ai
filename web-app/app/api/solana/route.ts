/**
 * Server-side Solana RPC API route.
 * Proxies requests to Solana RPCs to bypass CORS restrictions.
 */
import { NextRequest, NextResponse } from 'next/server';
import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import bs58 from 'bs58';
import { verifySignature, isSignatureExpired } from '@/lib/signature';

// RPC endpoints - server-side doesn't have CORS issues
const MAINNET_RPCS = [
    'https://api.mainnet-beta.solana.com',
    'https://solana-api.projectserum.com',
];
const DEVNET_RPC = 'https://api.devnet.solana.com';

// Well-known token symbols
const KNOWN_TOKENS: Record<string, { symbol: string; decimals: number }> = {
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v': { symbol: 'USDC', decimals: 6 },
    'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB': { symbol: 'USDT', decimals: 6 },
    'So11111111111111111111111111111111111111112': { symbol: 'wSOL', decimals: 9 },
    'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263': { symbol: 'BONK', decimals: 5 },
    'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN': { symbol: 'JUP', decimals: 6 },
    'mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So': { symbol: 'mSOL', decimals: 9 },
};

const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

async function getConnection(useDevnet = false): Promise<Connection> {
    if (useDevnet) {
        return new Connection(DEVNET_RPC, 'confirmed');
    }

    for (const rpc of MAINNET_RPCS) {
        try {
            const connection = new Connection(rpc, 'confirmed');
            await connection.getSlot();
            return connection;
        } catch {
            continue;
        }
    }

    return new Connection(MAINNET_RPCS[0], 'confirmed');
}

async function getBalance(wallet: string, useDevnet: boolean): Promise<string> {
    const connection = await getConnection(useDevnet);
    const pubkey = new PublicKey(wallet);
    const balance = await connection.getBalance(pubkey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    return `**SOL Balance**: ${solBalance.toFixed(4)} SOL (${balance.toLocaleString()} lamports)

Your wallet address was queried securely and never exposed to the AI.`;
}

async function getTokens(wallet: string, useDevnet: boolean): Promise<string> {
    const connection = await getConnection(useDevnet);
    const pubkey = new PublicKey(wallet);

    const response = await connection.getParsedTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID
    });

    if (!response.value || response.value.length === 0) {
        return 'No SPL tokens found in this wallet.';
    }

    const tokens: { symbol: string; amount: number; mint: string }[] = [];

    for (const account of response.value) {
        const parsedData = account.account.data as { parsed?: { info?: { mint: string, tokenAmount?: { uiAmount: number } } } };
        const info = parsedData.parsed?.info;
        if (!info) continue;

        const mint = info.mint as string;
        const amount = info.tokenAmount?.uiAmount || 0;

        if (amount > 0) {
            const tokenInfo = KNOWN_TOKENS[mint];
            const symbol = tokenInfo?.symbol || `${mint.slice(0, 4)}...${mint.slice(-4)}`;
            tokens.push({ symbol, amount, mint });
        }
    }

    if (tokens.length === 0) {
        return 'No tokens with balance found in this wallet.';
    }

    tokens.sort((a, b) => b.amount - a.amount);

    let result = `**Found ${tokens.length} token${tokens.length > 1 ? 's' : ''}:**\n\n`;

    for (const token of tokens.slice(0, 10)) {
        result += `- **${token.symbol}**: ${token.amount.toLocaleString(undefined, { maximumFractionDigits: 4 })}\n`;
    }

    if (tokens.length > 10) {
        result += `\n... and ${tokens.length - 10} more tokens`;
    }

    result += '\n\nToken data queried securely without exposing your wallet to the AI.';

    return result;
}

async function getTransactions(wallet: string, useDevnet: boolean): Promise<string> {
    const connection = await getConnection(useDevnet);
    const pubkey = new PublicKey(wallet);

    const signatures = await connection.getSignaturesForAddress(pubkey, { limit: 5 });

    if (!signatures || signatures.length === 0) {
        return 'No recent transactions found for this wallet.';
    }

    let result = `**Last ${signatures.length} transaction${signatures.length > 1 ? 's' : ''}:**\n\n`;

    for (let i = 0; i < signatures.length; i++) {
        const sig = signatures[i];
        const shortSig = `${sig.signature.slice(0, 8)}...`;
        const timestamp = sig.blockTime
            ? new Date(sig.blockTime * 1000).toLocaleString()
            : 'Unknown time';
        const status = sig.err ? 'Failed' : 'Success';

        result += `${i + 1}. \`${shortSig}\` - ${status} - ${timestamp}\n`;
    }

    result += '\n\nTransaction history queried securely via sly_data.';

    return result;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query, wallet, signature, message, useDevnet = false } = body;

        if (!wallet || wallet.length < 32) {
            return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 });
        }

        // Verify signature to prove wallet ownership
        if (!signature || !message) {
            return NextResponse.json({
                error: 'Authentication required. Please sign a message to prove wallet ownership.'
            }, { status: 401 });
        }

        // Check if signature is expired (5 minute window)
        if (isSignatureExpired(message)) {
            return NextResponse.json({
                error: 'Signature expired. Please reconnect and sign a new message.'
            }, { status: 401 });
        }

        // Decode signature from base58
        let signatureBytes: Uint8Array;
        try {
            signatureBytes = bs58.decode(signature);
        } catch {
            return NextResponse.json({ error: 'Invalid signature format' }, { status: 400 });
        }

        // Verify the signature
        const verification = verifySignature(wallet, signatureBytes, message);
        if (!verification.isValid) {
            return NextResponse.json({
                error: `Signature verification failed: ${verification.error}`
            }, { status: 403 });
        }

        const lower = query.toLowerCase();
        let response: string;

        if (lower.includes('balance') && !lower.includes('token')) {
            response = await getBalance(wallet, useDevnet);
        } else if (lower.includes('token') || lower.includes('spl') || lower.includes('holding')) {
            response = await getTokens(wallet, useDevnet);
        } else if (lower.includes('transaction') || lower.includes('history') || lower.includes('activity')) {
            response = await getTransactions(wallet, useDevnet);
        } else {
            response = `I can help you with:

- **"What is my balance?"** - Check your SOL balance
- **"Show my tokens"** - View all SPL token holdings  
- **"Show my transactions"** - See recent transaction history

Add "devnet" to query devnet instead of mainnet.

Try asking one of these!`;
        }

        return NextResponse.json({ response });
    } catch (error) {
        console.error('Solana API error:', error);
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({ error: `Failed to query Solana: ${message}` }, { status: 500 });
    }
}
