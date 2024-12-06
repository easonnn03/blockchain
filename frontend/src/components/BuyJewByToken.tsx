'use client';
import { Address, parseEther } from 'viem';
import { ethers } from 'ethers';
import jewToken from '@/abi/jewToken.json';
import { tokenContractAddress } from '@/utils/smartContractAddress';
import { Eip1193Provider } from 'ethers';

interface InteractiveButtonProps {
  subtotal: number;
}

const BuyJewByToken: React.FC<InteractiveButtonProps> = ({ subtotal }) => {
  const tokenAddress = tokenContractAddress as Address;

  async function handleTransaction({
    provider,
    toAddress,
    tokenAmount,
  }: {
    provider: ethers.BrowserProvider;
    toAddress: Address;
    tokenAmount: bigint;
  }) {
    try {
      const signer = await provider.getSigner();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        jewToken.abi,
        signer
      );
      console.log(`Sending ${tokenAmount} tokens to: ${toAddress}`);

      const tx = await tokenContract.transfer(toAddress, tokenAmount);

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      console.log('Transaction confirmed. Receipt:', receipt);
      return receipt;
    } catch (error) {
      console.log('Error transfering tokens:', error);
      throw error;
    }
  }

  async function handleOrderTransaction() {
    const tokenAmount = subtotal.toString();
    const ownerAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const provider = new ethers.BrowserProvider(
      window.ethereum as Eip1193Provider
    );
    console.log(`Recipient Address: ${ownerAddress}`);
    console.log(`Transfer Amount: ${tokenAmount}`);
    const receipt = await handleTransaction({
      provider,
      toAddress: ownerAddress,
      tokenAmount: parseEther(tokenAmount.toString()),
    });

    console.log(receipt);
  }

  return (
    <button onClick={handleOrderTransaction} className="btn-primary btn sm:w-[200px]">Checkout</button>
  );
}

export default BuyJewByToken;