import { useAppKit } from "@reown/appkit/react";
import { useAccount, useEnsName } from "wagmi";
import { chainEthereum } from "../wagmiConfig";

export const useEthereum = () => {
  const { open: openConnectModal } = useAppKit();
  const { address, isConnected, chainId } = useAccount();
  const { data: ensName } = useEnsName({
    address: address,
  });

  const isCorrectChain = chainId === chainEthereum.id && isConnected;
  const isMainnet = chainId === 1;

  return {
    openConnectModal,
    address,
    ensName,
    isConnected,
    isCorrectChain,
    isMainnet,
  };
};
