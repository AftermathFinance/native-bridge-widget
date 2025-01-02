import { useEffect } from "react";
import { bridgeAbi } from "../../../abi/bridgeAbi";
import { parseStringToBigInt } from "../../../utils/numbers";
import { stringNumberToInput } from "../../../utils/string";
import { getBridgeToken } from "../getBridgeToken";
import {
  TokenBalance,
  WriteContractWithAmount,
  WriteContractWithWait,
} from "../types";
import { useAllowance } from "./useAllowance";
import { useEthereum } from "./useEthereum";
import { useTokenBalance } from "./useTokenBalance";
import { useWriteContractWithWait } from "./useWriteContractWithWait";

export interface UseBridgeReturnType {
  bridge: WriteContractWithAmount;
  allowance: WriteContractWithWait;
  tokenBalance: TokenBalance;
}

export interface UseBridgeErc20Props {
  amountToBridge: string;
  selectedTokenSymbol: string;
  recipient?: string;
}

export const useBridgeErc20 = ({
  amountToBridge,
  selectedTokenSymbol,
  recipient,
}: UseBridgeErc20Props): UseBridgeReturnType => {
  const { isMainnet, isCorrectChain } = useEthereum();

  const bridgeAddress = isMainnet
    ? "0xda3bd1fe1973470312db04551b65f401bc8a92fd"
    : "0xae68f87938439afeedd6552b0e83d2cbc2473623";
  const destinationChainID = isMainnet ? 0 : 1;

  const selectedToken = getBridgeToken({
    isMainnet,
    tokenSymbol: selectedTokenSymbol,
  });
  const amountToBridgeValue =
    amountToBridge && amountToBridge.length > 0
      ? parseStringToBigInt(amountToBridge, selectedToken.decimals)
      : 0n;
  const amountDisplay = stringNumberToInput(
    amountToBridge ?? "0",
    selectedToken.decimals,
  );

  const { tokenBalance, isLoading: isTokenBalanceLoading } = useTokenBalance({
    tokenAddress: selectedToken.address,
  });

  const hasBalance = Boolean(tokenBalance?.value && tokenBalance.value > 0n);

  const {
    allowanceWrite: allowance,
    currentAllowance,
    refetch: refetchAllowance,
  } = useAllowance({
    token: selectedToken.address!,
    spender: bridgeAddress,
    neededAmount: amountToBridgeValue,
  });

  const canBridge =
    isCorrectChain &&
    hasBalance &&
    recipient !== undefined &&
    amountToBridgeValue > 0n &&
    currentAllowance !== undefined &&
    currentAllowance >= amountToBridgeValue;

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

  const handleBridgeWrite = () => {
    // console.log("Bridge write");
    if (canBridge) {
      return write({
        address: bridgeAddress,
        abi: bridgeAbi,
        functionName: "bridgeERC20",
        args: [
          selectedToken.tokenId,
          amountToBridgeValue,
          recipient as `0x${string}`,
          destinationChainID,
        ],
      });
    }
  };

  useEffect(() => {
    if (isConfirmed && refetchAllowance) {
      refetchAllowance().catch((error) => {
        console.error("Refetching data failed:", error);
      });
      if (tokenBalance.refetch) {
        tokenBalance.refetch().catch((error) => {
          console.error("Refetching data failed:", error);
        });
      }
    }
  }, [isConfirmed, refetchAllowance, tokenBalance]);

  const amount: TokenBalance = {
    value: amountToBridgeValue,
    formatted: amountToBridge ?? "0",
    decimals: selectedToken.decimals,
    symbol: selectedTokenSymbol,
    display: amountDisplay,
    isLoading: isTokenBalanceLoading,
  };

  return {
    tokenBalance,
    allowance,
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
