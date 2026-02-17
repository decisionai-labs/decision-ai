'use client';

import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider as SolanaWalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletProviderProps {
    children: ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({ children }) => {
    // Use mainnet-beta by default
    const network = WalletAdapterNetwork.Mainnet;

    // RPC endpoint - using public endpoint for now
    const endpoint = useMemo(() => {
        if (network === WalletAdapterNetwork.Mainnet) {
            return 'https://api.mainnet-beta.solana.com';
        }
        return 'https://api.devnet.solana.com';
    }, [network]);

    // Configure supported wallets
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <SolanaWalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </SolanaWalletProvider>
        </ConnectionProvider>
    );
};
