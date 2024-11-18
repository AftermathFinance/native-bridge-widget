import { ChangeEvent } from "react";
import { Config } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { WalletConnectProps } from "../../components/walletConnect/types";

export interface WriteContractWithWait {
  isWritePending: boolean; // waiting for user to confirm TX
  isConfirming: boolean; // waiting for TX to be confirmed onchain
  isConfirmed: boolean; // TX confirmed
  isError: boolean; // TX failed
  isWriteError: boolean; // prepare TX failed
  writeError: Error | null; // prepare TX error
  hash: `0x${string}` | undefined;
  write: WriteContractMutate<Config, unknown>;
  resetWrite?: () => void;
}

export interface WriteContractWithAmount extends WriteContractWithWait {
  amount?: TokenBalance;
  canWrite: boolean;
  handleUserInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleWrite?: () => void;
}

export interface TokenBalance {
  value: bigint;
  formatted: string;
  display: string;
  decimals: number;
  symbol: string;
  refetch?: () => Promise<unknown>;
}

export interface BridgeChain {
  walletConnect: WalletConnectProps;
}
