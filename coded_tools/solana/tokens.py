"""
Solana SPL Token balance checking tool for NeuroSanSolana.
Privacy Hack hackathon submission - solana.com/privacyhack
"""
import json
from typing import Any, Dict

from solana.rpc.api import Client
from solders.pubkey import Pubkey

from neuro_san.interfaces.coded_tool import CodedTool

# Well-known SPL Token Program ID
TOKEN_PROGRAM_ID = Pubkey.from_string("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")

# Common token mints for display names
KNOWN_TOKENS = {
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": {"symbol": "USDC", "decimals": 6},
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": {"symbol": "USDT", "decimals": 6},
    "So11111111111111111111111111111111111111112": {"symbol": "wSOL", "decimals": 9},
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": {"symbol": "BONK", "decimals": 5},
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": {"symbol": "JUP", "decimals": 6},
    "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs": {"symbol": "ETH (Wormhole)", "decimals": 8},
    "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": {"symbol": "mSOL", "decimals": 9},
}


class GetTokenBalances(CodedTool):
    """
    CodedTool to get SPL token balances for a Solana wallet.
    
    The wallet_pubkey is passed via sly_data for privacy.
    """

    async def async_invoke(self, args: Dict[str, Any], sly_data: Dict[str, Any]) -> Any:
        """
        Get all SPL token balances for a wallet address.
        
        :param args: Arguments from the calling agent (rpc_url optional)
        :param sly_data: Private data containing wallet_pubkey
        :return: Formatted token balances string
        """
        wallet_pubkey = sly_data.get("wallet_pubkey") or args.get("wallet_pubkey")
        if not wallet_pubkey:
            return "Error: No wallet_pubkey provided in sly_data or args"
        
        rpc_url = args.get("rpc_url", "https://api.mainnet-beta.solana.com")
        
        try:
            client = Client(rpc_url)
            owner = Pubkey.from_string(wallet_pubkey)
            
            # Get all token accounts for this wallet
            response = client.get_token_accounts_by_owner_json_parsed(
                owner,
                opts={"programId": TOKEN_PROGRAM_ID}
            )
            
            if not response.value:
                return "No SPL token accounts found for this wallet."
            
            tokens = []
            for account in response.value:
                info = account.account.data.parsed["info"]
                mint = info["mint"]
                balance_info = info["tokenAmount"]
                
                amount = float(balance_info["uiAmount"]) if balance_info["uiAmount"] else 0
                
                # Only show tokens with balance
                if amount > 0:
                    token_info = KNOWN_TOKENS.get(mint, {})
                    symbol = token_info.get("symbol", f"Unknown ({mint[:8]}...)")
                    
                    tokens.append({
                        "symbol": symbol,
                        "amount": amount,
                        "mint": mint
                    })
            
            if not tokens:
                return "No tokens with balance found in this wallet."
            
            # Sort by amount descending
            tokens.sort(key=lambda x: x["amount"], reverse=True)
            
            # Format output
            lines = ["### SPL Token Balances\n"]
            for t in tokens[:10]:  # Top 10 tokens
                lines.append(f"- **{t['symbol']}**: {t['amount']:,.4f}")
            
            if len(tokens) > 10:
                lines.append(f"\n... and {len(tokens) - 10} more tokens")
            
            return "\n".join(lines)
            
        except Exception as e:
            return f"Error fetching token balances: {str(e)}"
