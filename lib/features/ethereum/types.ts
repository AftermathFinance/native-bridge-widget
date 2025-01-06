import { ChangeEvent } from "react";
import { Config } from "wagmi";
import { WriteContractReturnType } from "wagmi/actions";
import { WriteContractMutate, WriteContractMutateAsync } from "wagmi/query";
import {
  ManualWalletProps,
  WalletConnectProps,
} from "../../components/walletConnect/types";

export interface WriteContractWithWait {
  isWritePending: boolean; // waiting for user to confirm TX
  isConfirming: boolean; // waiting for TX to be confirmed onchain
  isConfirmed: boolean; // TX confirmed
  isError: boolean; // TX failed
  isWriteError: boolean; // prepare TX failed
  writeError: Error | null; // prepare TX error
  hash: `0x${string}` | undefined;
  write: WriteContractMutate<Config, unknown>;
  writeAsync?: WriteContractMutateAsync<Config, unknown>;
  resetWrite?: () => void;
  canWrite?: boolean;
  handleWrite?: () => void;
  writeData?: WriteContractReturnType;
}

export interface WriteContractWithAmount extends WriteContractWithWait {
  amount: TokenBalance;
  handleUserInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface TokenBalance {
  value: bigint;
  formatted: string;
  display: string;
  decimals: number;
  symbol: string;
  refetch?: () => Promise<unknown>;
  isLoading?: boolean;
}

export interface BridgeChain {
  walletConnect?: WalletConnectProps;
  manualWallet?: ManualWalletProps;
}

export type BridgeTokenSymbol = "wETH" | "ETH" | "USDT";
// TODO: allow for custom tokens
export type BridgeTokenId = 2 | 4;

export interface BridgeToken {
  address?: `0x${string}`;
  symbol: BridgeTokenSymbol;
  decimals: number;
  tokenId: BridgeTokenId;
  icon: string;
}
