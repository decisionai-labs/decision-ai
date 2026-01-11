"""
Solana NFT discovery tool for NeuroSanSolana.
Privacy Hack hackathon submission - solana.com/privacyhack
"""
from typing import Any, Dict

from solana.rpc.api import Client
from solders.pubkey import Pubkey

from neuro_san.interfaces.coded_tool import CodedTool

# Token Program IDs
TOKEN_PROGRAM_ID = Pubkey.from_string("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
TOKEN_2022_PROGRAM_ID = Pubkey.from_string("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb")


class GetNFTs(CodedTool):
    """
    CodedTool to discover NFTs owned by a Solana wallet.
    
    The wallet_pubkey is passed via sly_data for privacy.
    Identifies NFTs by looking for token accounts with amount = 1 and decimals = 0.
    """

    async def async_invoke(self, args: Dict[str, Any], sly_data: Dict[str, Any]) -> Any:
        """
        Get NFTs owned by a wallet address.
        
        :param args: Arguments from the calling agent (rpc_url optional)
        :param sly_data: Private data containing wallet_pubkey
        :return: Formatted NFT list string
        """
        wallet_pubkey = sly_data.get("wallet_pubkey") or args.get("wallet_pubkey")
        if not wallet_pubkey:
            return "Error: No wallet_pubkey provided in sly_data or args"
        
        rpc_url = args.get("rpc_url", "https://api.mainnet-beta.solana.com")
        
        try:
            client = Client(rpc_url)
            owner = Pubkey.from_string(wallet_pubkey)
            
            nfts = []
            
            # Check both token programs
            for program_id in [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]:
                response = client.get_token_accounts_by_owner_json_parsed(
                    owner,
                    opts={"programId": program_id}
                )
                
                if not response.value:
                    continue
                
                for account in response.value:
                    info = account.account.data.parsed["info"]
                    balance_info = info["tokenAmount"]
                    
                    # NFTs have decimals = 0 and amount = 1
                    if (balance_info["decimals"] == 0 and 
                        balance_info["uiAmount"] == 1):
                        
                        mint = info["mint"]
                        short_mint = f"{mint[:4]}...{mint[-4:]}"
                        
                        nfts.append({
                            "mint": mint,
                            "short_mint": short_mint
                        })
            
            if not nfts:
                return "No NFTs found in this wallet."
            
            # Format output
            lines = [f"### NFTs Found: {len(nfts)}\n"]
            
            for i, nft in enumerate(nfts[:15], 1):  # Show max 15
                lines.append(f"{i}. Mint: `{nft['short_mint']}`")
            
            if len(nfts) > 15:
                lines.append(f"\n... and {len(nfts) - 15} more NFTs")
            
            lines.append("\n_Note: For full metadata, query individual mints via Metaplex_")
            
            return "\n".join(lines)
            
        except Exception as e:
            return f"Error fetching NFTs: {str(e)}"
