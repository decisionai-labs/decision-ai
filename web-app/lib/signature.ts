import { PublicKey } from '@solana/web3.js';
import nacl from 'tweetnacl';

export interface SignatureVerificationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Verify a wallet signature to prove ownership
 * @param walletAddress - The wallet's public key as a string
 * @param signature - The signature bytes
 * @param message - The original message that was signed
 */
export function verifySignature(
    walletAddress: string,
    signature: Uint8Array,
    message: string
): SignatureVerificationResult {
    try {
        const publicKey = new PublicKey(walletAddress);
        const messageBytes = new TextEncoder().encode(message);

        const isValid = nacl.sign.detached.verify(
            messageBytes,
            signature,
            publicKey.toBytes()
        );

        return {
            isValid,
            error: isValid ? undefined : 'Invalid signature'
        };
    } catch (error) {
        return {
            isValid: false,
            error: error instanceof Error ? error.message : 'Verification failed'
        };
    }
}

/**
 * Generate a message for the user to sign
 * Includes timestamp to prevent replay attacks
 */
export function generateAuthMessage(): string {
    const timestamp = Date.now();
    return `Authenticate with NeuroSan\n\nTimestamp: ${timestamp}\n\nThis signature proves you own this wallet.`;
}

/**
 * Check if a signature is still valid (not expired)
 * @param message - The signed message containing the timestamp
 * @param maxAgeMs - Maximum age in milliseconds (default: 5 minutes)
 */
export function isSignatureExpired(message: string, maxAgeMs: number = 5 * 60 * 1000): boolean {
    try {
        const timestampMatch = message.match(/Timestamp: (\d+)/);
        if (!timestampMatch) return true;

        const timestamp = parseInt(timestampMatch[1]);
        const age = Date.now() - timestamp;

        return age > maxAgeMs;
    } catch {
        return true;
    }
}
