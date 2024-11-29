import { useEffect } from "react";
import { encodeFunctionData, parseEther } from "viem";
import { useBalance, useEstimateGas } from "wagmi";
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
}

export interface UseBridgeEthProps {
  amountToBridge: string;
  recipient?: string;
}

export const useBridgeEth = ({
  amountToBridge,
  recipient,
}: UseBridgeEthProps): UseBridgeReturnType => {
  const { isMainnet, isCorrectChain, address } = useEthereum();

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
    writeData,
  } = useWriteContractWithWait();

  console.log("Write data", writeData);

  const calldata = encodeFunctionData({
    abi: bridgeAbi,
    functionName: "bridgeETH",
    args: [recipient as `0x${string}`, destinationChainID],
  });

  const result = useEstimateGas({
    value: amountToBridgeValue,
    to: bridgeAddress,
    data: calldata,
  });

  console.log("Estimate gas result", result.data);

  const handleBridgeWrite = () => {
    // console.log("Bridge write");
    if (canBridge) {
      return write({
        address: bridgeAddress,
        abi: bridgeAbi,
        functionName: "bridgeETH",
        args: [recipient as `0x${string}`, destinationChainID],
        value: amountToBridgeValue - (result.data ?? 0n),
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
    value: amountToBridgeValue - (result.data ?? 0n),
    formatted: amountToBridge ?? "0",
    decimals: decimals,
    symbol: "ETH",
    display: amountDisplay,
    isLoading: isTokenBalanceLoading,
  };

  return {
    tokenBalance: ethBalance,
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
