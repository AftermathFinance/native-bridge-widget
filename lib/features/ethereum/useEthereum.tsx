import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { chainEthereum } from "./wagmiConfig";

export const useEthereum = () => {
  const { open: openConnectModal } = useAppKit();
  const { address, isConnected, chainId } = useAccount();

  const isCorrectChain = chainId === chainEthereum.id && isConnected;

  return { openConnectModal, address, isConnected, isCorrectChain };
};
