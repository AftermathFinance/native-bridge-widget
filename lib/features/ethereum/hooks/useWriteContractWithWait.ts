import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { WriteContractWithWait } from "../types";

export const useWriteContractWithWait = (): WriteContractWithWait => {
  const {
    writeContract: write,
    writeContractAsync: writeAsync,
    data: hash,
    isPending: isWritePending,
    isError: isWriteError,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isError,
  } = useWaitForTransactionReceipt({
    hash: hash,
  });

  return {
    isWritePending,
    isConfirming,
    isConfirmed,
    isError,
    isWriteError,
    writeError,
    hash,
    write,
    writeAsync,
    resetWrite,
  };
};
