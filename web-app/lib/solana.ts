/**
 * Solana RPC utilities for real blockchain queries.
 * Uses @solana/web3.js to fetch actual on-chain data.
 */
import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    ParsedAccountData,
    ConfirmedSignatureInfo,
    ParsedTransactionWithMeta
} from '@solana/web3.js';

// RPC endpoints - fallback chain for reliability
const MAINNET_RPCS = [
    'https://solana-mainnet.g.alchemy.com/v2/demo',
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

// Token Program ID
const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

/**
 * Get a working connection by trying multiple RPCs
 */
async function getConnection(useDevnet = false): Promise<Connection> {
    if (useDevnet) {
        return new Connection(DEVNET_RPC, 'confirmed');
    }

    // Try each mainnet RPC until one works
    for (const rpc of MAINNET_RPCS) {
        try {
            const connection = new Connection(rpc, 'confirmed');
            // Test the connection with a simple call
            await connection.getSlot();
            return connection;
        } catch {
            // Try next RPC
            continue;
        }
    }

    // Fallback to first one and let error propagate
    return new Connection(MAINNET_RPCS[0], 'confirmed');
}

/**
 * Get SOL balance for a wallet
 */
export async function getBalance(walletAddress: string, useDevnet = false): Promise<string> {
    try {
        const connection = await getConnection(useDevnet);
        const pubkey = new PublicKey(walletAddress);
        const balance = await connection.getBalance(pubkey);
        const solBalance = balance / LAMPORTS_PER_SOL;

        return `**SOL Balance**: ${solBalance.toFixed(4)} SOL (${balance.toLocaleString()} lamports)

Your wallet address was queried securely and never exposed to the AI.`;
    } catch (error) {
        if (error instanceof Error) {
            if (error.message.includes('Invalid public key')) {
                return 'Error: Invalid wallet address format. Please check and try again.';
            }
            return `Error fetching balance: ${error.message}`;
        }
        return 'Error fetching balance. Please try again.';
    }
}

/**
 * Get SPL token balances for a wallet
 */
export async function getTokenBalances(walletAddress: string, useDevnet = false): Promise<string> {
    try {
        const connection = await getConnection(useDevnet);
        const pubkey = new PublicKey(walletAddress);

        const response = await connection.getParsedTokenAccountsByOwner(pubkey, {
            programId: TOKEN_PROGRAM_ID
        });

        if (!response.value || response.value.length === 0) {
            return 'No SPL tokens found in this wallet.';
        }

        const tokens: { symbol: string; amount: number; mint: string }[] = [];

        for (const account of response.value) {
            const parsedData = account.account.data as ParsedAccountData;
            const info = parsedData.parsed?.info;
            if (!info) continue;

            const mint = info.mint as string;
            const tokenAmount = info.tokenAmount;
            const amount = tokenAmount?.uiAmount || 0;

            if (amount > 0) {
                const tokenInfo = KNOWN_TOKENS[mint];
                const symbol = tokenInfo?.symbol || `${mint.slice(0, 4)}...${mint.slice(-4)}`;
                tokens.push({ symbol, amount, mint });
            }
        }

        if (tokens.length === 0) {
            return 'No tokens with balance found in this wallet.';
        }

        // Sort by amount descending
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
    } catch (error) {
        if (error instanceof Error) {
            return `Error fetching tokens: ${error.message}`;
        }
        return 'Error fetching token balances. Please try again.';
    }
}

/**
 * Get recent transactions for a wallet
 */
export async function getTransactions(walletAddress: string, limit = 5, useDevnet = false): Promise<string> {
    try {
        const connection = await getConnection(useDevnet);
        const pubkey = new PublicKey(walletAddress);

        const signatures: ConfirmedSignatureInfo[] = await connection.getSignaturesForAddress(pubkey, { limit });

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
    } catch (error) {
        if (error instanceof Error) {
            return `Error fetching transactions: ${error.message}`;
        }
        return 'Error fetching transactions. Please try again.';
    }
}

/**
 * Parse user query and determine which function to call
 */
export async function processQuery(query: string, walletAddress: string): Promise<string> {
    const lower = query.toLowerCase();

    // Determine network (default to mainnet, allow devnet keyword)
    const useDevnet = lower.includes('devnet');

    if (lower.includes('balance') && !lower.includes('token')) {
        return await getBalance(walletAddress, useDevnet);
    }

    if (lower.includes('token') || lower.includes('spl') || lower.includes('holding')) {
        return await getTokenBalances(walletAddress, useDevnet);
    }

    if (lower.includes('transaction') || lower.includes('history') || lower.includes('activity')) {
        return await getTransactions(walletAddress, 5, useDevnet);
    }

    // Default help message
    return `I can help you with:

- **"What is my balance?"** - Check your SOL balance
- **"Show my tokens"** - View all SPL token holdings  
- **"Show my transactions"** - See recent transaction history

Add "devnet" to query devnet instead of mainnet.

Try asking one of these!`;
}
