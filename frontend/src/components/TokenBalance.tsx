'use client';
import { useAccount, useReadContract } from 'wagmi';
import { Address } from 'viem';
import jewToken from '@/abi/jewToken.json'; // Import token ABI
import { tokenContractAddress } from '@/utils/smartContractAddress';

export function TokenBalance() {
  const contractAddress = tokenContractAddress as Address;
  const { address } = useAccount(); // Get connected user's wallet address

  // Fetch token decimals
  const { data: decimals } = useReadContract({
    address: contractAddress ?? undefined,
    abi: jewToken.abi,
    functionName: 'decimals',
  });

  // Fetch token balance
  const { data: balance } = useReadContract({
    address: contractAddress ?? undefined,
    abi: jewToken.abi,
    functionName: 'balanceOf',
    args: [address],
  });

  // Calculate formatted balance
  const formattedBalance =
    balance && decimals
      ? parseFloat(balance.toString()) / Math.pow(10, decimals as number)
      : 0;

  return (
    <div>
      <h2>Token Balance</h2>
      {address ? (
        <p>Your Balance: {formattedBalance} JEW</p>
      ) : (
        <p>Please connect your wallet</p>
      )}
    </div>
  );
}
