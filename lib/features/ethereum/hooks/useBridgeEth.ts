import { useCallback, useEffect, useState } from "react";
import { parseEther } from "viem";
import {
  useBalance,
  useEstimateFeesPerGas,
  useGasPrice,
  usePublicClient,
} from "wagmi";
import { bridgeAbi } from "../../../abi/bridgeAbi";
import {
  stringNumberToInput,
  stringNumberToLocale,
} from "../../../utils/string";
import { TokenBalance, WriteContractWithAmount } from "../types";
import { useEthereum } from "./useEthereum";
import { useWriteContractWithWait } from "./useWriteContractWithWait";

export interface UseBridgeReturnType {
  bridge: WriteContractWithAmount;
  tokenBalance: TokenBalance;
  fee: bigint;
}

export interface UseBridgeEthProps {
  amountToBridge: string;
  recipient?: string;
}

export const useBridgeEth = ({
  amountToBridge,
  recipient,
}: UseBridgeEthProps): UseBridgeReturnType => {
  const [gasEstimate, setGasEstimate] = useState<bigint>(1n);
  const { isMainnet, isCorrectChain, address } = useEthereum();
  const publicClient = usePublicClient();

  const bridgeAddress = isMainnet
    ? "0xda3bd1fe1973470312db04551b65f401bc8a92fd"
    : "0xae68f87938439afeedd6552b0e83d2cbc2473623";
  const destinationChainID = isMainnet ? 0 : 1;

  const decimals = 18;

  const amountToBridgeValue =
    amountToBridge && amountToBridge.length > 0
      ? parseEther(amountToBridge)
      : 0n;
  const amountDisplay = stringNumberToInput(amountToBridge ?? "0", decimals);

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
    refetch: refetchBalance,
  } = useBalance({
    address,
  });

  const ethBalance: TokenBalance = {
    value: tokenBalance?.value ?? 0n,
    formatted: tokenBalance?.formatted ?? "0",
    symbol: "ETH",
    decimals: decimals,
    display: stringNumberToLocale({
      value: tokenBalance?.formatted ?? "0",
      decimals: decimals,
    }),
  };

  const hasBalance = Boolean(ethBalance?.value && ethBalance.value > 0n);

  const canBridge =
    isCorrectChain &&
    hasBalance &&
    recipient !== undefined &&
    amountToBridgeValue > 0n;

  const {
    isWritePending,
    isConfirming,
    isConfirmed,
    isError,
    isWriteError,
    writeError,
    hash,
    write,
    resetWrite,
  } = useWriteContractWithWait();

  const { data: feesPerGas } = useEstimateFeesPerGas();
  const { data: gasPrice = 1n } = useGasPrice();

  const estimateGas = useCallback(async () => {
    if (publicClient !== undefined && address !== undefined) {
      try {
        const estimate = await publicClient.estimateContractGas({
          address: bridgeAddress,
          abi: bridgeAbi,
          functionName: "bridgeETH",
          args: [
            "0x9b72bf51cf9e936a41bf477fbf8bef25644147be1cdc429d03c4815923cbca51",
            destinationChainID,
          ],
          value: 10000000000n,
          account: address,
        });

        setGasEstimate(estimate);
        return estimate;
      } catch (error) {
        console.error("Estimate gas failed:", error);
        throw new Error("Public client is undefined");
      }
    }
  }, [publicClient, bridgeAddress, destinationChainID, address]);

  useEffect(() => {
    if (address !== undefined) {
      void estimateGas();
    }
  }, [address, estimateGas]);

  const effectiveGasPrice = gasPrice || 1n;
  const effectiveMaxPriorityFeePerGas =
    feesPerGas?.maxPriorityFeePerGas || effectiveGasPrice;
  const effectiveMaxFeePerGas = feesPerGas?.maxFeePerGas || effectiveGasPrice;

  const fee =
    gasEstimate * (effectiveMaxPriorityFeePerGas + effectiveMaxFeePerGas) * 10n;

  const handleBridgeWrite = () => {
    if (canBridge) {
      return write({
        address: bridgeAddress,
        abi: bridgeAbi,
        functionName: "bridgeETH",
        args: [recipient as `0x${string}`, destinationChainID],
        value: amountToBridgeValue,
      });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      if (refetchBalance) {
        refetchBalance().catch((error) => {
          console.error("Refetching data failed:", error);
        });
      }
    }
  }, [isConfirmed, refetchBalance]);

  const amount: TokenBalance = {
    value: amountToBridgeValue,
    formatted: amountToBridge ?? "0",
    decimals: decimals,
    symbol: "ETH",
    display: amountDisplay,
    isLoading: isTokenBalanceLoading,
  };

  return {
    tokenBalance: ethBalance,
    fee,
    bridge: {
      write,
      handleWrite: handleBridgeWrite,
      isWritePending,
      isConfirmed,
      isConfirming,
      isError,
      isWriteError,
      writeError,
      hash,
      resetWrite,
      amount: amount,
      canWrite: canBridge,
    },
  };
};
