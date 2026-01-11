"""
Solana balance checking coded tool for NeuroSanSolana.
Privacy Hack hackathon submission - solana.com/privacyhack
"""
from typing import Any, Dict

from solana.rpc.api import Client
from solders.pubkey import Pubkey

from neuro_san.interfaces.coded_tool import CodedTool


class GetBalance(CodedTool):
    """
    CodedTool to get SOL balance for a Solana wallet.
    
    The wallet_pubkey is passed via sly_data for privacy.
    """

    async def async_invoke(self, args: Dict[str, Any], sly_data: Dict[str, Any]) -> Any:
        """
        Get the SOL balance for a wallet address.
        
        :param args: Arguments from the calling agent (rpc_url optional)
        :param sly_data: Private data containing wallet_pubkey
        :return: Formatted balance string
        """
        # Get wallet from sly_data (private) or args (public)
        wallet_pubkey = sly_data.get("wallet_pubkey") or args.get("wallet_pubkey")
        if not wallet_pubkey:
            return "Error: No wallet_pubkey provided in sly_data or args"
        
        rpc_url = args.get("rpc_url", "https://api.devnet.solana.com")
        
        try:
            client = Client(rpc_url)
            pubkey = Pubkey.from_string(wallet_pubkey)
            response = client.get_balance(pubkey)
            balance = response.value
            
            sol_balance = balance / 1e9
            return f"Balance: {sol_balance:.4f} SOL ({balance} lamports)"
        except Exception as e:
            return f"Error fetching balance: {str(e)}"
