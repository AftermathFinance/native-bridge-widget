import { QueryObserverResult } from "@tanstack/react-query";
import { useEffect } from "react";
import { Address, erc20Abi } from "viem";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { ReadContractErrorType } from "wagmi/actions";
import { WriteContractWithWait } from "../types";

interface UseAllowanceReturnType {
  allowanceWrite: WriteContractWithWait;
  currentAllowance: bigint | undefined;
  refetch: () => Promise<QueryObserverResult<bigint, ReadContractErrorType>>;
}

interface UseAllowanceProps {
  token: Address;
  spender: Address;
  neededAmount: bigint;
}
export const useAllowance = ({
  token,
  spender,
  neededAmount,
}: UseAllowanceProps): UseAllowanceReturnType => {
  const { address: owner } = useAccount();

  // Checking allowance
  const { data: allowanceData, refetch: refetchAllowance } = useReadContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: owner !== undefined ? [owner, spender] : undefined,
  });

  // Adjusting allowance
  const {
    writeContract: writeContractAllowance,
    data: writeContractAllowanceHash,
    isPending: isWriteContractAllowancePending,
    isError: isWriteError,
    error: writeError,
    reset: resetWriteContractAllowance,
  } = useWriteContract();

  const allowanceWrite = () => {
    console.log("Allowance write");
    return writeContractAllowance({
      abi: erc20Abi,
      address: token,
      functionName: "approve",
      args: [spender, neededAmount],
    });
  };

  const {
    isLoading: isConfirmingAllowance,
    isSuccess: isConfirmedAllowance,
    isError: isErrorAllowance,
  } = useWaitForTransactionReceipt({
    hash: writeContractAllowanceHash,
  });

  // refetch allowance if it is modified
  useEffect(() => {
    if (isConfirmedAllowance) {
      refetchAllowance().catch((error) => {
        console.error("Error refetching allowance:", error);
      });
    }
  }, [isConfirmedAllowance, refetchAllowance, writeContractAllowanceHash]);

  return {
    allowanceWrite: {
      canWrite: allowanceData !== undefined && allowanceData < neededAmount,
      isWritePending: isWriteContractAllowancePending,
      isConfirming: isConfirmingAllowance,
      isConfirmed: isConfirmedAllowance,
      isError: isErrorAllowance,
      hash: writeContractAllowanceHash,
      write: writeContractAllowance,
      handleWrite: allowanceWrite,
      resetWrite: resetWriteContractAllowance,
      isWriteError,
      writeError,
    },
    currentAllowance: allowanceData,
    refetch: () => refetchAllowance(),
  };
};
