"""
Solana transaction history tool for NeuroSanSolana.
Privacy Hack hackathon submission - solana.com/privacyhack
"""
from datetime import datetime
from typing import Any, Dict, List

from solana.rpc.api import Client
from solders.pubkey import Pubkey
from solders.signature import Signature

from neuro_san.interfaces.coded_tool import CodedTool


class GetTransactions(CodedTool):
    """
    CodedTool to get recent transaction history for a Solana wallet.
    
    The wallet_pubkey is passed via sly_data for privacy.
    """

    async def async_invoke(self, args: Dict[str, Any], sly_data: Dict[str, Any]) -> Any:
        """
        Get recent transactions for a wallet address.
        
        :param args: Arguments from the calling agent (limit, rpc_url optional)
        :param sly_data: Private data containing wallet_pubkey
        :return: Formatted transaction history string
        """
        wallet_pubkey = sly_data.get("wallet_pubkey") or args.get("wallet_pubkey")
        if not wallet_pubkey:
            return "Error: No wallet_pubkey provided in sly_data or args"
        
        limit = min(int(args.get("limit", 5)), 10)  # Max 10 transactions
        rpc_url = args.get("rpc_url", "https://api.mainnet-beta.solana.com")
        
        try:
            client = Client(rpc_url)
            pubkey = Pubkey.from_string(wallet_pubkey)
            
            # Get transaction signatures
            sigs_response = client.get_signatures_for_address(
                pubkey,
                limit=limit
            )
            
            if not sigs_response.value:
                return "No transactions found for this wallet."
            
            lines = ["### Recent Transactions\n"]
            
            for sig_info in sigs_response.value:
                # Parse signature info
                signature = str(sig_info.signature)
                block_time = sig_info.block_time
                slot = sig_info.slot
                err = sig_info.err
                
                # Format timestamp
                if block_time:
                    dt = datetime.fromtimestamp(block_time)
                    time_str = dt.strftime("%Y-%m-%d %H:%M:%S")
                else:
                    time_str = "Unknown time"
                
                # Status
                status = "✅ Success" if err is None else "❌ Failed"
                
                # Shortened signature for display
                short_sig = f"{signature[:8]}...{signature[-8:]}"
                
                lines.append(f"- **{time_str}** | {status}")
                lines.append(f"  - Signature: `{short_sig}`")
                lines.append(f"  - Slot: {slot:,}")
                lines.append("")
            
            # Add explorer link hint (without exposing wallet)
            lines.append("_Use transaction signatures to view details on Solana Explorer_")
            
            return "\n".join(lines)
            
        except Exception as e:
            return f"Error fetching transactions: {str(e)}"


class GetTransactionDetails(CodedTool):
    """
    CodedTool to get details of a specific transaction.
    
    This tool takes a transaction signature and returns parsed details.
    """

    async def async_invoke(self, args: Dict[str, Any], sly_data: Dict[str, Any]) -> Any:
        """
        Get details of a specific transaction.
        
        :param args: Arguments including 'signature' (required)
        :param sly_data: Private data (not used for this tool)
        :return: Formatted transaction details
        """
        signature = args.get("signature")
        if not signature:
            return "Error: No transaction signature provided"
        
        rpc_url = args.get("rpc_url", "https://api.mainnet-beta.solana.com")
        
        try:
            client = Client(rpc_url)
            sig = Signature.from_string(signature)
            
            # Get transaction details
            tx_response = client.get_transaction(
                sig,
                encoding="jsonParsed",
                max_supported_transaction_version=0
            )
            
            if not tx_response.value:
                return "Transaction not found."
            
            tx = tx_response.value
            
            # Extract basic info
            slot = tx.slot
            block_time = tx.block_time
            
            if block_time:
                dt = datetime.fromtimestamp(block_time)
                time_str = dt.strftime("%Y-%m-%d %H:%M:%S UTC")
            else:
                time_str = "Unknown"
            
            # Check if successful
            meta = tx.transaction.meta
            status = "✅ Success" if meta and meta.err is None else "❌ Failed"
            
            # Get fee
            fee = meta.fee if meta else 0
            fee_sol = fee / 1e9
            
            lines = [
                "### Transaction Details\n",
                f"- **Status**: {status}",
                f"- **Time**: {time_str}",
                f"- **Slot**: {slot:,}",
                f"- **Fee**: {fee_sol:.6f} SOL",
                "",
                f"[View on Solana Explorer](https://explorer.solana.com/tx/{signature})"
            ]
            
            return "\n".join(lines)
            
        except Exception as e:
            return f"Error fetching transaction details: {str(e)}"
