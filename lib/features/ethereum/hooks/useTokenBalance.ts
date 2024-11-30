import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Address, erc20Abi, formatUnits } from "viem";
import {
  useAccount,
  useBlockNumber,
  useReadContract,
  useReadContracts,
} from "wagmi";
import { stringNumberToLocale } from "../../../utils/string";
import { TokenBalance } from "../types";

interface TokenBalanceReturnType {
  tokenBalance: TokenBalance;
  isLoading: boolean;
  isError: boolean;
}

interface UseTokenBalanceProps {
  tokenAddress?: Address;
}

export const useTokenBalance = ({
  tokenAddress,
}: UseTokenBalanceProps): TokenBalanceReturnType => {
  const { address: owner } = useAccount();
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const [lastInvalidatedBlock, setLastInvalidatedBlock] = useState<bigint>(0n);

  const result = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: owner !== undefined ? [owner] : undefined,
  });

  const decimalsSymbol = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "decimals",
      },
      {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
    query: {
      enabled: result.isSuccess,
      refetchOnWindowFocus: false,
      gcTime: Infinity,
      staleTime: Infinity,
    },
  });

  const queryKey = useMemo(() => result.queryKey, [result]);

  useEffect(() => {
    if (blockNumber && lastInvalidatedBlock >= blockNumber + 10n) {
      console.log("Invalidating token queries for block:", blockNumber);
      queryClient
        .invalidateQueries({ queryKey })
        .then(() => {
          // Set the current block number as the last invalidated block
          setLastInvalidatedBlock(blockNumber);
        })
        .catch((error) => {
          console.error("Error invalidating queries:", error);
        });
    }
  }, [blockNumber, queryClient, queryKey, lastInvalidatedBlock]);

  const formatted =
    result.data && decimalsSymbol.data
      ? formatUnits(result.data, decimalsSymbol.data[0])
      : "0";

  const tokenBalance: TokenBalance = {
    value: result.data ? result.data : 0n,
    formatted,
    decimals: decimalsSymbol.data ? decimalsSymbol.data[0] : 18,
    symbol: decimalsSymbol.data ? decimalsSymbol.data[1] : "",
    display: stringNumberToLocale({
      value: formatted,
      decimals: decimalsSymbol.data ? decimalsSymbol.data[0] : 18,
    }),
  };

  return {
    tokenBalance,
    isLoading: result.isLoading,
    isError: result.isError,
  };
};
