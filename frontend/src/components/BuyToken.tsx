'use client';
import {
  useSimulateContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi';
import { Address, parseEther } from 'viem';
import { useState, useEffect } from 'react';
import { print } from '@/utils/toast';
import ico from '@/abi/ico.json';
import { ICOContractAddress } from '@/utils/smartContractAddress';
import { TokenBalance } from './TokenBalance';

export function BuyToken() {
  const contractAddress = ICOContractAddress as Address;
  const [amount, setAmount] = useState('0.01');

  const { error: estimateError } = useSimulateContract({
    address: contractAddress ?? undefined,
    abi: ico.abi,
    functionName: 'buyToken',
    value: parseEther(amount),
  });

  const { data, writeContract } = useWriteContract();

  const { error: txError, isSuccess: txSuccess } = useWaitForTransactionReceipt(
    {
      hash: data,
    }
  );

  const handleBuyTransaction = () => {
    if (estimateError) {
      print(`Transaction failed: ${estimateError.cause}`, 'error');
      return;
    }

    writeContract({
      address: contractAddress ?? undefined,
      abi: ico.abi,
      functionName: 'buyToken',
      value: parseEther(amount),
    });
  };

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  useEffect(() => {
    if (txSuccess) {
      print(`Transaction successful`, 'success');
    } else if (txError) {
      print(`Transaction failed: ${txError.cause}`, 'error');
    }
  }, [txSuccess, txError]);

  return (
    <section className="flex-grow flex justify-center items-center bg-gray-150 py-10">
      <div className="card bg-white shadow-xl rounded-lg max-w-sm w-full">
        {/* Token Balance Section */}
        <div className="card-body">
          <TokenBalance />
        </div>

        <div className="card-body bg-gray-50">
          {/* Title */}
          <h6 className="text-2xl font-bold text-gray-800 mb-4">Buy Token</h6>

          {/* Input Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-medium text-gray-700">Enter Quantity</span>
            </label>
            <input
              onChange={(e) => handleQuantityInput(e)}
              type="number"
              className="input input-bordered input-lg w-full text-base"
              placeholder="e.g., 100"
            />
          </div>

          {/* Buy Button */}
          <div className="mt-6">
            <button
              onClick={handleBuyTransaction}
              className="btn btn-primary btn-lg w-full text-lg font-semibold"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>


  );
}
